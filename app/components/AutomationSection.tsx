"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { Globe, RefreshCw, Filter, BarChart2 } from "lucide-react";

const WorkflowViewer = dynamic(() => import("./WorkflowViewer"), { ssr: false });

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
    tags: ["Gmail Polling", "LLM Classification", "Telegram API", "Human-in-loop"],
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
    <section className="bg-[#050505] text-white py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-t border-white/5">

      {/* Header */}
      <div className="max-w-400 mx-auto mb-14">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 font-medium">
            Live Architecture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              38-Node Production Pipeline.
            </h2>
            <p className="mt-3 text-white/40 text-sm max-w-lg leading-relaxed">
              One autonomous system, four distinct layers. The same workflow
              powering Krapton&apos;s client acquisition — explore each phase below.
            </p>
          </div>

          {/* Node count badge */}
          {nodeCount !== null && (
            <div className="shrink-0 flex items-center gap-2 border border-white/8 rounded-full px-4 py-2 self-start lg:self-auto">
              <span className="text-xs text-white/25 font-mono">{nodeCount} nodes</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-xs text-white/25 font-mono">4 phases</span>
            </div>
          )}
        </div>
      </div>

      {/* Phase tabs */}
      <div className="max-w-400 mx-auto mb-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max sm:min-w-0 bg-white/3 border border-white/6 rounded-xl p-1">
          {WORKFLOWS.map((wf, i) => {
            const TabIcon = wf.icon;
            const isActive = active === i;
            return (
              <button
                key={wf.phase}
                onClick={() => handleTab(i)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-white/35 hover:text-white/65 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`font-mono text-[9px] ${isActive ? "text-black/40" : "text-white/20"}`}
                >
                  {wf.phase}
                </span>
                <TabIcon size={11} />
                {wf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Viewer */}
      <div className="max-w-400 mx-auto">
        <div className="rounded-2xl overflow-hidden h-115 lg:h-135 border border-white/7 bg-[#0a0a0a]">
          <WorkflowViewer
            key={active}
            filename={w.file}
            focusNodeNames={w.focusNodeNames}
            onLoad={handleLoad}
          />
        </div>

        {/* Bottom strip */}
        <div className="flex items-start justify-between mt-5 gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={12} className="text-white/30" />
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
                Phase {w.phase} — {w.label}
              </span>
            </div>
            <p className="text-[12px] text-white/45 leading-relaxed max-w-2xl">
              {w.description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {w.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white/3 border border-white/7 rounded-full text-[10px] text-white/30 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-right pt-1">
            <p className="text-[10px] text-white/20 font-mono">{w.stat}</p>
            <p className="text-[9px] text-white/12 mt-1 italic hidden sm:block">
              drag · zoom ±
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
