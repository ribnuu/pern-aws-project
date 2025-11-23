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

const OtherResidentsForm = ({ otherResident }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);
  // Province Search
  const [loadingP, setLoadingP] = useState(false);
  const [searchTermP, setSearchTermP] = useState("");

  // District Search
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");

  // City Search
  const [loadingC, setLoadingC] = useState(false);
  const [searchTermC, setSearchTermC] = useState("");

  // Police Station Search
  const [loadingPoliceStation, setLoadingPoliceStation] = useState(false);
  const [searchTermPoliceStation, setSearchTermPoliceStation] = useState("");

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
      HandleChangeFormData({ key: "otherResidents", value: newOccupants })
    );
  };

  const handleOccupantChange = (id, key, value) =>
    updateFormData(
      formData?.otherResidents?.map((occupant) =>
        occupant.id === id ? { ...occupant, [key]: value } : occupant
      )
    );
  const handleOccupantChangeBatchUpdate = (id, updates) =>
    updateFormData(
      formData?.otherResidents?.map((occupant) =>
        occupant.id === id ? { ...occupant, ...updates } : occupant
      )
    );

  const updateVehiclesFormData = (updatedVehicles) => {
    dispatch(
      HandleChangeFormData({
        key: "otherResidentsVehicles",
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
      occupant_type: "otherResidents",
      isEditing: true,
    };

    const updatedVehicles = [...vehicles, newVehicle];
    updateVehiclesFormData(updatedVehicles);
  };

  console.log(formData);
  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        {otherResident.isDuplicate && (
          <div className="flex-1">
            <div className="flex-1">
              <CustomInputField
                id="status"
                label="Status"
                value={otherResident?.status || ""}
                onChange={(value) =>
                  handleOccupantChange(otherResident.id, "status", value)
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
        <div className="flex-1">
          <CustomInputField
            key={"full_name"}
            id={`full_name_${otherResident?.id}`}
            label={"Full Name"}
            value={otherResident?.full_name}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "full_name", value)
            }
            placeholder={`Sherlock Holmes`}
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            key={"nic_passport_number"}
            id={`nic_passport_number_${otherResident.id}`}
            label={"NIC/Passport Number"}
            value={otherResident?.nic_passport_number}
            onChange={(value) =>
              handleOccupantChange(
                otherResident.id,
                "nic_passport_number",
                value
              )
            }
            placeholder={`Sherlock Holmes`}
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            key="nationality"
            id={`nationality_${otherResident.id}`}
            label="Nationality"
            value={otherResident?.nationality}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "nationality", value)
            }
            placeholder="Sri Lankan"
            required={true}
            type="searchable-select"
            options={nationalityOptions}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`dob_${otherResident.id}`}
            label="Date of Birth"
            value={otherResident.dob}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "dob", value)
            }
            type="date"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id={`street_address_${otherResident.id}`}
            label="Street Address"
            value={otherResident.street_address}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "street_address", value)
            }
            placeholder="428/4A"
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`address_line_2_${otherResident.id}`}
            label="Address Line 2"
            value={otherResident.address_line_2}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "address_line_2", value)
            }
            placeholder="428/4A"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CitySearch
            onSelectCity={(data) =>
              handleOccupantChangeBatchUpdate(otherResident.id, {
                city_name: data.city_name,
                city_id: data.id,
                district_name: data.district.district_name,
                district_id: data.district.district_id,
                province_name: data.province.province_name,
                province_id: data.province.province_id,
                postal_code: data.postal_code,
              })
            }
            setLoading={setLoadingC}
            loading={loadingC}
            searchTerm={searchTermC}
            setSearchTerm={setSearchTermC}
            required={true}
          />
        </div>
        <div className="flex-1">
          <ProvinceSearch
            onSelectProvince={(data) =>
              handleOccupantChangeBatchUpdate(otherResident.id, {
                province_id: data.province_id,
                province_name: data.province_name,
              })
            }
            setLoading={setLoadingP}
            loading={loadingP}
            setSearchTerm={setSearchTermP}
            searchTerm={
              searchTermP
                ? searchTermP
                : otherResident.province_name
                ? otherResident.province_name
                : otherResident?.province?.province_name
            }
            disabled={true}
            required={true}
          />
        </div>
        <div className="flex-1">
          <DistrictSearch
            onSelectDistrict={(data) =>
              handleOccupantChangeBatchUpdate(otherResident.id, {
                district_id: data.district_id,
                district_name: data.district_name,
              })
            }
            setLoading={setLoadingD}
            loading={loadingD}
            setSearchTerm={setSearchTermD}
            searchTerm={
              searchTermD
                ? searchTermD
                : otherResident.district_name
                ? otherResident.district_name
                : otherResident?.district?.district_name
            }
            disabled={true}
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="postal_code"
            label="Postal Code"
            value={otherResident.postal_code || ""}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "postal_code", value)
            }
            placeholder="select a city to auto fill this"
            disabled={true}
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id={`contact_number_${otherResident.id}`}
            label="Contact Number"
            value={otherResident?.contact_number}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "contact_number", value)
            }
            placeholder="07XXXXXXXX"
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id="gender"
            label="Gender"
            value={otherResident?.gender || ""}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "gender", value)
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
        <div className="flex-1">
          <CustomInputField
            id="marital_status"
            label="Marital Status"
            value={otherResident?.marital_status || ""}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "marital_status", value)
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

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id="chief_occupant_id"
            label="Relationship to Chief Occupant"
            value={otherResident?.chief_occupant_id || ""}
            onChange={(selectedId) => {
              handleOccupantChange(
                otherResident.id,
                "chief_occupant_id",
                selectedId
              );
            }}
            type="select"
            options={
              formData?.chiefOccupants?.map((co) => ({
                id: co?.id,
                name: co?.full_name,
              })) || [] // Map the chief occupants to match the expected format
            }
            required
          />
        </div>

        <div className="flex-1">
          <CustomInputField
            id="relationship_to_chief"
            label="Relationship to Chief Occupant"
            value={otherResident?.relationship_to_chief || ""}
            onChange={(value) =>
              handleOccupantChange(
                otherResident.id,
                "relationship_to_chief",
                value
              )
            }
            type="select"
            options={[
              { id: "driver", name: "Driver" },
              { id: "servant", name: "Servant" },
              { id: "maid", name: "Maid" },
              { id: "nanny", name: "Nanny" },
              { id: "gardener", name: "Gardener" },
              { id: "cook", name: "Cook" },
              { id: "housekeeper", name: "Housekeeper" },
              { id: "security_guard", name: "Security Guard" },
              { id: "tenant", name: "Tenant" },
              { id: "guest", name: "Guest" },
              { id: "pet", name: "Pet" }, // For pets in the household (e.g., dog, cat)
              { id: "cleaner", name: "Cleaner" },
              { id: "personal_assistant", name: "Personal Assistant" },
              { id: "nurse", name: "Nurse" },
              { id: "physiotherapist", name: "Physiotherapist" },
              { id: "caretaker", name: "Caretaker" },
              { id: "sitter", name: "Sitter" },
              { id: "house_manager", name: "House Manager" },
              { id: "roommate", name: "Roommate" },
            ]}
            // Example: [{ id: 1, name: "John Doe" }]
            required
            placeholder="sfd"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <CustomInputField
            id="purpose_of_stay"
            label="Purpose of Stay"
            value={otherResident.purpose_of_stay || ""}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "purpose_of_stay", value)
            }
            placeholder="Driving/Servant/Nurse/Maid"
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`from_date_${otherResident.id}`}
            label="From"
            value={otherResident.from_date}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "from_date", value)
            }
            type="date"
            required={true}
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`to_date_${otherResident.id}`}
            label="To"
            value={otherResident.to_date}
            onChange={(value) =>
              handleOccupantChange(otherResident.id, "to_date", value)
            }
            type="date"
            required={true}
          />
        </div>
      </div>

      <div className="flex-1">
        <CustomInputField
          id={`profession${otherResident.id}`}
          label="profession"
          value={otherResident?.profession}
          onChange={(value) =>
            handleOccupantChange(otherResident.id, "profession", value)
          }
          placeholder="doctor"
        />
      </div>
      <div className="flex-1">
        <CustomInputField
          id={`email${otherResident.id}`}
          label="email"
          value={otherResident?.email}
          onChange={(value) =>
            handleOccupantChange(otherResident.id, "email", value)
          }
          placeholder="example123@gmail.com"
        />
      </div>

      <PoliceStationSearch
        onSelectPoliceStation={(station) =>
          handleOccupantChangeBatchUpdate(otherResident.id, {
            police_station_id: station?.id,
            police_station_name: station?.police_station_name,
          })
        }
        setLoading={setLoadingPoliceStation}
        loading={loadingPoliceStation}
        setSearchTerm={setSearchTermPoliceStation}
        searchTerm={searchTermPoliceStation}
        labelText="Search Police Station"
        required={true}
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
  );
};

export default OtherResidentsForm;
