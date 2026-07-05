"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "¿Qué es la arquitectura comercial y por qué es clave para un negocio?",
    answer: "La arquitectura comercial fusiona el diseño de espacios físicos con el marketing, branding y psicología de consumo. Un local comercial bien diseñado no solo atrae clientes visualmente, sino que optimiza los flujos de recorrido y la distribución del mobiliario, impulsando la decisión de compra e incrementando las ventas."
  },
  {
    question: "¿Qué abarca el servicio de diseño de locales comerciales en Córdoba?",
    answer: "Ofrecemos un servicio llave en mano que abarca desde la conceptualización de marca, zonificación de áreas, diseño interior y mobiliario a medida, hasta visualización en 3D (renders fotorrealistas), desarrollo de legajo técnico de obra, iluminación estratégica y el acompañamiento de la obra hasta la apertura."
  },
  {
    question: "¿Qué es el diseño comercial y en qué se diferencia de la arquitectura tradicional?",
    answer: "A diferencia de la arquitectura residencial, el diseño comercial se enfoca en el retorno de la inversión y la interacción de la marca con el cliente. Cada elemento (iluminación, materialidad, fachadas, recorridos) está pensado para comunicar la identidad del negocio y maximizar la rentabilidad del metro cuadrado."
  },
  {
    question: "¿Cómo es el proceso de desarrollo de un proyecto comercial?",
    answer: "Comenzamos con un relevamiento de necesidades y análisis de marca. Luego desarrollamos el anteproyecto conceptual en 3D para definir el look & feel. Tras la aprobación, elaboramos el legajo técnico ejecutivo con todos los planos detallados (electricidad, iluminación, carpintería, sanitarios) listos para presupuestar y construir sin desvíos."
  }
];

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
