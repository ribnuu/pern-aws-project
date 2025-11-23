import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import CustomInputField from "../../../components/CustomInputField/CustomInputField";
import { fetchCountryNationality } from "../../../apis/NationalityApiService";
import HouseHoldersVehicles from "./HouseHoldersVehicles";
import { v4 as uuidv4 } from "uuid";

const FamilyMemberForm = ({ familyMember }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);

  const [nationalityOptions, setNationalityOptions] = useState([]);

  // const base_url = process.env.VITE_NODE_SERVER_ENDPOINT;

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

  const updateFormData = (newOccupants) =>
    dispatch(
      HandleChangeFormData({ key: "familyMembers", value: newOccupants })
    );

  const handleOccupantChange = (id, key, value) =>
    updateFormData(
      formData?.familyMembers.map((occupant) =>
        occupant.id === id ? { ...occupant, [key]: value } : occupant
      )
    );

  const updateVehiclesFormData = (updatedVehicles) => {
    dispatch(
      HandleChangeFormData({
        key: "familyMembersVehicles",
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
      occupant_id: familyMember.id,
      occupant_type: "familyMember",
      isEditing: true,
    };

    const updatedVehicles = [...vehicles, newVehicle];
    updateVehiclesFormData(updatedVehicles);
  };
  console.log(formData);

  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
          {familyMember.isDuplicate && (
            <div className="flex-1">
              <div className="flex-1">
                <CustomInputField
                  id="status"
                  label="Status"
                  value={familyMember?.status || ""}
                  onChange={(value) =>
                    handleOccupantChange(familyMember.id, "status", value)
                  }
                  type="select"
                  options={[
                    { id: "move out", name: "Move Out" },
                    { id: "deceased", name: "Deceased" },
                    { id: "divorce", name: "Divorce" },
                  ]}
                  required={true}
                />
              </div>
            </div>
          )}
          <div className="flex-1">
            <CustomInputField
              key={"full_name"}
              id={`full_name_${familyMember.id}`}
              label={"Full Name"}
              value={familyMember?.full_name}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "full_name", value)
              }
              placeholder={`Sherlock Holmes`}
              required={true}
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              key={"nic_passport_number"}
              id={`nic_passport_number_${familyMember.id}`}
              label={"NIC/Passport Number"}
              value={familyMember?.nic_passport_number}
              onChange={(value) =>
                handleOccupantChange(
                  familyMember.id,
                  "nic_passport_number",
                  value
                )
              }
              placeholder={`1998271626251`}
              required={true}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <CustomInputField
              key="nationality"
              id={`nationality_${familyMember.id}`}
              label="Nationality"
              value={familyMember?.nationality}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "nationality", value)
              }
              placeholder="Sri Lankan"
              required={true}
              type="searchable-select"
              options={nationalityOptions}
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              id={`dob_${familyMember.id}`}
              label="Date of Birth"
              value={familyMember.dob}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "dob", value)
              }
              type="date"
              required={true}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <CustomInputField
              id="chief_occupant_id"
              label="Relationship to Chief Occupant"
              value={familyMember?.chief_occupant_id || ""}
              onChange={(selectedId) => {
                handleOccupantChange(
                  familyMember.id,
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
              value={familyMember?.relationship_to_chief}
              onChange={(value) =>
                handleOccupantChange(
                  familyMember.id,
                  "relationship_to_chief",
                  value
                )
              }
              type="select"
              options={[
                { id: null, name: "" },
                { id: "father", name: "Father" },
                { id: "mother", name: "Mother" },
                { id: "brother", name: "Brother" },
                { id: "sister", name: "Sister" },
                { id: "spouse", name: "Spouse" },
                { id: "child", name: "Child" },
                { id: "grandfather", name: "Grandfather" },
                { id: "grandmother", name: "Grandmother" },
                { id: "uncle", name: "Uncle" },
                { id: "aunt", name: "Aunt" },
                { id: "nephew", name: "Nephew" },
                { id: "niece", name: "Niece" },
                { id: "cousin", name: "Cousin" },
                { id: "father_in_law", name: "Father-in-law" },
                { id: "mother_in_law", name: "Mother-in-law" },
                { id: "brother_in_law", name: "Brother-in-law" },
                { id: "sister_in_law", name: "Sister-in-law" },
                { id: "son_in_law", name: "Son-in-law" },
                { id: "daughter_in_law", name: "Daughter-in-law" },
                { id: "step_father", name: "Stepfather" },
                { id: "step_mother", name: "Stepmother" },
                { id: "step_brother", name: "Stepbrother" },
                { id: "step_sister", name: "Stepsister" },
                { id: "great_grandfather", name: "Great-grandfather" },
                { id: "great_grandmother", name: "Great-grandmother" },
                { id: "great_uncle", name: "Great-uncle" },
                { id: "great_aunt", name: "Great-aunt" },
                { id: "great_nephew", name: "Great-nephew" },
                { id: "great_niece", name: "Great-niece" },
                { id: "great_cousin", name: "Great-cousin" },
                { id: "half_brother", name: "Half-brother" },
                { id: "half_sister", name: "Half-sister" },
                { id: "adoptive_father", name: "Adoptive father" },
                { id: "adoptive_mother", name: "Adoptive mother" },
                { id: "adoptive_brother", name: "Adoptive brother" },
                { id: "adoptive_sister", name: "Adoptive sister" },
                { id: "foster_father", name: "Foster father" },
                { id: "foster_mother", name: "Foster mother" },
                { id: "foster_brother", name: "Foster brother" },
                { id: "foster_sister", name: "Foster sister" },
                { id: "partner", name: "Partner" },
                { id: "ex_husband", name: "Ex-husband" },
                { id: "ex_wife", name: "Ex-wife" },
                { id: "ex_brother_in_law", name: "Ex-brother-in-law" },
                { id: "ex_sister_in_law", name: "Ex-sister-in-law" },
              ]}
              // Example: [{ id: 1, name: "John Doe" }]
              required={true}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <CustomInputField
              id={`contact_number_${familyMember.id}`}
              label="Contact Number"
              value={familyMember?.contact_number}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "contact_number", value)
              }
              placeholder="07XXXXXXXX"
            />
          </div>
          <div className="flex-1">
            <CustomInputField
              id="gender"
              label="Gender"
              value={familyMember?.gender || ""}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "gender", value)
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
              value={familyMember?.marital_status || ""}
              onChange={(value) =>
                handleOccupantChange(familyMember.id, "marital_status", value)
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

        <div className="flex-1">
          <CustomInputField
            id={`profession${familyMember.id}`}
            label="profession"
            value={familyMember?.profession}
            onChange={(value) =>
              handleOccupantChange(familyMember.id, "profession", value)
            }
            placeholder="doctor"
          />
        </div>
        <div className="flex-1">
          <CustomInputField
            id={`email${familyMember.id}`}
            label="email"
            value={familyMember?.email}
            onChange={(value) =>
              handleOccupantChange(familyMember.id, "email", value)
            }
            placeholder="example123@gmail.com"
          />
        </div>

        {/* Vehicle Section */}
        <HouseHoldersVehicles
          occupant={familyMember}
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

export default FamilyMemberForm;
