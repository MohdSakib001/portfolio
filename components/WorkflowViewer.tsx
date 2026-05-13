"use client";

import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
  Handle,
  Position,
  useReactFlow,
  MarkerType,
  type NodeTypes,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Clock,
  Play,
  Mail,
  MailOpen,
  Code2,
  GitBranch,
  Globe,
  Layers,
  Sparkles,
  Send,
  Table2,
  Timer,
  GitMerge,
  Zap,
  Bot,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react";

type NodeConfig = { icon: React.ElementType; color: string; label: string };

const TYPE_CONFIG: Record<string, NodeConfig> = {
  "n8n-nodes-base.scheduleTrigger": {
    icon: Clock,
    color: "#ff6d5a",
    label: "Schedule",
  },
  "n8n-nodes-base.manualTrigger": {
    icon: Play,
    color: "#ff6d5a",
    label: "Manual",
  },
  "n8n-nodes-base.gmailTrigger": {
    icon: MailOpen,
    color: "#ea4335",
    label: "Gmail Watch",
  },
  "n8n-nodes-base.gmail": { icon: Mail, color: "#ea4335", label: "Gmail" },
  "n8n-nodes-base.googleSheets": {
    icon: Table2,
    color: "#34a853",
    label: "Sheets",
  },
  "n8n-nodes-base.code": { icon: Code2, color: "#f5a623", label: "Code" },
  "n8n-nodes-base.if": { icon: GitBranch, color: "#50c878", label: "IF" },
  "n8n-nodes-base.switch": {
    icon: GitMerge,
    color: "#50c878",
    label: "Switch",
  },
  "n8n-nodes-base.httpRequest": {
    icon: Globe,
    color: "#9b59b6",
    label: "HTTP",
  },
  "n8n-nodes-base.splitInBatches": {
    icon: Layers,
    color: "#1abc9c",
    label: "Batches",
  },
  "n8n-nodes-base.wait": { icon: Timer, color: "#95a5a6", label: "Wait" },
  "n8n-nodes-base.telegram": {
    icon: Send,
    color: "#2ca5e0",
    label: "Telegram",
  },
  "@n8n/n8n-nodes-langchain.lmChatGoogleGemini": {
    icon: Sparkles,
    color: "#8e75ff",
    label: "Gemini AI",
  },
  "@n8n/n8n-nodes-langchain.googleGemini": {
    icon: Sparkles,
    color: "#8e75ff",
    label: "Gemini AI",
  },
  "@n8n/n8n-nodes-langchain.agent": {
    icon: Bot,
    color: "#8e75ff",
    label: "AI Agent",
  },
};

export function getConfig(type: string): NodeConfig {
  return TYPE_CONFIG[type] ?? { icon: Zap, color: "#6b7280", label: "Node" };
}

const ICON_BOX = 60;

// Node that matches real n8n's visual style — square icon card, label below
function N8nNode({ data }: { data: { label: string; nodeType: string } }) {
  const { icon: Icon, color } = getConfig(data.nodeType);
  const name =
    data.label.length > 20 ? data.label.slice(0, 19) + "…" : data.label;

  return (
    <div style={{ width: 100, textAlign: "center" }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          top: ICON_BOX / 2,
          left: -5,
          width: 10,
          height: 10,
          background: "#3a3a3a",
          border: "2px solid #555",
          borderRadius: "50%",
        }}
      />

      {/* Icon square — matches n8n's node card */}
      <div
        style={{
          width: ICON_BOX,
          height: ICON_BOX,
          background: "#1e1e1e",
          border: "1px solid #2e2e2e",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative",
        }}
      >
        <Icon size={26} style={{ color }} />
      </div>

      <p
        style={{
          marginTop: 7,
          fontSize: 10,
          fontWeight: 500,
          color: "#aaa",
          lineHeight: 1.35,
          padding: "0 4px",
          wordBreak: "break-word",
        }}
      >
        {name}
      </p>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: ICON_BOX / 2,
          right: -5,
          width: 10,
          height: 10,
          background: "#3a3a3a",
          border: "2px solid #555",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: NodeTypes = { n8nNode: N8nNode as any };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertWorkflow(wf: any): { nodes: Node[]; edges: Edge[] } {
  const nameToId: Record<string, string> = {};
  const colorByName: Record<string, string> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wf.nodes.forEach((n: any) => {
    nameToId[n.name] = n.id;
    colorByName[n.name] = getConfig(n.type).color;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes: Node[] = wf.nodes.map((n: any) => ({
    id: n.id,
    type: "n8nNode",
    position: { x: n.position[0], y: n.position[1] },
    data: { label: n.name, nodeType: n.type },
    draggable: false,
    selectable: false,
    connectable: false,
  }));

  const edges: Edge[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries<any>(wf.connections).forEach(([sourceName, outputs]) => {
    const sourceId = nameToId[sourceName];
    if (!sourceId) return;
    const edgeColor = colorByName[sourceName] + "55";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    outputs.main?.forEach((group: any[], idx: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      group?.forEach((conn: any) => {
        const targetId = nameToId[conn.node];
        if (!targetId) return;
        edges.push({
          id: `${sourceId}-${targetId}-${idx}`,
          source: sourceId,
          target: targetId,
          type: "smoothstep",
          animated: true,
          style: { stroke: edgeColor, strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeColor,
            width: 14,
            height: 14,
          },
        });
      });
    });
  });

  return { nodes, edges };
}

function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const btn =
    "w-7 h-7 rounded-lg bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-white/30 hover:text-white/70 transition-all duration-150 cursor-pointer";
  return (
    <Panel position="top-right">
      <div className="flex flex-col gap-1 m-3">
        <button className={btn} onClick={() => zoomIn({ duration: 200 })}>
          <Plus size={11} />
        </button>
        <button className={btn} onClick={() => zoomOut({ duration: 200 })}>
          <Minus size={11} />
        </button>
        <button
          className={btn}
          onClick={() => fitView({ duration: 300, padding: 0.15 })}
        >
          <Maximize2 size={10} />
        </button>
      </div>
    </Panel>
  );
}

interface Props {
  filename: string;
  onLoad?: (nodeCount: number) => void;
  focusNodeNames?: string[];
}

export default function WorkflowViewer({
  filename,
  onLoad,
  focusNodeNames,
}: Props) {
  const [flow, setFlow] = useState<{ nodes: Node[]; edges: Edge[] } | null>(
    null,
  );

  useEffect(() => {
    setFlow(null);
    fetch(`/n8n-workflows/${filename}`)
      .then((r) => r.json())
      .then((json) => {
        const converted = convertWorkflow(json);
        setFlow(converted);
        onLoad?.(json.nodes.length);
      });
  }, [filename, onLoad]);

  if (!flow) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#111]">
        <div className="w-5 h-5 border-2 border-white/6 border-t-white/30 rounded-full animate-spin" />
      </div>
    );
  }

  // Fit view to named nodes if provided, otherwise first 8 for large workflows
  let fitNodes: Node[] | undefined;
  if (focusNodeNames && focusNodeNames.length > 0) {
    const found = flow.nodes.filter((n) =>
      focusNodeNames.includes((n.data as { label: string }).label),
    );
    fitNodes = found.length > 0 ? found : undefined;
  } else if (flow.nodes.length > 10) {
    fitNodes = flow.nodes.slice(0, 8);
  }

  return (
    <ReactFlow
      nodes={flow.nodes}
      edges={flow.edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ nodes: fitNodes, padding: 0.2 }}
      minZoom={0.05}
      maxZoom={2}
      panOnDrag
      zoomOnScroll={false}
      zoomOnPinch={false}
      preventScrolling={false}
      colorMode="light"
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        color="#ffffff05"
        gap={28}
        size={1}
      />
      <MiniMap
        className="hidden! sm:block! rounded-xl! border-[#2a2a2a]! bg-[#111]!"
        nodeColor={(node) =>
          getConfig((node.data as { nodeType: string }).nodeType).color + "99"
        }
        maskColor="rgba(0,0,0,0.8)"
        pannable
        zoomable={false}
      />
      <ZoomControls />
    </ReactFlow>
  );
}
