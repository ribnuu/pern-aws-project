const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

const defineStockCustomerInstitution = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockCustomerInstitution",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // address: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
      phone_1: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      phone_2: {
        type: DataTypes.STRING(20),
      },
      mobile_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
      },
      web: {
        type: DataTypes.STRING(255),
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      active_status_change_reason: {
        type: DataTypes.TEXT,
        default: "",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      company_logo_file_path: {
        type: DataTypes.STRING(255),
      },
      latitude: {
        type: DataTypes.NUMERIC(9, 6),
      },
      longitude: {
        type: DataTypes.NUMERIC(9, 6),
      },
      location_url: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "stock_customer_institution",
      timestamps: true,
    }
  );
};

module.exports = defineStockCustomerInstitution;
