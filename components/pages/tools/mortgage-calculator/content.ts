import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "How is the monthly mortgage payment calculated?",
    answer:
      "The standard formula is: M = P[r(1+r)^n] / [(1+r)^n − 1], where P is the principal (loan amount minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). This is the fixed monthly payment for a fixed-rate mortgage.",
  },
  {
    question: "What is amortization?",
    answer:
      "Amortization is the process of paying off a loan through regular scheduled payments. Each payment covers both principal and interest. Early in the loan, most of the payment goes toward interest. As the balance decreases, more goes to principal. This tool generates the full amortization schedule showing this split for every month.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer:
      "A 30-year mortgage has lower monthly payments but significantly higher total interest paid. A 15-year mortgage costs less overall and builds equity faster, but requires higher monthly payments. The right choice depends on your monthly budget, how long you plan to stay in the home, and your other financial goals.",
  },
  {
    question: "What is a down payment?",
    answer:
      "A down payment is the upfront cash you pay toward the home's purchase price. The rest is financed through the mortgage. A 20% down payment is conventional — it typically avoids Private Mortgage Insurance (PMI) which adds to your monthly cost. Some loans allow as little as 3–5% down.",
  },
  {
    question: "Does this calculator include property taxes and insurance?",
    answer:
      "No. This calculator shows principal and interest only. Your actual monthly payment to the lender will also include property taxes and homeowners insurance (and possibly PMI), which are typically held in an escrow account. Add 20–30% to the calculated payment as a rough estimate of total housing costs.",
  },
  {
    question: "What is a good interest rate for a mortgage?",
    answer:
      "Mortgage rates vary by country, economic conditions, loan type, credit score, and down payment. In the US, 30-year fixed rates have historically ranged from 3% to 8%+. Check current rates from multiple lenders and compare the APR (annual percentage rate), which includes fees, for a fair comparison.",
  },
];
