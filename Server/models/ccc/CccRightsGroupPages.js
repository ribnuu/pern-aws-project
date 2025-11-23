const { DataTypes } = require("sequelize");

/**
 * Function to define the CccRightsGroupPages model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccRightsGroupPages model.
 */
const defineCccRightsGroupPages = (sequelize) => {
  return sequelize.define(
    "CccRightsGroupPages",
    {
      ccc_rights_group_pages: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "CccUserGroup", // The model name for reference
          key: "user_group_id", // The column in the referenced table
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      pages_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "CccMasterPages", // The model name for reference
          key: "pages_id", // The column in the referenced table
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    },
    {
      tableName: "ccc_rights_group_pages",
      timestamps: false, // Set to true if you have created_at and updated_at columns
    }
  );
};

module.exports = defineCccRightsGroupPages;
