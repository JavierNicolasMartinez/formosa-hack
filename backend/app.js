// librerias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// modulos
import connectDB from "./src/config/database.js";
import userRouter from "./src/routes/user.router.js";
import authRouter from "./src/routes/auth.router.js";
import * as models from "./src/models/index.js";
import router from "./src/routes/index.js";

const app = express();

// Configuración
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

const PORT = process.env.PORT || 3000;

// Rutas
app.use("/api", router);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("✅ Conexión a la base de datos exitosa");

    // Mostrar los modelos registrados
    const modelNames = Object.keys(models);
    modelNames.forEach((name) => {
      if (models[name].modelName && models[name].db) {
        console.log(`Modelo registrado: ${models[name].modelName}`);
      } else {
        console.log(`Modelo ${name} ya existe o no se pudo registrar`);
      }
    });

    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error al iniciar el servidor o conectar DB:", error);
  }
});
