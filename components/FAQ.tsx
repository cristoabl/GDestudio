"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { homeFaqs as faqs } from "@/data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-marfil border-t border-linea">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-baseline justify-center gap-4 mb-4">
            <span className="text-sm tracking-[0.25em] text-bronce">05</span>
            <h2 className="eyebrow">Preguntas Frecuentes</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-medium text-tierra mb-6">
            Arquitectura &amp; diseño comercial
          </h3>
          <p className="text-texto-suave text-lg text-balance font-light leading-relaxed">
            Respondemos tus dudas sobre la creación de locales comerciales exitosos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-linea bg-crudo hover:border-arena transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-tierra focus:outline-none cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-normal pr-4">{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-bronce shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-texto-suave leading-relaxed font-light text-base text-balance border-t border-linea pt-4">
                        {faq.answer}
                      </p>
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
