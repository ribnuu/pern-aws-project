const { DataTypes } = require("sequelize");

const defineCountries = (sequelize) => {
  return sequelize.define(
    "Countries",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      country_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "countries",
      timestamps: false,
    }
  );
};

module.exports = defineCountries;
