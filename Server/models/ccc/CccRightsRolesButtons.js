const { DataTypes } = require("sequelize");

/**
 * Function to define the CccRightsRolesButtons model.
 * @param {Object} sequelize - The Sequelize instance to use.
 * @returns {Model} - The CccRightsRolesButtons model.
 */
const defineCccRightsRolesButtons = (sequelize) => {
  return sequelize.define(
    "CccRightsRolesButtons",
    {
      ccc_rights_role_buttons: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        // defaultValue: DataTypes.SEQUENCE(
        //   "ccc_rights_roles_buttons_ccc_rights_role_buttons_seq"
        // ),
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "ccc_user_role", // Ensure this matches your table name
          key: "user_role_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      button_id: {
        type: DataTypes.STRING(255),
        references: {
          model: "ccc_master_buttons", // Ensure this matches your table name
          key: "ccc_master_buttons_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    },
    {
      tableName: "ccc_rights_roles_buttons",
      timestamps: false, // Set to true if you want Sequelize to manage created_at and updated_at automatically
      indexes: [
        {
          unique: true,
          fields: ["user_role_id", "button_id"],
        },
      ],
    }
  );
};

module.exports = defineCccRightsRolesButtons;
