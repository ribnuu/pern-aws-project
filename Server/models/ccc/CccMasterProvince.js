const { DataTypes } = require("sequelize");

/**
 * Function to define the CccMasterProvince model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccMasterProvince model.
 */
const defineCccMasterProvince = (sequelize) => {
  return sequelize.define(
    "CccMasterProvince",
    {
      province_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal(
          "nextval('master_province_province_id_seq'::regclass)"
        ),
      },
      province_name: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "ccc_master_province",
      timestamps: false,
    }
  );
};

module.exports = defineCccMasterProvince;
