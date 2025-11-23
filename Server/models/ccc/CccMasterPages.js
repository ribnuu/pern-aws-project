const { DataTypes } = require("sequelize");

/**
 * Function to define the CccMasterPages model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccMasterPages model.
 */
const defineCccMasterPages = (sequelize) => {
  return sequelize.define(
    "CccMasterPages",
    {
      pages_id: {
        type: DataTypes.STRING(255),
        allowNull: false, // Cannot be null since it's the primary key
        primaryKey: true, // Set pages_id as the primary key
      },
      component_name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Allow null if you want optional fields
      },
      file_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      folder_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      page_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "ccc_master_pages",
      timestamps: false, // Set to true if you have created_at and updated_at columns
    }
  );
};

module.exports = defineCccMasterPages;
