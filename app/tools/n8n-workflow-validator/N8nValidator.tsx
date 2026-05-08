"use client";
import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

const SAMPLE_WORKFLOW = JSON.stringify({
  name: "My n8n Workflow",
  nodes: [
    {
      id: "1",
      name: "Webhook Trigger",
      type: "n8n-nodes-base.webhook",
      position: [250, 300],
      parameters: { path: "/my-webhook", httpMethod: "POST" },
    },
    {
      id: "2",
      name: "Set Data",
      type: "n8n-nodes-base.set",
      position: [450, 300],
      parameters: {
        values: { string: [{ name: "status", value: "processed" }] },
      },
    },
    {
      id: "3",
      name: "HTTP Request",
      type: "n8n-nodes-base.httpRequest",
      position: [650, 300],
      parameters: { url: "https://api.example.com/data", method: "POST" },
    },
    {
      id: "4",
      name: "Orphaned Note",
      type: "n8n-nodes-base.stickyNote",
      position: [900, 150],
      parameters: {},
    },
  ],
  connections: {
    "Webhook Trigger": {
      main: [[{ node: "Set Data", type: "main", index: 0 }]],
    },
    "Set Data": {
      main: [[{ node: "HTTP Request", type: "main", index: 0 }]],
    },
  },
}, null, 2);

type Severity = "error" | "warning" | "info";

interface Issue {
  severity: Severity;
  nodeId?: string;
  nodeName?: string;
  type: string;
  description: string;
}

interface NodeInfo {
  id: string;
  name: string;
  type: string;
  position: [number, number] | number[];
}

interface ValidationResult {
  valid: boolean;
  issues: Issue[];
  nodes: NodeInfo[];
  triggers: string[];
  totalConnections: number;
  orphanedNodes: string[];
  subgraphCount: number;
  hasCycle: boolean;
}

const NODE_REQUIRED_PARAMS: Record<string, string[]> = {
  "n8n-nodes-base.httpRequest": ["url"],
  "n8n-nodes-base.set": ["values"],
  "n8n-nodes-base.function": ["functionCode"],
  "n8n-nodes-base.code": ["jsCode"],
  "n8n-nodes-base.sendEmail": ["fromEmail", "toEmail", "subject"],
  "n8n-nodes-base.slack": ["channel", "text"],
  "n8n-nodes-base.postgres": ["query"],
  "n8n-nodes-base.mysql": ["query"],
  "n8n-nodes-base.googleSheets": ["sheetId"],
};

const TRIGGER_TYPES = [
  "n8n-nodes-base.webhook",
  "n8n-nodes-base.cron",
  "n8n-nodes-base.scheduleTrigger",
  "n8n-nodes-base.manualTrigger",
  "n8n-nodes-base.emailReadImap",
  "n8n-nodes-base.formTrigger",
  "n8n-nodes-base.chatTrigger",
  "@n8n/n8n-nodes-langchain.chatTrigger",
];

function getNodeTypeParts(type: string): { category: string; color: string } {
  if (type.includes("Trigger") || type.includes("trigger") || type.includes("webhook") || type.includes("cron") || type.includes("schedule")) {
    return { category: "trigger", color: "#ff6d5a" };
  }
  if (type.includes("http") || type.includes("Http")) {
    return { category: "http", color: "#a855f7" };
  }
  if (type.includes("set") || type.includes("function") || type.includes("code") || type.includes("transform")) {
    return { category: "transform", color: "#22d3ee" };
  }
  if (type.includes("email") || type.includes("slack") || type.includes("discord") || type.includes("telegram")) {
    return { category: "notify", color: "#f59e0b" };
  }
  if (type.includes("postgres") || type.includes("mysql") || type.includes("mongo") || type.includes("redis")) {
    return { category: "database", color: "#34d399" };
  }
  if (type.includes("google") || type.includes("aws") || type.includes("azure")) {
    return { category: "cloud", color: "#60a5fa" };
  }
  if (type.includes("stickyNote") || type.includes("noOp")) {
    return { category: "utility", color: "#6b7280" };
  }
  return { category: "action", color: "#e2e8f0" };
}

function detectCycle(adjacency: Map<string, string[]>): boolean {
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(node: string): boolean {
    visited.add(node);
    inStack.add(node);
    for (const neighbor of (adjacency.get(node) || [])) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (inStack.has(neighbor)) {
        return true;
      }
    }
    inStack.delete(node);
    return false;
  }

  for (const node of adjacency.keys()) {
    if (!visited.has(node) && dfs(node)) return true;
  }
  return false;
}

function countSubgraphs(nodeNames: string[], adjacency: Map<string, string[]>, reverseAdj: Map<string, string[]>): number {
  const visited = new Set<string>();

  function bfs(start: string) {
    const queue = [start];
    while (queue.length) {
      const n = queue.shift()!;
      if (visited.has(n)) continue;
      visited.add(n);
      for (const nb of [...(adjacency.get(n) || []), ...(reverseAdj.get(n) || [])]) {
        if (!visited.has(nb)) queue.push(nb);
      }
    }
  }

  let count = 0;
  for (const name of nodeNames) {
    if (!visited.has(name)) {
      bfs(name);
      count++;
    }
  }
  return count;
}

function validateWorkflow(raw: string): ValidationResult {
  const issues: Issue[] = [];

  if (!raw.trim()) {
    return { valid: false, issues: [{ severity: "error", type: "Empty input", description: "No JSON provided." }], nodes: [], triggers: [], totalConnections: 0, orphanedNodes: [], subgraphCount: 0, hasCycle: false };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return { valid: false, issues: [{ severity: "error", type: "Invalid JSON", description: `JSON parse error: ${(e as Error).message}` }], nodes: [], triggers: [], totalConnections: 0, orphanedNodes: [], subgraphCount: 0, hasCycle: false };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    issues.push({ severity: "error", type: "Structure error", description: "Root must be a JSON object." });
    return { valid: false, issues, nodes: [], triggers: [], totalConnections: 0, orphanedNodes: [], subgraphCount: 0, hasCycle: false };
  }

  if (!Array.isArray(parsed.nodes)) {
    issues.push({ severity: "error", type: "Missing nodes array", description: 'Workflow must have a "nodes" array.' });
  }
  if (typeof parsed.connections !== "object" || Array.isArray(parsed.connections) || parsed.connections === null) {
    issues.push({ severity: "error", type: "Missing connections", description: 'Workflow must have a "connections" object.' });
  }
  if (!parsed.name) {
    issues.push({ severity: "warning", type: "No workflow name", description: 'Workflow is missing a "name" field.' });
  }

  if (issues.some(i => i.severity === "error")) {
    return { valid: false, issues, nodes: [], triggers: [], totalConnections: 0, orphanedNodes: [], subgraphCount: 0, hasCycle: false };
  }

  const rawNodes = parsed.nodes as Record<string, unknown>[];
  const rawConns = parsed.connections as Record<string, unknown>;

  const nodes: NodeInfo[] = [];
  const nodeNameSet = new Set<string>();
  const nodeIdSet = new Set<string>();

  for (let i = 0; i < rawNodes.length; i++) {
    const n = rawNodes[i];
    if (!n || typeof n !== "object") {
      issues.push({ severity: "error", type: "Invalid node", description: `Node at index ${i} is not an object.` });
      continue;
    }
    const name = typeof n.name === "string" ? n.name : `[unnamed node ${i}]`;
    const type = typeof n.type === "string" ? n.type : "unknown";
    const id = typeof n.id === "string" ? n.id : String(i);
    const position = Array.isArray(n.position) ? n.position : [0, 0];

    if (nodeNameSet.has(name)) {
      issues.push({ severity: "error", nodeId: id, nodeName: name, type: "Duplicate node name", description: `Multiple nodes share the name "${name}".` });
    }
    if (nodeIdSet.has(id)) {
      issues.push({ severity: "warning", nodeId: id, nodeName: name, type: "Duplicate node ID", description: `Multiple nodes share ID "${id}".` });
    }
    nodeNameSet.add(name);
    nodeIdSet.add(id);

    const params = (n.parameters && typeof n.parameters === "object") ? n.parameters as Record<string, unknown> : {};
    const required = NODE_REQUIRED_PARAMS[type] || [];
    for (const req of required) {
      if (params[req] === undefined || params[req] === "" || params[req] === null) {
        issues.push({ severity: "warning", nodeId: id, nodeName: name, type: "Missing required parameter", description: `Node type "${type}" expects parameter "${req}" but it is not set.` });
      }
    }

    nodes.push({ id, name, type, position });
  }

  const triggers = nodes.filter(n => TRIGGER_TYPES.includes(n.type)).map(n => n.name);
  if (triggers.length === 0) {
    issues.push({ severity: "warning", type: "No trigger found", description: "Workflow has no recognizable trigger node. It cannot be started automatically." });
  }

  const adjacency = new Map<string, string[]>();
  const reverseAdj = new Map<string, string[]>();
  for (const n of nodes) {
    adjacency.set(n.name, []);
    reverseAdj.set(n.name, []);
  }

  let totalConnections = 0;
  const connectedNodeNames = new Set<string>();

  for (const [sourceName, outputs] of Object.entries(rawConns)) {
    if (!nodeNameSet.has(sourceName)) {
      issues.push({ severity: "error", type: "Ghost source node", description: `Connection references source node "${sourceName}" which does not exist in nodes array.` });
      continue;
    }
    connectedNodeNames.add(sourceName);
    if (!outputs || typeof outputs !== "object") continue;
    const outputsObj = outputs as Record<string, unknown>;
    for (const [, outputList] of Object.entries(outputsObj)) {
      if (!Array.isArray(outputList)) continue;
      for (const branch of outputList) {
        if (!Array.isArray(branch)) continue;
        for (const conn of branch) {
          if (!conn || typeof conn !== "object") continue;
          const c = conn as Record<string, unknown>;
          const targetName = typeof c.node === "string" ? c.node : null;
          if (!targetName) {
            issues.push({ severity: "warning", type: "Malformed connection", description: `A connection from "${sourceName}" is missing the target "node" property.` });
            continue;
          }
          if (!nodeNameSet.has(targetName)) {
            issues.push({ severity: "error", type: "Ghost target node", description: `Connection references target node "${targetName}" which does not exist in nodes array.` });
            continue;
          }
          connectedNodeNames.add(targetName);
          adjacency.get(sourceName)!.push(targetName);
          reverseAdj.get(targetName)!.push(sourceName);
          totalConnections++;
        }
      }
    }
  }

  const orphanedNodes: string[] = [];
  for (const n of nodes) {
    const hasOutgoing = (adjacency.get(n.name)?.length ?? 0) > 0;
    const hasIncoming = (reverseAdj.get(n.name)?.length ?? 0) > 0;
    if (!hasOutgoing && !hasIncoming) {
      if (!TRIGGER_TYPES.includes(n.type) || nodes.filter(x => TRIGGER_TYPES.includes(x.type)).length > 1 || n.type === "n8n-nodes-base.stickyNote") {
        orphanedNodes.push(n.name);
        issues.push({ severity: "warning", nodeId: n.id, nodeName: n.name, type: "Orphaned node", description: `Node "${n.name}" has no incoming or outgoing connections.` });
      }
    }
  }

  const hasCycle = detectCycle(adjacency);
  if (hasCycle) {
    issues.push({ severity: "warning", type: "Cycle detected", description: "The workflow contains a loop (cycle). This may cause infinite execution." });
  }

  const subgraphCount = nodes.length > 0 ? countSubgraphs(nodes.map(n => n.name), adjacency, reverseAdj) : 0;
  if (subgraphCount > 1) {
    issues.push({ severity: "warning", type: "Disconnected subgraphs", description: `Workflow has ${subgraphCount} disconnected groups of nodes. Some nodes may never be reached from the trigger.` });
  }

  const hasError = issues.some(i => i.severity === "error");
  return { valid: !hasError, issues, nodes, triggers, totalConnections, orphanedNodes, subgraphCount, hasCycle };
}

function IssueRow({ issue }: { issue: Issue }) {
  const colors: Record<Severity, { bg: string; border: string; label: string; labelColor: string }> = {
    error: { bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.25)", label: "ERROR", labelColor: "#f87171" },
    warning: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", label: "WARN", labelColor: "#fbbf24" },
    info: { bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.25)", label: "INFO", labelColor: "#818cf8" },
  };
  const c = colors[issue.severity];
  return (
    <div className="flex gap-3 px-4 py-3 rounded-[10px]" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <span className="font-mono text-[9px] font-bold mt-0.5 shrink-0 tracking-wider" style={{ color: c.labelColor }}>{c.label}</span>
      <div>
        <p className="font-mono text-[11px] font-semibold" style={{ color: c.labelColor }}>{issue.type}{issue.nodeName ? ` — ${issue.nodeName}` : ""}</p>
        <p className="font-mono text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{issue.description}</p>
      </div>
    </div>
  );
}

export default function N8nValidator() {
  const [input, setInput] = useState(SAMPLE_WORKFLOW);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [live, setLive] = useState(false);
  const [copiedSample, setCopiedSample] = useState(false);
  const [activeTab, setActiveTab] = useState<"issues" | "nodes" | "flow">("issues");

  const run = useCallback((text: string) => {
    setResult(validateWorkflow(text));
  }, []);

  const handleChange = (v: string) => {
    setInput(v);
    if (live) run(v);
  };

  const copyText = async (text: string, setter: (b: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const errors = result?.issues.filter(i => i.severity === "error") ?? [];
  const warnings = result?.issues.filter(i => i.severity === "warning") ?? [];
  const infos = result?.issues.filter(i => i.severity === "info") ?? [];

  return (
    <div style={{ fontFamily: "monospace" }}>
      <div className="rounded-[20px] overflow-hidden mb-3" style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.15)" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(168,85,247,0.1)", background: "rgba(168,85,247,0.05)" }}>
          <span className="text-[9px] uppercase tracking-[0.15em] font-bold" style={{ color: "rgba(168,85,247,0.7)" }}>workflow json</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setInput(SAMPLE_WORKFLOW); if (live) run(SAMPLE_WORKFLOW); }}
              className="text-[9px] uppercase tracking-wider hover:opacity-80 transition-opacity"
              style={{ color: "#ff6d5a" }}>
              load sample
            </button>
            <button
              onClick={() => copyText(input, setCopiedSample)}
              className="flex items-center gap-1 text-[9px] uppercase tracking-wider hover:opacity-80 transition-opacity"
              style={{ color: "rgba(168,85,247,0.6)" }}>
              {copiedSample ? <Check size={10} /> : <Copy size={10} />}
              {copiedSample ? "copied" : "copy"}
            </button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={e => handleChange(e.target.value)}
          spellCheck={false}
          placeholder="Paste your n8n workflow JSON here..."
          className="w-full resize-none p-5 text-[12px] leading-[1.75] outline-none bg-transparent"
          style={{ color: "#e2e8f0", caretColor: "#ff6d5a", minHeight: "280px", tabSize: 2 }}
        />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => run(input)}
          className="px-6 py-2.5 rounded-[10px] font-bold text-[11px] uppercase tracking-[0.1em] transition-all hover:opacity-90"
          style={{ background: "#ff6d5a", color: "#130d1f" }}>
          Validate
        </button>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => setLive(p => !p)}
            className="w-8 h-4 rounded-full transition-colors relative"
            style={{ background: live ? "#a855f7" : "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <div className="absolute top-0.5 w-3 h-3 rounded-full transition-all"
              style={{ background: live ? "#fff" : "rgba(168,85,247,0.5)", left: live ? "calc(100% - 14px)" : "2px" }} />
          </div>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(168,85,247,0.6)" }}>live</span>
        </label>
        {result && (
          <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-[10px] font-bold text-[11px] uppercase tracking-wider"
            style={{
              background: result.valid ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${result.valid ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              color: result.valid ? "#4ade80" : "#f87171",
            }}>
            {result.valid ? "✓ Valid" : "✗ Invalid"}
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { label: "Nodes", value: result.nodes.length, color: "#a855f7" },
              { label: "Connections", value: result.totalConnections, color: "#ff6d5a" },
              { label: "Errors", value: errors.length, color: "#f87171" },
              { label: "Warnings", value: warnings.length, color: "#fbbf24" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-[12px] px-4 py-3 text-center" style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.12)" }}>
                <p className="text-[20px] font-bold" style={{ color }}>{value}</p>
                <p className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
              </div>
            ))}
          </div>

          {result.triggers.length > 0 && (
            <div className="mb-4 px-4 py-3 rounded-[10px] flex items-center gap-3" style={{ background: "rgba(255,109,90,0.08)", border: "1px solid rgba(255,109,90,0.2)" }}>
              <span className="text-[9px] uppercase tracking-wider font-bold" style={{ color: "#ff6d5a" }}>⚡ Trigger</span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>{result.triggers.join(", ")}</span>
            </div>
          )}

          <div className="flex gap-1 mb-4">
            {(["issues", "nodes", "flow"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-[8px] text-[10px] uppercase tracking-[0.08em] font-bold transition-all"
                style={{
                  background: activeTab === tab ? "#a855f7" : "rgba(168,85,247,0.08)",
                  color: activeTab === tab ? "#fff" : "rgba(168,85,247,0.5)",
                  border: activeTab === tab ? "none" : "1px solid rgba(168,85,247,0.15)",
                }}>
                {tab}{tab === "issues" ? ` (${result.issues.length})` : ""}
              </button>
            ))}
          </div>

          {activeTab === "issues" && (
            <div className="space-y-2">
              {result.issues.length === 0 ? (
                <div className="px-4 py-6 rounded-[12px] text-center" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <p className="font-mono text-[12px]" style={{ color: "#4ade80" }}>No issues found — workflow looks clean.</p>
                </div>
              ) : (
                <>
                  {errors.length > 0 && <p className="text-[9px] uppercase tracking-wider mb-2 px-1" style={{ color: "#f87171" }}>Errors ({errors.length})</p>}
                  {errors.map((issue, i) => <IssueRow key={i} issue={issue} />)}
                  {warnings.length > 0 && <p className="text-[9px] uppercase tracking-wider mt-4 mb-2 px-1" style={{ color: "#fbbf24" }}>Warnings ({warnings.length})</p>}
                  {warnings.map((issue, i) => <IssueRow key={i} issue={issue} />)}
                  {infos.length > 0 && <p className="text-[9px] uppercase tracking-wider mt-4 mb-2 px-1" style={{ color: "#818cf8" }}>Info ({infos.length})</p>}
                  {infos.map((issue, i) => <IssueRow key={i} issue={issue} />)}
                </>
              )}
            </div>
          )}

          {activeTab === "nodes" && (
            <div className="space-y-2">
              {result.nodes.length === 0 ? (
                <p className="text-[12px] text-center py-6" style={{ color: "rgba(255,255,255,0.3)" }}>No nodes found.</p>
              ) : (
                result.nodes.map((node) => {
                  const { color } = getNodeTypeParts(node.type);
                  const isOrphaned = result.orphanedNodes.includes(node.name);
                  const isTrigger = result.triggers.includes(node.name);
                  return (
                    <div key={node.id} className="flex items-start gap-3 px-4 py-3 rounded-[12px]"
                      style={{ background: "#1c1329", border: `1px solid ${isOrphaned ? "rgba(245,158,11,0.3)" : "rgba(168,85,247,0.12)"}` }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[12px] font-semibold" style={{ color: "#e2e8f0" }}>{node.name}</span>
                          {isTrigger && <span className="px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold" style={{ background: "rgba(255,109,90,0.15)", color: "#ff6d5a" }}>trigger</span>}
                          {isOrphaned && <span className="px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold" style={{ background: "rgba(245,158,11,0.12)", color: "#fbbf24" }}>orphaned</span>}
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{node.type}</p>
                      </div>
                      <span className="text-[9px] shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>
                        [{Array.isArray(node.position) ? node.position.slice(0, 2).map(Math.round).join(", ") : ""}]
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "flow" && (
            <div className="rounded-[16px] overflow-hidden" style={{ background: "#1c1329", border: "1px solid rgba(168,85,247,0.15)" }}>
              <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(168,85,247,0.1)", background: "rgba(168,85,247,0.05)" }}>
                <span className="text-[9px] uppercase tracking-[0.15em] font-bold" style={{ color: "rgba(168,85,247,0.7)" }}>flow diagram</span>
              </div>
              <div className="p-4 space-y-1.5">
                {result.nodes.length === 0 ? (
                  <p className="text-[12px] text-center py-6" style={{ color: "rgba(255,255,255,0.3)" }}>No nodes to display.</p>
                ) : (
                  result.nodes.map((node) => {
                    const { color } = getNodeTypeParts(node.type);
                    const isTrigger = result.triggers.includes(node.name);
                    const isOrphaned = result.orphanedNodes.includes(node.name);
                    return (
                      <div key={node.id}>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-[8px]"
                          style={{ background: isTrigger ? "rgba(255,109,90,0.1)" : "rgba(168,85,247,0.06)", border: `1px solid ${color}33` }}>
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                          <span className="text-[11px]" style={{ color: isOrphaned ? "#fbbf24" : "#e2e8f0" }}>{node.name}</span>
                          <span className="text-[9px] ml-auto" style={{ color: "rgba(255,255,255,0.25)" }}>{node.type.split(".").pop()}</span>
                        </div>
                        {(result.nodes.indexOf(node) < result.nodes.length - 1) && (
                          (() => {
                            const outgoingNames = result.nodes
                              .filter(target => {
                                const rawConnsObj = (() => {
                                  try { return JSON.parse(input).connections; } catch { return {}; }
                                })();
                                const outList = rawConnsObj?.[node.name]?.main;
                                if (!Array.isArray(outList)) return false;
                                return outList.some((branch: unknown[]) => Array.isArray(branch) && branch.some((c: unknown) => (c as Record<string,unknown>)?.node === target.name));
                              })
                              .map(t => t.name);
                            if (outgoingNames.length === 0) return null;
                            return (
                              <div className="flex items-center gap-1 pl-5 py-0.5">
                                <span className="text-[10px]" style={{ color: "#ff6d5a" }}>↓</span>
                                <span className="text-[9px]" style={{ color: "rgba(255,109,90,0.5)" }}>{outgoingNames.join(", ")}</span>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
