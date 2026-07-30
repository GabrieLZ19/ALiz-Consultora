import { supabase } from "../config/supabase";
import { RegisterDTO, LoginDTO, AuthResponse } from "../types/auth";

export class AuthService {
  static async register(data: RegisterDTO): Promise<AuthResponse> {
    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError || !authData.user) {
      throw new Error(authError?.message || "No se pudo registrar el usuario.");
    }

    const userId = authData.user.id;

    // 2. Crear perfil asociado en la tabla public.profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: data.full_name,
        company_name: data.company_name || null,
        phone: data.phone || null,
        role: "client",
      },
    ]);

    if (profileError) {
      throw new Error(
        `Error al crear perfil de usuario: ${profileError.message}`,
      );
    }

    // 3. Obtener sesión de token
    const token = authData.session?.access_token || "";

    return {
      user: {
        id: userId,
        email: data.email,
        full_name: data.full_name,
        role: "client",
      },
      token,
    };
  }

  static async login(data: LoginDTO): Promise<AuthResponse> {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (authError || !authData.user || !authData.session) {
      throw new Error("Credenciales inválidas o correo no registrado.");
    }

    // Obtener datos del perfil desde public.profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", authData.user.id)
      .single();

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        full_name: profile?.full_name || "Usuario",
        role: profile?.role || "client",
      },
      token: authData.session.access_token,
    };
  }

  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(`Error al obtener el perfil: ${error.message}`);
    }

    return data;
  }
}
