import { supabase } from "../config/supabase";
import { RegisterDTO, LoginDTO, AuthResponse, OAuthSyncDTO, UpdateProfileDTO } from "../types/auth";
import { EmailService } from "./emailService";

export class AuthService {
  static async register(data: RegisterDTO): Promise<AuthResponse> {
    console.log("--> Registrando usuario en AuthService con confirmación:", data.email);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
        },
      },
    });

    if (authError) {
      const msg = authError.message || "";
      if (
        msg.toLowerCase().includes("already registered") ||
        msg.toLowerCase().includes("user already exists")
      ) {
        throw new Error("Este correo electrónico ya está registrado. Por favor inicia sesión.");
      }
      throw new Error(msg || "No se pudo registrar el usuario.");
    }

    if (!authData.user) {
      throw new Error("No se pudo crear la cuenta de usuario.");
    }

    if (authData.user.identities && authData.user.identities.length === 0) {
      throw new Error("Este correo electrónico ya se encuentra registrado. Por favor inicia sesión.");
    }

    const userId = authData.user.id;

    // 2. Garantizar perfil en public.profiles
    const { error: profileError } = await supabase.from("profiles").upsert(
      [
        {
          id: userId,
          full_name: data.full_name,
          company_name: data.company_name || null,
          phone: data.phone || null,
          avatar_url: data.avatar_url || null,
          role: "client",
          plan: "none",
          subscription_status: "inactive",
        },
      ],
      { onConflict: "id" }
    );

    if (profileError) {
      console.warn("--> Aviso al upsert de perfil:", profileError.message);
    }

    // 3. Notificación de bienvenida / confirmación por Nodemailer con plantilla ALiz
    try {
      const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
      await EmailService.sendUserAccountConfirmation(
        data.email,
        data.full_name,
        `${clientUrl}/login`
      );
    } catch (emailErr) {
      console.warn("--> Aviso enviando correo Nodemailer post-registro:", emailErr);
    }

    const token = authData.session?.access_token || "";

    return {
      user: {
        id: userId,
        email: data.email,
        full_name: data.full_name,
        role: "client",
        company_name: data.company_name,
        phone: data.phone,
        avatar_url: data.avatar_url || null,
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
      console.error("--> Error en login con Supabase:", authError);
      const msg = authError?.message || "";
      if (msg.toLowerCase().includes("invalid login credentials")) {
        throw new Error("Correo o contraseña incorrectos. Verifica tus datos.");
      }
      if (msg.toLowerCase().includes("email not confirmed")) {
        throw new Error("Por favor confirma tu correo electrónico antes de ingresar.");
      }
      throw new Error(msg || "Credenciales inválidas o correo no registrado.");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    const avatarUrl =
      profile?.avatar_url ||
      authData.user.user_metadata?.avatar_url ||
      authData.user.user_metadata?.picture ||
      null;

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        full_name: profile?.full_name || authData.user.user_metadata?.full_name || "Usuario",
        role: profile?.role || "client",
        plan: profile?.plan || "none",
        company_name: profile?.company_name || null,
        phone: profile?.phone || null,
        avatar_url: avatarUrl,
      },
      token: authData.session.access_token,
    };
  }

  static async getOAuthUrl(provider: "google" | "apple", redirectTo?: string): Promise<string> {
    const redirectUrl = redirectTo || `${process.env.CLIENT_URL || "http://localhost:3000"}/login/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        queryParams: provider === "google" ? {
          access_type: "offline",
          prompt: "select_account",
        } : undefined,
      },
    });

    if (error || !data.url) {
      console.error("--> Error en getOAuthUrl:", error);
      throw new Error(error?.message || `No se pudo obtener la URL de OAuth para ${provider}`);
    }

    return data.url;
  }

  static async syncOAuthSession(dto: OAuthSyncDTO): Promise<AuthResponse> {
    const { data: userData, error: userError } = await supabase.auth.getUser(
      dto.access_token
    );

    if (userError || !userData.user) {
      console.error("--> Error en syncOAuthSession getUser:", userError);
      throw new Error("Token de acceso OAuth inválido o expirado.");
    }

    const user = userData.user;
    const userId = user.id;
    const avatarFromMetadata =
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profile || (avatarFromMetadata && !profile.avatar_url)) {
      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Usuario ALiz";

      const { data: updatedProfile } = await supabase
        .from("profiles")
        .upsert(
          [
            {
              id: userId,
              full_name: fullName,
              avatar_url: avatarFromMetadata,
              role: "client",
              plan: "none",
              subscription_status: "inactive",
            },
          ],
          { onConflict: "id" }
        )
        .select()
        .single();

      if (updatedProfile) {
        profile = updatedProfile;
      }
    }

    return {
      user: {
        id: userId,
        email: user.email!,
        full_name: profile?.full_name || user.user_metadata?.full_name || "Usuario OAuth",
        role: profile?.role || "client",
        plan: profile?.plan || "none",
        company_name: profile?.company_name || null,
        phone: profile?.phone || null,
        avatar_url: profile?.avatar_url || avatarFromMetadata,
      },
      token: dto.access_token,
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

  static async updateProfile(userId: string, dto: UpdateProfileDTO) {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (dto.full_name !== undefined) updateData.full_name = dto.full_name;
    if (dto.company_name !== undefined) updateData.company_name = dto.company_name;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.avatar_url !== undefined) updateData.avatar_url = dto.avatar_url;

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("--> Error en updateProfile:", error);
      throw new Error(`Error al actualizar el perfil: ${error.message}`);
    }

    return data;
  }

  static async getUserLeads(email: string) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("--> Error en getUserLeads:", error);
      throw new Error(`Error al obtener las solicitudes del usuario: ${error.message}`);
    }

    return data || [];
  }

  static async requestPasswordReset(email: string): Promise<void> {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    
    // Enviar correo de restablecimiento directamente mediante Nodemailer sin pasar por los rate limits de Supabase Email
    try {
      await EmailService.sendPasswordResetEmail(
        email,
        `${clientUrl}/recuperar-contrasena/reset`
      );
    } catch (e: any) {
      console.error("--> Error enviando email de recuperación por Nodemailer:", e);
      throw new Error("No se pudo enviar el correo de recuperación. Inténtalo de nuevo más tarde.");
    }
  }
}
