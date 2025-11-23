import React from "react";
import dayjs from "dayjs";
import LicenseDispatchForm from "./LicenseDispatchForm";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";

const LicenseTableMobile = ({
  licenseData,
  expandedRow,
  toggleRow,
  loading = false,
}) => {
  return (
    <div className="lg:hidden space-y-4">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        licenseData?.length > 0 &&
        licenseData.map((item) => {
          const isExpanded = expandedRow === item.id;
          return (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-lg bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase">
                    Reference No
                  </h3>
                  <p className="text-lg font-bold text-gray-800">
                    {item.reference_number}
                  </p>
                </div>
                <button
                  className={`px-4 py-2 rounded-md font-semibold text-sm ${
                    item.licenseDispatches && item.licenseDispatches.length > 0
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                  onClick={() => toggleRow(item.id)}
                >
                  {item.licenseDispatches && item.licenseDispatches.length > 0
                    ? "VIEW"
                    : "DISPATCH"}
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Officer Name:</span>{" "}
                  {item?.policeOfficer?.username || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Offense:</span>{" "}
                  {item?.offense?.offense || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Fine Amount:</span> $
                  {item?.offense?.fine?.toFixed(2) || "0.00"}
                </p>
                <p>
                  <span className="font-semibold">Recorded At:</span>{" "}
                  {dayjs(item.offense_date_time).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <span className="font-semibold">License No:</span>{" "}
                  {item?.license_number || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Vehicle No:</span>{" "}
                  {item?.vehicle_number || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Mobile No:</span>{" "}
                  {item?.mobile_number || "N/A"}
                </p>
              </div>

              {isExpanded && (
                <div className="mt-3">
                  <LicenseDispatchForm item={item} />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default LicenseTableMobile;
