// 📦 Librerías principales
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// 🧩 Módulos internos
import connectDB from "./src/config/database.js";
import * as models from "./src/models/index.js";

// 🛣️ Rutas
import router from "./src/routes/index.js";
import userRouter from "./src/routes/user.router.js";
import authRouter from "./src/routes/auth.router.js";

// 🚀 Inicializar app
const app = express();
dotenv.config();

// 🌐 Middlewares globales
app.use(
  cors({
    origin: "http://localhost:5173", // origen de tu front (puede ser Vite)
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// 🗂️ Paths útiles
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Carpeta pública para HTML/JS/CSS
app.use(express.static(path.join(__dirname, "src/public")));

// 📍 Rutas de la API
app.use("/api", router);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// 📡 Ruta base
app.get("/", (req, res) => {
  res.send("✅ El servidor está funcionando correctamente");
});

// 🧭 Iniciar servidor
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("✅ Conexión a la base de datos exitosa");

    // Mostrar los modelos registrados
    const modelNames = Object.keys(models);
    modelNames.forEach((name) => {
      if (models[name].modelName && models[name].db) {
        console.log(`🧠 Modelo registrado: ${models[name].modelName}`);
      } else {
        console.log(`⚠️ Modelo ${name} ya existe o no se pudo registrar`);
      }
    });

    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Error al iniciar el servidor o conectar DB:", error);
  }
});
