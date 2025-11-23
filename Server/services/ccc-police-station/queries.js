const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const searchPoliceStationQuery = async ({
  searchTerm,
  loadOnMount = false,
}) => {
  try {
    const { PoliceStationMaster } = setUpAssociationsCCC();

    // Check if loadOnMount is true
    if (loadOnMount) {
      // Return all records if loadOnMount is true
      const records = await PoliceStationMaster.findAll();
      return records;
    }

    // If loadOnMount is false, filter based on searchTerm
    const records = await PoliceStationMaster.findAll({
      where: {
        // Use Op.iLike for case-insensitive search in PostgreSQL
        police_station_name: {
          [Op.iLike]: `%${searchTerm}%`, // Search term for police station name
        },
      },
    });

    return records;
  } catch (error) {
    throw error;
  }
};

const assignPoliceOfficerToPoliceStationQuery = async ({
  policeOfficerId,
  policeStationId,
  createdBy,
}) => {
  try {
    const { DepartmentPoliceOfficerTransfers, DepartmentPoliceHrData } =
      setUpAssociationsCCC();

    // Validate police officer and police station IDs (add your own validation logic here)
    if (!policeOfficerId || !policeStationId) {
      throw new Error("Invalid police officer or police station ID.");
    }

    // Find the current active transfer record for the police officer
    const currentTransfer = await DepartmentPoliceOfficerTransfers.findOne({
      where: {
        user_id: policeOfficerId,
        transferred_on: null, // Find the record that is currently active (not yet transferred)
      },
    });

    // If there's an active transfer to the same station, do nothing or throw an error
    if (
      currentTransfer &&
      currentTransfer.police_station_id === policeStationId
    ) {
      throw new Error(
        "Police officer is already assigned to this police station."
      );
    }

    // If there's a previous active transfer, update the transferred_on date
    if (currentTransfer) {
      await currentTransfer.update({
        transferred_on: new Date(), // Set the transferred date to now
      });
    }

    // Create a new transfer record for the current assignment
    const newTransferRecord = await DepartmentPoliceOfficerTransfers.create({
      user_id: policeOfficerId,
      police_station_id: policeStationId,
      created_by: createdBy,
      created_at: new Date(), // Current timestamp
      updated_at: new Date(), // Current timestamp
      transferred_on: null, // Set transferred_on to null for the new record
    });

    // Check for existing record in DepartmentPoliceHrData
    const existingRecord = await DepartmentPoliceHrData.findOne({
      where: { user_id: policeOfficerId },
    });

    if (existingRecord) {
      // If the record exists, update it
      await DepartmentPoliceHrData.update(
        { police_station_master_id: policeStationId }, // Set the new police station ID
        { where: { user_id: policeOfficerId } } // Identify the record to update
      );
    } else {
      // If the record doesn't exist, create a new one
      await DepartmentPoliceHrData.create({
        user_id: policeOfficerId,
        police_station_master_id: policeStationId,
        // Add other fields if necessary (e.g., created_at, updated_at)
      });
    }

    return newTransferRecord; // Return the newly created transfer record
  } catch (error) {
    console.error("Error in assigning police officer:", error.message);
    throw new Error(
      "Failed to assign police officer to police station. " + error.message
    );
  }
};

const getPoliceStationIdByPoliceOfficerIdQuery = async ({
  policeOfficerId,
}) => {
  try {
    const { DepartmentPoliceHrData } = setUpAssociationsCCC();
    const response = await DepartmentPoliceHrData.findOne({
      where: { user_id: policeOfficerId },
      attributes: ["police_station_master_id"],
    });
    return response.police_station_master_id;
  } catch (error) {
    console.error("No police station assigned for given police officer");
    throw error;
  }
};
module.exports = {
  searchPoliceStationQuery,
  assignPoliceOfficerToPoliceStationQuery,
  getPoliceStationIdByPoliceOfficerIdQuery,
};
