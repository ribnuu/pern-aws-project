import React from "react";

const HotelRegistrationReview = ({ formData }) => {
  // Helper function to render the fields, handle missing values, and display boolean or array values.
  const renderField = (label, value, isBoolean = false, isArray = false) => {
    const missing =
      value === false ||
      value === undefined ||
      value === null ||
      value === "" ||
      (isArray && value.length === 0);
    try {
      const displayValue = isBoolean
        ? value
          ? "Yes"
          : "No"
        : isArray
        ? value?.join(", ") || "None Selected"
        : value || "Not Provided";

      return (
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-700">{label}</h3>
          <p className={`text-gray-600 ${missing ? "text-red-500" : ""}`}>
            {displayValue}
          </p>
        </div>
      );
    } catch (error) {
      console.log(label);
    }
  };

  // List of fields to render (simplifies rendering process by looping through fields)
  const fields = [
    { label: "Name", value: formData?.name },
    { label: "Street Address", value: formData?.street_address },
    { label: "Address Line 2", value: formData?.address_line_2 },
    { label: "Province", value: formData?.province },
    { label: "District", value: formData?.district },
    { label: "City", value: formData?.city },
    { label: "Postal Code", value: formData?.postal_code },
    { label: "Location", value: formData?.location_url },
    {
      label: "Coordinates",
      value:
        formData?.latitude && formData?.longitude
          ? `${formData.latitude}, ${formData.longitude}`
          : null,
    },
    {
      label: "Manager Contact Number",
      value: formData?.manager_contact_number,
    },
    {
      label: "Security Contact Number",
      value: formData?.security_contact_number,
    },
    { label: "Website URL", value: formData?.website },
    // { label: "Facebook", value: formData?.facebook },
    // { label: "Instagram", value: formData?.instagram },
    { label: "Total Number of Rooms", value: formData?.rooms },
    { label: "Hotel Type", value: formData?.type },
    {
      label: "Is this a Star Hotel?",
      value: formData?.is_star_hotel ? "Yes" : "No",
    },
    formData.is_star_hotel && { label: "Star Rating", value: formData?.rating },
    { label: "Security Officials", value: formData?.security_officials },
    { label: "Security Cameras", value: formData?.security_cameras },
    { label: "Security Guard Schedule", value: formData?.guard_schedule },
    {
      label: "Floor-Specific Access",
      value: formData?.floor_specific_access,
      isBoolean: true,
    },
    {
      label: "Elevator Security",
      value: formData?.elevator_security,
      isBoolean: true,
    },
    {
      label: "Smart Lock System",
      value: formData?.smart_lock_system,
      isBoolean: true,
    },
    {
      label: "Digital Lock System",
      value: formData?.digital_lock_system,
      isBoolean: true,
    },
    {
      label: "Traditional Room Security Locks",
      value: formData?.traditional_room_security_locks,
      isBoolean: true,
    },
    {
      label: "Enhanced Room Security",
      value: formData?.enhanced_room_security,
      isBoolean: true,
    },
    { label: "Peepholes", value: formData?.peepholes, isBoolean: true },
    {
      label: "Luggage Scanning",
      value: formData?.luggage_scanning,
      isBoolean: true,
    },
    {
      label: "Luggage Tags and Tracking",
      value: formData?.luggage_tags_and_tracking,
      isBoolean: true,
    },
    {
      label: "Private Luggage Handling",
      value: formData?.private_luggage_handling,
      isBoolean: true,
    },

    {
      label: "Uniformed and Plainclothes Security",
      value: formData?.uniformed_and_plainclothes_security,
      isBoolean: true,
    },
    { label: "Silent Alarms", value: formData?.silent_alarms, isBoolean: true },
    {
      label: "In-room Personal Safe",
      value: formData?.in_room_personal_safe,
      isBoolean: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Review Your Submission
      </h2>

      {/* Render Fields */}
      {fields.map((field, index) =>
        field
          ? renderField(
              field.label,
              field.value,
              field.isBoolean,
              field.isArray
            )
          : null
      )}
    </div>
  );
};

export default HotelRegistrationReview;
