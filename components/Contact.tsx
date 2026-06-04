"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    // REEMPLAZAR ESTA CLAVE POR LA QUE TE ENVIEN DE WEB3FORMS:
    formData.append("access_key", "439383c6-3887-4cbd-9a5c-991267dae2b9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Hubo un error al enviar tu mensaje.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("No se pudo conectar con el servidor.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3">Contacto</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-6 text-balance">
                Empecemos tu proyecto
              </h3>
              <p className="text-gray-400 font-light text-lg mb-10 leading-relaxed text-balance">
                Cada gran espacio comienza con una conversación. Contame sobre tu marca, tus objetivos y los desafíos de tu próximo proyecto.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:contacto@gdestudio.com.ar"
                  className="group flex items-center gap-4 p-4 border border-white/10 hover:border-white/30 bg-white/5 transition-all"
                >
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none group-hover:bg-white group-hover:text-black transition-colors">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Email</span>
                    <span className="text-white font-medium group-hover:text-gray-300 transition-colors">contacto@gdestudio.com.ar</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/5493512139252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-white/10 hover:border-white/30 bg-white/5 transition-all"
                >
                  <div className="w-12 h-12 bg-[#25D366]/20 text-[#25D366] flex items-center justify-center rounded-none group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp Directo</span>
                    <span className="text-white font-medium">+54 9 351 213-9252</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 p-8 border border-white/10 relative"
            >
              {status === "success" ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 p-8 text-center border border-white/20">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-white mb-2">¡Mensaje Enviado!</h4>
                  <p className="text-gray-400">Gracias por contactarte. Te responderé a la brevedad.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2 border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : null}

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="Nuevo contacto desde tu Portfolio Web" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="nombre@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="+54 9..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Contame sobre tu proyecto..."
                    required
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 w-full bg-white text-black font-medium py-4 hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
