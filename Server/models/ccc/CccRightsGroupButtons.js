const { DataTypes } = require("sequelize");

/**
 * Function to define the CccRightsGroupButtons model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccRightsGroupButtons model.
 */
const defineCccRightsGroupButtons = (sequelize) => {
  return sequelize.define(
    "CccRightsGroupButtons",
    {
      ccc_rights_group_buttons: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        // defaultValue: DataTypes.NOW, // No need for defaultValue for autoIncrement primary key
      },
      user_group_id: {
        type: DataTypes.INTEGER, // Updated to INTEGER
        allowNull: true, // Adjust based on your requirements
        references: {
          model: "CccUserGroup", // Correct model name for reference
          key: "user_group_id", // Column in the referenced table
        },
        onUpdate: "NO ACTION", // No action on update
        onDelete: "NO ACTION", // No action on delete
      },
      button_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "CccMasterButtons", // Name of the table to reference
          key: "ccc_master_buttons_id", // Column in the referenced table
        },
        onUpdate: "NO ACTION", // No action on update
        onDelete: "NO ACTION", // No action on delete
      },
    },
    {
      tableName: "ccc_rights_group_buttons",
      timestamps: false, // Set to true if you have created_at and updated_at columns
      indexes: [
        {
          unique: true,
          fields: ["user_group_id", "button_id"], // Unique constraint on user_group_id and button_id
        },
      ],
    }
  );
};

module.exports = defineCccRightsGroupButtons;
