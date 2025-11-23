import React from "react";
import { FormattedMessage } from "react-intl";

const HotelRegistrationReview = ({ formData }) => {
  // Helper function to render the fields, handle missing values, and display boolean or array values.
  const renderField = (
    label,
    value,
    isBoolean = false,
    isArray = false,
    translation_key
  ) => {
    const finalTrasnlationKEy = translation_key
      ? translation_key
      : "app.general.translation.no_translation";
    const missing =
      value === false ||
      value === undefined ||
      value === null ||
      value === "" ||
      (isArray && value.length === 0);
    try {
      const displayValue = isBoolean ? (
        value ? (
          <FormattedMessage id="app.general.label.yes" defaultMessage="Yes" />
        ) : (
          <FormattedMessage id="app.general.label.no" defaultMessage="No" />
        )
      ) : isArray ? (
        value?.join(", ") || (
          <FormattedMessage
            id="app.general.label.not_selected"
            defaultMessage="Not Selected"
          />
        )
      ) : (
        value || (
          <FormattedMessage
            id="app.general.label.not_provided"
            defaultMessage="Not Provided"
          />
        )
      );

      return (
        <div className="border-b pb-1 mb-1">
          <h3 className="text-sm font-medium text-gray-700">
            <FormattedMessage id={finalTrasnlationKEy} defaultMessage={label} />
          </h3>
          <p
            className={`text-sm text-gray-600 ${missing ? "text-red-500" : ""}`}
          >
            {displayValue}
          </p>
        </div>
      );
    } catch (error) {
      console.log(label);
    }
  };
  console.log(formData);

  // List of fields to render (simplifies rendering process by looping through fields)
  const fields = [
    {
      label: "Name",
      value: formData?.name,
      translation_key: "app.general.form_fields.name",
    },
    {
      label: "Street Address",
      value: formData?.street_address,
      translation_key: "app.general.address.form_fields.street_address",
    },
    {
      label: "Address Line 2",
      value: formData?.address_line_2,
      translation_key: "app.general.address.form_fields.address_line_2",
    },
    {
      label: "Province",
      value: formData?.province_name,
      translation_key: "app.general.address.form_fields.province",
    },
    {
      label: "District",
      value: formData?.district_name,
      translation_key: "app.general.address.form_fields.district",
    },
    {
      label: "City",
      value: formData?.city_name,
      translation_key: "app.general.address.form_fields.city",
    },
    {
      label: "Postal Code",
      value: formData?.postal_code,
      translation_key: "app.general.address.form_fields.postal_code",
    },
    {
      label: "Location",
      value: formData?.location_url,
      translation_key: "app.general.address.form_fields.location_url",
    },
    // {
    //   label: "Coordinates",
    //   value:
    //     formData?.latitude && formData?.longitude
    //       ? `${formData.latitude}, ${formData.longitude}`
    //       : null,
    // },
    {
      label: "Hotel Main Contact Number",
      value: formData?.hotel_main_contact_number,
      translation_key: "app.hotel.form_fields.hotel_main_contact_number",
    },
    {
      label: "Hotel Whatsapp Number",
      value: formData?.hotel_whatsapp_number,
      translation_key: "app.hotel.form_fields.hotel_whatsapp_number",
    },
    {
      label: "Manager Contact Number",
      value: formData?.manager_contact_number,
      translation_key: "app.hotel.form_fields.manager_contact_number",
    },
    {
      label: "Security Contact Number",
      value: formData?.security_contact_number,
      translation_key: "app.hotel.form_fields.security_contact_number",
    },
    {
      label: "Website URL",
      value: formData?.website,
      translation_key: "app.hotel.form_fields.website_url",
    },
    // { label: "Facebook", value: formData?.facebook },
    // { label: "Instagram", value: formData?.instagram },
    {
      label: "Total Number of Rooms",
      value: formData?.rooms,
      translation_key: "app.hotel.form_fields.total_number_of_rooms",
    },
    {
      label: "Hotel Type",
      value: formData?.type,
      translation_key: "app.hotel.form_fields.hotel_type",
    },
    // {
    //   label: "Is this a Star Hotel?",
    //   value: formData?.is_star_hotel ? "Yes" : "No",
    //   translation_key: "",
    // },
    formData.is_star_hotel && {
      label: "Star Rating",
      value: formData?.rating,
      translation_key: "",
    },
    {
      label: "Security Officials",
      value: formData?.security_officials,
      translation_key: "app.hotel.form_fields.number_of_security_officials",
    },

    {
      label: "Security Cameras",
      value: formData?.security_cameras,
      translation_key: "app.hotel.form_fields.number_of_security_cameras",
    },
    {
      label: "Security Guard Schedule",
      value: formData?.guard_schedule,
      translation_key: "app.hotel.form_fields.security_guard_schedule",
    },
    {
      label: "Floor-Specific Access",
      value: formData?.floor_specific_access,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.floor_specific_access",
    },
    {
      label: "Elevator Security",
      value: formData?.elevator_security,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.elevator_security",
    },
    {
      label: "Smart Lock System",
      value: formData?.smart_lock_system,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.smart_lock_system",
    },
    {
      label: "Digital Lock System",
      value: formData?.digital_lock_system,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.digital_lock_system",
    },
    {
      label: "Traditional Room Security Locks",
      value: formData?.traditional_room_security_locks,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.traditional_room_security_locks",
    },
    {
      label: "Enhanced Room Security",
      value: formData?.enhanced_room_security,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.enhanced_room_security",
    },
    {
      label: "Peepholes",
      value: formData?.peepholes,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.peepholes",
    },
    {
      label: "Luggage Scanning",
      value: formData?.luggage_scanning,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.luggage_scanning",
    },
    {
      label: "Luggage Tags and Tracking",
      value: formData?.luggage_tags_and_tracking,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.luggage_tags_and_tracking",
    },
    {
      label: "Private Luggage Handling",
      value: formData?.private_luggage_handling,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.private_luggage_handling",
    },

    {
      label: "Uniformed and Plainclothes Security",
      value: formData?.uniformed_and_plainclothes_security,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.uniformed_and_plainclothes_security",
    },
    {
      label: "Silent Alarms",
      value: formData?.silent_alarms,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.silent_alarms",
    },
    {
      label: "In-room Personal Safe",
      value: formData?.in_room_personal_safe,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.in_room_personal_safe",
    },
    {
      label: "hotel main contact number",
      value: formData?.hotel_main_contact_number,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.hotel_main_contact_number",
    },
    {
      label: "hotel whatsapp number",
      value: formData?.hotel_whatsapp_number,
      isBoolean: true,
      translation_key: "app.hotel.form_fields.checkbox.hotel_whatsapp_number",
    },
    {
      label: "incident_reporting_log_book",
      value: formData?.incident_reporting_log_book,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.incident_reporting_log_book",
    },
    {
      label: "cctv_video_surveillance_24_7",
      value: formData?.cctv_video_surveillance_24_7,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.cctv_video_surveillance_24_7",
    },
    {
      label: "centralized_monitoring_24_7",
      value: formData?.centralized_monitoring_24_7,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.centralized_monitoring_24_7",
    },
    {
      label: "compulsory_id_passport_verification",
      value: formData?.compulsory_id_passport_verification,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.compulsory_id_passport_verification",
    },
    {
      label: "trained_security_team_24_7",
      value: formData?.trained_security_team_24_7,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.trained_security_team_24_7",
    },
    {
      label: "emergency_response_plans_24_7",
      value: formData?.emergency_response_plans_24_7,
      isBoolean: true,
      translation_key:
        "app.hotel.form_fields.checkbox.emergency_response_plans_24_7",
    },
  ];

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
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
              field.isArray,
              field.translation_key
            )
          : null
      )}
    </div>
  );
};

export default HotelRegistrationReview;
