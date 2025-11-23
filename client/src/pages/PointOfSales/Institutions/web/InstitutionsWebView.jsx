import React from "react";
import { formatDateToWords } from "../../../../utils/dateUtils";
import LISpinnerWithTextTwo from "../../../../components/LoadingIndicators/LISpinnerWithTextTwo";

const InstitutionsWebView = ({
  groupedInstitutions,
  navigate,
  loading = false,
}) => {
  return (
    <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading..." />
      ) : (
        Object.keys(groupedInstitutions).map((groupKey) => (
          <div key={groupKey}>
            <h2 className="bg-gray-200 px-6 py-2 text-lg font-bold uppercase">
              {groupKey}
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  {[
                    "Customer Institute",
                    "Representative",
                    "Address",
                    "Phone 1",
                    "Phone 2",
                    "Phone 3",
                    "Paid/Total Bills",
                    "Last Bill Date",
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
                {groupedInstitutions[groupKey].map((institution) => (
                  <tr
                    key={institution.id}
                    className={`${!institution?.is_active && "bg-red-100"}`}
                  >
                    <td
                      className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate("/pos/ins", {
                          state: { institutionId: institution.id },
                        })
                      }
                    >
                      {institution.name}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {institution?.representatives &&
                        institution?.representatives.length > 0 &&
                        institution?.representatives[0].customerPerson?.name}
                    </td>
                    <td
                      className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:underline"
                      onClick={() => {
                        if (institution.location_url) {
                          window.open(institution.location_url, "_blank");
                        } else {
                          alert("No location");
                        }
                      }}
                    >
                      {institution?.addresses?.[0] &&
                        `${institution.addresses[0].street_address}, ${institution.addresses[0].city}`}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {institution.mobile_number}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {institution.phone_1}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {institution.phone_2}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {institution.paidBillsCount}/{institution?.billsCount}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToWords(institution?.lastBillingDate)}
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

export default InstitutionsWebView;
