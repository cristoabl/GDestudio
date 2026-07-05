"use client";

import { motion, Variants } from "framer-motion";

// PLACEHOLDERS — reemplazar con testimonios reales de clientes antes de publicar.
const testimonials = [
  {
    quote:
      "El local quedó exactamente como lo vimos en los renders. La documentación técnica hizo que la obra avanzara sin sorpresas ni sobrecostos.",
    company: "Rústico",
  },
  {
    quote:
      "Entendió nuestra marca desde la primera reunión. El diseño no solo quedó impecable: se nota en las ventas desde la apertura.",
    company: "Zhoue",
  },
];

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-marfil border-t border-linea">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="eyebrow mb-4 block">Testimonios</h2>
            <h3 className="text-4xl md:text-5xl font-medium text-tierra">
              Lo que dicen los clientes
            </h3>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              variants={itemVariants}
              className="p-8 lg:p-12 bg-crudo border border-linea flex flex-col justify-between"
            >
              <p className="text-lg md:text-xl text-texto font-light leading-relaxed mb-8 text-balance">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="border-t border-linea pt-6">
                <span className="block text-bronce text-xs font-normal uppercase tracking-[0.3em]">{testimonial.company}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
