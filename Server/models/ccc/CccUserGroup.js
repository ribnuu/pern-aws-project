const { DataTypes } = require("sequelize");

/**
 * Function to define the CccUserGroup model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccUserGroup model.
 */
const defineCccUserGroup = (sequelize) => {
  return sequelize.define(
    "CccUserGroup",
    {
      user_group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal(
          "nextval('ccc_user_group_user_group_id_seq'::regclass)"
        ),
      },
      user_group_name: {
        type: DataTypes.STRING(255),
      },
      user_group_database: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "ccc_user_group",
      timestamps: false,
    }
  );
};

module.exports = defineCccUserGroup;
