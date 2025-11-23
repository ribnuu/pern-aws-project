import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { Add, Delete, Edit } from "@mui/icons-material";
import FamilyMemberForm from "./FamilyMemberForm";
import { validateForm } from "../../../utils/validateForm";
import OccupantDetailsView from "./OccupantDetailsView";
import { FaRegCopy } from "react-icons/fa6";

const HouseHoldersFamilyMembersInfoForm = ({ manage = false }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);
  const [occupants, setOccupants] = useState([]);
  // const [verifiedFamilyMembers, setVerifiedFamilyMembers] = useState([]);
  // const [pendingFamilyMembers, setPendingFamilyMembers] = useState([]);

  const validationRules = [
    { field: "id", name: "ID", required: true },
    { field: "full_name", name: "Full Name", required: true },
    {
      field: "nic_passport_number",
      name: "NIC/Passport Number",
      required: true,
    },
    { field: "nationality", name: "Natinality", required: true },
    { field: "dob", name: "DOB", required: true },
    { field: "chief_occupant_id", name: "Chief Occupant", required: true },
    {
      field: "relationship_to_chief",
      name: "Relationship to Chief Occupant",
      required: true,
    },
  ];

  const fields = [
    { label: "Verified", key: "verified" },
    { label: "Status", key: "status" },
    { label: "Full Name", key: "full_name" },
    { label: "NIC/Passport Number", key: "nic_passport_number" },
    { label: "Date of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Marital Status", key: "marital_status" },
    { label: "Nationality", key: "nationality" },
    {
      label: "Chief Occupant",
      key: "chief_occupant_id",
    },
    {
      label: "Relationship to Chief Occupant",
      key: "relationship_to_chief",
    },

    {
      label: "Contact Number",
      key: "contact_number",
    },
  ];

  useEffect(() => {
    if (formData?.familyMembers?.length) {
      // const uniqueOccupantsMap = new Map();

      // formData.familyMembers.forEach((member) => {
      //   // If NIC doesn't exist or current member has a later updated_at, update the Map
      //   if (
      //     !uniqueOccupantsMap.has(member.nic_passport_number) ||
      //     new Date(member.updated_at) >
      //       new Date(
      //         uniqueOccupantsMap.get(member.nic_passport_number).updated_at
      //       )
      //   ) {
      //     uniqueOccupantsMap.set(member.nic_passport_number, member);
      //   }
      // });

      // setOccupants(Array.from(uniqueOccupantsMap.values()));
      setOccupants(formData.familyMembers);
    }

    // if (occupants?.length && manage) {
    //   const pending = [];
    //   const verified = [];

    //   occupants.forEach((occupant) => {
    //     if (occupant.verified === "verified") {
    //       verified.push(occupant);
    //     } else {
    //       pending.push(occupant);
    //     }
    //   });

    //   setPendingFamilyMembers(pending);
    //   setVerifiedFamilyMembers(verified);
    // }
    // console.log(verifiedFamilyMembers, pendingFamilyMembers);
  }, [formData]);

  const updateFormData = (newOccupants) => {
    dispatch(
      HandleChangeFormData({ key: "familyMembers", value: newOccupants })
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

  const addOccupant = () =>
    updateFormData([
      ...occupants,
      {
        id: uuidv4(),
        full_name: "",
        nic_passport_number: "",
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

  const handleCopy = (occupant) => {
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
  console.log(formData);
  return (
    <form className="space-y-6 mb-6">
      {/* Add New family member Button */}
      <button
        type="button"
        onClick={addOccupant}
        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700 flex items-center space-x-2 transition w-auto"
      >
        <Add className="text-blue-600" />
        <span>Add Family Member</span>
      </button>

      {/* Family member List */}
      {!manage && (
        <div className="space-y-4">
          {formData?.familyMembers?.map((occupant) => (
            <div
              key={occupant.id}
              className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              {occupant.isEditing ? (
                <FamilyMemberForm familyMember={occupant} />
              ) : (
                <OccupantDetailsView
                  data={occupant}
                  fields={fields}
                  title={"Family Members Details"}
                />
              )}

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
                      } else {
                        handleOccupantChange(occupant.id, "isEditing", false);
                      }
                    }}
                    className="bg-transparent border border-green-600 text-green-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-green-100"
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
                    className="bg-transparent border border-blue-600 text-blue-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-blue-100"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="text-sm">Edit</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeOccupant(occupant.id)}
                  className="bg-transparent border border-red-600 text-red-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-red-100"
                >
                  <Delete className="h-5 w-5" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* manage my house mode familly member list  */}
      {manage && (
        <div className="">
          <div className="">
            <div className="text-xl text-green-500 mb-5">
              Verified Family Members
            </div>
            {formData?.familyMembers?.map((occupant) => (
              <div
                key={occupant.id}
                className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                {occupant.isEditing ? (
                  <FamilyMemberForm familyMember={occupant} />
                ) : (
                  <OccupantDetailsView
                    data={occupant}
                    fields={fields}
                    title={"Family Members Details"}
                  />
                )}
                {!occupant.isDuplicate ? (
                  <button
                    type="button"
                    onClick={() => handleCopy(occupant)}
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
                        } else {
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
                      onClick={() => removeOccupant(occupant.id)}
                      className="bg-transparent border border-red-600 text-red-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-red-100"
                    >
                      <Delete className="h-4 w-4" />
                      <span className="text-xs">Cancel Duplicate</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <div className="">
            <div className="text-xl text-yellow-500 mb-5">
              pending Chief Occupants
            </div>
            {pendingFamilyMembers?.map((occupant) => (
              <div
                key={occupant.id}
                className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                {occupant.isEditing ? (
                  <FamilyMemberForm familyMember={occupant} />
                ) : (
                  <OccupantDetailsView
                    data={occupant}
                    fields={fields}
                    title={"Family Members Details"}
                  />
                )}
              </div>
            ))}
          </div> */}
        </div>
      )}
    </form>
  );
};

export default HouseHoldersFamilyMembersInfoForm;
