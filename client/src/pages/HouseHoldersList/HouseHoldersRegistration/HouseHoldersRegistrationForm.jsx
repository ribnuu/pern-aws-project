import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleChangeFormData,
  createRecord,
  resetState,
} from "../../../store/form/FormSlice";
import { createFullHouseHolderProcessApi } from "../../../apis/HouseHoldersApiService";
import toast from "react-hot-toast";
import HouseHoldersPrimaryInformationForm from "./HouseHoldersPrimaryInformationForm";
import HouseHoldersChiefOccupantInfoForm from "./HouseHoldersChiefOccupantInfoForm";
import HouseHoldersRegistrationDisclaimerPage from "./HouseHoldersRegistrationDisclaimerPage";
import HotelRegistrationAcknowledgementPage from "./HotelRegistrationAcknowledgementPage";
import HouseHoldersOtherResidentsInfoForm from "./HouseHoldersOtherResidentsInfoForm";
import HouseHoldersFamilyMembersInfoForm from "./HouseHoldersFamilyMembersInfoForm";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const HouseHoldersRegistrationForm = ({
  stepperData,
  setStepperData,
  scrollTo,
}) => {
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector(
    (state) => state.formReducer
  );

  const navigate = useNavigate();
  // const initialData = {
  //   divisional_secretariat: "DS",
  //   gn_division: "GN Division",
  //   location_url: "https://www.google.com/maps?q=6.8681728,79.8621696",
  //   chiefOccupants: [
  //     {
  //       id: uuidv4(),
  //       full_name: "M Y M Ilyas",
  //       nic_passport_number: "19629827172718",
  //       contact_number: "0777724574",
  //       street_address: "428",
  //       address_line_2: "4A",
  //       province_id: "7",
  //       province_name: "Southern",
  //       district_id: "17",
  //       district_name: "Matara",
  //       city_id: "1579",
  //       city_name: "Weligama",
  //       postal_code: "81700",
  //       police_station_id: "e84b909f-3535-453d-aaae-2ef03a10f100",
  //       police_station_name: "Dehiwela Police Station",
  //       dob: new Date().toISOString(),
  //       nationality: "Sri Lankan",
  //     },
  //   ],
  //   familyMembers: [
  //     {
  //       id: uuidv4(),
  //       // house_id: houseId,
  //       // chief_occupant_id: member.chief_occupant_id,
  //       full_name: "Ahsan Ilyas",
  //       nic_passport_number: "199827902401",
  //       contact_number: "0773267670",
  //       street_address: "428/4A",
  //       address_line_2: "New Street",
  //       province_id: "7",
  //       province_name: "Southern",
  //       district_id: "17",
  //       district_name: "Matara",
  //       city_id: "1579",
  //       city_name: "Weligama",
  //       postal_code: "81700",
  //       dob: new Date().toISOString(),
  //       nationality: "Sri Lankan",
  //       // relationship_to_chief: "member.relationship_to_chief",
  //     },
  //   ],
  //   otherResidents: [
  //     {
  //       id: uuidv4(),
  //       full_name: "Mr Perera",
  //       nationality: "Sri Lankan",
  //       nic_passport_number: "19966262626262",
  //       dob: new Date().toISOString(),
  //       purpose_of_stay: "Driver",
  //       relationship_to_chief: "Friend",
  //       from_date: new Date().toISOString(),
  //       to_date: new Date().toISOString(),
  //       contact_number: "0774900183",
  //       street_address: "23C",
  //       address_line_2: "Weligama",
  //       province_id: "7",
  //       province_name: "Southern",
  //       district_id: "17",
  //       district_name: "Matara",
  //       city_id: "1579",
  //       city_name: "Weligama",
  //       postal_code: "81700",
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   if (
  //     initialData &&
  //     Object.keys(initialData).length > 0 &&
  //     Object.keys(formData).length <= 0
  //   ) {
  //     console.log("Executed");

  //     dispatch(
  //       HandleChangeFormData({
  //         key: "batchUpdate",
  //         value: initialData,
  //       })
  //     );
  //   }
  // }, [initialData, dispatch]);

  useEffect(() => {
    if (error) {
      const msg = typeof error === "object" ? error?.error : error;
      toast.error(msg);
    }
  }, [error]);

  const validateForm = (formData) => {
    // Collect the missing fields in an array
    const missingFields = [
      { field: "divisional_secretariat", name: "Hotel Type" },
      { field: "gn_division", name: "Name" },
      { field: "location_url", name: "Location URL" },
      { field: "street_address", name: "Street Address" },
      { field: "city_id", name: "City" },
    ]
      .filter((item) => !formData?.[item.field]) // Filter out fields that are missing
      .map((item) => item.name); // Get the name of the missing fields

    // Return an error message or true if all fields are filled
    return missingFields.length
      ? `Please fill out the following required fields: ${missingFields.join(
          ", "
        )}`
      : true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidationMsg = validateForm(formData);

    if (formValidationMsg !== true) {
      toast.error(formValidationMsg);
      return;
    }

    // Dispatch createRecord thunk
    dispatch(
      createRecord({
        apiFunction: createFullHouseHolderProcessApi,
        reqBody: formData,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("House registered successfully.");
        dispatch(resetState());

        // Delay navigate by 5sec
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    });
  };

  useEffect(() => {
    dispatch(resetState());
  }, []);

  return (
    <>
      {stepperData?.currentStep === 1 && (
        <HouseHoldersRegistrationDisclaimerPage />
      )}

      {stepperData?.currentStep === 2 && (
        <HouseHoldersPrimaryInformationForm formData={formData} />
      )}

      {stepperData?.currentStep === 3 && (
        <HouseHoldersChiefOccupantInfoForm formData={formData} />
      )}

      {stepperData?.currentStep === 4 && (
        <HouseHoldersFamilyMembersInfoForm formData={formData} />
      )}

      {stepperData?.currentStep === 5 && (
        <HouseHoldersOtherResidentsInfoForm formData={formData} />
      )}

      {stepperData?.currentStep === 6 && (
        <HotelRegistrationAcknowledgementPage />
      )}

      {/* Submit Button */}
      <div className="flex justify-between items-center w-full">
        <button
          type="button"
          className={`${
            stepperData?.currentStep > 1 ? "bg-blue-600" : "bg-gray-600"
          } px-4 py-2 rounded text-white`}
          disabled={stepperData?.currentStep <= 1}
          onClick={(e) => {
            e.preventDefault();
            scrollTo();
            setStepperData({
              ...stepperData,
              currentStep: stepperData.currentStep - 1,
            });
          }}
        >
          <FormattedMessage
            id="app.general.button_label.previous"
            defaultMessage="Previous"
          />
        </button>

        {stepperData?.currentStep != stepperData?.totalSteps && (
          <button
            type="button"
            className={`px-4 py-2 rounded bg-blue-600 text-white`}
            disabled={stepperData?.currentStep > stepperData?.totalSteps}
            onClick={(e) => {
              if (stepperData?.currentStep === 2) {
                const formValidationMsg = validateForm(formData);
                if (formValidationMsg !== true) {
                  toast.error(formValidationMsg);
                  return;
                }
              }

              if (stepperData?.currentStep === 3) {
                if (
                  !formData?.chiefOccupants ||
                  formData?.chiefOccupants?.length <= 0
                ) {
                  toast.error("Please add atleast one chief occupant");
                  return;
                }
              }

              // if (stepperData?.currentStep === 4) {
              //   if (
              //     !formData?.familyMembers ||
              //     formData?.familyMembers?.length <= 0
              //   ) {
              //     toast.error("Please add atleast one family member");
              //     return;
              //   }
              // }

              // if (stepperData?.currentStep === 5) {
              //   if (
              //     !formData?.otherResidents ||
              //     formData?.otherResidents?.length <= 0
              //   ) {
              //     toast.error("Please add atleast one family member");
              //     return;
              //   }
              // }

              e.preventDefault();
              scrollTo();
              setStepperData({
                ...stepperData,
                currentStep: stepperData.currentStep + 1,
              });
            }}
          >
            <FormattedMessage
              id="app.general.button_label.next"
              defaultMessage="Next"
            />
          </button>
        )}

        {stepperData?.currentStep === stepperData?.totalSteps && (
          <button
            onClick={handleSubmit}
            // type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${
              loading ? "bg-gray-400" : "bg-green-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        )}
      </div>
    </>
  );
};

export default HouseHoldersRegistrationForm;
