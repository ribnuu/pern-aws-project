import React, { useState } from "react";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";

// Fields to display with descriptions for tooltip
const hotelFields = [
  {
    label: "Hotel Name",
    key: "name",
    description: "The official name of the hotel.",
  },
  {
    label: "Street Address",
    key: "street_address",
    description: "The street address of the hotel.",
  },
  {
    label: "Address Line 2",
    key: "address_line_2",
    description: "Optional second address line.",
  },
  {
    label: "Province",
    key: "province.province_name",
    // key: "province_id",
    description: "Province where the hotel is located.",
  },
  {
    label: "District",
    // key: "district_id",
    key: "district.district_name",
    description: "District of the hotel's location.",
  },
  {
    label: "City",
    // key: "city_id",
    key: "city.city_name",
    description: "City where the hotel is located.",
  },
  {
    label: "Postal Code",
    key: "postal_code",
    description: "Postal code for the hotel's address.",
  },
  {
    label: "Location URL",
    key: "location_url",
    description: "URL for the hotel's location on the map.",
  },
  {
    label: "Manager Contact",
    key: "manager_contact_number",
    description: "Phone number of the hotel manager.",
  },
  {
    label: "Security Contact",
    key: "security_contact_number",
    description: "Phone number for hotel security.",
  },
  {
    label: "Website",
    key: "website",
    description: "Official website of the hotel.",
  },
  // { label: "Facebook", key: "facebook", description: "Hotel's Facebook page." },
  // {
  //   label: "Instagram",
  //   key: "instagram",
  //   description: "Hotel's Instagram page.",
  // },
  {
    label: "Rooms",
    key: "rooms",
    description: "Total number of rooms in the hotel.",
  },
  {
    label: "Hotel Type",
    key: "type",
    description: "Type of hotel (e.g., luxury, budget).",
  },
  {
    label: "Star Hotel",
    key: "is_star_hotel",
    description: "Indicates if the hotel is a star-rated hotel.",
  },
  {
    label: "Rating",
    key: "rating",
    description: "The hotel's rating based on customer reviews.",
  },
  {
    label: "Description",
    key: "description",
    description: "A brief description of the hotel.",
  },
  {
    label: "Created By",
    key: "createdBy",
    description: "User who created the hotel entry.",
  },
  {
    label: "Security Officials",
    key: "security_officials",
    description: "Details of the security officials at the hotel.",
  },
  {
    label: "Security Cameras",
    key: "security_cameras",
    description: "Presence of security cameras in the hotel.",
  },
  {
    label: "Guard Schedule",
    key: "guard_schedule",
    description: "The schedule for security guards on duty.",
  },
  {
    label: "Floor-Specific Access",
    key: "floor_specific_access",
    description: "Security access control by floors.",
  },
  {
    label: "Elevator Security",
    key: "elevator_security",
    description: "Security measures for elevator access.",
  },
  {
    label: "CCTV Video Surveillance",
    key: "cctv_video_surveillance",
    description: "Presence of CCTV surveillance in the hotel.",
  },
  {
    label: "CCTV Centralized Monitoring",
    key: "cctv_centralized_monitoring",
    description: "Centralized monitoring of CCTV feeds.",
  },
  {
    label: "Smart Lock System",
    key: "smart_lock_system",
    description: "Availability of smart locks in hotel rooms.",
  },
  {
    label: "Mobile App Smart Lock",
    key: "mobile_app_smart_lock_system",
    description: "Mobile app integration with smart locks.",
  },
  {
    label: "Digital Lock System",
    key: "digital_lock_system",
    description: "Digital locks used in hotel rooms.",
  },
  {
    label: "Traditional Room Security Locks",
    key: "traditional_room_security_locks",
    description: "Traditional security locks on hotel rooms.",
  },
  {
    label: "Enhanced Room Security",
    key: "enhanced_room_security",
    description: "Enhanced security features for hotel rooms.",
  },
  {
    label: "Peepholes",
    key: "peepholes",
    description: "Peepholes installed in hotel room doors.",
  },
  {
    label: "Security Latches",
    key: "security_latches",
    description: "Additional security latches on doors.",
  },
  {
    label: "Increased ID Verification",
    key: "increased_id_verification",
    description: "Enhanced ID verification during check-in.",
  },
  {
    label: "Pre-check-in Security Screening",
    key: "pre_check_in_security_screening",
    description: "Security screening before check-in.",
  },
  {
    label: "Luggage Scanning",
    key: "luggage_scanning",
    description: "Scanning of luggage for security.",
  },
  {
    label: "Luggage Tracking",
    key: "luggage_tags_and_tracking",
    description: "Tracking of luggage during guest stay.",
  },
  {
    label: "Private Luggage Handling",
    key: "private_luggage_handling",
    description: "Private handling of luggage for guests.",
  },
  {
    label: "Trained Security Team",
    key: "trained_security_team",
    description: "Presence of a trained security team.",
  },
  {
    label: "Uniformed and Plainclothes Security",
    key: "uniformed_and_plainclothes_security",
    description:
      "Combination of uniformed and plainclothes security personnel.",
  },
  {
    label: "Facial Recognition Systems",
    key: "facial_recognition_systems",
    description: "Use of facial recognition systems for security.",
  },
  {
    label: "Encrypted Wifi Networks",
    key: "encrypted_wifi_networks",
    description: "Availability of encrypted Wi-Fi networks.",
  },
  {
    label: "Cybersecurity Protocols",
    key: "cybersecurity_protocols",
    description: "Cybersecurity measures in place at the hotel.",
  },
  {
    label: "Emergency Response Plans",
    key: "emergency_response_plans",
    description: "Hotel's emergency response plans.",
  },
  {
    label: "On-Site Medical Assistance",
    key: "on_site_medical_assistance",
    description: "Availability of on-site medical assistance.",
  },
  {
    label: "Silent Alarms",
    key: "silent_alarms",
    description: "Presence of silent alarms for emergencies.",
  },
  {
    label: "In-Room Personal Safe",
    key: "in_room_personal_safe",
    description: "Personal safe available in the hotel room.",
  },
  {
    label: "In-Room High Security Lockers",
    key: "in_room_high_security_lockers",
    description: "High-security lockers available in rooms.",
  },
  {
    label: "Non-Disclosure Agreements",
    key: "non_disclosure_agreements",
    description: "Availability of non-disclosure agreements.",
  },
  {
    label: "Private Checkout Services",
    key: "private_checkout_services",
    description: "Availability of private checkout services.",
  },
  {
    label: "Digital Room Access",
    key: "digital_room_access",
    description: "Digital access to rooms (e.g., through a mobile app).",
  },
  {
    label: "Bodyguards and Protection",
    key: "bodyguards_and_protection",
    description: "Availability of bodyguards and protection services.",
  },
  {
    label: "Advanced Threat Assessment",
    key: "advanced_threat_assessment",
    description: "Hotel's advanced threat assessment protocols.",
  },
];

// Tooltip Component
const Tooltip = ({ text, children }) => (
  <span className="relative group">
    {children}
    <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {text}
    </span>
  </span>
);

// Reusable component for displaying hotel fields
const HotelDetails = ({ hotel, isAccordion }) => {
  return hotelFields.map(({ label, key, description }) => (
    <div key={key} className="mb-2">
      <strong>
        <Tooltip text={description}>
          <span className="cursor-pointer">{label}:</span>
        </Tooltip>
      </strong>{" "}
      {typeof hotel[key] === "boolean" ? (
        hotel[key] ? (
          <span className="text-green-500">✔</span> // Green tick for true
        ) : (
          <span className="text-red-500">✘</span> // Red cross for false
        )
      ) : hotel[key] ? (
        key === "website" || key === "facebook" || key === "instagram" ? (
          <a
            href={hotel[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {key === "website"
              ? "Visit Website"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ) : (
          hotel[key].toString()
        )
      ) : (
        "N/A"
      )}
    </div>
  ));
};

const HotelsListView = ({
  groupedCccHotelsData,
  navigate,
  loading = false,
}) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="bg-gray-50 mb-6 p-5 rounded-md dark:bg-gray-900 border border-black overflow-y-auto">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        Object.keys(groupedCccHotelsData).map((groupKey) => (
          <div key={groupKey} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {groupKey}
            </h2>

            {/* Desktop View: Table */}
            <div className="hidden lg:block">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {hotelFields.map(({ label, description }) => {
                      return (
                        <th
                          key={label}
                          className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
                        >
                          <Tooltip text={description}>{label}</Tooltip>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {groupedCccHotelsData[groupKey].map((hotel) => (
                    <tr
                      key={hotel.id}
                      className={`hover:bg-gray-50 ${
                        !hotel?.is_active ? "opacity-50" : ""
                      }`}
                    >
                      {hotelFields.map(({ key }) => (
                        <td key={key} className="px-6 py-4 text-sm text-gray">
                          {key.includes(".") ? (
                            // Handle nested keys with dot notation
                            key
                              .split(".")
                              .reduce(
                                (acc, part) => (acc ? acc[part] : undefined),
                                hotel
                              ) !== undefined ? (
                              hotel[key.split(".")[0]]?.[
                                key.split(".")[1]
                              ]?.toString() || "N/A"
                            ) : (
                              "N/A"
                            )
                          ) : typeof hotel[key] === "boolean" ? (
                            // Handle boolean fields
                            hotel[key] ? (
                              <span className="text-green-900">✔</span> // Green tick for true
                            ) : (
                              <span className="text-red-500">✘</span> // Red cross for false
                            )
                          ) : (
                            // For other cases (non-boolean, non-dot keys)
                            hotel[key]?.toString() || "N/A" // Display value as string or "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Accordion */}
            <div className="lg:hidden">
              {groupedCccHotelsData[groupKey].map((hotel, index) => (
                <div key={hotel.id} className="mb-4 border-b">
                  <button
                    onClick={() => toggleAccordion(hotel?.id)}
                    className="w-full text-left px-4 py-3 bg-blue-600 text-white font-semibold"
                  >
                    {hotel.name}
                  </button>
                  {openAccordion === hotel?.id && (
                    <div className="bg-gray-100 p-4">
                      <HotelDetails hotel={hotel} isAccordion={true} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelsListView;
