import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";
import UserDetail from "./UserDetail.mjs";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role_id: { type: DataTypes.INTEGER },
  name: {type: DataTypes.STRING},
  username: {type: DataTypes.STRING}
}, {
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
  
});

User.hasOne(UserDetail,{ through: 'user_id' });

export default User;
