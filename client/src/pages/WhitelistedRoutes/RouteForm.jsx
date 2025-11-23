import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecord,
  HandleChangeFormData,
  loadData,
  resetState,
} from "../../store/form/FormSlice";
import {
  createWhiteListedRoutesRecordApi,
  getAllWhiteListedRoutesRecordsApi,
} from "../../apis/CccWhitelistedRoutesApiService";
import { LinearProgress } from "@mui/material";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];

const RouteForm = () => {
  const dispatch = useDispatch();
  const { formData, loading } = useSelector((state) => state.formReducer);

  // Update the handleAddRoute function to include the new field
  const handleAddRoute = () => {
    try {
      dispatch(
        createRecord({
          apiFunction: createWhiteListedRoutesRecordApi, // Ensure the correct function is passed
          reqBody: formData, // Pass formData as the request body
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(
      loadData({ apiFunction: getAllWhiteListedRoutesRecordsApi, reqBody: {} })
    );
  }, [dispatch]);

  return (
    <div className="mb-6">
      {loading && <LinearProgress color="primary" />}

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Route
        <input
          type="text"
          value={formData?.route}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "route",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="/example/path"
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Method
        <select
          value={formData?.method}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "method",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Description
        <input
          type="text"
          value={formData?.description}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "description",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Optional description"
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Has Path Parameters
        <input
          type="checkbox"
          checked={formData?.has_path_parameters || false}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "has_path_parameters",
                value: e.target.checked,
              })
            );
          }}
          className="ml-2"
        />
      </label>
      <button
        disabled={loading}
        onClick={handleAddRoute}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Add Route
      </button>
    </div>
  );
};

export default RouteForm;
