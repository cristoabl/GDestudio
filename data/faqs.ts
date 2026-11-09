export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
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

/** FAQPage structured data. Only render it on pages where these questions are visible. */
export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
