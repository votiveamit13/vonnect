import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.mjs";
import { sequelize } from "./models/index.mjs";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);

// Test DB
await sequelize.authenticate();
console.log("Database connected");

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
