import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/connectDB";
import authRoutes from "./routes/auth.routes";
import SettingRoutes from "./routes/settings.routes";

// Load environment variables first
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 CORS DEBE IR PRIMERO - ANTES QUE CUALQUIER OTRO MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // ✅ Ambos puertos
    credentials: true, // ✅ CRUCIAL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(cookieParser()); // ✅ ANTES de las rutas
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/settings", SettingRoutes);

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
});
