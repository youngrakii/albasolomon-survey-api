import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});