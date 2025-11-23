const { DataTypes } = require("sequelize");

/**
 * Function to define the CccWhitelistedRoutes model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccWhitelistedRoutes model.
 */
const defineCccWhitelistedRoutes = (sequelize) => {
  return sequelize.define(
    "CccWhitelistedRoutes",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Generates UUID v4 by default
      },
      route: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted",
      },
      has_path_parameters: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "has_path_parameters",
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "created_by",
        references: {
          model: "ccc_user_masterfile", // Ensure this matches your table name
          key: "user_id", // Ensure this matches your primary key
        },
        onUpdate: "NO ACTION",
        onDelete: "SET NULL", // Set to null if the referenced user is deleted
      },
    },
    {
      tableName: "ccc_whitelisted_routes",
      timestamps: false, // Using created_at and updated_at manually
      indexes: [
        {
          fields: ["route"],
        },
        {
          fields: ["method"],
        },
        {
          fields: ["created_by"],
        },
      ],
    }
  );
};

module.exports = defineCccWhitelistedRoutes;
