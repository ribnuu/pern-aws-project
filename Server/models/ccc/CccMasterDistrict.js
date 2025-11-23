const { DataTypes } = require("sequelize");

/**
 * Function to define the CccMasterDistrict model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccMasterDistrict model.
 */
const defineCccMasterDistrict = (sequelize) => {
  return sequelize.define(
    "CccMasterDistrict",
    {
      district_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal(
          "nextval('master_district_district_id_seq'::regclass)"
        ),
      },
      district_name: {
        type: DataTypes.STRING(255),
      },
      province_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "CccMasterProvince", // Name of the target model
          key: "province_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "ccc_master_district",
      timestamps: false,
    }
  );
};

module.exports = defineCccMasterDistrict;
