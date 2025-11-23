const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockInstitutionRepresentative model.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Model} - The StockInstitutionRepresentative model.
 */
const defineStockInstitutionRepresentative = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockInstitutionRepresentative",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stock_customer_institution", // Ensure this matches your table name
          key: "id",
        },
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
      stock_customer_person_id: {
        type: DataTypes.UUID,
        references: {
          model: "stock_customer_person", // Ensure this matches your table name
          key: "id",
        },
      },
    },
    {
      tableName: "stock_institution_representative",
      timestamps: false, // Set to `true` if you want Sequelize to manage `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineStockInstitutionRepresentative;
