const houseHoldersQueries = require("./queries"); // Assuming queries are defined in a separate file

// const createHouseholderService = async ({
//   divisionalSecretariat,
//   gnDivision,
//   createdBy,
// }) => {
//   try {
//     const data = await houseHoldersQueries.createHouseHolderQuery({
//       divisionalSecretariat,
//       gnDivision,
//       createdBy,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error creating householder:", error.message);
//     throw new Error("Failed to create householder. " + error.message);
//   }
// };

// const createChiefOccupantService = async ({
//   houseId,
//   fullName,
//   nationality,
//   nicPassportNumber,
//   dob,
//   address,
//   policeStationId,
//   createdBy,
// }) => {
//   try {
//     const data = await houseHoldersQueries.createChiefOccupantQuery({
//       houseId,
//       fullName,
//       nationality,
//       nicPassportNumber,
//       dob,
//       address,
//       policeStationId,
//       createdBy,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error creating chief occupant:", error.message);
//     throw new Error("Failed to create chief occupant. " + error.message);
//   }
// };

// const createFamilyMemberService = async ({
//   houseId,
//   chiefOccupantId,
//   fullName,
//   nicPassportNumber,
//   dob,
//   nationality,
//   relationshipToChief,
//   createdBy,
// }) => {
//   try {
//     const data = await houseHoldersQueries.createFamilyMemberQuery({
//       houseId,
//       chiefOccupantId,
//       fullName,
//       nicPassportNumber,
//       dob,
//       nationality,
//       relationshipToChief,
//       createdBy,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error creating family member:", error.message);
//     throw new Error("Failed to create family member. " + error.message);
//   }
// };

// const createOtherResidentService = async ({
//   houseId,
//   chiefOccupantId,
//   fullName,
//   nationality,
//   dob,
//   nicPassportNumber,
//   permanentAddress,
//   purposeOfStay,
//   relationshipToChief,
//   intendedPeriodOfStay,
//   createdBy,
// }) => {
//   try {
//     const data = await houseHoldersQueries.createOtherResidentQuery({
//       houseId,
//       chiefOccupantId,
//       fullName,
//       nationality,
//       dob,
//       nicPassportNumber,
//       permanentAddress,
//       purposeOfStay,
//       relationshipToChief,
//       intendedPeriodOfStay,
//       createdBy,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error creating other resident:", error.message);
//     throw new Error("Failed to create other resident. " + error.message);
//   }
// };

// const getAllResidentsForHouseService = async ({ houseId }) => {
//   try {
//     const data = await houseHoldersQueries.getAllResidentsForHouseQuery({
//       houseId,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error fetching residents for house:", error.message);
//     throw new Error(
//       "Failed to fetch residents for the house. " + error.message
//     );
//   }
// };

const createFullHouseholderProcessService = async (data, userId) => {
  try {
    const houseHolder = await houseHoldersQueries.createHouseHolderQuery({
      ...data,
      createdBy: userId,
    });
    const chiefOccupants =
      await houseHoldersQueries.createManyChiefOccupantQuery(
        houseHolder?.id,
        data?.chiefOccupants,
        userId
      );

    const familyMembers =
      await houseHoldersQueries.createManyFamilyMembersQuery(
        houseHolder?.id,
        data?.familyMembers,
        userId
      );

    const otherResidents =
      await houseHoldersQueries.createManyOtherResidentsQuery(
        houseHolder?.id,
        data?.otherResidents,
        userId
      );

    return { message: "Succesffuly inserted data" };
  } catch (error) {
    throw new Error(
      "Failed to create full house holder process " + error.message
    );
  }
};

const getAllHouseHoldersService = async ({
  attributes = null,
  userId = null,
}) => {
  try {
    const response = await houseHoldersQueries.getAllHouseHoldersQuery({
      attributes,
      userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getHouseHoldersDataByIdService = async (id) => {
  try {
    const response = await houseHoldersQueries.getHouseHoldersDataByIdQuery({
      houseId: id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Create a service to fetch all details about house holders, including associated data
const getHouseHoldersDataService = async () => {
  try {
    const response = await houseHoldersQueries.getHouseHoldersDataQuery();
    return response;
  } catch (error) {
    throw error;
  }
};
// create a service fro updated confirmation info
const updateHouseHolderConfirmationByIdService = async (
  id,
  user_id,
  reqBody,
  confirmed_time
) => {
  try {
    //update verified info in house holder
    await houseHoldersQueries.updateHouseHolderVerifiedByIdQuery(
      id,
      user_id,
      reqBody,
      confirmed_time
    );

    //update ststus in chief occupant table
    const newStatus = "verified";
    await houseHoldersQueries.updateAllChiefOccupantsStatusByHouseIdQuery(
      id,
      newStatus
    );

    //update ststus in famillymember table
    await houseHoldersQueries.updateAllFamillyMemberByHouseIdQuery(
      id,
      newStatus
    );

    //update status in other residents table
    await houseHoldersQueries.updateAllOtherResidentsByHouseIdQuery(
      id,
      newStatus
    );

    return {
      message: "Householder and related entities updated successfully.",
    };
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
const updateHouseHoldersDataByIdService = async (userId, id, updatedFields) => {
  try {
    // Create an array to hold the update promises
    const updatePromises = [];

    // Always update the house holder itself
    updatePromises.push(
      houseHoldersQueries.updateHouseHolderByIdQuery(id, updatedFields)
    );

    // Check and update the chiefOccupants if provided
    if (updatedFields?.chiefOccupants?.length > 0) {
      updatePromises.push(
        houseHoldersQueries.updateChiefOccupantsByHouseIdQuery(
          userId,
          id,
          updatedFields.chiefOccupants
        )
      );
    }

    // Check and update the familyMembers if provided
    if (updatedFields?.familyMembers?.length > 0) {
      updatePromises.push(
        houseHoldersQueries.updateFamilyMembersByHouseIdQuery(
          userId,
          id,
          updatedFields.familyMembers
        )
      );
    }

    // Check and update the otherResidents if provided
    if (updatedFields?.otherResidents?.length > 0) {
      updatePromises.push(
        houseHoldersQueries.updateOtherResidentsByHouseIdQuery(
          userId,
          id,
          updatedFields.otherResidents
        )
      );
    }

    // Wait for all updates to complete in parallel
    const results = await Promise.all(updatePromises);

    // Return a response indicating all updates were successfully completed
    return { message: "House holder data updated successfully", results };
  } catch (error) {
    // Log the error and throw it
    console.error("Error updating house holder data:", error);
    throw new Error("Failed to update house holder data.");
  }
};

module.exports = {
  // createHouseholderService,
  // createChiefOccupantService,
  // createFamilyMemberService,
  // createOtherResidentService,
  // getAllResidentsForHouseService,
  createFullHouseholderProcessService,
  getAllHouseHoldersService,
  getHouseHoldersDataByIdService,
  updateHouseHoldersDataByIdService,
  getHouseHoldersDataService,
  updateHouseHolderConfirmationByIdService,
};
