"use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

// Definimos un tipo estricto para las pestañas y evitar el uso de 'any'
type TabType = "conocela" | "entrenamiento" | "resultados";

interface TabItem {
  id: TabType;
  label: string;
}

export const HireSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("conocela");

  const content = {
    conocela: {
      title: "Intervenciones Estratégicas de Dirección",
      desc: "Con amplia experiencia en reestructuración corporativa en América Latina, diseñamos marcos de trabajo ejecutables que remueven al fundador de la operación diaria y estabilizan los márgenes financieros de forma predecible.",
      cta: "Llevar la firma a tu empresa",
    },
    entrenamiento: {
      title: "Sistemas de Capacitación Ejecutiva",
      desc: "Entrenamos a tus mandos medios y equipos comerciales bajo metodologías de prospección B2B de alto valor y control de flujos de caja operativos de forma completamente orgánica y escalable.",
      cta: "Solicitar propuesta formativa",
    },
    resultados: {
      title: "Auditorías de Rentabilidad Medibles",
      desc: "No generamos reportes teóricos generalistas de estilo informático. Fijamos objetivos financieros claros trimestrales (OKRs) y auditamos fugas operativas con impacto directo en el balance patrimonial.",
      cta: "Ver metodología de auditoría",
    },
  };

  const tabs: TabItem[] = [
    { id: "conocela", label: "01. Conócenos" },
    { id: "entrenamiento", label: "02. ¿En qué entrenarte?" },
    { id: "resultados", label: "03. Resultados del Proceso" },
  ];

  return (
    <div className="w-full bg-brand-card border border-custom/60 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-gold/30">
      {/* CABECERA DE PESTAÑAS (TABS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-custom/60 font-mono text-[9px] uppercase tracking-widest">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} // Asignación directa y tipada sin 'any'
            className={`py-4 px-6 text-center border-b md:border-b-0 md:border-r border-custom/60 transition-all duration-500 ease-out cursor-pointer text-[9px] font-medium tracking-widest uppercase relative overflow-hidden ${
              activeTab === tab.id
                ? "bg-brand-gold/5 text-brand-gold font-semibold"
                : "text-text-muted hover:text-text-main hover:bg-brand-bg/20 bg-brand-card/30"
            }`}
          >
            {tab.label}
            {/* Indicador de pestaña activa con línea inferior elegante */}
            <span
              className={`absolute bottom-0 left-0 w-full h-px bg-brand-gold transition-transform duration-500 ease-out ${activeTab === tab.id ? "translate-x-0" : "-translate-x-full"}`}
            />
          </button>
        ))}
      </div>

      {/* CONTENIDO DINÁMICO CON TRANSICIÓN DE HARDWARE NATIVA (Adiós useEffect y sub-estados síncronos) */}
      <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-card/20 relative min-h-85 md:min-h-70">
        {/* Renderizado condicional limpio que gatilla la animación 'animate-fade-in' de Tailwind automáticamente al mutar el DOM */}
        {tabs.map((tab) => {
          if (tab.id !== activeTab) return null;
          return (
            <div
              key={tab.id}
              className="lg:col-span-7 space-y-6 animate-fade-in animate-duration-300 transform motion-reduce:transition-none"
            >
              <h3 className="text-2xl md:text-3xl font-editorial text-text-main tracking-wide leading-tight">
                {content[tab.id].title}
              </h3>
              <p className="text-xs text-text-muted font-light leading-relaxed max-w-xl">
                {content[tab.id].desc}
              </p>
              <button className="px-6 py-3.5 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main hover:text-brand-bg transition-all duration-500 transform translate-y-0 hover:-translate-y-0.5 shadow-md  cursor-pointer font-sans">
                {content[tab.id].cta}
              </button>
            </div>
          );
        })}

        {/* VISTA GRÁFICA SIMULADA ADAPTATIVA */}
        <div className="lg:col-span-5 bg-brand-bg border border-custom/60 aspect-video rounded-md flex flex-col items-center justify-center text-brand-gold-muted font-mono text-[9px] uppercase tracking-widest relative p-6 bg-[linear-gradient(to_right,var(--color-border-custom)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-custom)_1px,transparent_1px)] bg-size-[30px_30px] transition-all duration-700 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-brand-gold/5 via-transparent to-transparent pointer-events-none opacity-60" />
          <ShieldCheck
            size={22}
            className="text-brand-gold mb-3 animate-pulse relative z-10"
          />
          <span className="text-center relative z-10 font-medium tracking-widest text-[9px]">
            Estructura Corporativa Validada
          </span>
        </div>
      </div>
    </div>
  );
};
