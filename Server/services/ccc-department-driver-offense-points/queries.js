const setUpAssociationsCCC = require("../../models/ccc");

/**
 * Updates the driver's offense points based on the provided license number and points.
 * If the driver does not exist, a new record is created.
 * @param {Object} params - The parameters for updating or creating the points.
 * @param {string} params.licenseNumber - The driver's license number.
 * @param {number} params.points - The points to add or subtract.
 */
const updateDepartmentDriverOffensePointsByLicenseNumberQuery = async ({
  licenseNumber = null,
  points = 0,
}) => {
  try {
    if (!licenseNumber) {
      throw new Error("Invalid license number");
    }

    const { DepartmentDriverOffensePoints, sequelize } = setUpAssociationsCCC();

    // Try to update the existing record
    const [updatedCount, updatedRecords] =
      await DepartmentDriverOffensePoints.update(
        {
          // Calculate the new consumed points and balance points
          consumed_points: sequelize.literal(
            `LEAST(total_points, GREATEST(0, consumed_points + ${points}))`
          ),
          balance_points: sequelize.literal(
            `GREATEST(0, total_points - LEAST(total_points, GREATEST(0, consumed_points + ${points})))`
          ),
          updated_at: new Date(), // Update the timestamp
        },
        {
          where: { license_number: licenseNumber },
          returning: true, // To return the updated record
        }
      );

    // If no records were updated, create a new one
    if (updatedCount === 0) {
      // Set initial values for a new record
      const initialConsumedPoints = Math.max(0, points);
      const initialBalancePoints = Math.max(0, 100 - initialConsumedPoints); // assuming total_points = 100

      // Create a new record
      const newRecord = await DepartmentDriverOffensePoints.create({
        license_number: licenseNumber,
        consumed_points: initialConsumedPoints, // Set consumed points
        balance_points: initialBalancePoints, // Set balance points
        total_points: 100, // Set total points to 100
      });

      return newRecord; // Return the newly created record
    }

    return updatedRecords[0]; // Return the updated record
  } catch (error) {
    throw error; // Propagate the error
  }
};

/**
 * Retrieves the driver's offense points record based on the provided license number.
 * @param {Object} params - The parameters for retrieving the record.
 * @param {string} params.licenseNumber - The driver's license number.
 * @returns {Promise<Object|null>} - Returns the driver's record if found, otherwise null.
 */
const getDepartmentDriverOffensePointsByLicenseNumberQuery = async ({
  licenseNumber,
}) => {
  try {
    if (!licenseNumber) {
      throw new Error("Invalid license number");
    }

    const { DepartmentDriverOffensePoints } = setUpAssociationsCCC();

    // Retrieve the record by license number
    const record = await DepartmentDriverOffensePoints.findOne({
      where: { license_number: licenseNumber },
    });

    if (!record) {
      return null; // No record found
    }

    return record; // Return the found record
  } catch (error) {
    throw error; // Propagate the error
  }
};

module.exports = {
  updateDepartmentDriverOffensePointsByLicenseNumberQuery,
  getDepartmentDriverOffensePointsByLicenseNumberQuery,
};
