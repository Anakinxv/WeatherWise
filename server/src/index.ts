import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/connectDB";
import authRoutes from "./routes/auth.routes";

// Load environment variables first
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Added CORS middleware since it was imported but not used

// Routes
app.use("/api/auth", authRoutes);

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
