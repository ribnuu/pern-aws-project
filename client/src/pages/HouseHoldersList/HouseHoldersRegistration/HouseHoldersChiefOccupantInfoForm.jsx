import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { Add, Delete, Edit } from "@mui/icons-material";
import OccupantForm from "./OccupantForm";
import OccupantDetailsView from "./OccupantDetailsView";
import { FaRegCopy } from "react-icons/fa6";

const HouseHoldersChiefOccupantInfoForm = ({ manage = false }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.formReducer);
  const [occupants, setOccupants] = useState([]);
  const [pendingChiefOccupant, setPendingChiefOccupant] = useState([]);
  const [verifiedChiefOccupant, setVerifiedChiefOccupant] = useState([]);

  const fields = [
    { label: "Verified", key: "verified" },
    { label: "Status", key: "status" },
    { label: "Full Name", key: "full_name" },
    { label: "NIC/Passport Number", key: "nic_passport_number" },
    { label: "Date of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Marital Status", key: "marital_status" },
    { label: "Nationality", key: "nationality" },
    { label: "Contact Number", key: "contact_number" },
    { label: "Street Address", key: "street_address" },
    { label: "Address Line 2", key: "address_line_2" },
    { label: "Province", key: "province_name" },
    { label: "District", key: "district_name" },
    { label: "City", key: "city_name" },
    { label: "Postal Code", key: "postal_code" },
    { label: "Police Station Name", key: "police_station_name" },
  ];

  useEffect(() => {
    if (formData?.chiefOccupants?.length) {
      if (manage) {
        const pendingChiefOccupant = formData.chiefOccupants.filter(
          (occupant) => occupant.verified !== "verified"
        );
        const verifiedChiefOccupant = formData.chiefOccupants.filter(
          (occupant) => occupant.verified === "verified"
        );
        setPendingChiefOccupant(pendingChiefOccupant);
        setVerifiedChiefOccupant(verifiedChiefOccupant);
        // setOccupants({ pendingChiefOccupant, verifiedChiefOccupant });
      }

      setOccupants(formData.chiefOccupants);
    }
  }, [formData]);

  // console.log(formData);

  const updateFormData = (newOccupants) => {
    dispatch(
      HandleChangeFormData({ key: "chiefOccupants", value: newOccupants })
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

  const addOccupant = () => {
    const isEditingExists = formData?.chiefOccupants?.some(
      (oc) => oc.isEditing
    );
    if (isEditingExists) {
      toast.error("Please finish editing");
      return;
    }
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
  };
  const removeOccupant = (id) =>
    updateFormData(occupants.filter((occupant) => occupant.id !== id));

  const validateChiefOccupant = (data) => {
    return (
      data?.id &&
      data?.full_name &&
      data?.nic_passport_number &&
      data?.nationality &&
      data?.dob &&
      data?.street_address &&
      data?.province_id && //
      data?.district_id && //
      data?.city_id && //
      data?.police_station_id && //
      data?.status
    );
  };

  return (
    <form className="space-y-6 mb-6">
      {/* Add New Occupant Button */}
      <button
        type="button"
        onClick={addOccupant}
        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700 flex items-center space-x-2 transition w-auto"
      >
        <Add className="text-blue-600" /> {/* Example using CheckmarkIcon */}
        <span>Add Chief Occupant</span>
      </button>

      {/* Occupants List */}
      {!manage && (
        <div className="space-y-4">
          {formData?.chiefOccupants?.map((occupant) => (
            <div
              key={occupant.id}
              className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              {occupant.isEditing ? (
                <div className="space-y-4">
                  <OccupantForm occupant={occupant} />
                </div>
              ) : (
                <OccupantDetailsView
                  data={occupant}
                  fields={fields}
                  title={"Chief Occupant Details"}
                />
              )}
              <div className="flex space-x-2 mt-4">
                {occupant.isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      debugger;
                      const isAllowSubmit = validateChiefOccupant(occupant);
                      if (isAllowSubmit) {
                        handleOccupantChange(occupant.id, "isEditing", false);
                      } else {
                        toast.error("Please fill the missing fields");
                      }
                    }}
                    className="bg-transparent border border-green-600 text-green-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-green-100"
                  >
                    <CheckmarkIcon className="h-4 w-4" />
                    <span className="text-xs">Confirm</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleOccupantChange(occupant.id, "isEditing", true)
                    }
                    className="bg-transparent border border-blue-600 text-blue-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-xs">Edit</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeOccupant(occupant.id)}
                  className="bg-transparent border border-red-600 text-red-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-red-100"
                >
                  <Delete className="h-4 w-4" />
                  <span className="text-xs">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* manage my house mode */}
      {manage && (
        <div className="">
          <div className="">
            <div className="text-xl text-green-500 mb-5">
              Verified Chief Occupants
            </div>
            {formData?.chiefOccupants.map((occupant) => (
              <div className="">
                <div
                  key={occupant.id}
                  className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  {occupant.isEditing ? (
                    <div className="space-y-4">
                      <OccupantForm occupant={occupant} />
                    </div>
                  ) : (
                    <OccupantDetailsView
                      data={occupant}
                      fields={fields}
                      title={"Chief Occupant Details"}
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
                          debugger;
                          const isAllowSubmit = validateChiefOccupant(occupant);
                          if (isAllowSubmit) {
                            handleOccupantChange(
                              occupant.id,
                              "isEditing",
                              false,
                              true
                            );
                          } else {
                            toast.error("Please fill the missing fields");
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
              </div>
            ))}
          </div>
          {/* <div className="">
            <div className="text-xl text-yellow-500 mb-5">
              pending Chief Occupants
            </div>
            {pendingChiefOccupant?.map((occupant) => (
              <div className="">
                <div
                  key={occupant.id}
                  className="md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  {occupant.isEditing ? (
                    <div className="space-y-4">
                      <OccupantForm occupant={occupant} />
                    </div>
                  ) : (
                    <OccupantDetailsView
                      data={occupant}
                      fields={fields}
                      title={"Chief Occupant Details"}
                    />
                  )}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </form>
  );
};

export default HouseHoldersChiefOccupantInfoForm;

// {
//   manage && !occupant.isDuplicate ? (
//     <button
//       type="button"
//       onClick={() => handleCopy(occupant)}
//       className="flex gap-2"
//     >
//       <FaRegCopy className="text-xl" />
//       <p className="text-sm">copy</p>
//     </button>
//   ) : (
//     <div className="flex justify-between">
//       <button
//         type="button"
//         onClick={() => {
//           debugger;
//           const isAllowSubmit = validateChiefOccupant(occupant);
//           if (isAllowSubmit) {
//             handleOccupantChange(occupant.id, "isEditing", false);
//           } else {
//             toast.error("Please fill the missing fields");
//           }
//         }}
//         className="bg-transparent border border-green-600 text-green-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-green-100"
//       >
//         <CheckmarkIcon className="h-4 w-4" />
//         <span className="text-xs">Confirm</span>
//       </button>
//       <button
//         type="button"
//         onClick={() => removeOccupant(occupant.id)}
//         className="bg-transparent border border-red-600 text-red-600 px-2 py-1 rounded-md flex items-center space-x-2 hover:bg-red-100"
//       >
//         <Delete className="h-4 w-4" />
//         <span className="text-xs">Cancel Duplicate</span>
//       </button>
//     </div>
//   );
// }
