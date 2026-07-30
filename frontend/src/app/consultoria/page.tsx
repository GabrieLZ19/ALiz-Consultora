"use client";

import Link from "next/link";
import {
  Shield,
  PhoneCall,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ConsultoriaPage() {
  return (
    <div className="bg-brand-bg text-text-main py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* CABECERA */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-mono font-semibold">
            Soluciones Profesionales
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial">
            Consultoría y Operación{" "}
            <span className="italic text-brand-gold font-light">Remota.</span>
          </h1>
          <p className="text-sm text-text-muted font-light leading-relaxed">
            Más allá de los infoproductos digitalizados, ALiZ asume la operación
            administrativa y de Recursos Humanos de tu empresa de forma remota.
          </p>
        </div>

        {/* GRILLA DE SERVICIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SERVICIO 1: RH EXTERNO */}
          <div className="bg-brand-card/40 border border-custom/60 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <Shield size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-gold tracking-widest block">
                  Servicio Integral
                </span>
                <h2 className="text-2xl font-editorial font-bold text-text-main">
                  RH Externo Integral
                </h2>
                <p className="text-xs text-brand-gold-muted italic mt-0.5">
                  Su departamento de Recursos Humanos, sin contratar uno.
                </p>
              </div>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                Llevamos el control completo del personal de tu empresa de forma
                remota: desde la contratación hasta el finiquito, incluyendo
                nómina, cumplimiento legal y cultura organizacional.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-text-main font-semibold">
                  Qué Incluye:
                </span>
                <ul className="space-y-1.5 text-xs text-text-muted font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Control de altas/bajas ante el IMSS y timbrado de nómina.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Contratos de trabajo, expedientes digitales y políticas
                    adaptadas.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Cumplimiento de NOM-035, NOM-037 y Ley Silla.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Atención de requerimientos ante IMSS, INFONAVIT y STPS.
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-custom/40 pt-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-text-muted">
                  Inversión mensual:
                </span>
                <span className="text-lg font-mono font-bold text-brand-gold">
                  $1,800 a $8,500 MXN + IVA
                </span>
              </div>
              <Link href="/diagnostico" className="block">
                <button className="w-full py-3 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded hover:bg-text-main transition-colors flex items-center justify-center gap-2">
                  Solicitar Cotización <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>

          {/* SERVICIO 2: ADMINISTRACIÓN REMOTA */}
          <div className="bg-brand-card/40 border border-custom/60 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <PhoneCall size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-gold tracking-widest block">
                  Servicio Integral
                </span>
                <h2 className="text-2xl font-editorial font-bold text-text-main">
                  Administración Remota Integral
                </h2>
                <p className="text-xs text-brand-gold-muted italic mt-0.5">
                  Control, cumplimiento y orden en tu empresa sin estar
                  presente.
                </p>
              </div>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                Llevamos el control administrativo, fiscal y contable de tu
                empresa de forma completamente remota, con reportes periódicos y
                atención directa al dueño.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-text-main font-semibold">
                  Qué Incluye:
                </span>
                <ul className="space-y-1.5 text-xs text-text-muted font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Pago de impuestos mensuales (IVA, ISR, IMSS, INFONAVIT).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Conciliaciones bancarias y cierre contable mensual con
                    estados financieros.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Control interno: revisión de compras, proveedores y caja
                    chica.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />{" "}
                    Detección de riesgos fiscales y atención ante el SAT.
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-custom/40 pt-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-text-muted">
                  Inversión mensual:
                </span>
                <span className="text-lg font-mono font-bold text-brand-gold">
                  $2,500 a $12,000 MXN + IVA
                </span>
              </div>
              <Link href="/diagnostico" className="block">
                <button className="w-full py-3 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded hover:bg-text-main transition-colors flex items-center justify-center gap-2">
                  Solicitar Cotización <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* SERVICIO 3: ASESORÍA POR HORA */}
        <div className="bg-brand-card/20 border border-custom/60 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-brand-gold">
              <Clock size={16} />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Atención Puntual
              </span>
            </div>
            <h3 className="text-xl font-editorial font-bold text-text-main">
              Asesoría Puntual por Hora
            </h3>
            <p className="text-xs text-text-muted font-light">
              Para resolver una duda específica en videollamada directa con un
              experto sobre Control Interno, auditoría, RH, nómina, finanzas o
              reformas laborales
            </p>
          </div>
          <div className="text-right shrink-0 space-y-3 w-full md:w-auto">
            <span className="text-lg font-mono font-bold text-brand-gold block">
              $800 a $1,200 MXN + IVA / hr
            </span>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full md:w-auto px-6 py-3 border border-brand-gold text-brand-gold uppercase tracking-widest text-[10px] font-bold rounded hover:bg-brand-gold hover:text-brand-bg transition-colors">
                Agendar Sesión en Calendly
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
