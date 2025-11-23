import React from "react";
import dayjs from "dayjs";
import LicenseDispatchForm from "./LicenseDispatchForm";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";

const LicenseTableDesktop = ({
  licenseData,
  expandedRow,
  toggleRow,
  loading = false,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 hidden lg:table">
      <thead className="bg-blue-100">
        <tr>
          {[
            "Reference No",
            "Officer Name",
            "Station Name",
            "Province",
            "District",
            "Division",
            "Offense",
            "Fine Amount",
            "Recorded At",
            "License No",
            "Vehicle No",
            "Mobile No",
            "Action",
          ].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <>
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center">
                <LISpinnerWithTextTwo label="Loading..." />
              </td>
            </tr>
          </>
        ) : (
          licenseData?.length > 0 &&
          licenseData.map((item) => {
            const isExpanded = expandedRow === item.id;
            return (
              <React.Fragment key={item.id}>
                <tr className={`${isExpanded ? "bg-red-200" : ""}`}>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item.reference_number}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.policeOfficer?.username}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.policeStation?.police_station_name}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.policeStation?.province?.province_name}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.policeStation?.district?.district_name}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.policeStation?.policeDivision?.name}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.offense?.offense}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 text-right">
                    {item?.offense?.fine}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {dayjs(item.offense_date_time).format(
                      "MMMM D, YYYY h:mm A"
                    )}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.license_number}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.vehicle_number}
                  </td>
                  <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                    {item?.mobile_number}
                  </td>
                  <td>
                    <button
                      className={`${
                        item.licenseDispatches &&
                        item.licenseDispatches.length > 0
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white rounded-md text-sm`}
                      onClick={() => toggleRow(item.id)}
                      style={{ width: "100px", height: "30px" }}
                    >
                      {item.licenseDispatches &&
                      item.licenseDispatches.length > 0
                        ? "VIEW"
                        : "DISPATCH"}
                    </button>
                  </td>
                </tr>
                {isExpanded && <LicenseDispatchForm item={item} />}
              </React.Fragment>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default LicenseTableDesktop;
