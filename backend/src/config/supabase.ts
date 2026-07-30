import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "";

if (!supabaseUrl || !supabaseSecretKey) {
  console.error(
    "❌ Error: Faltan las variables de entorno de Supabase en el servidor.",
  );
}

// Cliente Supabase exclusivo del backend
export const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
