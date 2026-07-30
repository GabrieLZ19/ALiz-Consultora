import { sileo } from "sileo";

const formatMessage = (msg: any): string => {
  if (!msg) return "Ocurrió un error inesperado.";
  if (typeof msg === "string") return msg;
  if (msg instanceof Error) return msg.message;
  if (typeof msg === "object") {
    if (msg.message && typeof msg.message === "string") return msg.message;
    if (msg.error && typeof msg.error === "string") return msg.error;
    try {
      return JSON.stringify(msg);
    } catch {
      return "Error en la solicitud.";
    }
  }
  return String(msg);
};

export const notify = {
  success: (title: any, description?: string) => {
    sileo.success({
      title: formatMessage(title),
      description: description ? formatMessage(description) : undefined,
    });
  },

  error: (title: any, description?: string) => {
    sileo.error({
      title: formatMessage(title),
      description: description ? formatMessage(description) : undefined,
    });
  },

  info: (title: any, description?: string) => {
    sileo.info({
      title: formatMessage(title),
      description: description ? formatMessage(description) : undefined,
    });
  },
};
