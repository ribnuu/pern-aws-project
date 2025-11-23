import React, { useState } from "react";
import LISpinnerWithTextTwo from "../../components/LoadingIndicators/LISpinnerWithText";
import ReportHouseHoldersListTabView from "./Houses/ReportHouseHoldersListTabView";

// Fields to display with descriptions for tooltip
const houseFields = [
  //   {
  //     label: "Hotel Name",
  //     key: "name",
  //     description: "The official name of the hotel.",
  //   },
  {
    label: "divisional secretariat",
    key: "divisional_secretariat",
    description: "",
  },
  {
    label: "gn division",
    key: "gn_division",
    description: "",
  },
  {
    label: "Location URL",
    key: "location_url",
    description: "URL for the house's location on the map.",
  },
  {
    label: "street address",
    key: "street_address",
    description: "",
  },
  {
    label: "address line 2",
    key: "address_line_2",
    description: "Phone number for hotel security.",
  },
  {
    label: "postal code",
    key: "postal_code",
    description: "",
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
const HouseDetails = ({ house, isAccordion }) => {
  return houseFields.map(({ label, key, description }) => (
    <div key={key} className="mb-2">
      <strong>
        <Tooltip text={description}>
          <span className="cursor-pointer">{label}:</span>
        </Tooltip>
      </strong>{" "}
      {typeof house[key] === "boolean" ? (
        house[key] ? (
          <span className="text-green-500">✔</span> // Green tick for true
        ) : (
          <span className="text-red-500">✘</span> // Red cross for false
        )
      ) : house[key] ? (
        key === "website" || key === "facebook" || key === "instagram" ? (
          <a
            href={house[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {key === "website"
              ? "Visit Website"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ) : (
          house[key].toString()
        )
      ) : (
        "N/A"
      )}
    </div>
  ));
};

const HousesListView = ({ groupedHousesData, navigate, loading = false }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const [openDetails, setOpenDetails] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleDetails = (groupKey) => {
    setOpenDetails(openDetails === groupKey ? null : groupKey);
  };

  // console.log(openDetails);
  return (
    <div className="bg-gray-50 mb-6 p-5 rounded-md dark:bg-gray-900 border border-black overflow-y-auto">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        Object.keys(groupedHousesData).map((groupKey) => (
          <div key={groupKey} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {groupKey}
            </h2>

            {/* Desktop View: Table */}
            <div className="hidden lg:block">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {houseFields.map(({ label, description }) => {
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
                  {groupedHousesData[groupKey].map((hotel) => (
                    <tr
                      key={hotel.id}
                      className={`hover:bg-gray-50 ${
                        !hotel?.is_active ? "opacity-50" : ""
                      }`}
                    >
                      {houseFields.map(({ key }) => (
                        <td
                          key={key}
                          className="px-6 py-4 text-sm text-gray"
                          onClick={() => toggleDetails(groupKey)} // Toggle details for the specific group
                        >
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
              {openDetails === groupKey && (
                <div className="w-full md:w-4/5 lg:w-full lg:h-auto bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow ">
                  <ReportHouseHoldersListTabView
                    formData={groupedHousesData[groupKey][0]}
                  />
                  {/* {console.log(groupedHousesData[groupKey][0])} */}
                </div>
              )}
            </div>

            {/* Mobile View: Accordion */}
            <div className="lg:hidden">
              {groupedHousesData[groupKey].map((house, index) => (
                <div key={house.id} className="mb-4 border-b">
                  <button
                    onClick={() => toggleAccordion(house?.id)}
                    className="w-full text-left px-4 py-3 bg-blue-600 text-white font-semibold"
                  >
                    {house.street_address},{house.address_line_2}
                  </button>
                  {openAccordion === house?.id && (
                    <div className="bg-gray-100 p-4">
                      <HouseDetails house={house} isAccordion={true} />
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

export default HousesListView;
