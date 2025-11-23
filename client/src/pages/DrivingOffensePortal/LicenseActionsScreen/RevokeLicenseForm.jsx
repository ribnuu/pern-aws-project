import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleChangeFormData,
  createRecord,
  resetState,
} from "../../../store/form/FormSlice";
import { createDepartmentDriversLicenseRevokesApi } from "../../../apis/DepartmentDriversLicenseRevokesApiService";
// import { revokeLicenseApi, getCourtCasesApi } from "./api";

const RevokeLicenseForm = ({ licenseNumber, onSubmit }) => {
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector(
    (state) => state.formReducer
  );

  const [courtCases, setCourtCases] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !formData.toDate ||
      !formData.courtId ||
      !formData.courtCaseNumber ||
      !licenseNumber
    ) {
      alert("All fields are required.");
      return;
    }

    // Dispatch createRecord thunk
    dispatch(
      createRecord({
        apiFunction: createDepartmentDriversLicenseRevokesApi,
        reqBody: { ...formData, licenseNumber },
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        alert("License revoked successfully.");
        dispatch(resetState()); // Reset form state
      }
    });
  };

  useEffect(() => {
    // If courtId changes, fetch the corresponding court cases
    if (formData.courtId) {
      // Assuming getCourtCasesApi is an API call to get court cases by courtId
      // You can call the API here
      // getCourtCasesApi({ courtId: formData.courtId }).then((cases) => {
      //   setCourtCases(cases);
      // });

      // For now, we'll just mock the data
      setCourtCases([
        { id: 1, caseNumber: "12345" },
        { id: 2, caseNumber: "67890" },
      ]);
    }
  }, [formData.courtId]); // Run this effect when courtId changes

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Revoke License</h2>

      {/* To Date */}
      <div>
        <label htmlFor="toDate" className="block text-sm font-medium">
          To Date
        </label>
        <input
          type="date"
          id="toDate"
          value={formData.toDate || ""}
          onChange={(e) =>
            dispatch(
              HandleChangeFormData({ key: "toDate", value: e.target.value })
            )
          }
          className="w-full mt-1 px-3 py-2 border rounded-md"
          min={new Date().toISOString().split("T")[0]} // Disable previous dates
        />
      </div>

      {/* Court ID */}
      <div>
        <label htmlFor="courtId" className="block text-sm font-medium">
          Court ID
        </label>
        <input
          type="text"
          id="courtId"
          value={formData.courtId || ""}
          onChange={(e) =>
            dispatch(
              HandleChangeFormData({ key: "courtId", value: e.target.value })
            )
          }
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
      </div>

      {/* Court Case Number */}
      <div>
        <label htmlFor="courtCaseNumber" className="block text-sm font-medium">
          Court Case Number
        </label>
        <input
          type="text"
          id="courtCaseNumber"
          value={formData.courtCaseNumber || ""}
          onChange={(e) =>
            dispatch(
              HandleChangeFormData({
                key: "courtCaseNumber",
                value: e.target.value,
              })
            )
          }
          className="w-full mt-1 px-3 py-2 border rounded-md"
          placeholder="Enter Court Case Number"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-400" : "bg-blue-600 text-white"
        }`}
      >
        {loading ? "Processing..." : "Revoke License"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default RevokeLicenseForm;
