import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";

const Role = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
}, {
  tableName: "roles",
  createdAt: "created_at",
  updatedAt: "updated_at",
  
});


export default Role;
