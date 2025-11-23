const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesDetail model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesDetail model.
 */
const defineExpensesDetail = (sequelize) => {
  return sequelize.define(
    "ExpensesDetail",
    {
      id: {
        type: DataTypes.UUID, // Matches 'uuid' in SQL
        defaultValue: DataTypes.UUIDV4, // Matches 'DEFAULT uuid_generate_v4()'
        primaryKey: true,
        allowNull: false,
      },
      category_code: {
        type: DataTypes.STRING, // Matches 'character varying'
        allowNull: false,
        references: {
          model: "ExpensesCategory", // Foreign key relation
          key: "category_code",
        },
        onDelete: "CASCADE", // Matches ON DELETE CASCADE
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
      sub_category_code: {
        type: DataTypes.STRING, // Matches 'character varying'
        allowNull: false,
        references: {
          model: "ExpensesSubCategory", // Foreign key relation
          key: "sub_category_code",
        },
        onDelete: "CASCADE", // Matches ON DELETE CASCADE
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
      amount: {
        type: DataTypes.DOUBLE, // Matches 'double precision'
        allowNull: false,
      },
      received_by_id: {
        type: DataTypes.STRING, // Matches 'character varying(255)'
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT, // Matches 'text'
        allowNull: true,
      },
      fixed_asset: {
        type: DataTypes.BOOLEAN, // Matches 'boolean'
        defaultValue: false,
      },
      received_by_type: {
        type: DataTypes.STRING, // Matches 'character varying(255)'
        allowNull: true,
      },
      expense_header_id: {
        type: DataTypes.UUID, // Foreign key to 'expenses_header'
        allowNull: true,
        references: {
          model: "ExpensesHeader", // Foreign key relation
          key: "id",
        },
        onDelete: "NO ACTION", // Matches ON DELETE NO ACTION
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
      reference_number: {
        type: DataTypes.CHAR(8), // Matches 'character(8)'
        defaultValue: "00000001", // Matches 'DEFAULT '00000001'::bpchar'
      },
      process_grn: {
        type: DataTypes.BOOLEAN, // Matches 'boolean'
        defaultValue: false,
      },
      unit_price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      measurement_unit: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      expense_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "expenses_detail",
      timestamps: false, // Explicit timestamps are not handled in this model
    }
  );
};

module.exports = defineExpensesDetail;
