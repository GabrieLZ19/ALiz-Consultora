"use client";

import { useState } from "react";
import { LeadService, CreateLeadPayload } from "@/services/leadService";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  EMPLOYEE_RANGE_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
} from "@/lib/constants";
import { ArrowRight, Loader2 } from "lucide-react";
import { notify } from "@/lib/notifications";

export default function DiagnosticoPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    employee_range: "1-5",
    service_interest: "diagnostico_360",
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
        "Diagnóstico Solicitado",
        response.message ||
          "Diagnóstico solicitado con éxito. Recibirás respuesta en 24-48 hrs."
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
        error.message || "Ocurrió un error al procesar tu solicitud."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg text-text-main py-12 lg:py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-mono font-semibold">
            Sin Costo • Evaluación Personalizada
          </span>
          <h1 className="text-4xl font-editorial">
            Diagnóstico Rápido{" "}
            <span className="italic text-brand-gold font-light">360°</span>
          </h1>
          <p className="text-xs md:text-sm text-text-muted font-light leading-relaxed">
            Completa este formulario. Nuestro equipo directivo analizará el
            nivel de madurez y los riesgos operativos de tu empresa, enviándote
            un informe en 24 a 48 horas.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-brand-card/40 border border-custom/60 rounded-2xl p-6 md:p-10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
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
                placeholder="Ej. Carlos Mendoza"
                className="w-full bg-brand-bg border border-custom/60 rounded px-4 py-3 text-xs text-text-main focus:border-brand-gold outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                Correo Corporativo *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="carlos@tuempresa.com"
                className="w-full bg-brand-bg border border-custom/60 rounded px-4 py-3 text-xs text-text-main focus:border-brand-gold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                Empresa y Giro
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
                placeholder="Ej. Distribuidora del Norte - Comercio"
                className="w-full bg-brand-bg border border-custom/60 rounded px-4 py-3 text-xs text-text-main focus:border-brand-gold outline-none"
              />
            </div>

            <CustomSelect
              label="Número de Empleados *"
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

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
              ¿Cuál es el principal problema operativo que deseas resolver? *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Ej. Tengo alto costo de rotación, problemas con pagos impositivos o falta de control de inventarios..."
              className="w-full bg-brand-bg border border-custom/60 rounded px-4 py-3 text-xs text-text-main focus:border-brand-gold outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-gold text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded hover:bg-text-main transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                Solicitar Diagnóstico Gratuito <ArrowRight size={13} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
