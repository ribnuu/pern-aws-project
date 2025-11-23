const { DataTypes } = require("sequelize");

/**
 * Function to define the CccUserAffiliations model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccUserAffiliations model.
 */
const defineCccUserAffiliations = (sequelize) => {
  return sequelize.define(
    "CccUserAffiliations",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "ccc_user_masterfile", // Name of the referenced table
          key: "user_id", // Primary key in the referenced table
        },
      },
      group_id: {
        type: DataTypes.INTEGER, // Updated to match user_group_id type
        references: {
          model: "ccc_user_group", // Name of the referenced table
          key: "user_group_id", // Primary key in the referenced table
        },
      },
      role_id: {
        type: DataTypes.INTEGER, // Updated to match user_role_id type
        references: {
          model: "ccc_user_role", // Name of the referenced table
          key: "user_role_id", // Primary key in the referenced table
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
    },
    {
      tableName: "ccc_user_affiliations",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "group_id", "role_id"],
        },
      ],
    }
  );
};

module.exports = defineCccUserAffiliations;
