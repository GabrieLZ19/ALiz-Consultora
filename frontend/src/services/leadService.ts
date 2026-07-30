import { api } from "./api";

export interface CreateLeadPayload {
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

export interface LeadApiResponse {
  status: string;
  message: string;
  data: any;
}

export class LeadService {
  static async createLead(
    payload: CreateLeadPayload,
  ): Promise<LeadApiResponse> {
    // La instancia 'api' ya inyecta automáticamente las cookies/headers si existen
    return (await api.post("/leads", payload)) as unknown as LeadApiResponse;
  }
}
