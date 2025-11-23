const setUpAssociationsCCC = require("../../models/ccc");

const createRevokeLicenseRecordQuery = async ({
  licenseNumber = null,
  toDate = null, // Revoke effective date
  courtId = null, // Court ID
  courtCaseNumber = null, // Court case number
  createdBy = null, // Creator of the record
  action = "REVOKE", // Default action type
  remarks = null, // Optional remarks
}) => {
  try {
    // Validate required fields
    if (!licenseNumber || !toDate || !courtId || !courtCaseNumber || !action) {
      throw new Error(
        "Missing required fields: licenseNumber, toDate, courtId, courtCaseNumber, action"
      );
    }

    const { DepartmentDriversLicenseRevokes } = setUpAssociationsCCC();

    // Create a new record for every action (do not overwrite existing records)
    const newRevokeRecord = await DepartmentDriversLicenseRevokes.create({
      license_number: licenseNumber,
      to_date: toDate,
      court_id: courtId,
      court_case_number: courtCaseNumber,
      action, // Action type (e.g., REVOKE, UNREVOKE)
      remarks, // Optional remarks for the action
      created_by: createdBy,
    });

    return newRevokeRecord; // Return the newly created record
  } catch (error) {
    console.error("Error creating revoke license record:", error);
    throw error; // Propagate the error
  }
};

const getDepartmentDriverLicenseRevokesByLicenseNumberQuery = async ({
  licenseNumber,
}) => {
  try {
    // Validate that licenseNumber is provided
    if (!licenseNumber) {
      throw new Error("License number is required.");
    }

    // Import the necessary Sequelize instance and model definitions
    const { DepartmentDriversLicenseRevokes } = setUpAssociationsCCC(); // Adjust path as per your project structure

    // Fetch all records by license number
    const results = await DepartmentDriversLicenseRevokes.findAll({
      where: {
        license_number: licenseNumber,
      },
      order: [["updated_at", "DESC"]], // Order by 'updated_at' in descending order
      attributes: [
        "id",
        "license_number",
        "to_date",
        "court_id",
        "court_case_number",
        "created_by",
        "created_at",
        "updated_at",
        "action", // Assuming action field for REVOKE/UNREVOKE
        "remarks", // Optional: Track additional information
      ],
    });

    if (!results.length) {
      return {
        status: "ACTIVE",
        revokes: [],
      };
    }

    // Determine the current status based on the most recent action
    const latestAction = results[0]?.action; // Get the action from the latest record
    const isRevoked = latestAction?.toUpperCase() === "REVOKE";

    return {
      status: isRevoked ? "REVOKE" : "ACTIVE",
      revokes: results,
    };
  } catch (error) {
    // Log error and rethrow for external handling
    console.error("Error fetching license revoke records:", error);
    throw error;
  }
};

const getLicenseRevokeStatusQuery = async ({ licenseNumber }) => {
  try {
    // Validate that licenseNumber is provided
    if (!licenseNumber) {
      throw new Error("License number is required.");
    }

    // Import the necessary Sequelize instance and model definitions
    const { DepartmentDriversLicenseRevokes } = setUpAssociationsCCC(); // Adjust path as per your project structure

    // Fetch the most recent record for the given license number
    const latestRecord = await DepartmentDriversLicenseRevokes.findOne({
      where: {
        license_number: licenseNumber,
      },
      order: [["updated_at", "DESC"]], // Order by 'updated_at' in descending order
      attributes: ["action"], // Only fetch the 'action' field
    });

    if (!latestRecord) {
      return "ACTIVE"; // Default status when no revoke records exist
    }

    // Determine the current status based on the latest action
    const isRevoked = latestRecord.action?.toUpperCase() === "REVOKE";
    return isRevoked ? "REVOKE" : "ACTIVE";
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching license revoke status:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

module.exports = {
  createRevokeLicenseRecordQuery,
  getDepartmentDriverLicenseRevokesByLicenseNumberQuery,
  getLicenseRevokeStatusQuery,
};
