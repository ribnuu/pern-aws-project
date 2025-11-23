// utils/allowedFields.js

// Default value for all hotel fields
const defaultHotelFields = "all";

// List of allowed fields that can be requested in the attributes parameter
const hotelFields = [
  "id",
  "name",
  "street_address",
  "address_line_2",
  "province_id",
  "district_id",
  "city_id",
  "postal_code",
  "location_url",
  "hotel_main_contact_number",
  "hotel_whatsapp_number",
  "manager_contact_number",
  "security_contact_number",
  "website",
  "rooms",
  "type",
  "rating",
  "security_officials",
  "security_cameras",
  "guard_schedule",
  "floor_specific_access",
  "elevator_security",
  "smart_lock_system",
  "digital_lock_system",
  "traditional_room_security_locks",
  "enhanced_room_security",
  "peepholes",
  "luggage_scanning",
  "luggage_tags_and_tracking",
  "private_luggage_handling",
  "uniformed_and_plainclothes_security",
  "silent_alarms",
  "in_room_personal_safe",
  "incident_reporting_log_book",
  "cctv_video_surveillance_24_7",
  "centralized_monitoring_24_7",
  "compulsory_id_passport_verification",
  "trained_security_team_24_7",
  "emergency_response_plans_24_7",
  "created_at",
  "updated_at",
  "deleted_at",
  "created_by",
];

const defaultHouseHolderFields = "all";
const houseHolderFields = [
  "id",
  "divisional_secretariat",
  "gn_division",
  "location_url",
  "street_address",
  "address_line_2",
  "province_id",
  "city_id",
  "province_id",
  "postal_code",
  "created_at",
  "updated_at",
  "deleted_at",
  "created_by",
  "confirmed_user_id",
  "confirmed",
  "confirmed_user_station_id",
  "confirmed_time",
];

// Function to validate the selected fields (from the query parameters)
// const validateSelectedFields = (selectedFields) => {
//   if (!selectedFields || selectedFields === "all") {
//     return hotelFields; // If 'all' or no attributes are provided, return all fields
//   }

//   // Split the comma-separated string of attributes
//   const selectedAttributes = selectedFields.split(",");

//   // Filter out invalid attributes
//   const invalidAttributes = selectedAttributes.filter(
//     (field) => !hotelFields.includes(field)
//   );

//   if (invalidAttributes.length > 0) {
//     throw new Error(`Invalid fields selected: ${invalidAttributes.join(", ")}`);
//   }

//   return selectedAttributes;
// };
// Function to validate the selected fields (from the query parameters)
const validateSelectedFields = (selectedFields, allowedFields) => {
  if (!selectedFields || selectedFields === "all") {
    return allowedFields; // If 'all' or no attributes are provided, return all fields
  }

  // Split the comma-separated string of attributes
  const selectedAttributes = selectedFields.split(",");

  // Filter out invalid attributes
  const invalidAttributes = selectedAttributes.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidAttributes.length > 0) {
    throw new Error(`Invalid fields selected: ${invalidAttributes.join(", ")}`);
  }

  return selectedAttributes;
};

module.exports = {
  defaultHotelFields,
  hotelFields,
  defaultHouseHolderFields,
  houseHolderFields,
  validateSelectedFields,
};
