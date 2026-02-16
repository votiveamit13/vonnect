import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: process.env.DATABASE_URL.includes("localhost")
    ? {}
    : { ssl: { require: true, rejectUnauthorized: false } }
});

export default sequelize;
