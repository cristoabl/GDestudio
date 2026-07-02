export type Project = {
  slug: string;
  name: string;
  location: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  year: string;
  /** Superficie del proyecto, ej: "120 m²". Opcional: completar cuando se tenga el dato. */
  area?: string;
  /** Servicios prestados en el proyecto. */
  services?: string[];
};

export const projects: Project[] = [
  {
    slug: "alma-paz",
    name: "Alma Paz",
    location: "Urca, Córdoba",
    category: "Local Comercial",
    description: "Diseño y desarrollo de espacio comercial de Alma Paz, priorizando un diseño minimalista y cálido que resalta la identidad de la marca.",
    coverImage: "/projects/alma-paz/Img_01_Alma Paz.webp",
    images: [
      "/projects/alma-paz/Img_01_Alma Paz.webp",
      "/projects/alma-paz/Img_02_Alma Paz.webp",
      "/projects/alma-paz/Img_03_Alma Paz.webp",
      "/projects/alma-paz/Img_04_Alma Paz.webp",
      "/projects/alma-paz/Img_06_Alma Paz.webp",
      "/projects/alma-paz/Img_07_Alma Paz.webp"
    ],
    year: "2024",
    services: ["Diseño integral", "Visualización 3D"]
  },
  {
    slug: "arka",
    name: "Arka",
    location: "Nuevocentro Shopping",
    category: "Retail",
    description: "Remodelación de local Arka en Nuevocentro Shopping. Un diseño moderno con exhibición optimizada y recorridos fluidos.",
    coverImage: "/projects/arka/ARKA_Nuevocentro_04.webp",
    images: [
      "/projects/arka/ARKA_Nuevocentro_00.webp",
      "/projects/arka/ARKA_Nuevocentro_01.webp",
      "/projects/arka/ARKA_Nuevocentro_02.webp",
      "/projects/arka/ARKA_Nuevocentro_03.webp",
      "/projects/arka/ARKA_Nuevocentro_04.webp"
    ],
    year: "2023",
    services: ["Remodelación", "Diseño de exhibición"]
  },
  {
    slug: "bacar",
    name: "Bacar",
    location: "Córdoba",
    category: "Taller / Comercial",
    description: "Diseño integral de Taller Bacar, combinando funcionalidad técnica con una estética industrial-contemporánea.",
    coverImage: "/projects/bacar/02-Taller Bacar Interior.webp",
    images: [
      "/projects/bacar/00-Taller Bacar exterior.webp",
      "/projects/bacar/02-Taller Bacar Interior.webp",
      "/projects/bacar/03-Taller Bacar Interior.webp",
      "/projects/bacar/04-Taller Bacar Interior.webp",
      "/projects/bacar/05-Taller Bacar Interior.webp",
      "/projects/bacar/06-Taller Bacar Interior.webp"
    ],
    year: "2024",
    services: ["Diseño integral", "Visualización 3D"]
  },
  {
    slug: "crocco",
    name: "Crocco",
    location: "Valle Escondido",
    category: "Comercial / Retail",
    description: "Espacio comercial Crocco en Valle Escondido, diseñado para maximizar la capacidad de atención con materiales nobles y modernos.",
    coverImage: "/projects/crocco/01_Crocco_Valle.webp",
    images: [
      "/projects/crocco/01_Crocco_Valle.webp",
      "/projects/crocco/02_Crocco_Valle.webp",
      "/projects/crocco/03_Crocco_Valle.webp",
      "/projects/crocco/04_Crocco_Valle.webp",
      "/projects/crocco/05_Crocco_Valle.webp",
      "/projects/crocco/06_Crocco_Valle.webp",
      "/projects/crocco/07_Crocco_Valle.webp"
    ],
    year: "2023",
    services: ["Diseño comercial", "Visualización 3D"]
  },
  {
    slug: "la-dolfina",
    name: "La Dolfina",
    location: "Cba Shopping",
    category: "Retail / Alta Gama",
    description: "Local de La Dolfina en Córdoba Shopping. Elegancia y sofisticación en cada detalle, alineado a los estándares de la marca.",
    coverImage: "/projects/la-dolfina/01-La Dolfina.Cba Shopping.webp",
    images: [
      "/projects/la-dolfina/01-La Dolfina.Cba Shopping.webp",
      "/projects/la-dolfina/02-La Dolfina.Cba Shopping.webp",
      "/projects/la-dolfina/03-La Dolfina.Cba Shopping.webp",
      "/projects/la-dolfina/04-La Dolfina.Cba Shopping.webp",
      "/projects/la-dolfina/01- Meson int.webp",
      "/projects/la-dolfina/02- Meson int.webp",
      "/projects/la-dolfina/03- Meson int.webp",
      "/projects/la-dolfina/04- Meson int.webp"
    ],
    year: "2023",
    services: ["Diseño retail", "Mobiliario a medida"]
  },
  {
    slug: "peusso",
    name: "Peusso",
    location: "Córdoba",
    category: "Showroom",
    description: "Showroom de iluminación y tecnología Peusso. Diseño envolvente para transformar la experiencia de compra en un evento sensorial.",
    coverImage: "/projects/peusso/PEUSSO_04.webp",
    images: [
      "/projects/peusso/PEUSSO_01.webp",
      "/projects/peusso/PEUSSO_02.webp",
      "/projects/peusso/PEUSSO_03.webp",
      "/projects/peusso/PEUSSO_04.webp",
      "/projects/peusso/PEUSSO_05.webp",
      "/projects/peusso/PEUSSO_06.webp",
      "/projects/peusso/PEUSSO_07.webp"
    ],
    year: "2024",
    services: ["Diseño de showroom", "Iluminación estratégica"]
  },
  {
    slug: "zhoue",
    name: "Zhoue",
    location: "Nuevocentro Shopping",
    category: "Retail Indumentaria",
    description: "Local Zhoue en Nuevocentro Shopping. Fachada abierta, exhibición estratégica e iluminación cuidada para destacar los productos.",
    coverImage: "/projects/zhoue/1_Zhoue.webp",
    images: [
      "/projects/zhoue/1_Zhoue.webp",
      "/projects/zhoue/2_Zhoue.webp",
      "/projects/zhoue/3_Zhoue.webp",
      "/projects/zhoue/3a_Zhoue.webp",
      "/projects/zhoue/4_Zhoue.webp",
      "/projects/zhoue/5_Zhoue.webp",
      "/projects/zhoue/6_Zhoue.webp"
    ],
    year: "2023",
    services: ["Diseño retail", "Fachada e iluminación"]
  },
  {
    slug: "rustico-urca",
    name: "Rústico",
    location: "Urca, Córdoba",
    category: "Comercial / Gastronómico",
    description: "Desarrollo de legajo técnico ejecutivo y visualización arquitectónica para el espacio Rústico en Urca. Proyecto donde destacan materiales nobles y un detallado despliegue técnico para su construcción. (Se muestran fragmentos del legajo protegidos por privacidad).",
    coverImage: "/projects/rustico-urca/render-1.webp",
    images: [
      "/projects/rustico-urca/render-1.webp",
      "/projects/rustico-urca/render-2.webp",
      "/projects/rustico-urca/render-3.webp",
      "/projects/rustico-urca/render-4.webp",
      "/projects/rustico-urca/render-5.webp",
      "/projects/rustico-urca/render-6.webp",
      "/projects/rustico-urca/blueprint-1.webp",
      "/projects/rustico-urca/blueprint-2.webp",
      "/projects/rustico-urca/blueprint-3.webp",
      "/projects/rustico-urca/blueprint-4.webp",
      "/projects/rustico-urca/blueprint-5.webp",
      "/projects/rustico-urca/blueprint-6.webp"
    ],
    year: "2024",
    services: ["Legajo técnico ejecutivo", "Visualización 3D"]
  }
];
