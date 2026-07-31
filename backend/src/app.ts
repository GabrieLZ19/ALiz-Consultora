import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import leadRoutes from "./routes/leadRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Configuración de URLs permitidas para CORS
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"].filter(
  Boolean,
) as string[];

// Middlewares globales
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (como Postman o llamadas internas del servidor)
      // o si el origin está en la lista de URLs permitidas
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Bloqueado por CORS: ${origin}`));
      }
    },
    credentials: true, // Permite envío de cookies HTTP si se requieren
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Morgan en modo 'combined' para logs de producción o 'dev' para local
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Rutas de API
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    environment: process.env.NODE_ENV || "development",
    message: "API de ALiz corriendo perfectamente",
  });
});

// Middleware Global de Manejo de Errores
app.use(errorHandler);

// Listener adaptativo
app.listen(PORT, () => {
  console.log(
    `Servidor de ALiz ejecutándose en el puerto ${PORT} [${process.env.NODE_ENV || "development"}]`,
  );
});
