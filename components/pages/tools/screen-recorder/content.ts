import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Does this screen recorder require an extension or download?",
    answer:
      "No. It uses the browser's built-in Screen Capture API (getDisplayMedia). Nothing is installed — just click the record button and grant permission when the browser asks.",
  },
  {
    question: "What can I record — full screen, a window, or a browser tab?",
    answer:
      "All three. When you click the record button, the browser shows its own native screen picker where you can choose an entire monitor, a specific application window, or a single browser tab.",
  },
  {
    question: "What format is the recording saved in?",
    answer:
      "WebM with VP9 video codec, which is the format natively produced by the MediaRecorder API in Chromium and Firefox. It is widely supported for playback and can be converted to MP4 with tools like FFmpeg or Handbrake.",
  },
  {
    question: "Can I record audio along with the screen?",
    answer:
      "Yes. You can enable System Audio (captures what is playing through your speakers, subject to OS support) and/or Microphone independently before starting. Chrome supports both; Firefox has partial system audio support.",
  },
  {
    question: "Why doesn't Safari support screen recording?",
    answer:
      "Safari does not implement the getDisplayMedia API that browser-based screen recorders rely on. Apple has not yet shipped this API in Safari. Use Chrome, Edge, or Firefox instead.",
  },
  {
    question: "Is my recorded video stored on your servers?",
    answer:
      "Never. The entire recording stays in your browser's memory as a Blob object. When you click Download, the file goes straight to your device. There are no servers involved — not even for analytics on this tool.",
  },
];
