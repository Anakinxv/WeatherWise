import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
