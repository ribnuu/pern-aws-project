const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesSubCategory model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesSubCategory model.
 */
const defineExpensesSubCategory = (sequelize) => {
  return sequelize.define(
    "ExpensesSubCategory",
    {
      sub_category_code: {
        type: DataTypes.CHAR(8), // Matches 'character(8)' in SQL
        allowNull: false,
        primaryKey: true,
        validate: {
          is: /^[0-9]{8}$/, // Ensures the sub_category_code matches the 8-character format
        },
      },
      sub_category_name: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(50), // Matches 'character varying(50)' in SQL
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      category_code: {
        type: DataTypes.CHAR(8), // Matches 'character(8)' in SQL and acts as the foreign key
        references: {
          model: "ExpensesCategory", // Refers to the parent `ExpensesCategory` model
          key: "category_code",
        },
      },
      is_deleted: {
        type: DataTypes.BOOLEAN, // Matches 'boolean DEFAULT false' in SQL
        defaultValue: false,
      },
    },
    {
      tableName: "expenses_sub_category",
      timestamps: false, // Explicit timestamps are handled manually in this model
      hooks: {
        beforeSave: (subCategory) => {
          // Custom logic before saving (if needed)
        },
      },
    }
  );
};

module.exports = defineExpensesSubCategory;
