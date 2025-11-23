import React from "react";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import RepSalesVisitTable from "./RepSalesVisitTable";
import RepSalesVisitFilters from "./RepSalesVisitFilters";
import useFetchButtons from "../../../hooks/useFetchButtons";
import { useLocation } from "react-router-dom";

const RepSalesVisitScreen = ({}) => {
  const location = useLocation();
  const buttonId = location.state?.buttonId;
  useFetchButtons(buttonId);

  return (
    <>
      <RepSalesVisitFilters />
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <RepSalesVisitTable />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default RepSalesVisitScreen;
