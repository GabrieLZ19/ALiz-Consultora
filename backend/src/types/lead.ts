export interface CreateLeadDTO {
  full_name: string;
  email: string;
  company_name?: string;
  industry?: string;
  employee_range?: string;
  service_interest:
    | "rh_externo"
    | "admin_remota"
    | "ambos"
    | "asesoria_puntual"
    | "diagnostico_360";
  message: string;
}

export interface LeadResponse {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  status: string;
}
