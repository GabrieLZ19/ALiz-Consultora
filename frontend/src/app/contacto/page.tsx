"use client";

import { useState } from "react";
import { LeadService, CreateLeadPayload } from "@/services/leadService";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  EMPLOYEE_RANGE_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
} from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { notify } from "@/lib/notifications";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    employee_range: "1-5",
    service_interest: "asesoria_puntual",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        "Mensaje Recibido",
        response.message ||
          "Mensaje enviado con éxito. Nos pondremos en contacto a la brevedad."
      );

      setFormData({
        full_name: "",
        email: "",
        company_name: "",
        employee_range: "1-5",
        service_interest: "asesoria_puntual",
        message: "",
      });
    } catch (error: any) {
      notify.error(
        "Error",
        error.message || "Error al enviar el mensaje. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg text-text-main py-12 lg:py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* CABECERA */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-mono font-semibold">
            Atención Directa
          </span>
          <h1 className="text-4xl sm:text-5xl font-editorial">
            Ponte en{" "}
            <span className="italic text-brand-gold font-light">contacto.</span>
          </h1>
          <p className="text-xs md:text-sm text-text-muted font-light leading-relaxed">
            ¿Tienes dudas sobre nuestras herramientas, pólizas de consultoría o
            necesitas atención personalizada? Escríbenos y te responderemos el
            mismo día hábil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* INFORMACIÓN DE CONTACTO */}
          <div className="lg:col-span-5 space-y-8 bg-brand-card/40 border border-custom/60 rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-editorial text-text-main">
                ALiz Soluciones de Negocios
              </h2>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                Herramientas, políticas y consultoría especializada para que tu
                empresa opere con orden y sin atajos.
              </p>

              <div className="space-y-4 pt-4 border-t border-custom/40">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded text-brand-gold shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                      Correo Electrónico
                    </span>
                    <a
                      href="mailto:contacto@aliz.com.mx"
                      className="text-xs text-text-main hover:text-brand-gold transition-colors font-medium"
                    >
                      contacto@aliz.com.mx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded text-brand-gold shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                      Teléfono / WhatsApp
                    </span>
                    <span className="text-xs text-text-main font-medium">
                      +52 (442) ALIZ-MEX
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded text-brand-gold shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                      Cobertura
                    </span>
                    <span className="text-xs text-text-main font-medium">
                      Atención remota a nivel nacional en todo México.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-custom/40">
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-semibold">
                "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
              </p>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="lg:col-span-7 bg-brand-card/40 border border-custom/60 rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
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
        </div>
      </div>
    </div>
  );
}
