import { supabase } from "../config/supabase";
import { CreateLeadDTO, LeadResponse } from "../types/lead";
import { EmailService } from "./emailService";

export class LeadService {
  static async createLead(leadData: CreateLeadDTO): Promise<LeadResponse> {
    // 1. Insertar el lead en Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name: leadData.full_name,
          email: leadData.email,
          company_name: leadData.company_name,
          industry: leadData.industry,
          employee_range: leadData.employee_range,
          service_interest: leadData.service_interest,
          message: leadData.message,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(
        `Error al guardar el lead en la base de datos: ${error.message}`,
      );
    }

    // 2. Disparar notificaciones por correo en segundo plano
    // (Se usa Promise.all en "background" sin el 'await' para que no retrase la respuesta al cliente)
    Promise.all([
      EmailService.sendNewLeadAlertToAdmin(leadData),
      EmailService.sendClientLeadConfirmation(leadData.email, leadData.full_name),
    ]).catch((err) => {
      console.error("Error al enviar notificaciones por correo:", err);
    });

    return data as LeadResponse;
  }

  static async getAllLeads(): Promise<LeadResponse[]> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error al obtener la lista de leads: ${error.message}`);
    }

    return data as LeadResponse[];
  }
}
