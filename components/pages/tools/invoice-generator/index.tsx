import {
  Coins,
  Eye,
  Percent,
  Printer,
  Receipt,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import InvoiceGenerator from "./InvoiceGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Live Preview",
    description: "The invoice updates as you type, exactly as it will print.",
    icon: Receipt,
  },
  {
    title: "Tax And Discount",
    description: "Apply percentage or fixed adjustments per invoice.",
    icon: Eye,
  },
  {
    title: "Multi-Currency",
    description: "Bill international clients in the currency they expect.",
    icon: Percent,
  },
  {
    title: "Line Items",
    description: "Add as many billable rows as the job requires.",
    icon: Coins,
  },
  {
    title: "Print Or PDF",
    description: "Save to PDF or print directly from the browser in one step.",
    icon: Printer,
  },
  {
    title: "Client Data Stays",
    description: "Nothing about your clients or amounts is uploaded or stored.",
    icon: ShieldCheck,
  },
];

const WHO_ITS_FOR: { title: string; body: string }[] = [
  {
    title: "Freelancers",
    body: "Bill clients after project completion without needing expensive accounting software. Generate a clean PDF invoice in under two minutes.",
  },
  {
    title: "Consultants",
    body: "Create itemized invoices for consulting hours, workshops, or advisory retainers with precise tax and discount control.",
  },
  {
    title: "Small Businesses",
    body: "Issue invoices for products or services with your company branding. Multi-currency support makes it easy for international clients.",
  },
  {
    title: "Agencies & Studios",
    body: "Generate project invoices with multiple line items covering design, development, hosting, and support in one clean document.",
  },
];

export default function InvoiceGeneratorPage() {
  return (
    <ToolPage
      id="invoice-generator"
      heading="Invoice Generator."
      intro="Create professional invoices with a live preview, tax and discount support, and multi-currency — print or save as PDF in one click."
      extra={
        <>
          <ToolNotes
            heading="Who it is for."
            description="Built for people who bill directly and do not need accounting software to do it."
            notes={WHO_ITS_FOR}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="A print-quality invoice without a subscription, an account, or your client list living on someone else's server."
      faqs={FAQS}
      faqTitle="Invoice Generator FAQ."
    >
      <InvoiceGenerator />
    </ToolPage>
  );
}
