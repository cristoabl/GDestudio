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

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "439383c6-3887-4cbd-9a5c-991267dae2b9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Hubo un error al enviar tu mensaje.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo conectar con el servidor.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-noche">
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
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-sm tracking-[0.25em] text-arena-suave">06</span>
                <h2 className="eyebrow-dark">Contacto</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-medium text-crudo mb-6 text-balance">
                Empecemos tu proyecto
              </h3>
              <p className="text-arena-suave font-light text-lg mb-10 leading-relaxed text-balance">
                Cada gran espacio comienza con una conversación. Contame sobre tu marca, tus objetivos y los desafíos de tu próximo proyecto.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:contacto@gdestudio.com.ar"
                  className="group flex items-center gap-4 p-4 border border-crudo/15 hover:border-arena/50 transition-all"
                >
                  <div className="w-12 h-12 border border-arena/40 text-arena flex items-center justify-center group-hover:bg-crudo group-hover:border-crudo group-hover:text-noche transition-colors">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-1">Email</span>
                    <span className="text-crudo font-light group-hover:text-arena transition-colors">contacto@gdestudio.com.ar</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/5493512139252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-crudo/15 hover:border-arena/50 transition-all"
                >
                  <div className="w-12 h-12 border border-arena/40 text-arena flex items-center justify-center group-hover:bg-crudo group-hover:border-crudo group-hover:text-noche transition-colors">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-1">WhatsApp Directo</span>
                    <span className="text-crudo font-light">+54 9 351 213-9252</span>
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
              className="border border-crudo/15 p-8 relative"
            >
              {status === "success" ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-noche/95 backdrop-blur-sm z-10 p-8 text-center border border-arena/30">
                  <div className="w-16 h-16 bg-crudo flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-noche" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-medium text-crudo mb-2">¡Mensaje enviado!</h4>
                  <p className="text-arena-suave font-light">Gracias por contactarte. Te responderé a la brevedad.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2.5 border border-arena/50 text-xs uppercase tracking-[0.2em] text-crudo hover:bg-crudo hover:text-noche transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : null}

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="Nuevo contacto desde tu Portfolio Web" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div>
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-2">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-transparent border-b border-crudo/25 px-0 py-3 text-crudo font-light placeholder:text-crudo/30 focus:outline-none focus:border-arena transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-transparent border-b border-crudo/25 px-0 py-3 text-crudo font-light placeholder:text-crudo/30 focus:outline-none focus:border-arena transition-colors"
                      placeholder="nombre@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-2">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-b border-crudo/25 px-0 py-3 text-crudo font-light placeholder:text-crudo/30 focus:outline-none focus:border-arena transition-colors"
                      placeholder="+54 9..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tipo_proyecto" className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-2">¿Qué necesitás?</label>
                  <select
                    id="tipo_proyecto"
                    name="tipo_proyecto"
                    required
                    defaultValue=""
                    className="w-full bg-transparent border-b border-crudo/25 px-0 py-3 text-crudo font-light focus:outline-none focus:border-arena transition-colors appearance-none cursor-pointer invalid:text-crudo/30"
                  >
                    <option value="" disabled className="bg-noche text-crudo/50">Seleccioná una opción</option>
                    <option value="Local nuevo" className="bg-noche text-crudo">Local nuevo</option>
                    <option value="Remodelación" className="bg-noche text-crudo">Remodelación</option>
                    <option value="Visualización 3D / Renders" className="bg-noche text-crudo">Visualización 3D / Renders</option>
                    <option value="Legajo técnico" className="bg-noche text-crudo">Legajo técnico</option>
                    <option value="Otro" className="bg-noche text-crudo">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.25em] text-arena-suave mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-crudo/25 px-0 py-3 text-crudo font-light placeholder:text-crudo/30 focus:outline-none focus:border-arena transition-colors resize-none"
                    placeholder="Contame sobre tu proyecto..."
                    required
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-arena text-sm mt-2">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 w-full bg-crudo text-noche font-normal py-4 hover:bg-arena transition-colors uppercase tracking-[0.25em] text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
