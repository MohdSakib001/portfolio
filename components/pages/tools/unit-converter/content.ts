import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How accurate are the conversions?",
    answer:
      "The conversions use precise, internationally defined factors (e.g., 1 international mile = exactly 1609.344 metres; 1 pound = exactly 0.45359237 kg). Results are shown with up to 10 significant figures, with exponential notation for very large or very small values.",
  },
  {
    question: "How is temperature conversion different from other units?",
    answer:
      "Temperature uses offset formulas rather than multiplicative factors. °C to °F = (°C × 9/5) + 32. °C to Kelvin = °C + 273.15. The tool handles this automatically — you don't need to remember the formulas.",
  },
  {
    question: "What's the difference between metric and imperial?",
    answer:
      "The metric (SI) system is based on powers of 10 and is used by most countries worldwide. The imperial system uses non-decimal relationships (12 inches to a foot, 3 feet to a yard, etc.) and is primarily used in the United States.",
  },
  {
    question: "How is data size calculated — binary or decimal?",
    answer:
      "This tool uses binary (IEC) units: 1 KB = 1,024 bytes; 1 MB = 1,048,576 bytes. This matches how operating systems (Windows, macOS, Linux) report file sizes. Note that hard drive manufacturers often use decimal (1 KB = 1,000 bytes), which is why a '1 TB' drive shows as ~931 GB in your OS.",
  },
  {
    question: "What is a nautical mile?",
    answer:
      "A nautical mile (1,852 metres) is based on the circumference of the Earth and equals one minute of latitude. It's used in maritime and aviation navigation because it has a direct relationship to the geographic coordinate system.",
  },
  {
    question: "What is a knot?",
    answer:
      "A knot (kt) is a unit of speed equal to one nautical mile per hour (~1.852 km/h). It's the standard speed unit in maritime and aviation contexts. A vessel travelling at 30 knots covers 30 nautical miles per hour.",
  },
];
