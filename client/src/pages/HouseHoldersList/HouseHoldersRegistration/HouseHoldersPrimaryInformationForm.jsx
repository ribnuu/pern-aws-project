import React, { useEffect, useState } from "react";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import LocationButton from "../../PointOfSales/InstitutionManagementScreen/LocationButton";
import LocationSelectorMap from "../../../components/LocationSelectorMap/LocationSelectorMap";
import { useDispatch } from "react-redux";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import CitySearch from "../../../components/CCC/CitySearch/CitySearch";
import CustomInputField from "../../../components/CustomInputField/CustomInputField";

const HouseHoldersPrimaryInformationForm = ({ formData, manage = false }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    policeStation: false,
    province: false,
    district: false,
    city: false,
  });
  const [searchTerm, setSearchTerm] = useState({
    policeStation: "",
    province: "",
    district: "",
    city: "",
  });

  // Province Search
  const [loadingP, setLoadingP] = useState(false);
  const [searchTermP, setSearchTermP] = useState("");

  // District Search
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");

  // City Search
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
      setSearchTermC(
        formData?.city_name ? formData.city_name : formData?.city?.city_name
      );
    }
  }, [formData]);

  return (
    <form className="mb-4">
      <CustomInputField
        id="divisional_secretariat"
        label="Divisional Secretariat"
        value={formData.divisional_secretariat || ""}
        onChange={(value) =>
          !manage &&
          dispatch(
            HandleChangeFormData({ key: "divisional_secretariat", value })
          )
        }
        placeholder="Enter Divisional Secretariat"
        required={true}
        disabled={manage}
      />

      <CustomInputField
        id="gn_division"
        label="Grama Niladari Division"
        value={formData.gn_division || ""}
        onChange={(value) =>
          !manage &&
          dispatch(HandleChangeFormData({ key: "gn_division", value }))
        }
        placeholder="GN Division"
        required={true}
        disabled={manage}
      />

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id="street_address"
            label="Street Address"
            value={formData.street_address || ""}
            onChange={(value) =>
              !manage &&
              dispatch(HandleChangeFormData({ key: "street_address", value }))
            }
            placeholder="428/4A"
            required={true}
            disabled={manage}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="address_line_2"
            label="Address Line 2"
            value={formData.address_line_2 || ""}
            onChange={(value) =>
              !manage &&
              dispatch(HandleChangeFormData({ key: "address_line_2", value }))
            }
            placeholder="New Street"
            disabled={manage}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 z-50">
        <div className="flex-1">
          <CitySearch
            required={true}
            onSelectCity={(data) =>
              !manage &&
              dispatch(
                HandleChangeFormData({
                  key: "batchUpdate",
                  value: {
                    city_name: data.city_name,
                    city_id: data.id,
                    district_name: data.district.district_name,
                    district_id: data.district.district_id,
                    province_name: data.province.province_name,
                    province_id: data.province.province_id,
                    postal_code: data.postal_code,
                  },
                })
              )
            }
            setLoading={setLoadingC}
            loading={loadingC}
            searchTerm={searchTermC}
            setSearchTerm={setSearchTermC}
            disabled={manage}
          />
        </div>
        <div className="flex-1">
          <ProvinceSearch
            required={true}
            onSelectProvince={(data) =>
              dispatch(
                HandleChangeFormData({
                  key: "batchUpdate",
                  value: {
                    province_id: data.province_id,
                    province_name: data.province_name,
                  },
                })
              )
            }
            setLoading={setLoadingP}
            // setLoading={(loading) =>
            //   setLoading({ ...loading, province: loading })
            // }
            loading={loadingP}
            // setSearchTerm={(term) =>
            //   setSearchTerm({ ...searchTerm, province: term })
            // }
            setSearchTerm={setSearchTermP}
            searchTerm={
              searchTermP
                ? searchTermP
                : formData.province_name
                ? formData.province_name
                : formData?.province?.province_name
            }
            disabled={true}
          />
        </div>
        <div className="flex-1">
          <DistrictSearch
            required={true}
            onSelectDistrict={(data) =>
              dispatch(
                HandleChangeFormData({
                  key: "batchUpdate",
                  value: {
                    district_id: data.district_id,
                    district_name: data.district_name,
                  },
                })
              )
            }
            setLoading={setLoadingD}
            // setLoading={(loading) =>
            //   setLoading({ ...loading, district: loading })
            // }
            // loading={loading.district}
            loading={loadingD}
            // setSearchTerm={(term) =>
            //   setSearchTerm({ ...searchTerm, district: term })
            // }
            setSearchTerm={setSearchTermD}
            searchTerm={
              searchTermD
                ? searchTermD
                : formData.district_name
                ? formData.district_name
                : formData?.district?.district_name
            }
            disabled={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="postal_code"
            label="Postal Code"
            value={formData.postal_code || ""}
            onChange={(value) =>
              dispatch(HandleChangeFormData({ key: "postal_code", value }))
            }
            placeholder="select a city to auto fill this"
            disabled={true}
            required={true}
          />
        </div>
      </div>

      {/*geo location should be get */}
      <div>
        <LocationButton
          required={true}
          onLocationUpdate={handleLocationUpdate}
          defaultLocationUrl={formData?.location_url}
          disabled={manage}
        />
      </div>
      {/* <div className="my-1 -z-30">
        <LocationSelectorMap
          onSelectLocation={!manage ? handleLocationSelect : undefined}
          defaultCoordinates={
            formData?.latitude && formData?.longitude
              ? [formData.latitude, formData.longitude]
              : defaultLocationCoordinates
          }
          locationUrl={formData.url}
          disabled={manage}
        />
      </div> */}
    </form>
  );
};

export default HouseHoldersPrimaryInformationForm;
