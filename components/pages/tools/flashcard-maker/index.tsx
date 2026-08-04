import {
  BookOpen,
  Layers,
  ListChecks,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import FlashcardMaker from "./FlashcardMaker";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Build A Deck",
    description: "Add as many question and answer pairs as your topic needs.",
    icon: BookOpen,
  },
  {
    title: "3D Card Flip",
    description:
      "Cards flip to reveal the answer, keeping recall active rather than passive.",
    icon: Layers,
  },
  {
    title: "Shuffle Mode",
    description: "Randomise order so you learn the material, not the sequence.",
    icon: RefreshCw,
  },
  {
    title: "Progress Tracking",
    description: "Mark what you know and focus repetition on what you do not.",
    icon: ListChecks,
  },
  {
    title: "Saved Locally",
    description:
      "Decks persist in your browser between sessions without an account.",
    icon: Save,
  },
  {
    title: "Fully Private",
    description: "Your study material is never uploaded or shared.",
    icon: ShieldCheck,
  },
];

const THE_SCIENCE: { title: string; body: string }[] = [
  {
    title: "Active Recall",
    body: "Forcing your brain to retrieve information — rather than passively re-reading it — creates much stronger memory traces. Each time you flip a card and produce the answer yourself, you strengthen that neural pathway.",
  },
  {
    title: "Spaced Repetition",
    body: "Reviewing material at increasing intervals exploits the psychological spacing effect. Cards you mark 'Review again' should be revisited sooner, while well-known cards can be spaced further apart to maintain them with less effort.",
  },
  {
    title: "Immediate Feedback",
    body: "Flashcards give you instant confirmation of whether your recall was accurate. This tight feedback loop accelerates learning compared to methods where errors go uncorrected for long periods.",
  },
  {
    title: "Chunking Information",
    body: "Breaking a large subject into discrete term–definition pairs makes each piece of knowledge more manageable and easier to slot into long-term memory.",
  },
  {
    title: "Interleaving",
    body: "Shuffling your deck so related topics don't always appear together trains your brain to discriminate between concepts — a more demanding but far more effective practice than blocked repetition.",
  },
  {
    title: "Metacognitive Awareness",
    body: "Marking each card 'Know it' or 'Review again' forces you to honestly assess your own knowledge, which is a skill (metacognition) that improves academic outcomes across all subjects.",
  },
];

export default function FlashcardMakerPage() {
  return (
    <ToolPage
      id="flashcard-maker"
      heading="Flashcard Maker."
      intro="Create a deck, flip cards with a 3D animation, and track what you know — no account, no install."
      extra={
        <>
          <ToolNotes
            heading="Why flashcards work."
            description="The learning research behind active recall and spaced repetition."
            notes={THE_SCIENCE}
            numbered
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Active recall without a subscription — build a deck, study it, and keep it on your own device."
      faqs={FAQS}
      faqTitle="Flashcard Maker FAQ."
    >
      <FlashcardMaker />
    </ToolPage>
  );
}
