"use client";

import React, { useEffect, useRef, useState } from "react";
import { HireSection } from "@/components/features/HireSection";
import { ProductCarousel } from "@/components/features/ProductCarousel";
import { LeadService, CreateLeadPayload } from "@/services/leadService";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Loader2,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  EMPLOYEE_RANGE_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
} from "@/lib/constants";
import { notify } from "@/lib/notifications";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    employee_range: "1-5",
    service_interest: "diagnostico_360",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const payload: CreateLeadPayload = {
        full_name: formData.full_name,
        email: formData.email,
        company_name: formData.company_name,
        employee_range: formData.employee_range,
        service_interest: formData.service_interest as any,
        message: formData.message,
      };

      const response = await LeadService.createLead(payload);
      notify.success(
        "Solicitud Recibida",
        response.message || "Solicitud de diagnóstico enviada con éxito."
      );
      setFormData({
        full_name: "",
        email: "",
        company_name: "",
        employee_range: "1-5",
        service_interest: "diagnostico_360",
        message: "",
      });
    } catch (error: any) {
      notify.error(
        "Error",
        error.message || "Error al enviar la solicitud de diagnóstico."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg text-text-main transition-colors duration-700 ease-out">
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-16 lg:pb-24 border-b border-custom/60 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal className="lg:col-span-8 space-y-6">
            <span className="inline-block px-4 py-1.5 border border-brand-gold/20 rounded-full text-[9px] text-brand-gold uppercase tracking-[0.25em] font-semibold bg-brand-card/40">
              Firma de Alta Dirección
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-editorial tracking-wide leading-[1.1]">
              Construiste algo que vale. <br />
              <span className="italic text-brand-gold font-light">
                Ahora protégelo.
              </span>
            </h1>
            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed max-w-2xl">
              En México nadie nos enseñó a construir empresas con orden. ALiZ
              sí. Herramientas, políticas y consultoría especializada para que
              tu empresa opere correctamente - sin atajos.
            </p>
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-gold font-semibold">
                "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={200}
            className="lg:col-span-4 hidden lg:block border border-custom/60 rounded-lg p-3 shadow-2xl bg-brand-card"
          >
            <div className="w-full aspect-4/5 relative rounded-md overflow-hidden bg-brand-bg">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Dirección ALiZ"
                fill
                className="object-cover filter grayscale contrast-[1.15]"
                priority
              />
            </div>
          </ScrollReveal>
        </div>

        {/* INDICADORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-custom/40 mt-12 text-text-muted">
          <div className="border-l border-brand-gold/40 pl-4 space-y-1">
            <span className="text-sm font-semibold text-text-main block">
              30 Años Operando Empresas
            </span>
            <p className="text-xs font-light">
              Experiencia real gestionando operaciones desde adentro, no desde
              un escritorio.
            </p>
          </div>
          <div className="border-l border-brand-gold/40 pl-4 space-y-1">
            <span className="text-sm font-semibold text-text-main block">
              12 Años en Recursos Humanos
            </span>
            <p className="text-xs font-light">
              Especialización en manufactura de alta tecnología y formación de
              equipos.
            </p>
          </div>
          <div className="border-l border-brand-gold/40 pl-4 space-y-1">
            <span className="text-sm font-semibold text-text-main block">
              Cumplimiento Normativo 2026
            </span>
            <p className="text-xs font-light">
              Alineado 100% a LFT, IMSS, SAT, STPS y normatividades mexicanas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PARA QUIÉN ES Y PARA QUIÉN NO ES */}
      <section className="border-b border-custom/60 bg-brand-card/20 py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal className="space-y-6">
            <div className="flex items-center gap-2 text-brand-gold font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck size={14} /> Posicionamiento de Marca
            </div>
            <h2 className="text-3xl font-editorial text-text-main">
              ¿Para quién es ALiZ Soluciones?
            </h2>
            <ul className="space-y-4 text-xs md:text-sm font-light text-text-muted">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="text-brand-gold shrink-0 mt-0.5"
                />{" "}
                Para el dueño que construyó algo real y quiere protegerlo con
                estructura operativa.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="text-brand-gold shrink-0 mt-0.5"
                />{" "}
                Para quien quiere saber exactamente cuánto gana su empresa y
                cuánto le cuesta cada empleado.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="text-brand-gold shrink-0 mt-0.5"
                />{" "}
                Para empresas que hacen las cosas bien porque entienden que un
                negocio ordenado dura más y vale más.
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal
            delay={200}
            className="space-y-6 bg-brand-bg/60 p-8 rounded-lg border border-custom/40"
          >
            <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] uppercase tracking-widest">
              <XCircle size={14} /> Para quién NO es
            </div>
            <h2 className="text-3xl font-editorial text-text-main">
              Claridad desde el primer día.
            </h2>
            <ul className="space-y-4 text-xs md:text-sm font-light text-text-muted">
              <li className="flex items-start gap-3">
                <XCircle
                  size={16}
                  className="text-red-400/80 shrink-0 mt-0.5"
                />{" "}
                No es para quien busca cómo evadir impuestos o salirse por la
                tangente.
              </li>
              <li className="flex items-start gap-3">
                <XCircle
                  size={16}
                  className="text-red-400/80 shrink-0 mt-0.5"
                />{" "}
                No es para quienes buscan el atajo rápido sin transformar sus
                procesos.
              </li>
              <li className="flex items-start gap-3">
                <XCircle
                  size={16}
                  className="text-red-400/80 shrink-0 mt-0.5"
                />{" "}
                No es para el dueño que no está dispuesto a evolucionar su
                modelo de mando.
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SOLUCIONES */}
      <section
        id="estudio"
        className="max-w-7xl mx-auto px-6 py-16 lg:py-28 border-b border-custom/60"
      >
        <ScrollReveal className="space-y-3 mb-10 lg:mb-16 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-muted font-mono block">
            02. Soluciones In-Company
          </span>
          <h2 className="text-3xl md:text-4xl font-editorial text-text-main">
            ALiZ para tu organización.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <HireSection />
        </ScrollReveal>
      </section>

      {/* 4. RECURSOS RECIENTES */}
      <section
        id="productos"
        className="max-w-7xl mx-auto px-6 py-16 lg:py-28 border-b border-custom/60"
      >
        <ScrollReveal className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10 lg:mb-16">
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
            className="text-[10px] uppercase tracking-widest text-brand-gold border-b border-brand-gold/40 pb-1 font-mono flex items-center gap-1.5 hover:text-text-main transition-colors font-medium"
          >
            Catálogo completo <ArrowRight size={11} />
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <ProductCarousel />
        </ScrollReveal>
      </section>

      {/* 5. FORMULARIO DIAGNÓSTICO CONSUMIENDO LeadService */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-16 lg:py-28">
        <ScrollReveal className="bg-brand-card/40 border border-custom/60 rounded-2xl p-6 md:p-12 lg:p-20 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 relative z-10 items-center">
            <div className="space-y-4 lg:space-y-6">
              <span className="text-brand-gold font-mono text-[9px] uppercase tracking-[0.25em] font-semibold">
                Contacto Directo
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-editorial text-text-main leading-tight">
                Obtén tu diagnóstico <br className="hidden md:block" />
                <span className="italic text-brand-gold font-light">
                  gratuito.
                </span>
              </h2>
              <p className="text-xs lg:text-sm text-text-muted font-light leading-relaxed max-w-md">
                Completa tus datos y las características de tu empresa. Nuestro
                equipo técnico evaluará tu situación y recibirás recomendaciones
                personalizadas en 24-48 horas.
              </p>
            </div>

            <form onSubmit={handleSubmitLead} className="space-y-5">
              <div className="flex items-center gap-2 text-brand-gold font-mono text-[10px] uppercase tracking-widest pb-2 border-b border-custom/40">
                <MessageSquare size={14} /> Envíanos un mensaje
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    placeholder="Tu nombre"
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3.5 py-2.5 text-xs text-text-main focus:border-brand-gold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3.5 py-2.5 text-xs text-text-main focus:border-brand-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                    Empresa / Razón Social
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company_name: e.target.value,
                      })
                    }
                    placeholder="Nombre de tu empresa (opcional)"
                    className="w-full bg-brand-bg border border-custom/60 rounded px-3.5 py-2.5 text-xs text-text-main focus:border-brand-gold outline-none"
                  />
                </div>

                <CustomSelect
                  label="Rango de Empleados *"
                  options={EMPLOYEE_RANGE_OPTIONS}
                  value={formData.employee_range}
                  onChange={(val) =>
                    setFormData({ ...formData, employee_range: val })
                  }
                  placeholder="Seleccionar rango"
                />
              </div>

              <CustomSelect
                label="Servicio de Interés *"
                options={SERVICE_INTEREST_OPTIONS}
                value={formData.service_interest}
                onChange={(val) =>
                  setFormData({ ...formData, service_interest: val })
                }
                placeholder="Seleccionar servicio"
              />

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                  Mensaje o Consulta *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="¿En qué te podemos ayudar?"
                  className="w-full bg-brand-bg border border-custom/60 rounded px-3.5 py-2.5 text-xs text-text-main focus:border-brand-gold outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded hover:bg-text-main transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    Enviar Mensaje <ArrowRight size={13} />
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
