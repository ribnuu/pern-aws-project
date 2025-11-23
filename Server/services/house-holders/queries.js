const { where } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const createHouseHolderQuery = async ({
  divisional_secretariat,
  gn_division,
  location_url, // Added location_url as a parameter
  street_address,
  address_line_2,
  province_id,
  district_id,
  city_id,
  postal_code,
  createdBy,
}) => {
  try {
    const { HouseHolders } = setUpAssociationsCCC();

    const newHouse = await HouseHolders.create({
      divisional_secretariat,
      gn_division,
      location_url: location_url, // Set location_url
      street_address,
      address_line_2,
      province_id,
      district_id,
      city_id,
      postal_code,
      created_by: createdBy,
      // Let Sequelize handle the created_at and updated_at fields automatically
    });

    return newHouse;
  } catch (error) {
    console.error("Error creating house holder:", error.message);
    throw new Error("Failed to create house holder. " + error.message);
  }
};

const createManyChiefOccupantQuery = async (
  houseId,
  chiefOccupantsData,
  createdBy
) => {
  try {
    if (!houseId) {
      throw new Error("House Id is not provided");
    }
    const { HouseHoldersChiefOccupants } = setUpAssociationsCCC();

    // Bulk creation of chief occupants
    const newChiefOccupants = await HouseHoldersChiefOccupants.bulkCreate(
      chiefOccupantsData.map((occupant) => ({
        id: occupant.id,
        house_id: houseId,
        full_name: occupant.full_name,
        nationality: occupant.nationality,
        gender: occupant.gender,
        nic_passport_number: occupant.nic_passport_number,
        dob: occupant.dob,
        contact_number: occupant?.contact_number,
        street_address: occupant.street_address,
        address_line_2: occupant.address_line_2,
        province_id: occupant.province_id,
        district_id: occupant.district_id,
        city_id: occupant.city_id,
        status: occupant.status,
        profession: occupant.profession,
        email: occupant.email,
        marital_status: occupant.marital_status,
        postal_code: occupant.postal_code,
        police_station_id: occupant.police_station_id,
        created_by: createdBy,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );

    return newChiefOccupants;
  } catch (error) {
    console.error("Error creating chief occupants:", error.message);
    console.error("Error stack trace:", error.stack); // Add stack trace for debugging
    throw new Error("Failed to create chief occupants. " + error.message);
  }
};

const createManyFamilyMembersQuery = async (
  houseId,
  familyMembersData,
  createdBy
) => {
  try {
    if (!houseId) {
      throw new Error("House Id is not provided");
    }
    const { HouseHoldersFamilyMembers } = setUpAssociationsCCC();

    // Bulk creation of family members
    const newFamilyMembers = await HouseHoldersFamilyMembers.bulkCreate(
      familyMembersData.map((member) => ({
        house_id: houseId,
        chief_occupant_id: member.chief_occupant_id,
        full_name: member.full_name,
        nic_passport_number: member.nic_passport_number,
        contact_number: member.contact_number,
        // street_address: member.street_address,
        // address_line_2: member.address_line_2,
        // province_id: member.province_id,
        // district_id: member.district_id,
        // city_id: member.city_id,
        // postal_code: member.postal_code,
        dob: member.dob,
        nationality: member.nationality,
        gender: member.gender,
        relationship_to_chief: member.relationship_to_chief,
        status: member.status,
        profession: member.profession,
        email: member.email,
        marital_status: member.marital_status,
        created_by: createdBy,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );

    return newFamilyMembers;
  } catch (error) {
    console.error("Error creating family members:", error.message);
    throw new Error("Failed to create family members. " + error.message);
  }
};

const createManyOtherResidentsQuery = async (
  houseId,
  otherResidentsData,
  createdBy
) => {
  try {
    if (!houseId) {
      throw new Error("House Id is not provided");
    }
    const { HouseHoldersOtherResidents } = setUpAssociationsCCC();

    // Bulk creation of other residents
    const newOtherResidents = await HouseHoldersOtherResidents.bulkCreate(
      otherResidentsData.map((resident) => ({
        house_id: houseId,
        full_name: resident.full_name,
        nationality: resident.nationality,
        gender: resident.gender,
        marital_status: resident.marital_status,
        nic_passport_number: resident.nic_passport_number,
        dob: resident.dob,
        purpose_of_stay: resident.purpose_of_stay,
        relationship_to_chief: resident.relationship_to_chief,
        from_date: resident.from_date,
        to_date: resident.to_date,
        contact_number: resident.contact_number,
        street_address: resident.street_address,
        address_line_2: resident.address_line_2,
        province_id: resident.province_id,
        district_id: resident.district_id,
        city_id: resident.city_id,
        postal_code: resident.postal_code,
        status: resident.status,
        profession: resident.profession,
        email: resident.email,
        police_station_id: resident.police_station_id,
        chief_occupant_id: resident.chief_occupant_id,
        relationship_to_chief: resident.relationship_to_chief,
        created_by: createdBy,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );

    return newOtherResidents;
  } catch (error) {
    console.error("Error creating other residents:", error.message);
    throw new Error("Failed to create other residents. " + error.message);
  }
};

const getAllHouseHoldersQuery = async ({
  attributes = null,
  userId = null,
}) => {
  try {
    const {
      HouseHolders,
      CccMasterProvince,
      CccMasterDistrict,
      CccMasterCity,
      HouseHoldersChiefOccupants,
      HouseHoldersFamilyMembers,
      HouseHoldersOtherResidents,
    } = setUpAssociationsCCC();

    // Determine which attributes to fetch based on the passed "attributes" parameter
    const selectedAttributes = attributes ? attributes : null;

    // Fetch all hotels where deleted_at is null, including the associations
    const data = await HouseHolders.findAll({
      where: {
        deleted_at: null, // Only fetch records where deleted_at is null
        created_by: userId,
      },
      attributes: selectedAttributes, // Dynamically select attributes
      include: [
        {
          model: CccMasterProvince, // Include province details
          as: "province",
        },
        {
          model: CccMasterDistrict, // Include district details
          as: "district",
        },
        {
          model: CccMasterCity, // Include city details
          as: "city",
        },
      ],
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// const createChiefOccupantQuery = async ({
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
//     const { HouseHoldersChiefOccupants } = setUpAssociationsCCC();

//     const newChiefOccupant = await HouseHoldersChiefOccupants.create({
//       house_id: houseId,
//       full_name: fullName,
//       nationality,
//       nic_passport_number: nicPassportNumber,
//       dob,
//       address,
//       police_station_id: policeStationId,
//       created_by: createdBy,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     return newChiefOccupant;
//   } catch (error) {
//     console.error("Error creating chief occupant:", error.message);
//     throw new Error("Failed to create chief occupant. " + error.message);
//   }
// };

// const createFamilyMemberQuery = async ({
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
//     const { HouseHoldersFamilyMembers } = setUpAssociationsCCC();

//     const newFamilyMember = await HouseHoldersFamilyMembers.create({
//       house_id: houseId,
//       chief_occupant_id: chiefOccupantId,
//       full_name: fullName,
//       nic_passport_number: nicPassportNumber,
//       dob,
//       nationality,
//       relationship_to_chief: relationshipToChief,
//       created_by: createdBy,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     return newFamilyMember;
//   } catch (error) {
//     console.error("Error creating family member:", error.message);
//     throw new Error("Failed to create family member. " + error.message);
//   }
// };

// const createOtherResidentQuery = async ({
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
//     const { HouseHoldersOtherResidents } = setUpAssociationsCCC();

//     const newOtherResident = await HouseHoldersOtherResidents.create({
//       house_id: houseId,
//       chief_occupant_id: chiefOccupantId,
//       full_name: fullName,
//       nationality,
//       dob,
//       nic_passport_number: nicPassportNumber,
//       permanent_address: permanentAddress,
//       purpose_of_stay: purposeOfStay,
//       relationship_to_chief: relationshipToChief,
//       intended_period_of_stay: intendedPeriodOfStay,
//       created_by: createdBy,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     return newOtherResident;
//   } catch (error) {
//     console.error("Error creating other resident:", error.message);
//     throw new Error("Failed to create other resident. " + error.message);
//   }
// };

// const getAllResidentsForHouseQuery = async ({ houseId }) => {
//   try {
//     const {
//       HouseHolders,
//       HouseHoldersChiefOccupants,
//       HouseHoldersFamilyMembers,
//       HouseHoldersOtherResidents,
//     } = setUpAssociationsCCC();

//     const house = await HouseHolders.findOne({
//       where: { id: houseId },
//       include: [
//         {
//           model: HouseHoldersChiefOccupants,
//           as: "chiefOccupants",
//         },
//         {
//           model: HouseHoldersFamilyMembers,
//           as: "familyMembers",
//         },
//         {
//           model: HouseHoldersOtherResidents,
//           as: "otherResidents",
//         },
//       ],
//     });

//     return house;
//   } catch (error) {
//     console.error("Error fetching residents for house:", error.message);
//     throw new Error(
//       "Failed to fetch residents for the house. " + error.message
//     );
//   }
// };

const getHouseHoldersDataByIdQuery = async ({ houseId }) => {
  try {
    const {
      HouseHolders,
      HouseHoldersChiefOccupants,
      HouseHoldersFamilyMembers,
      HouseHoldersOtherResidents,
      CccMasterProvince,
      CccMasterDistrict,
      CccMasterCity,
      PoliceStationMaster,
    } = setUpAssociationsCCC();

    const house = await HouseHolders.findOne({
      where: { id: houseId },
      include: [
        {
          model: HouseHoldersChiefOccupants,
          as: "chiefOccupants",
          include: [
            {
              model: CccMasterProvince,
              as: "province",
            },
            {
              model: CccMasterDistrict,
              as: "district",
            },
            {
              model: CccMasterCity,
              as: "city",
            },
            {
              model: PoliceStationMaster,
              as: "policeStation",
            },
          ],
        },
        {
          model: HouseHoldersFamilyMembers,
          as: "familyMembers",
        },
        {
          model: HouseHoldersOtherResidents,
          as: "otherResidents",
          include: [
            {
              model: CccMasterProvince,
              as: "province",
            },
            {
              model: CccMasterDistrict,
              as: "district",
            },
            {
              model: CccMasterCity,
              as: "city",
            },
          ],
        },
        {
          model: CccMasterCity,
          as: "city",
        },
        {
          model: CccMasterDistrict,
          as: "district",
        },
        {
          model: CccMasterProvince,
          as: "province",
        },
      ],
    });

    return house;
  } catch (error) {
    console.error("Error fetching residents for house:", error.message);
    throw new Error(
      "Failed to fetch residents for the house. " + error.message
    );
  }
};

// Create a query to fetch all details about house holders, including associated data
// such as province, district, city, chief occupants, family members, and other residents.
const getHouseHoldersDataQuery = async () => {
  try {
    const {
      HouseHolders,
      HouseHoldersChiefOccupants,
      HouseHoldersFamilyMembers,
      HouseHoldersOtherResidents,
      CccMasterProvince,
      CccMasterDistrict,
      CccMasterCity,
      PoliceStationMaster,
    } = setUpAssociationsCCC();

    const house = await HouseHolders.findAll({
      include: [
        {
          model: HouseHoldersChiefOccupants,
          as: "chiefOccupants",
          include: [
            {
              model: CccMasterProvince,
              as: "province",
            },
            {
              model: CccMasterDistrict,
              as: "district",
            },
            {
              model: CccMasterCity,
              as: "city",
            },
            {
              model: PoliceStationMaster,
              as: "policeStation",
            },
          ],
        },
        {
          model: HouseHoldersFamilyMembers,
          as: "familyMembers",
          // include: [
          //   {
          //     model: HouseHoldersChiefOccupants,
          //     as: "chiefOccupant",
          //   },
          // ],
        },
        {
          model: HouseHoldersOtherResidents,
          as: "otherResidents",
          include: [
            {
              model: CccMasterProvince,
              as: "province",
            },
            {
              model: CccMasterDistrict,
              as: "district",
            },
            {
              model: CccMasterCity,
              as: "city",
            },
          ],
        },
        {
          model: CccMasterCity,
          as: "city",
        },
        {
          model: CccMasterDistrict,
          as: "district",
        },
        {
          model: CccMasterProvince,
          as: "province",
        },
        // {
        //   model: PoliceStationMaster,
        //   as: "policeStation",
        // },
      ],
    });

    return house;
  } catch (error) {
    console.error("Error fetching residents for house:", error.message);
    throw new Error(
      "Failed to fetch residents for the house. " + error.message
    );
  }
};

//create query for update verification info
const updateHouseHolderVerifiedByIdQuery = async (
  id,
  user_id,
  reqBody,
  confirmed_time
) => {
  const { HouseHolders } = setUpAssociationsCCC();
  const updateFields = {
    confirmed_user_id: user_id,
    confirmed_user_station_id: reqBody.confirmed_user_station_id,
    confirmed_time: confirmed_time,
    confirmed: reqBody.confirmed,
  };

  //Find the house holder by Id
  const houseHolder = await HouseHolders.findOne({
    where: { id },
  });

  //Check if the house holder exists
  if (!houseHolder) {
    throw new Error(`House holder with ID ${id} not found.`);
  }

  // Update the householder with the confirmation info
  await houseHolder.update(updateFields);

  return houseHolder;
};

const updateHouseHolderByIdQuery = async (id, updatedFields) => {
  try {
    const { HouseHolders } = setUpAssociationsCCC();

    // Find the house holder by ID
    const houseHolder = await HouseHolders.findOne({
      where: { id },
    });

    // Check if the house holder exists
    if (!houseHolder) {
      throw new Error(`House holder with ID ${id} not found.`);
    }

    // Update the house with the provided fields
    const updatedHouseHolder = await houseHolder.update(updatedFields);

    return updatedHouseHolder;
  } catch (error) {
    throw error;
  }
};

const updateFamilyMembersByHouseIdQuery = async (
  userId,
  houseId,
  updatedFamilyMembers
) => {
  try {
    const { HouseHoldersFamilyMembers } = setUpAssociationsCCC();

    // Loop through the family members to update them one by one
    for (const updatedFamilyMember of updatedFamilyMembers) {
      const { id, ...updateFields } = updatedFamilyMember;

      // Ensure the family member exists before updating
      const familyMember = await HouseHoldersFamilyMembers.findOne({
        where: { id, house_id: houseId },
      });

      // If the family member does not exist, throw an error
      if (!familyMember) {
        // throw new Error(
        //   `Family member with ID ${id} not found in this house holder.`
        // );
        await createManyFamilyMembersQuery(
          houseId,
          [updatedFamilyMember],
          userId
        );
      } else {
        // Update the family member with the provided fields
        await familyMember.update(updateFields);
      }
    }

    return { message: "Family members updated successfully." };
  } catch (error) {
    throw error;
  }
};

const updateChiefOccupantsByHouseIdQuery = async (
  userId,
  houseId,
  updatedChiefOccupants
) => {
  try {
    const { HouseHoldersChiefOccupants } = setUpAssociationsCCC();

    // Loop through the updated chief occupants to update them one by one
    for (const updatedChiefOccupant of updatedChiefOccupants) {
      const { id, ...updateFields } = updatedChiefOccupant;

      // Ensure the chief occupant exists before updating
      const chiefOccupant = await HouseHoldersChiefOccupants.findOne({
        where: { id, house_id: houseId },
      });

      // If the chief occupant does not exist, throw an error
      if (!chiefOccupant) {
        // throw new Error(
        //   `Chief occupant with ID ${id} not found in this house holder.`
        // );
        await createManyChiefOccupantQuery(
          houseId,
          [updatedChiefOccupant],
          userId
        );
      } else {
        // Update the chief occupant with the provided fields
        await chiefOccupant.update(updateFields);
      }
    }

    return { message: "Chief occupants updated successfully." };
  } catch (error) {
    throw error;
  }
};

const updateOtherResidentsByHouseIdQuery = async (
  userId,
  houseId,
  updatedResidents
) => {
  try {
    const { HouseHoldersOtherResidents } = setUpAssociationsCCC();

    // Loop through the updated other residents to update them one by one
    for (const updatedResident of updatedResidents) {
      const { id, ...updateFields } = updatedResident;

      // Ensure the other resident exists before updating
      const resident = await HouseHoldersOtherResidents.findOne({
        where: { id, house_id: houseId },
      });

      // If the resident does not exist, throw an error
      if (!resident) {
        // throw new Error(
        //   `Other resident with ID ${id} not found in this house holder.`
        // );
        await createManyOtherResidentsQuery(houseId, [updatedResident], userId);
      } else {
        // Update the resident with the provided fields
        await resident.update(updateFields);
      }
    }

    return { message: "Other residents updated successfully." };
  } catch (error) {
    throw error;
  }
};

//crate a query for update all status in chief occupants
const updateAllChiefOccupantsStatusByHouseIdQuery = async (
  houseId,
  newStatus
) => {
  try {
    const { HouseHoldersChiefOccupants } = setUpAssociationsCCC();

    // Update all chief occupants for the given house ID
    const result = await HouseHoldersChiefOccupants.update(
      { verified: newStatus }, // field to update
      { where: { house_id: houseId } } //condition
    );

    return {
      message: `${result[0]} chief occupant(s) updated to status '${newStatus}'.`,
    };
  } catch (error) {
    throw error;
  }
};
//create a query for update all status in famillyMember
const updateAllFamillyMemberByHouseIdQuery = async (houseId, newStatus) => {
  try {
    const { HouseHoldersFamilyMembers } = setUpAssociationsCCC();

    //update all familly members for given house Id
    const result = await HouseHoldersFamilyMembers.update(
      { verified: newStatus }, //field to update
      { where: { house_id: houseId } } //condition
    );

    return {
      message: `${result[0]} familly member(s) updated to status '${newStatus}'.`,
    };
  } catch (error) {
    throw error;
  }
};

//create a query for update all status in otherResidents
const updateAllOtherResidentsByHouseIdQuery = async (houseId, newStatus) => {
  try {
    const { HouseHoldersOtherResidents } = setUpAssociationsCCC();

    //update all other residents for given house Id
    const result = await HouseHoldersOtherResidents.update(
      { verified: newStatus }, // field to update
      { where: { house_id: houseId } } //condition
    );

    return {
      message: `${result[0]} other resident(s) updated to status '${newStatus}'.`,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createHouseHolderQuery,
  createManyChiefOccupantQuery,
  createManyFamilyMembersQuery,
  createManyOtherResidentsQuery,
  getAllHouseHoldersQuery,
  getHouseHoldersDataByIdQuery,
  updateHouseHolderByIdQuery,
  updateFamilyMembersByHouseIdQuery,
  updateChiefOccupantsByHouseIdQuery,
  updateOtherResidentsByHouseIdQuery,
  getHouseHoldersDataQuery,
  updateHouseHolderVerifiedByIdQuery,
  updateAllChiefOccupantsStatusByHouseIdQuery,
  updateAllFamillyMemberByHouseIdQuery,
  updateAllOtherResidentsByHouseIdQuery,
  // createChiefOccupantQuery,
  // createFamilyMemberQuery,
  // createOtherResidentQuery,
  // getAllResidentsForHouseQuery,
};
