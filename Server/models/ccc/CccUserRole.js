const { DataTypes } = require("sequelize");

/**
 * Function to define the CccUserRole model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccUserRole model.
 */
const defineCccUserRole = (sequelize) => {
  return sequelize.define(
    "CccUserRole",
    {
      user_role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal(
          "nextval('ccc_user_role_user_role_id_seq'::regclass)"
        ),
      },
      user_role_name: {
        type: DataTypes.STRING(255),
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "CccUserGroup",
          key: "user_group_id",
        },
      },
    },
    {
      tableName: "ccc_user_role",
      timestamps: false,
    }
  );
};

module.exports = defineCccUserRole;
