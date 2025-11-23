const cccHotelGatewaySystemQueries = require("./queries");

const createHotelService = async ({ reqBody = {}, user_id }) => {
  try {
    // Ensure `user_id` is provided
    if (!user_id) {
      throw new Error("User ID is required to create a hotel record.");
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "street_address",
      "province_id",
      "district_id",
      "city_id",
      "type",
    ];

    for (const field of requiredFields) {
      if (!reqBody[field]) {
        throw new Error(`${field} is required.`);
      }
    }

    // Apply validation for rooms and rating
    if (reqBody.rooms && (reqBody.rooms < 1 || reqBody.rooms > 10000)) {
      throw new Error("Rooms must be between 1 and 1000.");
    }

    if (reqBody.rating && (reqBody.rating < 1 || reqBody.rating > 7)) {
      throw new Error("Rating must be between 1 and 7.");
    }

    // Call the query to create the hotel record, passing the entire reqBody
    const data = await cccHotelGatewaySystemQueries.createHotelQuery({
      ...reqBody,
      createdBy: user_id, // Add user_id to the body
    });

    return data;
  } catch (error) {
    // Log the error and provide a user-friendly message
    console.error("Error creating hotel record:", error.message);
    throw new Error(
      "Failed to create hotel record. Please ensure the provided data is correct and try again."
    );
  }
};

const getAllHotelsService = async ({ attributes = null, userId = null }) => {
  try {
    const response = await cccHotelGatewaySystemQueries.getAllHotelsQuery({
      attributes,
      userId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getHotelByIdService = async (id) => {
  try {
    const response = await cccHotelGatewaySystemQueries.getHotelByIdQuery(id);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateHotelByIdService = async (id, updatedFields) => {
  try {
    const response = await cccHotelGatewaySystemQueries.updateHotelByIdQuery(
      id,
      updatedFields
    );
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createHotelService,
  getAllHotelsService,
  getHotelByIdService,
  updateHotelByIdService,
};
