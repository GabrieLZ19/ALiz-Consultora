"use client";

import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { BookOpen, Star, ArrowUpRight } from "lucide-react";

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-text-main pt-12 pb-24 px-6 transition-colors  animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* INTRODUCCIÓN INSTITUCIONAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-mono block mb-2 font-semibold">
              Catálogo Exclusivo
            </span>
            <h1 className="text-3xl md:text-5xl font-editorial text-text-main tracking-wide leading-tight">
              Sistemas de Gestión &{" "}
              <span className="italic text-brand-gold font-light">
                Publicaciones
              </span>
            </h1>
          </div>
          <div className="lg:col-span-7 text-sm font-light text-text-muted leading-relaxed lg:pt-6">
            Adquiere herramientas corporativas avanzadas, modelos financieros
            automatizados y material didáctico editado bajo rigurosos criterios
            profesionales de rendimiento táctico.
          </div>
        </div>

        {/* REJILLA DE PRODUCTOS ADAPTATIVA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {MOCK_PRODUCTS.map((prod) => (
            <Link
              key={prod.id}
              href={`/productos/${prod.slug}`}
              className="bg-brand-card border border-custom/60 p-6 rounded-sm flex flex-col justify-between hover:border-brand-gold/40 transition-all duration-300 group translate-y-0 hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-6">
                {/* Imagen Mock con Gradiente Adaptativo */}
                <div className="bg-brand-bg border border-custom/40 aspect-4/3 rounded-xs flex flex-col items-center justify-center p-6 relative font-mono text-[9px] text-brand-gold-muted uppercase tracking-widest text-center overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-linear-to-br from-brand-gold/5 via-transparent to-brand-gold/5 opacity-60 pointer-events-none" />
                  <BookOpen
                    size={24}
                    className="text-brand-gold mb-3 opacity-80 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="relative z-10 px-4 font-editorial text-xs text-text-main normal-case font-medium">
                    {prod.title}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                    <span className="text-[9px] text-text-muted font-mono ml-2">
                      (4.9)
                    </span>
                  </div>
                  <h3 className="text-lg font-editorial text-text-main tracking-wide group-hover:text-brand-gold transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-custom/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-gold-muted uppercase tracking-widest font-mono">
                    Inversión
                  </span>
                  <span className="text-lg font-mono text-text-main font-semibold tracking-tight">
                    {prod.price}
                  </span>
                </div>
                <div className="p-2.5 bg-brand-gold text-brand-bg rounded-full group-hover:bg-text-main transition-colors duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
