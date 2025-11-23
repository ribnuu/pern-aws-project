const setUpAssociationsCCC = require("../../models/ccc");

const createHotelQuery = async ({
  name,
  street_address,
  address_line_2 = null,
  province_id,
  district_id,
  city_id,
  postal_code = null,
  location_url = null,
  hotel_main_contact_number = null,
  hotel_whatsapp_number = null,
  manager_contact_number = null,
  security_contact_number = null,
  website = null,
  rooms,
  type,
  rating,
  createdBy,
  security_officials = null,
  security_cameras = null,
  guard_schedule = null,
  floor_specific_access = false,
  elevator_security = false,
  smart_lock_system = false,
  digital_lock_system = false,
  traditional_room_security_locks = false,
  enhanced_room_security = false,
  peepholes = false,
  luggage_scanning = false,
  luggage_tags_and_tracking = false,
  private_luggage_handling = false,
  uniformed_and_plainclothes_security = false,
  silent_alarms = false,
  in_room_personal_safe = false,
  //
  incident_reporting_log_book = false,
  cctv_video_surveillance_24_7 = false,
  centralized_monitoring_24_7 = false,
  compulsory_id_passport_verification = false,
  trained_security_team_24_7 = false,
  emergency_response_plans_24_7 = false,
}) => {
  try {
    const { CccHotels } = setUpAssociationsCCC();

    // Create the new hotel record with additional fields
    const newHotel = await CccHotels.create({
      name,
      street_address,
      address_line_2,
      province_id,
      district_id,
      city_id,
      postal_code,
      location_url,
      hotel_main_contact_number,
      hotel_whatsapp_number,
      manager_contact_number,
      security_contact_number,
      website,
      rooms,
      type,
      rating,
      created_by: createdBy,
      security_officials,
      security_cameras,
      guard_schedule,
      floor_specific_access,
      elevator_security,
      smart_lock_system,
      digital_lock_system,
      traditional_room_security_locks,
      enhanced_room_security,
      peepholes,
      luggage_scanning,
      luggage_tags_and_tracking,
      private_luggage_handling,
      uniformed_and_plainclothes_security,
      silent_alarms,
      in_room_personal_safe,
      //
      incident_reporting_log_book,
      cctv_video_surveillance_24_7,
      centralized_monitoring_24_7,
      compulsory_id_passport_verification,
      trained_security_team_24_7,
      emergency_response_plans_24_7,
    });

    return newHotel;
  } catch (error) {
    throw error;
  }
};

const getAllHotelsQuery = async ({ attributes = null, userId = null }) => {
  try {
    const { CccHotels, CccMasterProvince, CccMasterDistrict, CccMasterCity } =
      setUpAssociationsCCC();

    // Determine which attributes to fetch based on the passed "attributes" parameter
    const selectedAttributes = attributes ? attributes : null;

    // Fetch all hotels where deleted_at is null, including the associations
    const data = await CccHotels.findAll({
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

const getHotelByIdQuery = async (id, attributes = null) => {
  try {
    const { CccHotels, CccMasterProvince, CccMasterDistrict, CccMasterCity } =
      setUpAssociationsCCC();

    if (!id) {
      throw new Error("Hotel ID is required to fetch the hotel details.");
    }

    // Fetch the hotel by ID, include the associations, and optionally select attributes
    const data = await CccHotels.findOne({
      where: {
        id, // Fetch the hotel with the specific ID
        deleted_at: null, // Ensure the record is not soft-deleted
      },
      attributes: attributes || undefined, // Conditionally apply attributes if provided
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

    if (!data) {
      throw new Error(`Hotel with ID ${id} not found.`);
    }

    return data;
  } catch (error) {
    console.error("Error in getHotelByIdQuery:", error.message);
    throw error;
  }
};

const updateHotelByIdQuery = async (id, updatedFields) => {
  try {
    const { CccHotels } = setUpAssociationsCCC();

    // Find the hotel by ID
    const hotel = await CccHotels.findOne({
      where: { id },
    });

    // Check if the hotel exists
    if (!hotel) {
      throw new Error(`Hotel with ID ${id} not found.`);
    }

    // Update the hotel with the provided fields
    const updatedHotel = await hotel.update(updatedFields);

    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createHotelQuery,
  getAllHotelsQuery,
  getHotelByIdQuery,
  updateHotelByIdQuery,
};
