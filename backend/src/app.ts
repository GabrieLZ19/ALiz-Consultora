import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import leadRoutes from "./routes/leadRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rutas de API
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "API de ALiz corriendo perfectamente 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
