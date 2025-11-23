const { DataTypes } = require("sequelize");

/**
 * Function to define the CccUserMasterfile model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccUserMasterfile model.
 */
const defineCccUserMasterfile = (sequelize) => {
  return sequelize.define(
    "CccUserMasterfile",
    {
      user_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        defaultValue: sequelize.literal(
          "nextval('ccc_user_masterfile_user_id_seq'::regclass)"
        ),
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
      },
      user_group: {
        type: DataTypes.STRING(255),
      },
      user_role: {
        type: DataTypes.STRING(255),
      },
      nic_number: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobile_number: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      email_otp: {
        type: DataTypes.INTEGER,
        validate: {
          min: 100000,
          max: 999999,
        },
      },
      mobile_otp: {
        type: DataTypes.INTEGER,
        validate: {
          min: 100000,
          max: 999999,
        },
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      mobile_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      language: {
        type: DataTypes.STRING(255),
        defaultValue: "",
      },
      license_number: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "ccc_user_masterfile",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["mobile_number"],
        },
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["license_number"],
        },
        {
          unique: true,
          fields: ["nic_number"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );
};

module.exports = defineCccUserMasterfile;
