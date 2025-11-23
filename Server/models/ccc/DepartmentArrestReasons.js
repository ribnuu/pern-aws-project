const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentArrestReasons model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentArrestReasons model.
 */
const defineDepartmentArrestReasons = (sequelize) => {
  return sequelize.define(
    "DepartmentArrestReasons",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        allowNull: false,
      },
      reason_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "Unique code for the arrest reason",
      },
      reason_description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Description of the arrest reason",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "department_arrest_reasons",
      timestamps: true,
      indexes: [
        {
          fields: ["reason_code"],
        },
      ],
    }
  );
};

module.exports = defineDepartmentArrestReasons;
