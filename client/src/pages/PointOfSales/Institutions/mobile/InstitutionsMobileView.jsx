import React, { useState } from "react";
import { formatDateToWords } from "../../../../utils/dateUtils";
import LISpinnerWithTextTwo from "../../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const InstitutionsMobileView = ({ groupedInstitutions, loading = false }) => {
  const [openMainGroup, setOpenMainGroup] = useState(null); // Track the open main group
  const [openInstitution, setOpenInstitution] = useState(null); // Track the open institution

  // Toggle the main group accordion
  const toggleMainGroup = (groupKey) => {
    setOpenMainGroup((prev) => (prev === groupKey ? null : groupKey));
  };

  // Toggle the institution accordion
  const toggleInstitution = (institutionId) => {
    setOpenInstitution((prev) =>
      prev === institutionId ? null : institutionId
    );
  };

  const handleLocationClick = (locationUrl) => {
    if (locationUrl) {
      // Attempt to open the URL in the app
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationUrl
      )}`;

      if (isMobile) {
        // Open the location URL (attempt to open the app)
        window.location.href = locationUrl;

        // Fallback: After a short delay, if the app doesn't open, redirect to the fallback URL
        setTimeout(() => {
          window.open(fallbackUrl, "_blank");
        }, 2000); // Adjust the timeout as needed
      } else {
        // For non-mobile devices, just open in the browser
        window.open(fallbackUrl, "_blank");
      }
    } else {
      alert("No location available for this institution.");
    }
  };

  return (
    <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        Object.keys(groupedInstitutions).map((groupKey) => (
          <div key={groupKey}>
            {/* Main group accordion (City, District, Province) */}
            <h2
              style={{ fontFamily: "sans-serif" }}
              className="bg-gray-200 px-6 py-2 text-md cursor-pointer uppercase h-10 flex justify-between items-center"
              onClick={() => toggleMainGroup(groupKey)} // Toggle main group visibility
            >
              {groupKey}
              {openMainGroup === groupKey ? (
                <FaChevronCircleUp className="text-gray-600" /> // Up arrow when expanded
              ) : (
                <FaChevronCircleDown className="text-gray-600" /> // Down arrow when collapsed
              )}
            </h2>

            {openMainGroup === groupKey && ( // Only show institutions if the main group is open
              <div className="bg-gray-100">
                {groupedInstitutions[groupKey].map((institution) => (
                  <div
                    style={{ fontFamily: "sans-serif" }}
                    key={institution.id}
                    className="border-b border-gray-200"
                  >
                    {/* Institution accordion */}
                    <div
                      className="px-6 py-4 flex justify-between items-center cursor-pointer h-8"
                      onClick={() => toggleInstitution(institution.id)} // Toggle institution visibility
                    >
                      <div
                        style={{ fontFamily: "sans-serif" }}
                        className="text-sm text-gray-900"
                      >
                        {institution.name}
                      </div>
                      {openInstitution === institution.id ? (
                        <FaChevronCircleUp className="text-gray-400" /> // Up arrow when expanded
                      ) : (
                        <FaChevronCircleDown className="text-gray-400" /> // Down arrow when collapsed
                      )}
                    </div>

                    {openInstitution === institution.id && (
                      <div className="bg-gray-50 px-6 py-4 space-y-2">
                        <div className="text-sm">
                          <strong>Representative:</strong>{" "}
                          {institution?.representatives[0]?.customerPerson
                            ?.name || "N/A"}
                        </div>
                        <div
                          className="text-sm cursor-pointer hover:underline text-blue-600"
                          onClick={() =>
                            handleLocationClick(institution.location_url)
                          }
                        >
                          <strong>Address:</strong>{" "}
                          {institution?.addresses?.length > 0
                            ? `${institution.addresses[0].street_address}, ${institution.addresses[0].city}`
                            : "No Address (Click to view location)"}
                        </div>
                        <div className="text-sm">
                          <strong>Phone:</strong>{" "}
                          {institution.phone_1 ||
                            institution.mobile_number ||
                            "No Phone"}
                        </div>
                        <div className="text-sm">
                          <strong>Paid Bills:</strong>{" "}
                          {institution.paidBillsCount}/{institution.billsCount}
                        </div>
                        <div className="text-sm">
                          <strong>Last bill date:</strong>{" "}
                          {formatDateToWords(institution?.lastBillingDate)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InstitutionsMobileView;
