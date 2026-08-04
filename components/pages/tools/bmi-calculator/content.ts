import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is BMI?",
    answer:
      "BMI (Body Mass Index) is a numerical value derived from a person's weight and height. It's calculated as weight (kg) divided by height (m) squared. It's used as a simple screening tool to categorise weight status, though it's not a diagnostic measure of body fatness or health.",
  },
  {
    question: "What is a healthy BMI?",
    answer:
      "For adults, a BMI between 18.5 and 24.9 is considered normal or healthy. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. These ranges are the same for both men and women.",
  },
  {
    question: "Is BMI accurate?",
    answer:
      "BMI is a useful population-level screening tool, but it has limitations for individuals. It doesn't distinguish between fat mass and muscle mass — athletes may have a high BMI despite very low body fat. It also doesn't account for fat distribution, age, or ethnicity. Use it alongside other health indicators.",
  },
  {
    question: "How is the BMI formula calculated?",
    answer:
      "For metric units: BMI = weight in kg ÷ (height in metres)². For imperial: BMI = (weight in pounds × 703) ÷ (height in inches)². Both formulas give the same result when properly converted.",
  },
  {
    question: "Does BMI apply to children?",
    answer:
      "Children and teens use age- and sex-specific BMI percentiles rather than the adult categories. This tool is designed for adults aged 18 and over. For children, please consult a paediatric BMI chart.",
  },
  {
    question: "What is the difference between overweight and obese?",
    answer:
      "Overweight (BMI 25–29.9) means you are above a healthy weight but below the obesity threshold. Obese (BMI 30+) indicates a higher level of excess weight that significantly increases health risks. Both categories benefit from lifestyle changes, but obesity typically warrants medical attention.",
  },
];
