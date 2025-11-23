import React, { useEffect, useState } from "react";
import LocationSelectorMap from "../../../components/LocationSelectorMap/LocationSelectorMap";
import LocationButton from "./LocationButton";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import CitySearch from "../../../components/CCC/CitySearch/CitySearch";

const InstitutionCreateForm = ({ formData, onFormDataChange }) => {
  //
  const [locationData, setLocationData] = useState({
    url: "",
    latitude: null,
    longitude: null,
  });

  const handleLocationUpdate = (data) => {
    setLocationData(data);
    onFormDataChange({
      ...formData,
      location_url: data.url,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  const handleLocationSelect = (location) => {
    // setSelectedLocation(location);
    onFormDataChange({
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    onFormDataChange({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFormDataChange({
          ...formData,
          companyLogo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Province Search
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // District Search
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");

  // City Search
  const [loadingC, setLoadingC] = useState(false);
  const [searchTermC, setSearchTermC] = useState("");

  const companyLogoUrl = formData.companyLogo ? formData.companyLogo : null;
  const defaultLocationCoordinates =
    formData?.latitude && formData?.longitude
      ? [formData.latitude, formData.longitude]
      : [6.9271, 79.8612];

  useEffect(() => {
    if (formData?.addresses && formData?.addresses.length > 0) {
      setSearchTerm(formData?.addresses[0].province?.toString());
      setSearchTermD(formData?.addresses[0].district?.toString());
      setSearchTermC(formData?.addresses[0].city?.toString());
      onFormDataChange({
        ...formData,
        province: formData?.addresses[0].province?.toString(),
        province_id: formData?.addresses[0].province_id?.toString(),
        district: formData?.addresses[0].district?.toString(),
        district_id: formData?.addresses[0].district_id?.toString(),
        city: formData?.addresses[0].city?.toString(),
        city_id: formData?.addresses[0].city_id?.toString(),
        street_address: formData?.addresses[0].street_address?.toString(),
        address_line_2: formData?.addresses[0].address_line_2?.toString(),
        postal_code: formData?.addresses[0].postal_code?.toString(),
        country: formData?.addresses[0].country?.toString(),
      });
    }
  }, [formData?.addresses]);

  return (
    <>
      <div
        className="my-1 mx-5"
        // style={{ maxHeight: "1500px", minHeight: "1500px" }}
      >
        {/* {formData.id && formData.name && ( */}
        <>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full h-12 p-3 border border-gray-300 rounded-lg"
            placeholder="Enter Name"
            value={formData?.name}
            onChange={handleChange}
          />
        </>
        {/* )} */}
        {/* Address Field */}
        <label
          htmlFor="street_address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Street Address
        </label>
        <input
          type="text"
          name="street_address"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter street address"
          value={formData?.street_address}
          onChange={handleChange}
        />
        {/* Address Line 2 Field */}
        <label
          htmlFor="address_line_2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Address Line 2
        </label>
        <input
          type="text"
          name="address_line_2"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter address line 2"
          value={formData?.address_line_2}
          onChange={handleChange}
        />

        {/* Province ID Field */}
        <ProvinceSearch
          onSelectProvince={(data) => {
            onFormDataChange({
              ...formData,
              province_id: data.province_id,
              province: data.province_name,
            });
          }}
          setLoading={setLoading}
          loading={loading}
          // searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          hideLabel={false}
          loadOnMount={false}
          searchTerm={searchTerm}
        />

        {/* District ID Field */}
        <DistrictSearch
          onSelectDistrict={(data) => {
            onFormDataChange({
              ...formData,
              district_id: data.district_id,
              district: data.district_name,
            });
          }}
          setLoading={setLoadingD}
          loading={loadingD}
          // searchTerm={searchTermD}
          setSearchTerm={setSearchTermD}
          hideLabel={false}
          loadOnMount={false}
          searchTerm={searchTermD}
        />

        {/* City ID Field */}
        <CitySearch
          onSelectCity={(data) => {
            setSearchTerm(data.province.province_name);
            setSearchTermD(data.district.district_name);
            onFormDataChange({
              ...formData,
              // street_address,
              // address_line_2,
              city_id: data.id,
              city: data.city_name,
              district_id: data.district.district_id,
              district: data.district.district_name,
              province_id: data.province.province_id,
              province: data.province.province_name,
              postal_code: data.postal_code,
              // country,
            });
          }}
          setLoading={setLoadingC}
          loading={loadingC}
          searchTerm={searchTermC}
          setSearchTerm={setSearchTermC}
          hideLabel={false}
          loadOnMount={false}
        />

        {/* Postal Code Field */}
        <label
          htmlFor="postal_code"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Postal Code
        </label>
        <input
          type="text"
          name="postal_code"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter postal code"
          value={
            formData?.postal_code ||
            (formData?.addresses &&
              formData?.addresses?.length > 0 &&
              formData?.addresses[0].postal_code?.toString()) ||
            ""
          }
          onChange={handleChange}
        />

        {/* Country Field */}
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Country
        </label>
        <input
          type="text"
          name="country"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter country"
          value={
            formData?.country?.toString() ||
            (formData?.addresses &&
              formData?.addresses.length > 0 &&
              formData?.addresses[0].country?.toString() !== "" &&
              formData?.addresses[0].country?.toString()) ||
            "Sri Lanka"
          }
          onChange={handleChange}
        />

        {/* END OF NEW IMPLEMENTATION */}
      </div>
      <div className="my-1 mx-5">
        <label
          htmlFor="phone_1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone 1
        </label>
        <input
          type="text"
          name="phone_1"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter phone number"
          value={formData?.phone_1 || ""}
          onChange={handleChange}
        />
      </div>
      <div className="my-1 mx-5">
        <label
          htmlFor="phone_2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone 2
        </label>
        <input
          type="text"
          name="phone_2"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter phone number"
          value={formData?.phone_2 || ""}
          onChange={handleChange}
        />
      </div>
      <div className="my-1 mx-5">
        <label
          htmlFor="mobile_number"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile_number"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter mobile number"
          value={formData?.mobile_number || ""}
          onChange={handleChange}
        />
      </div>
      <div className="my-1 mx-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter email"
          value={formData?.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="my-1 mx-5 mb-5">
        <label
          htmlFor="web"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Web
        </label>
        <input
          type="text"
          name="web"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Enter web"
          value={formData?.web || ""}
          onChange={handleChange}
        />
      </div>
      <div className="my-1 mx-5 mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Is Active
          </span>
          <input
            name="is_active"
            id="is_active"
            type="checkbox"
            value=""
            class="sr-only peer"
            checked={formData?.is_active}
            onChange={handleToggle}
          />
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {!formData?.is_active && (
        <div className="my-1 mx-5 mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Active status change reason
            </span>
            <input
              type="text"
              name="active_status_change_reason"
              className="w-full h-12 p-3 border border-gray-300 rounded-lg"
              placeholder="Enter active status change reason"
              value={formData?.active_status_change_reason || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

      <div className="my-1 mx-5 mb-5">
        <LocationButton
          onLocationUpdate={handleLocationUpdate}
          defaultLocationUrl={formData?.location_url}
        />
      </div>
      <div className="my-1 mx-5 mb-5">
        <LocationSelectorMap
          onSelectLocation={handleLocationSelect}
          defaultCoordinates={
            locationData?.latitude && locationData?.longitude
              ? [locationData.latitude, locationData.longitude]
              : defaultLocationCoordinates
          }
          locationUrl={locationData.url}
        />
      </div>
      <div className="my-1 mx-5 mb-5">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Company Logo
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
          onChange={handleFileChange}
        />
        {companyLogoUrl && (
          <div className="mt-3 flex justify-center">
            <img
              src={companyLogoUrl}
              alt="Selected"
              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InstitutionCreateForm;
