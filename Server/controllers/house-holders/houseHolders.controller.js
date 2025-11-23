const { json } = require("body-parser");
const houseHoldersServices = require("../../services/house-holders/service");
const {
  validateSelectedFields,
  houseHolderFields,
} = require("../../utils/cccAllowedFields");

// const createHouseholderController = async (req, res) => {
//   const { divisionalSecretariat, gnDivision, createdBy } = req.body;
//   try {
//     const result = await houseHoldersServices.createHouseholderService({
//       divisionalSecretariat,
//       gnDivision,
//       createdBy,
//     });
//     res.status(201).send({
//       message: "Householder created successfully.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error creating householder:", error.message);
//     res.status(500).send({
//       message: "Failed to create householder.",
//       error: error.message,
//     });
//   }
// };

// const createChiefOccupantController = async (req, res) => {
//   const {
//     houseId,
//     fullName,
//     nationality,
//     nicPassportNumber,
//     dob,
//     address,
//     policeStationId,
//     createdBy,
//   } = req.body;
//   try {
//     const result = await houseHoldersServices.createChiefOccupantService({
//       houseId,
//       fullName,
//       nationality,
//       nicPassportNumber,
//       dob,
//       address,
//       policeStationId,
//       createdBy,
//     });
//     res.status(201).send({
//       message: "Chief occupant created successfully.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error creating chief occupant:", error.message);
//     res.status(500).send({
//       message: "Failed to create chief occupant.",
//       error: error.message,
//     });
//   }
// };

// const createFamilyMemberController = async (req, res) => {
//   const {
//     houseId,
//     chiefOccupantId,
//     fullName,
//     nicPassportNumber,
//     dob,
//     nationality,
//     relationshipToChief,
//     createdBy,
//   } = req.body;
//   try {
//     const result = await houseHoldersServices.createFamilyMemberService({
//       houseId,
//       chiefOccupantId,
//       fullName,
//       nicPassportNumber,
//       dob,
//       nationality,
//       relationshipToChief,
//       createdBy,
//     });
//     res.status(201).send({
//       message: "Family member created successfully.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error creating family member:", error.message);
//     res.status(500).send({
//       message: "Failed to create family member.",
//       error: error.message,
//     });
//   }
// };

// const createOtherResidentController = async (req, res) => {
//   const {
//     houseId,
//     chiefOccupantId,
//     fullName,
//     nationality,
//     dob,
//     nicPassportNumber,
//     permanentAddress,
//     purposeOfStay,
//     relationshipToChief,
//     intendedPeriodOfStay,
//     createdBy,
//   } = req.body;
//   try {
//     const result = await houseHoldersServices.createOtherResidentService({
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
//     res.status(201).send({
//       message: "Other resident created successfully.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error creating other resident:", error.message);
//     res.status(500).send({
//       message: "Failed to create other resident.",
//       error: error.message,
//     });
//   }
// };

// const getAllResidentsForHouseController = async (req, res) => {
//   const { houseId } = req.params;
//   try {
//     const result = await houseHoldersServices.getAllResidentsForHouseService({
//       houseId,
//     });
//     if (!result) {
//       return res.status(404).send({
//         message: "No residents found for this house.",
//       });
//     }
//     res.status(200).send({
//       message: "Residents fetched successfully.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error fetching residents for house:", error.message);
//     res.status(500).send({
//       message: "Failed to fetch residents for house.",
//       error: error.message,
//     });
//   }
// };

const createFullHouseholderProcessController = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.headers.user_id;
    const result =
      await houseHoldersServices.createFullHouseholderProcessService(
        data,
        user_id
      );
    res.status(200).send({
      success: true,
      message: "Created new record successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create a new record.",
      error: error.message,
    });
  }
};

const getAllHouseHoldersController = async (req, res) => {
  try {
    const { attributes } = req.query;
    const user_id = req.headers.user_id;

    // Handle the case when attributes is undefined or empty
    let selectedAttributes;

    if (attributes) {
      // Validate and get valid attributes based on allowed fields
      selectedAttributes = validateSelectedFields(
        attributes,
        houseHolderFields
      );
    } else {
      // If no attributes are provided, default to all fields
      selectedAttributes = houseHolderFields; // Default to all fields in houseHolderFields
    }

    // Fetch the hotels data from the service, passing the selected fields
    const data = await houseHoldersServices.getAllHouseHoldersService({
      attributes: selectedAttributes,
      userId: user_id,
    });

    // Respond with the data
    res.send({ success: true, data });
  } catch (error) {
    // Log the error to understand what went wrong
    console.error("Error fetching house holders:", error);

    // Respond with a more detailed error message
    res.status(500).json({
      error: `Failed to fetch all house holders: ${error.message}`,
      stack: error.stack, // Include the stack trace for debugging
    });
  }
};

const getHouseHoldersDataByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await houseHoldersServices.getHouseHoldersDataByIdService(id);
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch house holders data by id" });
  }
};

// Create a controller to fetch all details about house holders, including associated data
const getHouseHolderDataController = async (req, res) => {
  try {
    const data = await houseHoldersServices.getHouseHoldersDataService();
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch house holders data by:" });
  }
};

//create controller fro update verification info
const updateHouseHolderVerificationByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    const confirmed_time = new Date();

    if (!user_id) {
      res.status(500).json({ error: "Failed to authenticate" });
    } else {
      const data =
        await houseHoldersServices.updateHouseHolderConfirmationByIdService(
          id,
          user_id,
          reqBody,
          confirmed_time
        );
      if (data) {
        res.status(200).json({
          success: true,
          message: "Householder updated successfully",
          data,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to update householder confirmation",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update householder confirmation info",
      details: error.message,
    });
  }
};

const updateHouseHoldersDataByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;
    const user_id = req.headers.user_id;
    if (!user_id) {
      res.status(500).json({ error: "Failed to authenticate" });
    } else {
      const data = await houseHoldersServices.updateHouseHoldersDataByIdService(
        user_id,
        id,
        reqBody
      );
      res.send({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update house hoders data by id" });
  }
};

module.exports = {
  // createHouseholderController,
  // createChiefOccupantController,
  // createFamilyMemberController,
  // createOtherResidentController,
  // getAllResidentsForHouseController,
  createFullHouseholderProcessController,
  getAllHouseHoldersController,
  getHouseHoldersDataByIdController,
  updateHouseHoldersDataByIdController,
  getHouseHolderDataController,
  updateHouseHolderVerificationByIdController,
};
