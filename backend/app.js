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

const app = express();

// Configuracion
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
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
  res.send("El servidor esta funcionando correctamente");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`);
});
