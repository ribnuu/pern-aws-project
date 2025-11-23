import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateDriverOffenseRecordMobileNumberById } from "../../../apis/DriversOffensePortalApiService";

const EditFinesOnMyDuty = ({ itemId, mobileNo }) => {
  const [mobileNumber, setMobileNumber] = useState(mobileNo);
  const [isLoading, setIsLoading] = useState(false);
  const handleMobileNumberChange = (event) => {
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        setMobileNumber(input);
      }
    }
  };

  const onUpdateButtonClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      const response = await updateDriverOffenseRecordMobileNumberById(
        itemId,
        mobileNumber
      );
      if (response.success) {
        toast.success("Successfully Updated");
      }
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mt-4 space-y-4 md:space-y-1">
        <form>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Mobile Number
            </label>
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </div>
        </form>
        <div className="flex justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={isLoading ? null : onUpdateButtonClick}
          >
            {isLoading ? <CircularProgress size={"20px"} /> : "Update"}
          </Button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default EditFinesOnMyDuty;
