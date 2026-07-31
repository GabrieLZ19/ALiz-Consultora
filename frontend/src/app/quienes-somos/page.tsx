"use client";

import Image from "next/image";
import { ShieldCheck, Award, Target, CheckCircle2 } from "lucide-react";

export default function QuienesSomosPage() {
  return (
    <div className="bg-brand-bg text-text-main py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ENCABEZADO Y MANIFIESTO */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-mono font-semibold">
            Nuestra Historia & Postura
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial leading-tight">
            ALiz nació de una convicción simple: <br />
            <span className="italic text-brand-gold font-light">
              el dueño de PYME merece asesoría real.
            </span>
          </h1>
          <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
            En México nos enseñaron que las reglas son para quienes no saben
            cómo saltárselas. En ALiz creemos que sí se puede hacer bien y que
            un negocio ordenado no necesita tenerle miedo a nadie.
          </p>
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-gold font-bold">
              "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
            </span>
          </div>
        </div>

        {/* SOCIOS FUNDADORES - PERFILES CORREGIDOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ALFONSO OLIVARES */}
          <div className="bg-brand-card/40 border border-custom/60 rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 relative overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
                  alt="Alfonso Olivares Saldaña"
                  fill
                  className="object-cover filter grayscale"
                />
              </div>
              <div>
                <h3 className="text-lg font-editorial font-bold text-text-main">
                  Alfonso Olivares Saldaña
                </h3>
                <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
                  Director General
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed font-light">
              Lleva 30 años operando y administrando empresas reales desde
              adentro, no desde un escritorio. Desde los 17 años dirigió una
              empresa de transformación de carne de cerdo. Tras formarse como
              contador, trabajó en manufactura, distribución, alimentos y
              servicios, culminando como responsable de la auditoría interna
              corporativa del tercer grupo mayorista de abarrotes más grande de
              México (237 tiendas en 30 estados).
            </p>
          </div>

          {/* NARCY LIZETH BAÑALES */}
          <div className="bg-brand-card/40 border border-custom/60 rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 relative overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                  alt="Narcy Lizeth Bañales"
                  fill
                  className="object-cover filter grayscale"
                />
              </div>
              <div>
                <h3 className="text-lg font-editorial font-bold text-text-main">
                  Narcy Lizeth Bañales Arellano
                </h3>
                <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
                  Directora de Estrategia y Talento
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed font-light">
              Cuenta con 12 años de trayectoria en Recursos Humanos dentro de
              una empresa de manufactura de alta especialización
              (turbomaquinaria industrial). Formó equipos técnicos, redujo el
              tiempo de onboarding de 6 a 3 meses e implementó metodologías
              ágiles de capacitación que sobreviven sin depender de una sola
              persona.
            </p>
          </div>
        </div>

        {/* VALORES DE CULTURA EMPRESARIAL */}
        <div className="border-t border-custom/60 pt-12 space-y-8">
          <h2 className="text-2xl font-editorial text-center text-text-main">
            Nuestra cultura de trabajo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-brand-card/20 border border-custom/40 rounded-lg space-y-2">
              <ShieldCheck className="text-brand-gold" size={20} />
              <h4 className="text-sm font-semibold text-text-main">
                Sin atajos ni evasión
              </h4>
              <p className="text-xs text-text-muted font-light">
                Estructuramos tu empresa para que funcione en estricto apego a
                la ley, dándote paz mental.
              </p>
            </div>
            <div className="p-6 bg-brand-card/20 border border-custom/40 rounded-lg space-y-2">
              <Target className="text-brand-gold" size={20} />
              <h4 className="text-sm font-semibold text-text-main">
                Herramientas probadas
              </h4>
              <p className="text-xs text-text-muted font-light">
                No vendemos teoría académica; entregamos soluciones e
                indicadores basados en experiencias operativas reales.
              </p>
            </div>
            <div className="p-6 bg-brand-card/20 border border-custom/40 rounded-lg space-y-2">
              <Award className="text-brand-gold" size={20} />
              <h4 className="text-sm font-semibold text-text-main">
                Acompañamiento directivo
              </h4>
              <p className="text-xs text-text-muted font-light">
                Atención directa de expertos para tomar decisiones oportunas con
                estados financieros reales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
