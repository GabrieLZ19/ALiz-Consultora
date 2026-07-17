"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProductCarousel } from "@/components/features/ProductCarousel";
import { HireSection } from "@/components/features/HireSection";
import { MOCK_TESTIMONIALS } from "@/lib/mockData";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ==========================================================================
   COMPONENTE DE ANIMACIÓN AL HACER SCROLL (ENTRY / EXIT)
   ========================================================================== */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-8";
      case "down":
        return "-translate-y-8";
      case "left":
        return "translate-x-8";
      case "right":
        return "-translate-x-8";
      case "scale":
        return "scale-95";
      default:
        return "translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 standard-bezier ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : `opacity-0 ${getDirectionClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-brand-bg text-text-main transition-colors duration-700 ease-out">
      {/* ==========================================================================
         SECCIÓN 1: HERO EDITORIAL CON RETRATO DE DIRECCIÓN
         ========================================================================== */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-28 border-b border-custom/60 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="up" className="lg:col-span-8 space-y-8">
            <span className="inline-block px-4 py-1.5 border border-brand-gold/20 rounded-full text-[9px] text-brand-gold uppercase tracking-[0.25em] font-semibold bg-brand-card/40 backdrop-blur-sm shadow-sm transition-colors duration-500 hover:bg-brand-gold/5 cursor-default">
              Firma de Alta Dirección
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-editorial tracking-wide leading-[1.1]">
              Estrategia{" "}
              <span className="italic text-brand-gold font-light transition-all duration-700 hover:tracking-wide">
                boutique
              </span>{" "}
              para negocios que no se conforman.
            </h1>
          </ScrollReveal>

          {/* Retrato Ejecutivo Real desde Unsplash */}
          <ScrollReveal
            direction="left"
            delay={200}
            className="lg:col-span-4 hidden lg:block border border-custom/60 aspect-4/55] rounded-lg p-3 shadow-2xl relative overflow-hidden group bg-brand-card transition-colors duration-700 hover:border-brand-gold/40"
          >
            <div className="w-full h-full relative rounded-md overflow-hidden bg-brand-bg">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Alejandra Liz"
                className="w-full h-full object-cover filter grayscale contrast-[1.15] group-hover:scale-[1.03] group-hover:grayscale-[0.3] transition-all duration-1000 standard-bezier"
                width={400}
                height={500}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-card via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-16 border-t border-custom/40 mt-16 text-text-muted">
          <ScrollReveal
            delay={100}
            className="lg:col-span-3 border-l border-brand-gold/40 pl-4 space-y-2 text-[11px] uppercase tracking-wider"
          >
            <span className="text-[9px] text-brand-gold font-mono block font-bold tracking-widest">
              Índice
            </span>
            <p className="hover:text-text-main transition-colors duration-500 cursor-default">
              01. Manifiesto Corporativo
            </p>
            <p className="hover:text-text-main transition-colors duration-500 cursor-default">
              02. Soluciones Directivas
            </p>
            <p className="hover:text-text-main transition-colors duration-500 cursor-default">
              03. Librería Comercial
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={200}
            className="lg:col-span-5 text-sm font-light leading-relaxed"
          >
            ALiz reordena la arquitectura operativa y financiera de tu empresa.
            Consolidamos flujos de caja y manuales organizativos que permiten a
            fundadores expandir su visión de mercado de forma autónoma.
          </ScrollReveal>

          <ScrollReveal delay={300} className="lg:col-span-4 flex items-end">
            <a href="#contacto">
              <button className="px-6 py-4 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded-md hover:bg-text-main transition-all duration-1000 transform translate-y-0 hover:-translate-y-0.5 shadow-lg hover:shadow-brand-gold/20 cursor-pointer">
                Agendar Sesión de Diagnóstico
              </button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================================================
         SECCIÓN 2: BANNER DE CONVERSIÓN DE ALTA GAMA
         ========================================================================== */}
      <section className="border-b border-custom/60 bg-brand-card/20 py-24 px-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-r from-brand-gold/5 via-transparent to-transparent opacity-40 pointer-events-none transition-opacity duration-1000 group-hover:opacity-80" />
        <ScrollReveal
          direction="scale"
          className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-brand-gold font-mono text-[9px] uppercase tracking-widest font-semibold block">
              Auditoría en 3 Minutos
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial tracking-wide text-text-main">
              Mide tu escalabilidad{" "}
              <span className="italic text-brand-gold font-light">
                internacional
              </span>
            </h2>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              Identifica cuellos de botella organizativos y fugas de flujo
              mediante nuestro algoritmo dinámico de diagnóstico.
            </p>
          </div>
          <Link
            href="/diagnostico"
            className="px-8 py-4 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all duration-700 transform translate-y-0 hover:-translate-y-0.5 hover:shadow-brand-gold/20 flex items-center gap-3 cursor-pointer whitespace-nowrap self-start lg:self-auto group/btn"
          >
            Iniciar diagnóstico
            <ArrowRight
              size={13}
              className="transform translate-x-0 group-hover/btn:translate-x-1.5 transition-transform duration-500 ease-out"
            />
          </Link>
        </ScrollReveal>
      </section>

      {/* ==========================================================================
         SECCIÓN 3: INTERVENCIONES CORPORATIVAS (TABS)
         ========================================================================== */}
      <section
        id="estudio"
        className="max-w-7xl mx-auto px-6 py-28 border-b border-custom/60"
      >
        <ScrollReveal className="space-y-3 mb-16 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-muted font-mono block">
            02. Soluciones In-Company
          </span>
          <h2 className="text-3xl md:text-4xl font-editorial text-text-main">
            Aliz para tu organización.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <HireSection />
        </ScrollReveal>
      </section>

      {/* ==========================================================================
         SECCIÓN 4: CARRUSEL DE INFOPRODUCTOS
         ========================================================================== */}
      <section
        id="productos"
        className="max-w-7xl mx-auto px-6 py-28 border-b border-custom/60"
      >
        <ScrollReveal
          direction="left"
          className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-16"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-muted font-mono block">
              03. Librería Digital & Herramientas
            </span>
            <h2 className="text-3xl md:text-4xl font-editorial text-text-main">
              Recursos clave para tu{" "}
              <span className="italic text-brand-gold font-light">
                transformación
              </span>
              .
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-[10px] uppercase tracking-widest text-brand-gold border-b border-brand-gold/40 pb-1 font-mono flex items-center gap-1.5 hover:text-text-main transition-colors duration-500 font-medium self-start sm:self-auto group/link"
          >
            Catálogo completo
            <ArrowRight
              size={11}
              className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-500"
            />
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={200} direction="up">
          <ProductCarousel />
        </ScrollReveal>
      </section>

      {/* ==========================================================================
         SECCIÓN 5: TESTIMONIOS CON AVATARES REALES
         ========================================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-28 border-b border-custom/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <ScrollReveal className="lg:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-muted font-mono flex items-center gap-2">
              <Quote size={12} className="text-brand-gold" /> Críticas &
              Respaldos
            </span>
            <h2 className="text-3xl font-editorial text-text-main">
              La voz de los directores.
            </h2>
          </ScrollReveal>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_TESTIMONIALS.map((t, index) => (
              <ScrollReveal key={t.id} delay={index * 150} className="h-full">
                <div className="h-full border border-custom/60 p-8 bg-brand-card/40 rounded-lg space-y-6 hover:border-brand-gold/30 hover:bg-brand-card/80 transition-all duration-700 group flex flex-col justify-between shadow-lg hover:shadow-2xl">
                  <p className="text-sm font-editorial italic leading-relaxed text-text-main/90 transition-colors duration-500 group-hover:text-text-main">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-5 border-t border-custom/40 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-custom/60 shadow-md transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={t.avatar}
                        alt={t.author}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 standard-bezier"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-text-main font-semibold uppercase group-hover:text-brand-gold transition-colors duration-500">
                        {t.author}
                      </span>
                      <span className="text-[9px] text-brand-gold-muted font-mono uppercase tracking-widest mt-1">
                        {t.role} — {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
    SECCIÓN FINAL: AGENDAMIENTO DE SESIÓN DE DIAGNÓSTICO
    ========================================================================== */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-28">
        <ScrollReveal className="bg-brand-card/40 border border-custom/60 rounded-2xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full -mr-20 -mt-20" />

          <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div className="space-y-6">
              <span className="text-brand-gold font-mono text-[9px] uppercase tracking-[0.25em] font-semibold">
                Contacto Directo
              </span>
              <h2 className="text-4xl md:text-5xl font-editorial text-text-main leading-tight">
                Agendemos tu sesión <br />
                <span className="italic text-brand-gold font-light">
                  de diagnóstico.
                </span>
              </h2>
              <p className="text-sm text-text-muted font-light leading-relaxed max-w-md">
                Tu primera sesión es el punto de partida para reordenar tu
                estructura corporativa. Completa tus datos y nuestro equipo
                técnico se pondrá en contacto para coordinar la llamada inicial.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 bg-brand-bg/40 p-8 rounded-lg border border-custom/40"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-brand-card border border-custom/60 rounded-sm px-4 py-3 text-xs  placeholder-text-muted/50 focus:border-brand-gold outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Correo corporativo"
                  className="w-full bg-brand-card border border-custom/60 rounded-sm px-4 py-3 text-xs  placeholder-text-muted/50 focus:border-brand-gold outline-none transition-colors"
                />
              </div>
              <textarea
                placeholder="Describe brevemente el desafío principal de tu empresa"
                rows={4}
                className="w-full bg-brand-card border border-custom/60 rounded-sm px-4 py-3 text-xs  placeholder-text-muted/50 focus:border-brand-gold outline-none transition-colors resize-none"
              />
              <button className="w-full py-4 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded-sm hover:bg-text-main transition-all duration-500 shadow-xl cursor-pointer flex items-center justify-center gap-2 group">
                Solicitar agenda
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
