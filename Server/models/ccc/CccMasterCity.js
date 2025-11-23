const { DataTypes } = require("sequelize");

/**
 * Function to define the CccMasterCity model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccMasterCity model.
 */
const defineCccMasterCity = (sequelize) => {
  return sequelize.define(
    "CccMasterCity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal(
          "nextval('ccc_master_city_id_seq'::regclass)"
        ),
      },
      city_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(20),
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterProvince", // Name of the target model
          key: "province_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterDistrict", // Name of the target model
          key: "district_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      latitude: {
        type: DataTypes.NUMERIC(9, 6),
      },
      longitude: {
        type: DataTypes.NUMERIC(9, 6),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.STRING(255),
        references: {
          model: "CccUserMasterfile", // Assuming this is another model
          key: "user_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "ccc_master_city",
      timestamps: false,
    }
  );
};

module.exports = defineCccMasterCity;
