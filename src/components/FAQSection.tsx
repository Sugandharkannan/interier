"use client";

import { useState } from "react";
import { faqs } from "@/utils/mockData";
import { useAudio } from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { playClick, playHover } = useAudio();

  const handleToggle = (idx: number) => {
    playClick();
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-24 bg-bg-card border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-3 font-mono">
            Information
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIdx === index;
            return (
              <div
                key={index}
                className="glassmorphism rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                {/* Collapsible Trigger Head */}
                <button
                  onClick={() => handleToggle(index)}
                  onMouseEnter={playHover}
                  className="w-full flex justify-between items-center p-6 text-left cursor-pointer transition-colors hover:text-primary"
                >
                  <span className="font-serif text-sm md:text-base text-white font-medium">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 185 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary p-1 bg-white/5 rounded-full"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                {/* Collapsible Panel Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-text-secondary leading-relaxed font-light border-t border-white/3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
