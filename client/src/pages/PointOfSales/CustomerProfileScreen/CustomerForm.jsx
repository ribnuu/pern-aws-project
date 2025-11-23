import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecord,
  HandleChangeFormData,
  resetState,
} from "../../../store/form/FormSlice";
import { LinearProgress } from "@mui/material";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import CitySearch from "../../../components/CCC/CitySearch/CitySearch";
import { posCrateStockCustomerPErsonApi } from "../../../apis/POSStockCustomerPersonApiService";

const CustomerForm = () => {
  const dispatch = useDispatch();
  const { formData, loading } = useSelector((state) => state.formReducer);

  const [loadingP, setLoadingP] = useState(false);
  const [searchTermP, setSearchTermP] = useState("");

  // District Search
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");

  // City Search
  const [loadingC, setLoadingC] = useState(false);
  const [searchTermC, setSearchTermC] = useState("");

  // Update the handleAddRoute function to include the new field
  const handleAddCustomer = () => {
    try {
      console.log(formData);

      dispatch(
        createRecord({
          apiFunction: posCrateStockCustomerPErsonApi,
          reqBody: formData,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(resetState());
      setSearchTermP("");
      setSearchTermD("");
      setSearchTermC("");
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(
      HandleChangeFormData({
        key: "country",
        value: "Sri Lanka",
      })
    );
    // dispatch(
    //   loadData({ apiFunction: getAllWhiteListedRoutesRecordsApi, reqBody: {} })
    // );
  }, [dispatch]);

  return (
    <div className="mb-6">
      {loading && <LinearProgress color="primary" />}

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Name
        <input
          type="text"
          value={formData?.name || ""}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "name",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Name"
        />
      </label>
      <label
        htmlFor="mobile_number"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Mobile Number
      </label>
      <input
        type="text"
        name="mobile_number"
        className="w-full h-10 p-2 border border-gray-300 rounded"
        placeholder="Enter mobile number"
        value={formData?.mobile_number || ""}
        onChange={(e) => {
          dispatch(
            HandleChangeFormData({
              key: "mobile_number",
              value: e.target.value,
            })
          );
        }}
      />
      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
        Street Address
        <input
          type="text"
          value={formData?.street_address || ""}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "street_address",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Street Address"
        />
      </label>
      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
        Address Line 2
        <input
          type="text"
          value={formData?.address_line_2 || ""}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "address_line_2",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Address Line 2"
        />
      </label>

      <ProvinceSearch
        onSelectProvince={(data) => {
          dispatch(
            HandleChangeFormData({
              key: "province",
              value: data.province_name,
            })
          );
          dispatch(
            HandleChangeFormData({
              key: "province_id",
              value: data.province_id,
            })
          );
        }}
        setLoading={setLoadingP}
        loading={loadingP}
        setSearchTerm={setSearchTermP}
        hideLabel={false}
        loadOnMount={false}
        searchTerm={searchTermP}
      />

      <DistrictSearch
        onSelectDistrict={(data) => {
          dispatch(
            HandleChangeFormData({
              key: "district",
              value: data.district_name,
            })
          );
          dispatch(
            HandleChangeFormData({
              key: "district_id",
              value: data.district_id,
            })
          );
        }}
        setLoading={setLoadingD}
        loading={loadingD}
        setSearchTerm={setSearchTermD}
        hideLabel={false}
        loadOnMount={false}
        searchTerm={searchTermD}
      />

      <CitySearch
        onSelectCity={(data) => {
          setSearchTermP(data.province.province_name);
          setSearchTermD(data.district.district_name);
          dispatch(
            HandleChangeFormData({
              key: "batchUpdate",
              value: {
                city: data.city_name,
                city_id: data.id,
                district: data.district.district_name,
                district_id: data.district.district_id,
                province: data.province.province_name,
                province_id: data.province.province_id,
                postal_code: data.postal_code,
              },
            })
          );
        }}
        setLoading={setLoadingC}
        loading={loadingC}
        searchTerm={searchTermC}
        setSearchTerm={setSearchTermC}
        hideLabel={false}
        loadOnMount={false}
      />

      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
        Postal Code
        <input
          type="text"
          value={formData?.postal_code || ""}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "postal_code",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="10000008"
        />
      </label>

      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
        Country
        <input
          type="text"
          value={formData?.country || ""}
          onChange={(e) => {
            dispatch(
              HandleChangeFormData({
                key: "country",
                value: e.target.value,
              })
            );
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Country"
        />
      </label>

      <button
        disabled={loading}
        onClick={handleAddCustomer}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Add Customer
      </button>
    </div>
  );
};

export default CustomerForm;
