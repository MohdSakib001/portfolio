import {
  Activity,
  ArrowLeftRight,
  Gauge,
  Ruler,
  Scale,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import BmiCalculator from "./BmiCalculator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Metric And Imperial",
    description: "Enter centimetres and kilograms or feet, inches, and pounds.",
    icon: Scale,
  },
  {
    title: "Instant Result",
    description: "BMI recalculates as you type — no submit step in the way.",
    icon: Ruler,
  },
  {
    title: "Visual Scale",
    description:
      "See where your result sits across the full range, not just a bare number.",
    icon: Gauge,
  },
  {
    title: "WHO Categories",
    description:
      "Classified against the standard ranges health agencies actually use.",
    icon: ArrowLeftRight,
  },
  {
    title: "Healthy Weight Range",
    description:
      "Shows the weight span that would place you in the healthy band.",
    icon: Activity,
  },
  {
    title: "Nothing Stored",
    description:
      "Height and weight stay in the browser — no account, no logging.",
    icon: ShieldCheck,
  },
];

const BMI_CATEGORIES: (string | number)[][] = [
  [
    "Underweight",
    "< 18.5",
    "Malnutrition, weakened immunity, bone density loss",
  ],
  [
    "Normal weight",
    "18.5 – 24.9",
    "Lowest risk for weight-related health problems",
  ],
  [
    "Overweight",
    "25 – 29.9",
    "Elevated risk for hypertension, type 2 diabetes",
  ],
  [
    "Obese (Class I)",
    "30 – 34.9",
    "High risk for cardiovascular disease, sleep apnea",
  ],
  [
    "Obese (Class II)",
    "35 – 39.9",
    "Very high risk — consult a healthcare provider",
  ],
  [
    "Obese (Class III)",
    "≥ 40",
    "Extremely high risk — medical intervention recommended",
  ],
];

export default function BmiCalculatorPage() {
  return (
    <ToolPage
      id="bmi-calculator"
      heading="BMI Calculator."
      intro="Enter your height and weight to get your Body Mass Index on a visual health scale."
      explainer={{
        heading: "What is Body Mass Index?",
        paragraphs: [
          "Body Mass Index is a widely used screening metric that relates a person's body weight to their height. Developed by Belgian mathematician Adolphe Quetelet in the 19th century, it provides a quick, costless way to categorise weight status across large populations. Doctors and public health agencies use it as the first filter when assessing weight-related health risks.",
          "While BMI is a useful starting point, it has known limitations — it doesn't directly measure body fat percentage or account for muscle mass, bone density, age, sex, or ethnic differences in body composition. Always interpret BMI results in the context of a full health assessment.",
        ],
      }}
      extra={
        <>
          <ToolTable
            heading="BMI categories."
            description="The World Health Organization ranges used to classify an adult BMI result."
            columns={["Category", "BMI range", "Associated risk"]}
            rows={BMI_CATEGORIES}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="A screening number you can actually read — both unit systems, the WHO category, and where you sit on the scale."
      faqs={FAQS}
      faqTitle="BMI Calculator FAQ."
    >
      <BmiCalculator />
    </ToolPage>
  );
}
