import type { Faq } from "@/data/faqs";

export type Service = {
  slug: string;
  /** Short name used on cards and links. */
  name: string;
  /** Visible H1, written for the search the page should rank for. */
  title: string;
  description: string;
  intro: string[];
  includes: string[];
  idealFor: string[];
  faqs: Faq[];
  projectSlugs: string[];
};

// Copy is based on what the studio already states on the site and its posts.
// Do not add prices, timelines or results that the studio has not confirmed.
export const services: Service[] = [
  {
    slug: "diseno-de-locales-comerciales",
    name: "Diseño Comercial y Retail",
    title: "Diseño de locales comerciales en Córdoba",
    description:
      "Diseño de locales comerciales, retail y showrooms en Córdoba. Servicio llave en mano: relevamiento, renders 3D, legajo técnico y acompañamiento de obra hasta la apertura.",
    intro: [
      "Diseñamos locales comerciales, showrooms y espacios retail en Córdoba pensados para comunicar la identidad de la marca y acompañar la forma en que el negocio vende.",
      "Cada proyecto parte de entender cómo funciona el negocio: qué se vende, cómo se atiende y cómo recorre el espacio el cliente. Con eso definimos la distribución, la exhibición, la iluminación, los materiales y el mobiliario a medida.",
    ],
    includes: [
      "Relevamiento del espacio y análisis de la marca",
      "Zonificación, recorridos y distribución del mobiliario",
      "Diseño interior, fachada e iluminación",
      "Mobiliario y exhibición a medida",
      "Renders 3D fotorrealistas del local terminado",
      "Legajo técnico para presupuestar y construir",
      "Acompañamiento de obra y habilitación municipal hasta la apertura",
    ],
    idealFor: [
      "Marcas que abren su primer local o una nueva sucursal",
      "Locales en shoppings que deben cumplir los estándares de la marca",
      "Showrooms que necesitan exhibir producto y generar una experiencia",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta diseñar un local comercial?",
        answer:
          "Los honorarios se cotizan según el alcance de cada proyecto: la superficie, las etapas que se necesitan (diseño, imágenes 3D, documentación técnica o acompañamiento de obra) y los plazos. Para cotizar nos ayuda conocer el rubro, la zona, la superficie aproximada y fotos del estado actual del espacio.",
      },
      {
        question: "¿Diseñan locales dentro de shoppings?",
        answer:
          "Sí. Desarrollamos locales en centros comerciales de Córdoba, como La Dolfina en Córdoba Shopping y Arka y Zhoue en Nuevocentro Shopping.",
      },
      {
        question: "¿Puedo ver cómo va a quedar el local antes de construirlo?",
        answer:
          "Sí. En el anteproyecto desarrollamos renders fotorrealistas para definir el look & feel, así ves tu local terminado antes de invertir en la obra.",
      },
    ],
    projectSlugs: ["la-dolfina", "zhoue", "arka", "peusso", "alma-paz", "crocco"],
  },
  {
    slug: "remodelacion-de-locales-comerciales",
    name: "Remodelaciones y Refacciones",
    title: "Remodelación de locales comerciales en Córdoba",
    description:
      "Remodelación y refacción de locales comerciales en Córdoba. Optimizamos la distribución y renovamos la imagen del local respetando la identidad de la marca.",
    intro: [
      "Transformamos locales existentes para que vuelvan a funcionar y a vender mejor. Optimizamos la distribución, renovamos la imagen y actualizamos las instalaciones respetando la identidad de la marca.",
      "La propuesta se documenta en detalle para presupuestar con precisión y avanzar en obra con menos imprevistos.",
    ],
    includes: [
      "Relevamiento del estado actual del local",
      "Nueva distribución, recorridos y exhibición",
      "Renovación de imagen: fachada, materiales e iluminación",
      "Renders 3D de la propuesta antes de la obra",
      "Legajo técnico con planos de detalle e instalaciones",
      "Acompañamiento de obra hasta la reapertura",
    ],
    idealFor: [
      "Locales cuya imagen quedó desactualizada",
      "Negocios que necesitan reorganizar la exhibición o la atención",
      "Marcas que renuevan un local para adaptarlo a su identidad actual",
    ],
    faqs: [
      {
        question: "¿Qué necesito para pedir presupuesto de una remodelación?",
        answer:
          "Nos ayuda conocer el rubro, la zona, la superficie aproximada, fotos del estado actual y, si existe, el plano del local. Las medidas y el relevamiento se definen al acordar el alcance.",
      },
      {
        question: "¿Qué incluye la documentación para la obra?",
        answer:
          "El legajo técnico reúne los planos de detalle, electricidad, iluminación, carpintería y sanitarios, listos para presupuestar la obra.",
      },
    ],
    projectSlugs: ["arka", "crocco", "alma-paz"],
  },
  {
    slug: "legajo-tecnico-y-renders-3d",
    name: "Legajo técnico y renders 3D",
    title: "Legajo técnico y renders 3D para locales comerciales",
    description:
      "Renders 3D fotorrealistas y legajos técnicos para locales comerciales en Córdoba: planos de detalle, instalaciones e iluminación listos para presupuestar y construir.",
    intro: [
      "Desarrollamos imágenes 3D fotorrealistas para previsualizar un proyecto, tomar decisiones y presentarlo, y legajos técnicos completos para presupuestar y construir.",
      "Trabajamos con Lumion, SketchUp + V-Ray y Revit, desde la idea conceptual hasta el último plano de obra.",
    ],
    includes: [
      "Renders fotorrealistas de interiores y exteriores",
      "Imágenes para presentaciones comerciales y aprobaciones de marca",
      "Planos de detalle y de carpintería",
      "Instalaciones eléctricas, iluminación y sanitarios",
      "Documentación para licitaciones y construcción",
    ],
    idealFor: [
      "Marcas que necesitan aprobar el diseño antes de construir",
      "Proyectos que necesitan imágenes para presentar o vender una idea",
      "Obras que requieren documentación para pedir presupuestos comparables",
    ],
    faqs: [
      {
        question: "¿Qué es un legajo técnico?",
        answer:
          "Es la documentación ejecutiva de la obra: planos de detalle, electricidad, iluminación, carpintería y sanitarios. Permite presupuestar con precisión y construir lo que se diseñó.",
      },
      {
        question: "¿Hacen solo renders, sin el proyecto completo?",
        answer:
          "Sí. La visualización 3D también se ofrece como servicio independiente, para previsualizar proyectos, vender ideas o preparar presentaciones comerciales.",
      },
    ],
    projectSlugs: ["rustico-urca", "bacar", "alma-paz"],
  },
];
