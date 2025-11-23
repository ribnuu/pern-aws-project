import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import PoliceStationSearch from "../../../components/CCC/PoliceStationSearch/PoliceStationSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import CitySearch from "../../../components/CCC/CitySearch/CitySearch";
import CustomInputField from "../../../components/CustomInputField/CustomInputField";
import { fetchCountryNationality } from "../../../apis/NationalityApiService";
import { v4 as uuidv4 } from "uuid";
import HouseHoldersVehicles from "./HouseHoldersVehicles";

const OccupantForm = ({ occupant }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);
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
  const [nationalityOptions, setNationalityOptions] = useState([]);

  // add vehicles

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetchCountryNationality();
        const options = response.data;

        setNationalityOptions(options);
      } catch (error) {
        console.error("Error fetching nationalities", error);
      }
    };

    fetchNationalities();
  }, []);

  const updateFormData = (newOccupants) => {
    dispatch(
      HandleChangeFormData({ key: "chiefOccupants", value: newOccupants })
    );
  };

  const handleOccupantChange = (id, key, value) => {
    updateFormData(
      formData.chiefOccupants.map((occupant) =>
        occupant.id === id ? { ...occupant, [key]: value } : occupant
      )
    );
  };

  const handleOccupantChangeBatchUpdate = (id, updates) =>
    updateFormData(
      formData.chiefOccupants.map((occupant) =>
        occupant.id === id ? { ...occupant, ...updates } : occupant
      )
    );

  const updateVehiclesFormData = (updatedVehicles) => {
    dispatch(
      HandleChangeFormData({
        key: "chiefOccupantVehicles",
        value: updatedVehicles,
      })
    );
    setVehicles(updatedVehicles);
  };

  const handleAddVehicles = (event) => {
    event.preventDefault();

    const newVehicle = {
      id: uuidv4(),
      vehicle_type: "",
      vehicle_model: "",
      registration_number: "",
      occupant_type: "chiefOccupant",
      isEditing: true,
    };

    const updatedVehicles = [...vehicles, newVehicle];
    updateVehiclesFormData(updatedVehicles);
  };
  console.log(formData);
  return (
    <>
      <div className="flex-1 ">
        <div className="flex flex-col md:flex-row md:space-x-4  md:space-y-0">
          <div className="flex-1">
            {occupant.isDuplicate && (
              <div className="flex-1">
                <div className="flex-1">
                  <CustomInputField
                    id="status"
                    label="Status"
                    value={occupant?.status || ""}
                    onChange={(value) =>
                      handleOccupantChange(occupant.id, "status", value)
                    }
                    type="select"
                    options={[
                      { id: "move out", name: "Move Out" },
                      { id: "deceased", name: "Deceased" },
                    ]}
                    required={true}
                  />
                </div>
              </div>
            )}
            <CustomInputField
              key="full_name"
              id={`full_name_${occupant.id}`}
              label="Full Name"
              value={occupant?.full_name}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "full_name", value)
              }
              placeholder="Mr Perera"
              required={true}
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              key="nic_passport_number"
              id={`nic_passport_number_${occupant.id}`}
              label="NIC/Passport Number"
              value={occupant?.nic_passport_number}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "nic_passport_number", value)
              }
              placeholder={`199821515291`}
              required={true}
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              key="nationality"
              id={`nationality_${occupant.id}`}
              label="Nationality"
              value={occupant?.nationality}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "nationality", value)
              }
              placeholder="Sri Lankan"
              required={true}
              type="searchable-select"
              options={nationalityOptions}
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              id={`dob_${occupant.id}`}
              label="Date of Birth"
              value={occupant.dob}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "dob", value)
              }
              type="date"
              required={true}
            />
          </div>
        </div>

        {/* Contact Number and gender */}
        <div className="flex flex-col md:flex-row md:space-x-4 ">
          <div className="flex-1">
            <CustomInputField
              key="contact_number"
              id={`contact_number_${occupant.id}`}
              label="Contact Number"
              value={occupant?.contact_number}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "contact_number", value)
              }
              placeholder={`07XXXXXXXX`}
            />
          </div>
          <div className="flex-1">
            <div className="">
              <CustomInputField
                id="gender"
                label="Gender"
                value={occupant?.gender || ""}
                onChange={(value) =>
                  handleOccupantChange(occupant.id, "gender", value)
                }
                type="select"
                options={[
                  { id: "male", name: "Male" },
                  { id: "female", name: "Female" },
                  { id: "other", name: "Other" },
                ]}
                required={true}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="">
              <CustomInputField
                id="marital_status"
                label="Marital Status"
                value={occupant?.marital_status || ""}
                onChange={(value) =>
                  handleOccupantChange(occupant.id, "marital_status", value)
                }
                type="select"
                options={[
                  { id: "married", name: "Married" },
                  { id: "unmarried", name: "Unmarried" },
                ]}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4  md:space-y-0">
          <div className="flex-1">
            <CustomInputField
              required={true}
              id="street_address"
              label="Street Address"
              value={occupant.street_address || ""}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "street_address", value)
              }
              placeholder="428/4A"
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              id="address_line_2"
              label="Address Line 2"
              value={occupant.address_line_2 || ""}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "address_line_2", value)
              }
              placeholder="New Street"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4  md:space-y-0">
          <div className="flex-1">
            <CitySearch
              required={true}
              onSelectCity={(data) =>
                handleOccupantChangeBatchUpdate(occupant.id, {
                  city_name: data.city_name,
                  city_id: data.id,
                  district_name: data.district.district_name,
                  district_id: data.district.district_id,
                  province_name: data.province.province_name,
                  province_id: data.province.province_id,
                  postal_code: data.postal_code,
                })
              }
              setLoading={(loading) =>
                setLoading({ ...loading, city: loading })
              }
              loading={loading.city}
              searchTerm={
                searchTerm.city
                  ? searchTerm.city
                  : occupant?.city?.city_name
                  ? occupant?.city?.city_name
                  : occupant?.city_name
              }
              setSearchTerm={(term) =>
                setSearchTerm({ ...searchTerm, city: term })
              }
            />
          </div>
          <div className="flex-1">
            <ProvinceSearch
              required={true}
              disabled={true}
              onSelectProvince={(data) =>
                handleOccupantChangeBatchUpdate(occupant.id, {
                  province_id: data.province_id,
                  province_name: data.province_name,
                })
              }
              setLoading={(loading) =>
                setLoading({ ...loading, province: loading })
              }
              loading={loading.province}
              setSearchTerm={(term) =>
                setSearchTerm({ ...searchTerm, province: term })
              }
              searchTerm={
                searchTerm.province
                  ? searchTerm.province
                  : occupant?.province_name
                  ? occupant.province_name
                  : occupant?.province?.province_name
              }
            />
          </div>
          <div className="flex-1">
            <DistrictSearch
              disabled={true}
              required={true}
              onSelectDistrict={(data) =>
                handleOccupantChangeBatchUpdate(occupant.id, {
                  district_id: data.district_id,
                  district_name: data.district_name,
                })
              }
              setLoading={(loading) =>
                setLoading({ ...loading, district: loading })
              }
              loading={loading.district}
              setSearchTerm={(term) =>
                setSearchTerm({ ...searchTerm, district: term })
              }
              searchTerm={
                searchTerm.district
                  ? searchTerm.district
                  : occupant?.district_name
                  ? occupant.district_name
                  : occupant?.district?.district_name
              }
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              id="postal_code"
              label="Postal Code"
              value={occupant.postal_code || ""}
              onChange={(value) =>
                handleOccupantChange(occupant.id, "postal_code", value)
              }
              placeholder="select a city to auto fill this"
              disabled={true}
              required={true}
            />
          </div>
        </div>

        <div className="flex-1">
          <CustomInputField
            id={`profession${occupant.id}`}
            label="profession"
            value={occupant?.profession}
            onChange={(value) =>
              handleOccupantChange(occupant.id, "profession", value)
            }
            placeholder="doctor"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`email${occupant.id}`}
            label="email"
            value={occupant?.email}
            onChange={(value) =>
              handleOccupantChange(occupant.id, "email", value)
            }
            placeholder="example123@gmail.com"
          />
        </div>

        <PoliceStationSearch
          required={true}
          onSelectPoliceStation={(station) =>
            handleOccupantChangeBatchUpdate(occupant.id, {
              police_station_id: station?.id,
              police_station_name: station?.police_station_name,
            })
          }
          setLoading={(loading) =>
            setLoading({ ...loading, policeStation: loading })
          }
          loading={loading.policeStation}
          setSearchTerm={(term) =>
            setSearchTerm({ ...searchTerm, policeStation: term })
          }
          searchTerm={
            searchTerm.policeStation
              ? searchTerm.policeStation
              : occupant.police_station_name
            // ? searchTerm.policeStation
            // : occupant?.police_station_name
            // ? occupant.police_station_name
            // : occupant.police_station_name
          }
          labelText="Search Police Station"
        />
        {/* Vehicle Section */}
        <HouseHoldersVehicles
          occupant={{ ...formData.chiefOccupant }}
          updateVehicles={updateVehiclesFormData}
          vehicles={vehicles}
        />

        {/* Add New Vehicle Button */}
        <button onClick={handleAddVehicles} className="text-blue-500 mt-4">
          Add New Vehicle
        </button>
      </div>
    </>
  );
};

export default OccupantForm;
