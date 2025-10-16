import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Se conecto exitosamente a la base de datos");
  } catch (e) {
    console.error("No se pudo conectar a la base de datos", e);
  }
};

export default connectDB;
