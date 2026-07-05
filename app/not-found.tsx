import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | GD Estudio",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-marfil flex flex-col items-center justify-center px-6 text-center">
      {/* Logotipo */}
      <Link href="/" className="flex flex-col items-center gap-2 mb-16" aria-label="GD Estudio — Inicio">
        <span className="text-4xl leading-none font-medium tracking-wide text-tierra">GD</span>
        <span className="text-[11px] font-normal tracking-[0.5em] text-bronce ml-1">ESTUDIO</span>
      </Link>

      <span className="eyebrow mb-6">Error 404</span>
      <h1 className="text-6xl md:text-8xl font-medium text-tierra mb-6">
        Página no encontrada
      </h1>
      <p className="text-texto-suave font-light text-lg max-w-md text-balance leading-relaxed mb-12">
        La página que buscás no existe o fue movida. Como en toda obra, a veces hay que replantear el recorrido.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-10 py-4 bg-noche text-crudo font-normal text-xs uppercase tracking-[0.25em] hover:bg-tierra transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/#portfolio"
          className="px-10 py-4 border border-linea text-tierra font-normal text-xs uppercase tracking-[0.25em] hover:border-bronce hover:text-bronce transition-colors"
        >
          Ver proyectos
        </Link>
      </div>
    </main>
  );
}
