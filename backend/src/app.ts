import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(express.json()); // Parseo de JSON
app.use(cors()); // Permitir peticiones de tu frontend
app.use(helmet()); // Seguridad en cabeceras HTTP
app.use(morgan("dev")); // Logger de peticiones en consola

// Ruta de prueba (Healthcheck)
app.get("/api/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      status: "success",
      message: "API de ALiz corriendo perfectamente 🚀",
    });
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
