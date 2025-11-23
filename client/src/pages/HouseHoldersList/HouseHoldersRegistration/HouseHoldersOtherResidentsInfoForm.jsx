import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { Add, Delete, Edit } from "@mui/icons-material";
import OccupantDetailsView from "./OccupantDetailsView";
import OtherResidentsForm from "./OtherResidentsForm";
import { validateForm } from "../../../utils/validateForm";
import { FaRegCopy } from "react-icons/fa6";

const HouseHoldersOtherResidentsInfoForm = ({ manage = false }) => {
  const fields = [
    { label: "Verified", key: "verified" },
    { label: "Status", key: "status" },
    { label: "Full Name", key: "full_name" },
    { label: "NIC/Passport Number", key: "nic_passport_number" },
    { label: "Date of Birth", key: "dob" },
    { label: "Nationality", key: "nationality" },
    { label: "Gender", key: "gender" },
    { label: "Marital Status", key: "marital_status" },
    { label: "Email", key: "email" },
    { label: "Profession ", key: "profession" },
    { label: "Street Address", key: "street_address" },
    { label: "Address Line 2", key: "address_line_2" },
    { label: "City", key: "city_name" },
    { label: "Province", key: "province_name" },
    { label: "District", key: "district_name" },
    { label: "Postal Code", key: "postal_code" },
    { label: "Contact Number", key: "contact_number" },
    {
      label: "Relationship to Chief Occupant",
      key: "full_name",
    },
    {
      label: "Relationship to Chief Occupant",
      key: "relationship_to_chief",
    },
    { label: "Purpose Of Stay", key: "purpose_of_stay" },
    { label: "From date", key: "from_date" },
    { label: "To date", key: "to_date" },
    { label: "Police Station", key: "police_station_name" },
  ];

  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);

  const [occupants, setOccupants] = useState([]);

  useEffect(() => {
    if (formData?.otherResidents?.length) setOccupants(formData.otherResidents);
  }, [formData]);
  console.log(formData.chiefOccupants);

  const updateFormData = (newOccupants) => {
    dispatch(
      HandleChangeFormData({ key: "otherResidents", value: newOccupants })
    );
    setOccupants(newOccupants);
  };

  const handleOccupantChange = (id, key, value, duplicate = false) => {
    updateFormData(
      occupants.map((occupant) =>
        occupant.id === id ? { ...occupant, [key]: value } : occupant
      )
    );
    {
      duplicate &&
        dispatch(HandleChangeFormData({ key: "confirmed", value: false }));
    }
  };

  const hadleCopy = (occupant) => {
    const copiedOccupant = {
      ...occupant, //copy
      id: uuidv4(), // assign a new unique Id
      isEditing: true,
      isDuplicate: true, // Mark this occupant as a duplicate
      status: "move out",
      verified: "not verified",
    };
    updateFormData([...occupants, copiedOccupant]); //add the duplicate to the list
  };
  const addOccupant = () =>
    updateFormData([
      ...occupants,
      {
        id: uuidv4(),
        full_name: "",
        nic_passport_number: "",
        city_name: "",
        dob: "",
        nationality: "",
        police_station_id: null,
        police_station_name: "",
        status: "active member",
        verified: "not verified",
        isEditing: true,
      },
    ]);
  const removeOccupant = (id) =>
    updateFormData(occupants.filter((occupant) => occupant.id !== id));

  const valdiateOtherOccupant = (data) => {
    return (
      data?.id &&
      data?.full_name &&
      data?.nic_passport_number &&
      data?.nationality &&
      data?.dob &&
      data?.street_address &&
      data?.province_id &&
      data?.district_id &&
      data?.city_id &&
      data?.chief_occupant_id &&
      data?.relationship_to_chief &&
      data?.police_station_id &&
      data?.purpose_of_stay &&
      data?.from_date &&
      data?.to_date &&
      data?.status
    );
  };

  const validationRules = [
    { field: "id", name: "Id", required: true },
    { field: "full_name", name: "Full Name", required: true },
    {
      field: "nic_passport_number",
      name: "NIC/Passport Number",
      required: true,
    },
    { field: "nationality", name: "Nationality", required: true },
    // { field: "street_address", name: "DOB", required: true },
    // { field: "province_id", name: "Street Address", required: true },
    {
      field: "district_id",
      name: "District",
      required: true,
    },
    { field: "chief_occupant_id", name: "Chief Occupant", required: true },
    {
      field: "relationship_to_chief",
      name: "Relationship to Chief",
      required: true,
    },
    { field: "police_station_id", name: "Police station", required: true },
    { field: "purpose_of_stay", name: "Purpose of Stay", required: true },
    { field: "from_date", name: "From Date", required: true },
    { field: "to_date", name: "To Date", required: true },
  ];

  return (
    <form className="space-y-6 mb-6">
      {/* Add New Occupant Button */}
      <button
        type="button"
        onClick={addOccupant}
        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700 flex items-center space-x-2 transition w-auto"
      >
        <Add className="text-blue-600" /> {/* Example using CheckmarkIcon */}
        <span>Add Other Occupant</span>
      </button>

      {/* Occupants List */}
      <div className="space-y-4">
        {formData?.otherResidents?.map((occupant) => (
          <div
            key={occupant.id}
            className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
          >
            {occupant.isEditing ? (
              <OtherResidentsForm otherResident={occupant} />
            ) : (
              <OccupantDetailsView
                data={occupant}
                fields={fields}
                title={"Other Occupant"}
              />
            )}
            {!manage && (
              <div className="flex space-x-2 mt-4">
                {occupant.isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      const formValidationMsg = validateForm(
                        occupant,
                        validationRules
                      );

                      if (formValidationMsg !== true) {
                        toast.error(formValidationMsg);
                        return;
                      }
                      if (formValidationMsg === true) {
                        handleOccupantChange(occupant.id, "isEditing", false);
                      }
                    }}
                    className="bg-transparent border border-green-600 text-green-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-100"
                  >
                    <CheckmarkIcon className="h-5 w-5" />
                    <span className="text-sm">Confirm</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleOccupantChange(occupant.id, "isEditing", true)
                    }
                    className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-100"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="text-sm">Edit</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeOccupant(occupant.id)}
                  className="bg-transparent border border-red-600 text-red-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-100"
                >
                  <Delete className="h-5 w-5" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            )}
            {manage &&
              (!occupant.isDuplicate ? (
                <button
                  type="button"
                  onClick={() => hadleCopy(occupant)}
                  className="flex gap-2"
                >
                  <FaRegCopy className="text-xl" />
                  <p className="text-sm">copy</p>
                </button>
              ) : (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const formValidationMsg = validateForm(
                        occupant,
                        validationRules
                      );

                      if (formValidationMsg !== true) {
                        toast.error(formValidationMsg);
                        return;
                      }
                      if (formValidationMsg === true) {
                        handleOccupantChange(
                          occupant.id,
                          "isEditing",
                          false,
                          true
                        );
                      }
                    }}
                    className="bg-transparent border border-green-600 text-green-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-green-100"
                  >
                    <CheckmarkIcon className="h-4 w-4" />
                    <span className="text-xs">Confirm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeOccupant(occupant.id)} // Remove the duplicate
                    className="bg-transparent border border-red-600 text-red-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-red-100"
                  >
                    <Delete className="h-4 w-4" />
                    <span className="text-xs">Cancel Duplicate</span>
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </form>
  );
};

export default HouseHoldersOtherResidentsInfoForm;
