"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { Globe, RefreshCw, Filter, BarChart2 } from "lucide-react";
import GridSection from "./GridSection";
import Container from "./Container";
import BlurContainer from "./BlurContainer";

const WorkflowViewer = dynamic(() => import("./WorkflowViewer"), {
  ssr: false,
});

const WORKFLOWS = [
  {
    phase: "01",
    label: "Outbound Pipeline",
    file: "Krapton_LinkedIn_Outreach_Full_Automation.json",
    icon: Globe,
    focusNodeNames: [
      "Daily 8AM Trigger (Weekdays)",
      "Config & Constants",
      "LinkedIn Navigator Search",
      "Normalize Lead Data",
      "Has Leads?",
      "Read Existing Leads",
      "Deduplicate Leads",
      "Process One by One",
    ],
    description:
      "Zero-touch lead generation. Scrapes LinkedIn, deduplicates against live CRM state, enriches via Hunter.io, and drafts hyper-personalized outreach via Gemini — 10 qualified leads per day, no human input.",
    tags: ["LinkedIn API", "Hunter.io", "Gemini 2.5", "Google Sheets"],
    stat: "10 leads / day",
  },
  {
    phase: "02",
    label: "Follow-up Engine",
    file: "Krapton_LinkedIn_Outreach_Full_Automation.json",
    icon: RefreshCw,
    focusNodeNames: [
      "Daily 9AM Follow-up Trigger",
      "Read All Leads for Follow-up",
      "Filter Leads Due for Follow-up",
      "Any Follow-ups Due?",
      "Process Follow-ups One by One",
      "Gemini — Draft Follow-up",
      "Parse Follow-up Draft",
      "Send Follow-up Email",
    ],
    description:
      "CRON-triggered agents read live database state to identify pending actions. Contextual follow-up sequences are generated from historical interaction data — Day 2 and Day 5 cadence, fully autonomous.",
    tags: ["State Management", "CRON", "Context Window", "Gmail"],
    stat: "Day 2 + Day 5 cadence",
  },
  {
    phase: "03",
    label: "Triage Engine",
    file: "Krapton_LinkedIn_Outreach_Full_Automation.json",
    icon: Filter,
    focusNodeNames: [
      "Gmail — Watch Inbox (Every Minute)",
      "Pre-classify Email",
      "Skip Obvious Spam?",
      "Read Leads for Email Match",
      "Match Email to Known Lead",
      "Gemini — Classify Email",
      "Parse Classification",
      "Route by Category",
    ],
    description:
      "Real-time inbox monitoring polling every minute. LLMs classify intent — positive response, query, or spam — and route each case independently. High-intent replies trigger instant Telegram alerts to admin.",
    tags: [
      "Gmail Polling",
      "LLM Classification",
      "Telegram API",
      "Human-in-loop",
    ],
    stat: "< 60s detection",
  },
  {
    phase: "04",
    label: "Auto Reporting",
    file: "Krapton_LinkedIn_Outreach_Full_Automation.json",
    icon: BarChart2,
    focusNodeNames: [
      "Weekly Report Trigger (Monday 7AM)",
      "Read All Leads for Report",
      "Build Weekly Stats Report",
      "Send Weekly Report via Telegram",
    ],
    description:
      "Scheduled data aggregation pipeline that compiles weekly pipeline metrics — leads sent, follow-ups, reply rates, and regional breakdowns — formatted and dispatched to admin via Telegram every Monday at 7AM.",
    tags: ["Data Aggregation", "Pipeline Metrics", "Telegram", "Monday CRON"],
    stat: "Every Monday 7AM",
  },
];

const capabilities = [
  {
    title: "LLM Integration",
    description:
      "Production pipelines with streaming, tool-calling, and multi-agent orchestration.",
    tags: ["OpenAI", "Claude", "Gemini", "Vercel AI SDK"],
  },
  {
    title: "RAG Systems",
    description:
      "Retrieval pipelines with semantic chunking, re-ranking, and hybrid search.",
    tags: ["LangChain", "pgvector", "Supabase", "Pinecone"],
  },
  {
    title: "Computer Vision",
    description:
      "Real-time detection, pose estimation, OCR — deployed to edge for ultra-low latency.",
    tags: ["PyTorch", "YOLO", "MediaPipe", "ONNX"],
  },
  {
    title: "Fine-Tuning",
    description:
      "LoRA / QLoRA tuning on custom datasets with efficient GPU utilization.",
    tags: ["HuggingFace", "PEFT", "Modal", "Axolotl"],
  },
];

export default function AutomationSection() {
  const [active, setActive] = useState(0);
  const [nodeCount, setNodeCount] = useState<number | null>(null);

  const handleLoad = useCallback((count: number) => setNodeCount(count), []);

  const handleTab = (i: number) => {
    setNodeCount(null);
    setActive(i);
  };

  const w = WORKFLOWS[active];
  const Icon = w.icon;

  return (
    <>
      <Container className="w-full h-full">
        <div className="mb-14 text-center">
          <h2 className="text-heading font-semibold tracking-tight leading-tight">
            38-Node Production Pipeline.
          </h2>
          <p className="mt-3 text-caption text-black/40 max-w-lg leading-relaxed mx-auto">
            One autonomous system, four distinct layers. The same workflow
            powering Krapton&apos;s client acquisition — explore each phase
            below.
          </p>
        </div>

        <div className="max-w-400 mx-auto">
          <div className="inline-flex gap-2 bg-white/3 rounded-xl p-1 mb-6">
            {WORKFLOWS.map((wf, i) => {
              const TabIcon = wf.icon;
              const isActive = active === i;
              return (
                <button
                  key={wf.phase}
                  onClick={() => handleTab(i)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-black bg-white shadow-sm rounded-lg text-label font-medium transition-all duration-200 cursor-pointer whitespace-nowrap`}
                >
                  <TabIcon size={11} />
                  {wf.label}
                </button>
              );
            })}
          </div>

          <div className="bg-violet-300/70 flex z-10 px-4 sm:px-6 md:px-10 lg:px-16 py-24 rounded-4xl gap-x-6 overflow-hidden relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
              style={{
                backgroundImage: `url("/assets/paper-texture.avif")`,
                backgroundSize: "cover",
              }}
            />

            <div className="flex flex-col items-start justify-between mt-5 gap-6 flex-[0.4]">
              <div className="flex-1 min-w-0 flex gap-4 flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={20} />
                  <span className="text-body uppercase tracking-wide">
                    {w.label}
                  </span>
                </div>
                <h2 className="text-title tracking-tighter perf-reveal max-w-[70%]">
                  Built For Speed, Scale & Clean UX.
                </h2>
                <p className="text-body text-black/80 leading-relaxed font-light perf-reveal max-w-[70%]">
                  {w.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {w.tags.map((tag) => (
                  <BlurContainer
                    key={tag}
                    className="rounded-full p-2 text-label"
                  >
                    {tag}
                  </BlurContainer>
                ))}
              </div>
            </div>

            <BlurContainer className=" rounded-4xl overflow-hidden h-115 lg:h-135 flex-[0.6]">
              <WorkflowViewer
                key={active}
                filename={w.file}
                focusNodeNames={w.focusNodeNames}
                onLoad={handleLoad}
              />
            </BlurContainer>
          </div>
        </div>
      </Container>

      <GridSection
        topic="System Design"
        title="Core Capabilities"
        description="I don’t merely build accessible UIs — I instrument, measure, and surgically optimize every millisecond of the execution thread. Realscores. Real impact."
        cards={capabilities}
      />
    </>
  );
}
