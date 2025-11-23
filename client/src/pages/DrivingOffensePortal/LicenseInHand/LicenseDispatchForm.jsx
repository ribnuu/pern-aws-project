import React, { useEffect, useState } from "react";
import { createDepartmentDriverLicenseDispatchRecordApi } from "../../../apis/CccDepartmentDriversLicenseDispatchesApiService";
import toast from "react-hot-toast";

const LicenseDispatchForm = ({ item }) => {
  const [dispatchForm, setDispatchForm] = useState({
    dispatched_to_nic: "",
    dispatched_to_name: "",
    dispatched_to_mobile_number: "",
    dispatched_method: "In-person",
    remarks: "",
    dispatched_status: "DISPATCHED",
    department_driver_offense_portal_id: item.id,
    confirmation_code: null,
    reference_number: item.reference_number,
  });

  const [pastDispatchRecord, setPastDispatchRecord] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);

  const handleDispatch = async () => {
    try {
      const response = await toast.promise(
        createDepartmentDriverLicenseDispatchRecordApi(dispatchForm),
        {
          loading: "Saving...",
          success: <b>Successfully updated</b>,
          error: (error) => {
            // Check if the error has a response and extract the message
            const errorMessage =
              error.response?.data?.error || "Failed to update"; // Default message if not available
            return <b>{errorMessage}</b>; // Customize the error message displayed
          },
        }
      );

      // Check if the response is successful and access data if available
      if (response && response.data) {
        console.log("Response data:", response.data); // Log or use the data as needed
        // You could also set this data to a state or use it in any other logic
      }
    } catch (error) {
      console.error("Error:", error); // Log the full error for debugging
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDispatchForm({
      ...dispatchForm,
      [name]: value,
    });
  };

  useEffect(() => {
    if (item?.licenseDispatches && item.licenseDispatches.length > 0) {
      setViewOnly(true);
      const record = item.licenseDispatches.filter(
        (item) => item.dispatched_status === "DISPATCHED"
      );
      if (record && record.length > 0) {
        setPastDispatchRecord(record[0]);
      }
    }
  }, [item?.licenseDispatches]);

  return (
    <tr>
      <td colSpan={9} className="px-6 py-4 bg-gray-100">
        {/* Expanded row form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!viewOnly) {
              handleDispatch(); // Handle dispatch action
            }
          }}
        >
          <div className="space-y-4">
            {/* Information Display */}
            {viewOnly ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dispatched By Officer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Dispatched By Officer:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.dispatcher?.username || "N/A"}
                  </span>
                </div>

                {/* NIC */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    NIC:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.dispatched_to_nic || "N/A"}
                  </span>
                </div>

                {/* Name */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Name:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.dispatched_to_name || "N/A"}
                  </span>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Mobile Number:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.dispatched_to_mobile_number || "N/A"}
                  </span>
                </div>

                {/* Dispatch Method */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Method:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.dispatched_method || "N/A"}
                  </span>
                </div>

                {/* Remarks */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Remarks:
                  </span>
                  <span className="text-sm text-gray-900 mt-2 sm:mt-0">
                    {pastDispatchRecord?.remarks || "N/A"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* NIC Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NIC
                  </label>
                  <input
                    type="text"
                    name="dispatched_to_nic"
                    value={dispatchForm.dispatched_to_nic}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="dispatched_to_name"
                    value={dispatchForm.dispatched_to_name}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="dispatched_to_mobile_number"
                    value={dispatchForm.dispatched_to_mobile_number}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Dispatch Method Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Method
                  </label>
                  <select
                    name="dispatched_method"
                    value={dispatchForm.dispatched_method}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select a method</option>
                    <option value="Courier">Courier</option>
                    <option value="In-person">In-person</option>
                    <option value="Postal">Postal</option>
                    <option value="Digital">Digital</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Confirmation Code Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmation Code
                  </label>
                  <input
                    type="text"
                    name="confirmation_code"
                    value={dispatchForm.confirmation_code}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter confirmation code"
                    required
                  />
                </div>

                {/* Remarks Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={dispatchForm.remarks}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:w-96 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-left">
                  <button
                    type="submit"
                    className="mt-4 w-full sm:w-auto bg-blue-600 text-white rounded-md px-6 py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </td>
    </tr>
  );
};

export default LicenseDispatchForm;
