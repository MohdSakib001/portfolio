"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqsData } from "@/seo-utils/faqSchema";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 rounded-t-3xl border-t border-white/10" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tight">
          Common Questions.
        </h2>
        
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqsData.map((faq, index) => (
            <div 
              key={index}
              className="border-b gap-4 border-white/20 pb-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-xl md:text-2xl font-light" itemProp="name">{faq.question}</h3>
                <span className="text-2xl ml-4 transform transition-transform duration-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-gray-400 pb-6 text-lg" itemProp="text">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
