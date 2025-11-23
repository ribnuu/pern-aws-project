const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockRepsComm model.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Model} - The StockRepsComm model.
 */
const defineStockRepsComm = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockRepsComm",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      customer_person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stock_customer_person",
          key: "id",
        },
      },
      item_code: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        references: {
          model: "stock_item_header",
          key: "item_code",
        },
      },
      commission: {
        type: DataTypes.DOUBLE,
        allowNull: false,
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
    },
    {
      tableName: "stock_reps_comm",
      timestamps: false, // Use `timestamps: true` if you want Sequelize to handle `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineStockRepsComm;
