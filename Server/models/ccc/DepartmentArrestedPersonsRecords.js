const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentArrestedPersonsRecords model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentArrestedPersonsRecords model.
 */
const defineDepartmentArrestedPersonsRecords = (sequelize) => {
  return sequelize.define(
    "DepartmentArrestedPersonsRecords",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "First name of the arrested person",
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Last name of the arrested person",
      },
      gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Gender of the arrested person",
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Date of birth of the arrested person",
      },
      nic_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "National ID number of the arrested person",
      },
      license_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "License number of the arrested person",
      },
      passport_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Passport number of the arrested person",
      },
      phone_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Phone number of the arrested person",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Address of the arrested person",
      },
      arrest_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "Date and time of the arrest",
      },
      arrest_location_latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        comment: "Latitude of the arrest location",
      },
      arrest_location_longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        comment: "Longitude of the arrest location",
      },
      arrest_reason: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "DepartmentArrestReasons", // The reference model (DepartmentArrestReasons)
          key: "id", // The key in the referenced model (DepartmentArrestReasons)
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        comment:
          "Reason for the arrest (foreign key to DepartmentArrestReasons)",
      },
      arresting_officer_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "CccUserMasterfile", // Reference to the user table
          key: "user_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        comment: "Reference to the officer who made the arrest",
      },
      release_date_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Date and time of release (if applicable)",
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Additional remarks or notes",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "department_arrested_persons_records",
      timestamps: true,
      paranoid: true, // Enables soft deletes with `deleted_at`
      indexes: [
        {
          fields: ["arresting_officer_id", "arrest_date_time"],
        },
      ],
    }
  );
};

module.exports = defineDepartmentArrestedPersonsRecords;
