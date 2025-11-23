import React from "react";
import { formatDateToWords } from "../../../../utils/dateUtils";
import LISpinnerWithTextTwo from "../../../../components/LoadingIndicators/LISpinnerWithTextTwo";

const HotelsWebView = ({ groupedCccHotelsData, navigate, loading = false }) => {
  return (
    <div className="flex-grow overflow-y-auto bg-white shadow-lg rounded-lg p-6">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        Object.keys(groupedCccHotelsData).map((groupKey) => (
          <div key={groupKey} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {groupKey}
            </h2>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {[
                    "Hotel Name",
                    // "Street Address",
                    // "Address Line 2",
                    // "City",
                    // "Province",
                    // "District",
                    // "Postal Code",
                    // "Website",
                    "Rooms",
                    "Star Hotel",
                    "Rating",
                    "Security Officials",
                    "Security Cameras",
                    "Fire Safety Options",
                    "Access Control",
                    "Emergency Preparedness",
                    "Visitor Management",
                    "Incident Reporting",
                    "Manager Contact",
                    "Security Contact",
                    "Last Updated",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
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
                    <td
                      className="px-6 py-4 text-sm text-gray-800 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate("/hotel/details", {
                          state: { hotelId: hotel.id },
                        })
                      }
                    >
                      {hotel.name}
                    </td>
                    {/* <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.street_address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.address_line_2}
                    </td> */}
                    {/* <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.city_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.province_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.district_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.postal_code}
                    </td> */}

                    {/* <td className="px-6 py-4 text-sm text-gray-700">
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {hotel.website}
                      </a>
                    </td> */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.rooms}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.is_star_hotel ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.rating}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.security_officials}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.security_cameras}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.fire_safety_options?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.access_control?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.emergency_preparedness?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.visitor_management?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.incident_reporting?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.manager_contact_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hotel.security_contact_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDateToWords(hotel.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelsWebView;
