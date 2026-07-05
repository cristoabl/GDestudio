# GD Estudio — gdestudio.com.ar

Sitio web de GD Estudio, estudio de arquitectura comercial y diseño de locales en Córdoba, Argentina. Construido con [Next.js](https://nextjs.org) (App Router), Tailwind CSS v4 y Framer Motion.

## Identidad de marca

El diseño implementa el **Manual de Marca GD · 2026** (`Manual de Marca GD.dc.html`):

| Color | Hex | Uso |
| --- | --- | --- |
| Noche | `#2E2620` | Fondos oscuros, footer |
| Tierra | `#4A3F30` | Logo y titulares en claro |
| Bronce | `#8A7355` | Acentos, subtítulos, enlaces |
| Arena | `#C8B99F` | Detalles sobre fondo oscuro |
| Crudo | `#EDE5DA` | Fondo principal de la marca |

- **Tipografía:** Jost (Google Fonts), única familia — 500 titulares, 400 subtítulos, 300 cuerpo.
- **Reglas:** etiquetas en mayúsculas con tracking amplio; Crudo domina (~70%), Tierra/Noche estructuran (~25%), Bronce acentúa (~5%); texto sobre foto solo con velo Noche al 40–60%.

Los tokens de color viven en `app/globals.css` (`@theme`) y se usan como clases Tailwind (`bg-noche`, `text-bronce`, `border-linea`, etc.).

## Desarrollo

```bash
npm install
npm run dev     # servidor de desarrollo en http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # ESLint
```

## Estructura

- `app/` — layout (fuente, metadata, JSON-LD), home, páginas de proyecto (`/proyecto/[slug]`), sitemap y robots.
- `components/` — secciones de la home, navbar, footer, galería con lightbox, carrusel WebGL del hero.
- `data/projects.ts` — contenido del portfolio (proyectos, imágenes, fichas técnicas).
- `public/` — imágenes optimizadas (webp), favicon y OG images generados con la identidad de marca.
