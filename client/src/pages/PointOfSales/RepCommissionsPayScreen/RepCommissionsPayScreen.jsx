import React from "react";
import RepCommissionsPayScreenFilters from "./RepCommissionsPayScreenFilters";
import { useLocation } from "react-router-dom";
import useFetchButtons from "../../../hooks/useFetchButtons";
import RepsCommissionPayTable from "./RepsCommissionPayTable";
import { Toaster } from "react-hot-toast";

const RepCommissionsPayScreen = () => {
  const location = useLocation();
  const buttonId = location.state?.buttonId;
  useFetchButtons(buttonId);

  return (
    <>
      <RepCommissionsPayScreenFilters />

      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="mx-5 my-5">
          <RepsCommissionPayTable />
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default RepCommissionsPayScreen;
