"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  CheckCircle,
  BarChart3,
  Users,
  Loader2,
} from "lucide-react";

export default function DiagnosticoPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStepChange = (newStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(newStep);
      setIsAnimating(false);
    }, 200);
  };

  const handleNext = () => {
    if (step < 3) handleStepChange(step + 1);
    else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2500);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-brand-bg transition-colors duration-700">
        <div className="text-center space-y-6 animate-in zoom-in-95 duration-700 standard-bezier">
          <div className="w-20 h-20 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20">
            <CheckCircle size={32} className="text-brand-gold" />
          </div>
          <h2 className="text-4xl font-editorial text-text-main tracking-wide">
            Auditoría Completada
          </h2>
          <p className="text-sm text-text-muted font-light max-w-sm mx-auto">
            Tu reporte estratégico ha sido procesado. Accede a tu bandeja de
            entrada corporativa para revisar los resultados.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 px-8 py-4 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all"
          >
            Finalizar Auditoría
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-700">
      {/* BARRA DE PROGRESO "EDGE-TO-EDGE" */}
      <div className="h-1.5 w-full bg-brand-bg">
        <div
          className="h-full bg-brand-gold transition-all duration-700 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* HEADER DE NAVEGACIÓN */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted hover:text-brand-gold transition-colors"
        >
          <ArrowLeft size={12} /> Salir
        </Link>
        <span className="text-[9px] text-brand-gold-muted font-mono uppercase tracking-[0.2em]">
          Fase 0{step} / 03
        </span>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grow flex items-center justify-center p-6">
        <div
          className={`w-full max-w-3xl space-y-12 transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        >
          <div className="space-y-4">
            {step === 1 && <BarChart3 size={32} className="text-brand-gold" />}
            {step === 2 && <Users size={32} className="text-brand-gold" />}
            {step === 3 && <Activity size={32} className="text-brand-gold" />}

            <h1 className="text-4xl md:text-6xl font-editorial text-text-main tracking-wide">
              {step === 1
                ? "Rango de Facturación"
                : step === 2
                  ? "Arquitectura de Equipo"
                  : "Validación Final"}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step === 1 &&
              [
                "0 - $500k USD",
                "$500k - $2M USD",
                "$2M - $10M USD",
                "+$10M USD",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={handleNext}
                  className="p-8 border border-custom/60 rounded-md text-[11px] uppercase tracking-widest text-text-main hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left font-medium cursor-pointer"
                >
                  {opt}
                </button>
              ))}

            {step === 2 &&
              [
                "Alta: Opero el día a día y tomo todas las decisiones.",
                "Media: Tengo gerentes, pero superviso la ejecución final.",
                "Baja: El equipo es autónomo, me enfoco en expansión.",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={handleNext}
                  className="md:col-span-2 p-8 border border-custom/60 rounded-md text-[11px] uppercase tracking-widest text-text-main hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left font-medium cursor-pointer"
                >
                  {opt}
                </button>
              ))}

            {step === 3 && (
              <div className="md:col-span-2 space-y-6">
                <input
                  type="email"
                  placeholder="correo@empresa.com"
                  className="w-full bg-brand-bg border border-custom/60 rounded-md px-6 py-5 text-sm  placeholder-text-muted/40 focus:border-brand-gold focus:outline-none transition-all"
                />
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-gold text-brand-bg text-[10px] uppercase tracking-widest font-bold rounded-md hover:bg-text-main transition-all flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Generar Diagnóstico"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER DE NAVEGACIÓN (BOTONES FIJOS) */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-t border-custom/40">
        <button
          onClick={() => handleStepChange(step - 1)}
          disabled={step === 1}
          className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all ${
            step === 1
              ? "opacity-0 cursor-default"
              : "text-text-muted hover:text-text-main cursor-pointer"
          }`}
        >
          <ArrowLeft size={12} /> Paso Anterior
        </button>

        {step < 3 && (
          <button
            onClick={() => handleNext()}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold hover:text-text-main transition-all cursor-pointer"
          >
            Saltar al próximo <ArrowRight size={12} />
          </button>
        )}
      </footer>
    </main>
  );
}
