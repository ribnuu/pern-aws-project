const { DataTypes } = require("sequelize");

/**
 * Function to define the StockInstitutionStaff model.
 * @param {Object} sequelize - Sequelize instance for the specific database.
 * @returns {Model} - The StockInstitutionStaff model.
 */
const defineStockInstitutionStaff = (sequelize) => {
  return sequelize.define(
    "StockInstitutionStaff",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institution_id: {
        type: DataTypes.UUID,
        allowNull: true, // It allows null because of the "ON DELETE SET NULL" constraint
        references: {
          model: "stock_customer_institution", // Refers to the stock_customer_institution table
          key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "SET NULL",
      },
      stock_customer_person_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "stock_customer_person", // Refers to the stock_customer_person table
          key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "stock_institution_staff",
      timestamps: false, // Disable automatic createdAt and updatedAt fields
    }
  );
};

module.exports = defineStockInstitutionStaff;
