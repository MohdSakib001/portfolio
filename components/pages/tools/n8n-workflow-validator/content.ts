import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is an n8n workflow?",
    answer:
      "An n8n workflow is a visual automation flow made up of nodes connected by edges. Each node represents a step — fetching data from an API, transforming it, sending a notification, writing to a database. The workflow JSON file stores all node definitions and their connection map, and can be imported/exported from the n8n editor.",
  },
  {
    question: "What does 'orphaned node' mean in n8n?",
    answer:
      "An orphaned node is a node that exists in the workflow's nodes array but has no connections to or from any other node. It will never execute during a workflow run. Orphaned nodes usually appear after refactoring — you rewire the main flow but forget to delete an old node. They waste memory and confuse anyone reading the workflow.",
  },
  {
    question: "How do I fix 'ghost target' connection errors?",
    answer:
      "A ghost target error means your connections object references a node name that doesn't exist in your nodes array. This typically happens after renaming a node in the JSON by hand without updating all connection references. Open the JSON, search for the old name in the connections object, and update it to match the new node name exactly (n8n connections are case-sensitive).",
  },
  {
    question: "Can n8n workflows have loops?",
    answer:
      "n8n supports controlled looping via the Loop Over Items node and recursion patterns, but accidental cycles — where node A connects to node B which connects back to node A — cause infinite execution and should be avoided. This validator uses depth-first search to detect any cycle in your node graph and flags it as a warning so you can decide whether it is intentional.",
  },
  {
    question: "Why does my workflow have multiple disconnected subgraphs?",
    answer:
      "Multiple subgraphs usually mean you started building a second branch and never connected it to the main trigger path. The validator counts how many isolated clusters of nodes exist. If the count is greater than one, some nodes will never be reached from the trigger. You either need to connect them or move them to a separate workflow.",
  },
  {
    question: "Does this tool send my workflow JSON to any server?",
    answer:
      "No. All validation runs entirely in your browser using JavaScript. Your workflow JSON never leaves your device and is not stored, logged, or transmitted anywhere. This makes it safe to paste credentials or private API configurations without concern.",
  },
];
