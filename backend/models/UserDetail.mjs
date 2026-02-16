import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";

const UserDetail = sequelize.define(
  "UserDetail",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    unit_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },

    lease_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    lease_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    document_type: DataTypes.STRING(255),
    document_number: DataTypes.STRING(255),

    date_of_birth: DataTypes.DATEONLY,
    marital_status: DataTypes.STRING(255),
    phone: DataTypes.STRING(255),

    residence_address: DataTypes.TEXT,

    driver_license_number: DataTypes.STRING(255),
    driver_license_expiry: DataTypes.DATEONLY,

    real_estate_agency: DataTypes.STRING(255),

    security_deposit: {
      type: DataTypes.DECIMAL(10, 2)
    },

    monthly_salary: {
      type: DataTypes.DECIMAL(10, 2)
    }
  },
  {
    tableName: "user_details",

    // Enable Sequelize timestamps
    timestamps: true,

    // Map names to DB columns
    createdAt: "created_at",
    updatedAt: "updated_at",

    // Recommended for Postgres snake_case
    underscored: true
  }
);

export default UserDetail;
