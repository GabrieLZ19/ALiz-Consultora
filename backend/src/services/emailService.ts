import nodemailer from "nodemailer";
import { CreateLeadDTO } from "../types/lead";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailService {
  /**
   * Notifica al equipo de ALiZ (narpublisher@gmail.com) cuando llega un nuevo lead
   */
  static async sendNewLeadAlertToAdmin(leadData: CreateLeadDTO) {
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || "narpublisher@gmail.com";

    const mailOptions = {
      from: `"ALiZ Sistema Web" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `NUEVA SOLICITUD WEB: ${leadData.full_name.toUpperCase()} - ${leadData.company_name ? leadData.company_name.toUpperCase() : "SIN EMPRESA"}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          
          <!-- CABECERA DE MARCA -->
          <div style="text-align: center; padding-bottom: 25px; border-b: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              ALiZ SOLUCIONES DE NEGOCIOS
            </span>
            <h1 style="color: #efece6; font-size: 20px; font-weight: 300; letter-spacing: 0.05em; margin: 0;">
              Notificación de Nuevo Prospecto
            </h1>
          </div>

          <!-- TABLA DE INFORMACIÓN -->
          <div style="padding: 25px 0;">
            <table style="width: 100%; color: #efece6; font-size: 13px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em; width: 150px;">
                  Nombre Completo
                </td>
                <td style="padding: 12px 0; font-weight: 400; color: #efece6;">
                  ${leadData.full_name}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Correo Electrónico
                </td>
                <td style="padding: 12px 0;">
                  <a href="mailto:${leadData.email}" style="color: #c5a059; text-decoration: none; font-weight: 500;">
                    ${leadData.email}
                  </a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Empresa / Razón Social
                </td>
                <td style="padding: 12px 0; color: #efece6;">
                  ${leadData.company_name || "No especificado"}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1a1612;">
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Rango de Empleados
                </td>
                <td style="padding: 12px 0; color: #efece6;">
                  ${leadData.employee_range || "No especificado"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #9e9991; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
                  Servicio de Interés
                </td>
                <td style="padding: 12px 0; color: #c5a059; font-weight: 600;">
                  ${leadData.service_interest}
                </td>
              </tr>
            </table>
          </div>

          <!-- BLOQUE DE DETALLE / MENSAJE DEL CLIENTE -->
          <div style="background-color: #181512; padding: 20px; border-left: 2px solid #c5a059; margin-top: 10px; border-radius: 2px;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #c5a059; font-weight: 700; display: block; margin-bottom: 8px;">
              RETO OPERATIVO / MENSAJE
            </span>
            <p style="margin: 0; font-size: 13px; color: #efece6; line-height: 1.6; font-weight: 300; font-style: italic;">
              "${leadData.message}"
            </p>
          </div>

          <!-- PIE DE PÁGINA -->
          <div style="margin-top: 35px; pt: 20px; border-top: 1px solid #231e18; text-align: center;">
            <p style="font-size: 10px; uppercase; letter-spacing: 0.2em; color: #9e9991; margin: 0;">
              SISTEMA DE CONTROL DE LEADS • ALiZ FIRMA BOUTIQUE
            </p>
          </div>

        </div>
      `,
    };

    return await transporter.sendMail(mailOptions);
  }

  /**
   * Envía correo de confirmación de recepción al cliente
   */
  static async sendClientConfirmation(clientEmail: string, clientName: string) {
    const mailOptions = {
      from: `"ALiZ Soluciones de Negocios" <${process.env.SMTP_USER}>`,
      to: clientEmail,
      subject: "Confirmación de Recepción | ALiZ Soluciones de Negocios",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0a09; color: #efece6; padding: 40px 20px; border-radius: 4px; max-width: 600px; margin: 0 auto; border: 1px solid #231e18;">
          
          <!-- CABECERA -->
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #231e18;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; display: block; margin-bottom: 6px;">
              FIRMA DE ALTA DIRECCIÓN
            </span>
            <h1 style="color: #efece6; font-size: 22px; font-weight: 300; margin: 0;">
              ALiZ Soluciones de Negocios
            </h1>
          </div>

          <!-- CUERPO DEL MENSAJE -->
          <div style="padding: 30px 0; font-weight: 300; font-size: 14px; line-height: 1.7; color: #efece6;">
            <p style="margin-top: 0; color: #c5a059; font-weight: 500;">
              Estimado/a ${clientName},
            </p>
            <p style="color: #efece6;">
              Hemos recibido la información y características operativas de tu empresa de manera satisfactoria.
            </p>
            <p style="color: #9e9991;">
              Nuestro equipo directivo se encuentra evaluando los datos proporcionados para brindarte una respuesta pertinente. Un consultor sénior se pondrá en contacto contigo en un lapso estimado de <strong>24 a 48 horas hábiles</strong>.
            </p>
          </div>

          <!-- ES LOGAN SOBRIO DE MARCA -->
          <div style="background-color: #181512; padding: 20px; text-align: center; border: 1px solid #231e18; border-radius: 2px;">
            <p style="font-size: 11px; color: #c5a059; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; margin: 0;">
              "No enseñamos lo que estudiamos. Enseñamos lo que vivimos."
            </p>
          </div>

          <!-- FOOTER -->
          <div style="margin-top: 30px; text-align: center;">
            <p style="font-size: 10px; color: #9e9991; text-transform: uppercase; letter-spacing: 0.15em; margin: 0;">
              Atención remota a nivel nacional en todo México
            </p>
          </div>

        </div>
      `,
    };

    return await transporter.sendMail(mailOptions);
  }
}
