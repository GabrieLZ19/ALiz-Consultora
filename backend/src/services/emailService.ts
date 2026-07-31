import { Resend } from "resend";
import { CreateLeadDTO } from "../types/lead";

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Remitente por defecto (Lee de la variable de entorno RESEND_FROM_EMAIL. Si no existe, usa onboarding@resend.dev)
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "ALiz Consultora <onboarding@resend.dev>";

export class EmailService {
  /**
   * Notifica al equipo de ALiZ cuando llega un nuevo lead
   */
  static async sendNewLeadAlertToAdmin(leadData: CreateLeadDTO) {
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || "narpublisher@gmail.com";

    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      subject: `NUEVA SOLICITUD WEB: ${leadData.full_name.toUpperCase()} - ${leadData.company_name ? leadData.company_name.toUpperCase() : "SIN EMPRESA"}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          
          <div style="text-align: center; padding-bottom: 25px; border-bottom: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              ALiz SOLUCIONES DE NEGOCIOS
            </span>
            <h1 style="color: #efece6; font-size: 20px; font-weight: 300; letter-spacing: 0.05em; margin: 0;">
              Notificación de Nuevo Prospecto
            </h1>
          </div>

          <div style="padding: 25px 0;">
            <table style="width: 100%; color: #efece6; font-size: 13px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; width: 150px;">
                  Nombre Completo
                </td>
                <td style="padding: 12px 0; font-weight: 400;">
                  ${leadData.full_name}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Correo
                </td>
                <td style="padding: 12px 0; font-weight: 400; color: #c5a059;">
                  ${leadData.email}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Teléfono
                </td>
                <td style="padding: 12px 0; font-weight: 400;">
                  ${(leadData as any).phone || "No especificado"}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Empresa
                </td>
                <td style="padding: 12px 0; font-weight: 400;">
                  ${leadData.company_name || "No especificada"}
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });
  }

  /**
   * Envía confirmación automática de recepción de diagnóstico al usuario
   */
  static async sendClientLeadConfirmation(email: string, fullName: string) {
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Confirmación de Recepción | ALiz Soluciones de Negocios",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          <div style="text-align: center; padding-bottom: 25px; border-bottom: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              ALiz Soluciones de Negocios
            </span>
            <h1 style="color: #efece6; font-size: 22px; font-weight: 300; margin: 0;">
              Hemos recibido tu solicitud
            </h1>
          </div>

          <div style="padding: 30px 0; font-size: 14px; line-height: 1.6; color: #d6d1ca;">
            <p>Estimado/a <strong>${fullName}</strong>,</p>
            <p>Gracias por ponerte en contacto con ALiz. Hemos registrado correctamente tus datos de consulta.</p>
          </div>
        </div>
      `,
    });
  }

  /**
   * Envía correo de confirmación de cuenta de usuario con diseño editorial ALiz
   */
  static async sendUserAccountConfirmation(
    email: string,
    fullName: string,
    confirmationLink: string,
  ) {
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Confirma tu cuenta de usuario | ALiz",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          
          <div style="text-align: center; padding-bottom: 25px; border-bottom: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              ALiz CONSULTORA
            </span>
            <h1 style="color: #efece6; font-size: 22px; font-weight: 300; margin: 0;">
              Confirma tu Correo Electrónico
            </h1>
          </div>

          <div style="padding: 30px 0; font-size: 14px; line-height: 1.6; color: #d6d1ca;">
            <p>Bienvenido/a, <strong>${fullName}</strong>.</p>
            <p>Para activar tu acceso a la plataforma corporativa ALiz y disfrutar de nuestros infoproductos y herramientas, por favor confirma tu correo electrónico haciendo clic en el siguiente botón:</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${confirmationLink}" style="background-color: #c5a059; color: #0b0a09; text-decoration: none; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; padding: 14px 28px; border-radius: 4px; display: inline-block;">
                Confirmar mi Cuenta
              </a>
            </div>
            
            <p style="font-size: 11px; color: #9e9991;">Si no creaste esta cuenta, puedes ignorar este mensaje de forma segura.</p>
          </div>

          <div style="background-color: #181512; padding: 20px; text-align: center; border: 1px solid #231e18; border-radius: 2px;">
            <p style="font-size: 11px; color: #c5a059; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; margin: 0;">
              "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
            </p>
          </div>
        </div>
      `,
    });
  }

  /**
   * Envía correo de recuperación de contraseña vía Resend API
   */
  static async sendPasswordResetEmail(email: string, resetLink: string) {
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Restablece tu contraseña | ALiz",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          
          <div style="text-align: center; padding-bottom: 25px; border-bottom: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              ALiz CONSULTORA
            </span>
            <h1 style="color: #efece6; font-size: 22px; font-weight: 300; margin: 0;">
              Restablecimiento de Contraseña
            </h1>
          </div>

          <div style="padding: 30px 0; font-size: 14px; line-height: 1.6; color: #d6d1ca;">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta ALiz. Haz clic en el botón a continuación para ingresar una nueva contraseña:</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetLink}" style="background-color: #c5a059; color: #0b0a09; text-decoration: none; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; padding: 14px 28px; border-radius: 4px; display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            
            <p style="font-size: 11px; color: #9e9991;">Si no solicitaste este cambio, ignora este mensaje. El enlace caducará por seguridad.</p>
          </div>

          <div style="background-color: #181512; padding: 20px; text-align: center; border: 1px solid #231e18; border-radius: 2px;">
            <p style="font-size: 11px; color: #c5a059; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; margin: 0;">
              "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
            </p>
          </div>
        </div>
      `,
    });
  }
}
