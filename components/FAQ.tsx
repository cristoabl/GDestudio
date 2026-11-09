import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { homeFaqs as faqs } from "@/data/faqs";

// Native details/summary keeps the answers in the server HTML for search engines.
export default function FAQ() {
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
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border border-linea bg-crudo hover:border-arena transition-colors duration-300"
            >
              <summary className="w-full px-6 py-5 flex justify-between items-center text-left text-tierra cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-lg md:text-xl font-normal pr-4">{faq.question}</span>
                <ChevronDownIcon className="w-5 h-5 text-bronce shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-texto-suave leading-relaxed font-light text-base text-balance border-t border-linea pt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
