const cccHotelGatewaySystemServices = require("../../services/ccc-hotel-gateway-system/service");
const {
  validateSelectedFields,
  hotelFields,
  defaultHotelFields,
} = require("../../utils/cccAllowedFields");

const createHotelController = async (req, res) => {
  try {
    const reqBody = req.body;
    const user_id = req.headers.user_id;
    const data = await cccHotelGatewaySystemServices.createHotelService({
      user_id: user_id,
      reqBody: reqBody,
    });
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllHotelsController = async (req, res) => {
  try {
    const { attributes } = req.query;
    const user_id = req.headers.user_id;

    // Handle the case when attributes is undefined or empty
    let selectedAttributes;

    if (attributes) {
      // Validate and get valid attributes based on allowed fields
      selectedAttributes = validateSelectedFields(attributes, hotelFields);
    } else {
      // If no attributes are provided, default to all fields
      selectedAttributes = hotelFields; // Default to all fields in hotelFields
    }

    // Fetch the hotels data from the service, passing the selected fields
    const data = await cccHotelGatewaySystemServices.getAllHotelsService({
      attributes: selectedAttributes,
      userId: user_id,
    });

    // Respond with the data
    res.send({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch all hotels" });
  }
};

const getHotelByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cccHotelGatewaySystemServices.getHotelByIdService(id);
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel by id" });
  }
};

const updateHotelByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;
    const data = await cccHotelGatewaySystemServices.updateHotelByIdService(
      id,
      reqBody
    );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel by id" });
  }
};

module.exports = {
  createHotelController,
  getAllHotelsController,
  getHotelByIdController,
  updateHotelByIdController,
};
