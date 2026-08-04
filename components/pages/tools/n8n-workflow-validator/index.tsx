import {
  AlertTriangle,
  GitBranch,
  ListChecks,
  Repeat,
  ShieldCheck,
  Unlink,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import N8nValidator from "./N8nValidator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Orphaned Nodes",
    description:
      "Finds nodes that nothing connects to and that will never execute.",
    icon: GitBranch,
  },
  {
    title: "Broken Connections",
    description: "Detects edges pointing at nodes that no longer exist.",
    icon: Unlink,
  },
  {
    title: "Missing Parameters",
    description: "Flags required fields left empty before the workflow runs.",
    icon: AlertTriangle,
  },
  {
    title: "Loop Detection",
    description:
      "Identifies cycles that can hang or repeat a workflow indefinitely.",
    icon: Repeat,
  },
  {
    title: "Full Report",
    description: "Every issue listed with the node it belongs to.",
    icon: ListChecks,
  },
  {
    title: "Never Uploaded",
    description:
      "Workflow JSON often holds credentials — parsing stays in your browser.",
    icon: ShieldCheck,
  },
];

const VALIDATION_CHECKS: { title: string; body: string }[] = [
  {
    title: "Structure Validation",
    body: "Confirms the input is valid JSON with the required top-level `nodes` array and `connections` object.",
  },
  {
    title: "Node Analysis",
    body: "Lists every node with its type, name, position, and whether it is a trigger, action, or utility node.",
  },
  {
    title: "Orphaned Node Detection",
    body: "Flags nodes that have zero incoming and zero outgoing connections — they will never execute in a run.",
  },
  {
    title: "Missing Connections",
    body: "Finds references in the connections map that point to node names not present in the nodes array.",
  },
  {
    title: "Disconnected Subgraphs",
    body: "Uses BFS to count isolated groups of nodes. More than one subgraph means part of your flow is unreachable.",
  },
  {
    title: "Loop Detection",
    body: "Runs DFS cycle detection on the node graph to surface feedback loops that may cause infinite execution.",
  },
  {
    title: "Missing Node Parameters",
    body: "Checks known n8n node types (HTTP Request, Set, Code, Slack, email, SQL…) for required fields.",
  },
  {
    title: "Trigger Identification",
    body: "Identifies which node acts as the workflow entry point — Webhook, Schedule, Form, Chat, and others.",
  },
  {
    title: "Summary Counts",
    body: "Shows total nodes, total connections, error count, and warning count in a quick-glance dashboard.",
  },
];

const COMMON_ISSUES: { title: string; body: string }[] = [
  {
    title: "Orphaned node after a refactor",
    body: 'When you reroute a flow and forget to delete an old node, it remains in the "nodes" array but loses all its edges. The validator catches this immediately.',
  },
  {
    title: "Typo in a connection target name",
    body: "If you manually edit workflow JSON and misspell a node name in the connections object, the connection references a non-existent node. The validator reports it as a ghost target.",
  },
  {
    title: "HTTP Request node without a URL",
    body: 'The "url" field is required for HTTP Request nodes. Workflows exported before filling in the URL will fail at runtime — the validator surfaces this as a missing parameter warning.',
  },
  {
    title: "No trigger node",
    body: "Workflows without a recognizable trigger (Webhook, Schedule, Form Trigger, etc.) cannot be activated automatically. The validator warns you so you can add one before deploying.",
  },
  {
    title: "Accidentally duplicated node name",
    body: "Copying and pasting nodes in the n8n canvas can produce two nodes with the same name. n8n resolves connections by name, so duplicates cause unpredictable routing.",
  },
  {
    title: "Loop from an error branch pointing back",
    body: "Error branches wired back to an earlier node in the same flow create a cycle. While n8n supports limited looping patterns, unintentional cycles often cause stuck executions.",
  },
];

export default function N8nValidatorPage() {
  return (
    <ToolPage
      id="n8n-workflow-validator"
      heading="n8n Workflow Validator."
      intro="Paste your workflow JSON to detect orphaned nodes, broken connections, missing parameters, and loops."
      extra={
        <>
          <ToolNotes
            heading="What gets checked."
            description="Nine structural checks run against the workflow graph."
            notes={VALIDATION_CHECKS}
          />
          <ToolNotes
            heading="Common workflow issues."
            description="The failure modes that most often break an n8n workflow in production."
            notes={COMMON_ISSUES}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Structural problems surfaced before a workflow silently fails at 3am — without pasting automation JSON into a stranger's server."
      faqs={FAQS}
      faqTitle="n8n Workflow Validator FAQ."
    >
      <N8nValidator />
    </ToolPage>
  );
}
