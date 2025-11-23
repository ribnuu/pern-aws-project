// const { DataTypes } = require("sequelize");

// /**
//  * Function to define the CccMasterButtons model.
//  * @param {Sequelize} sequelize - The Sequelize instance.
//  * @returns {Model} - The CccMasterButtons model.
//  */
// const defineCccMasterButtons = (sequelize) => {
//   return sequelize.define(
//     "CccMasterButtons",
//     {
//       ccc_master_buttons_id: {
//         type: DataTypes.STRING(255),
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       button_display_name: {
//         type: DataTypes.STRING(255),
//         allowNull: true, // Allow null if you want optional fields
//       },
//       button_function_name: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       component_pages_id: {
//         type: DataTypes.STRING(255),
//         allowNull: false, // Should not be null to ensure referential integrity
//         references: {
//           model: "ccc_master_pages", // Name of the table to reference
//           key: "pages_id", // Name of the column in the referenced table
//         },
//         onUpdate: "CASCADE", // Update component_pages_id in this table if pages_id changes in the referenced table
//         onDelete: "CASCADE", // Delete rows in this table if the referenced row is deleted
//       },
//       button_routes: {
//         type: DataTypes.STRING(55),
//         allowNull: true,
//       },
//     },
//     {
//       tableName: "ccc_master_buttons",
//       timestamps: false, // Set to true if you have created_at and updated_at columns
//     }
//   );
// };

// module.exports = defineCccMasterButtons;

const { DataTypes } = require("sequelize");

/**
 * Function to define the CccMasterButtons model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccMasterButtons model.
 */
const defineCccMasterButtons = (sequelize) => {
  return sequelize.define(
    "CccMasterButtons",
    {
      ccc_master_buttons_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      button_display_name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Optional field
      },
      button_function_name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Optional field
      },
      component_pages_id: {
        type: DataTypes.STRING(255),
        allowNull: false, // Mandatory field to enforce referential integrity
        references: {
          model: "ccc_master_pages", // Name of the referenced table
          key: "pages_id", // Name of the foreign key in the referenced table
        },
        onUpdate: "CASCADE", // Update component_pages_id if pages_id changes in the referenced table
        onDelete: "CASCADE", // Delete rows in this table if the referenced row is deleted
      },
      ccc_master_pages_id: {
        type: DataTypes.STRING(255), // New foreign key column
        allowNull: true, // Set as nullable initially, can be made non-nullable if necessary
        references: {
          model: "ccc_master_pages", // Name of the referenced table
          key: "pages_id", // Foreign key referencing pages_id in ccc_master_pages
        },
        onUpdate: "CASCADE", // Update ccc_master_pages_id in this table if pages_id changes in the referenced table
        onDelete: "CASCADE", // Delete rows in this table if the referenced row is deleted
      },
      button_routes: {
        type: DataTypes.STRING(55),
        allowNull: true, // Optional field
      },
    },
    {
      tableName: "ccc_master_buttons",
      timestamps: false, // Set to true if created_at and updated_at fields are used
    }
  );
};

module.exports = defineCccMasterButtons;
