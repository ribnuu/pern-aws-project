import React, { useEffect, useState } from "react";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import CitySearch from "../../../components/CCC/CitySearch/CitySearch";
import LocationButton from "../../PointOfSales/InstitutionManagementScreen/LocationButton";
import LocationSelectorMap from "../../../components/LocationSelectorMap/LocationSelectorMap";
import { useDispatch } from "react-redux";
import CustomRatingComponent from "../../../components/CustomRatingComponent/CustomRatingComponent";
import { FormattedMessage } from "react-intl";
import CustomInputField from "../../../components/CustomInputField/CustomInputField";

// Reusable Select Component
const SelectField = ({ id, value, onChange, label, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 px-3 py-2 border rounded-md"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const HotelInformationForm = ({ formData }) => {
  const dispatch = useDispatch();
  const [loadingP, setLoadingP] = useState(false);
  const [searchTermP, setSearchTermP] = useState("");
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");
  const [loadingC, setLoadingC] = useState(false);
  const [searchTermC, setSearchTermC] = useState("");

  const defaultLocationCoordinates =
    formData?.latitude && formData?.longitude
      ? [formData.latitude, formData.longitude]
      : [6.9271, 79.8612];

  const handleLocationUpdate = (data) => {
    dispatch(
      HandleChangeFormData({
        key: "batchUpdate",
        value: {
          location_url: data.url,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      })
    );
  };

  const handleLocationSelect = (location) => {
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    dispatch(
      HandleChangeFormData({
        key: "batchUpdate",
        value: {
          location_url: url,
          latitude: location.lat,
          longitude: location.lng,
        },
      })
    );
  };

  useEffect(() => {
    if (Object.keys(formData)?.length > 0) {
      setSearchTermP(formData?.province?.province_name);
      setSearchTermD(formData?.district?.district_name);
      setSearchTermC(formData?.city?.city_name);
    }
  }, [formData]);

  return (
    <form className=" mb-4">
      <CustomInputField
        required={true}
        id="name"
        label={
          <FormattedMessage
            id="app.hotel.form_fields.hotel_name"
            defaultMessage="Hotel Name"
          />
        }
        value={formData.name || ""}
        onChange={(value) =>
          dispatch(HandleChangeFormData({ key: "name", value }))
        }
        placeholder="Enter hotel name"
      />
      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            required={true}
            id="street_address"
            label={
              <FormattedMessage
                id="app.general.address.form_fields.street_address"
                defaultMessage="Street Address"
              />
            }
            value={formData?.street_address || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "street_address", value }))
            }
            placeholder="Street Address"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="address_line_2"
            label={
              <FormattedMessage
                id="app.general.address.form_fields.address_line_2"
                defaultMessage="Address Line 2"
              />
            }
            value={formData?.address_line_2 || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "address_line_2", value }))
            }
            placeholder="Address Line 2"
          />
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"> */}
      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          {/* City Search */}
          <CitySearch
            required={true}
            onSelectCity={(data) => {
              setSearchTermP(data.province.province_name);
              setSearchTermD(data.district.district_name);
              dispatch(
                HandleChangeFormData({
                  key: "batchUpdate",
                  value: {
                    city_name: data.city_name,
                    city_id: data.id,
                    district_id: data.district.district_id,
                    district_name: data.district.district_name,
                    province_name: data.province.province_name,
                    province_id: data.province.province_id,
                    postal_code: data.postal_code,
                  },
                })
              );
            }}
            setLoading={setLoadingC}
            loading={loadingC}
            searchTerm={
              searchTermC && searchTermC !== ""
                ? searchTermC
                : formData?.city_name
                ? formData?.city_name
                : formData?.city?.city_name
            }
            setSearchTerm={setSearchTermC}
            hideLabel={false}
            loadOnMount={false}
          />
        </div>
        {/* Province Search */}
        <div className="flex-1">
          <ProvinceSearch
            required={true}
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
            // searchTerm={searchTermP}
            searchTerm={
              formData?.province_name
                ? formData?.province_name
                : formData?.province?.province_name
                ? formData.province.province_name
                : searchTermP
            }
            disabled={true}
          />
        </div>

        {/* District Search */}
        <div className="flex-1">
          <DistrictSearch
            required={true}
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
            searchTerm={
              formData?.district_name
                ? formData?.district_name
                : formData?.district?.district_name
                ? formData.district.district_name
                : searchTermD
            }
            disabled={true}
          />
        </div>

        {/* Postal Code */}
        <div className="flex-1">
          <CustomInputField
            required={true}
            id="postal_code"
            label={
              <FormattedMessage
                id="app.general.address.form_fields.postal_code"
                defaultMessage="Postal Code"
              />
            }
            value={formData?.postal_code || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "postal_code", value }))
            }
            placeholder="10000008"
            disabled={true}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4  md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            required={true}
            id="hotel_main_contact_number"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.hotel_main_contact_number"
                defaultMessage="Hotel Main Contact Number"
              />
            }
            value={formData.hotel_main_contact_number || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({
                  key: "hotel_main_contact_number",
                  value,
                })
              )
            }
            placeholder="07XXXXXXXX"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="hotel_whatsapp_number"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.hotel_whatsapp_number"
                defaultMessage="Hotel Whatsapp Number"
              />
            }
            value={formData.hotel_whatsapp_number || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({ key: "hotel_whatsapp_number", value })
              )
            }
            placeholder="07XXXXXXXX"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="manager_contact_number"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.manager_contact_number"
                defaultMessage="Manager Contact Number"
              />
            }
            value={formData.manager_contact_number || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({ key: "manager_contact_number", value })
              )
            }
            placeholder="07XXXXXXXX"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="security_contact_number"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.security_contact_number"
                defaultMessage="Security Contact Number"
              />
            }
            value={formData.security_contact_number || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({ key: "security_contact_number", value })
              )
            }
            placeholder="07XXXXXXXX"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id="website"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.website_url"
                defaultMessage="Website URL"
              />
            }
            value={formData.website || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "website", value }))
            }
            placeholder="https://www.your-hotel-website-ur.lk"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            required={true}
            id="rooms"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.total_number_of_rooms"
                defaultMessage="Total Number of Rooms"
              />
            }
            value={formData.rooms || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "rooms", value }))
            }
            placeholder="0"
            type="number"
            min="1"
            max="1000"
          />
        </div>
        <div className="flex-1">
          {/* <SelectField
            id="type"
            label={
              <>
                <FormattedMessage
                  id="app.hotel.form_fields.hotel_type"
                  defaultMessage="Hotel Type"
                />
                <span className="text-red-500 ml-1 font-semibold">*</span>
              </> // Red asterisk for required fields
            }
            value={formData.type || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "type", value }))
            }
            options={[
              { value: "luxury", label: "Luxury" },
              { value: "budget", label: "Budget" },
              { value: "boutique", label: "Boutique" },
              { value: "resort", label: "Resort" },
              { value: "guestHouse", label: "Guest House" },
              { value: "ecoHotel", label: "Eco-Hotel" },
              { value: "villa", label: "Villa" },
              { value: "hostel", label: "Hostel" },
              { value: "businessHotel", label: "Business Hotel" },
              { value: "heritageHotel", label: "Heritage Hotel" },
              { value: "holidayHome", label: "Holiday Home" },
              { value: "safariLodge", label: "Safari Lodge" },
              { value: "apartmentHotel", label: "Apartment Hotel" },
            ]}
          /> */}
          <CustomInputField
            id="type"
            label={
              <>
                <FormattedMessage
                  id="app.hotel.form_fields.hotel_type"
                  defaultMessage="Hotel Type"
                />
              </> // Red asterisk for required fields
            }
            value={formData?.type}
            onChange={
              (value) => dispatch(HandleChangeFormData({ key: "type", value }))
              // handleOccupantChange(formData.id, "type", value)
            }
            type="select"
            options={[
              { id: undefined, name: "Select" },
              { id: "luxury", name: "Luxury" },
              { id: "budget", name: "Budget" },
              { id: "boutique", name: "Boutique" },
              { id: "resort", name: "Resort" },
              { id: "guestHouse", name: "Guest House" },
              { id: "ecoHotel", name: "Eco-Hotel" },
              { id: "villa", name: "Villa" },
              { id: "hostel", name: "Hostel" },
              { id: "businessHotel", name: "Business Hotel" },
              { id: "heritageHotel", name: "Heritage Hotel" },
              { id: "holidayHome", name: "Holiday Home" },
              { id: "safariLodge", name: "Safari Lodge" },
              { id: "apartmentHotel", name: "Apartment Hotel" },
            ]} // Example: [{ id: 1, name: "John Doe" }]
            required={true}
          />
        </div>
        <div className="flex-1 mt-4 mb-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-2">
              Star Rating
            </label>
            <CustomRatingComponent
              totalStars={7}
              onRatingSelect={(value) => {
                if (value === 0) {
                  dispatch(
                    HandleChangeFormData({ key: "rating", value: null })
                  );
                } else {
                  dispatch(
                    HandleChangeFormData({ key: "rating", value: value })
                  );
                }
              }}
              defaultValue={formData?.rating}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id="security_officials"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.number_of_security_officials"
                defaultMessage="Number of Security Officials"
              />
            }
            value={formData.security_officials || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({
                  key: "security_officials",
                  value: value ? parseInt(value, 10) : "",
                })
              )
            }
            placeholder="0"
            type="number"
            min="1"
            max="1000"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="security_cameras"
            label={
              <FormattedMessage
                id="app.hotel.form_fields.number_of_security_cameras"
                defaultMessage="Number of Security Cameras"
              />
            }
            value={formData.security_cameras || ""}
            onChange={(value) =>
              dispatch(
                HandleChangeFormData({
                  key: "security_cameras",
                  value: value ? parseInt(value, 10) : "",
                })
              )
            }
            placeholder="0"
            type="number"
            min="1"
            max="1000"
          />
        </div>
      </div>

      {/* Security Guard Schedule */}
      <label className="block text-sm font-medium">
        <FormattedMessage
          id="app.hotel.form_fields.security_guard_schedule"
          defaultMessage="Security Guard Schedule"
        />
      </label>
      <div className="flex gap-4 mt-2">
        {[
          { id: "app.hotel.form_fields.guard_schedule_24_7", value: "24/7" },
          {
            id: "app.hotel.form_fields.guard_schedule_only_day",
            value: "Only Day",
          },
          {
            id: "app.hotel.form_fields.guard_schedule_only_night",
            value: "Only Night",
          },
        ].map((schedule) => (
          <label key={schedule.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="guard_schedule"
              value={schedule.value}
              checked={formData.guard_schedule === schedule.value}
              onChange={(e) =>
                dispatch(
                  HandleChangeFormData({
                    key: "guard_schedule",
                    value: e.target.value,
                  })
                )
              }
              className="accent-blue-500"
            />
            <FormattedMessage
              id={schedule.id}
              defaultMessage={schedule.value}
            />
          </label>
        ))}
      </div>

      <div className="mt-4">
        <LocationButton
          onLocationUpdate={handleLocationUpdate}
          defaultLocationUrl={formData?.location_url}
        />
      </div>
      <div className="my-1">
        <LocationSelectorMap
          onSelectLocation={handleLocationSelect}
          defaultCoordinates={
            formData?.latitude && formData?.longitude
              ? [formData.latitude, formData.longitude]
              : defaultLocationCoordinates
          }
          locationUrl={formData.url}
        />
      </div>
    </form>
  );
};

export default HotelInformationForm;
