import React from "react";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import AutoSalesSystemTable from "./AutoSalesSystemTAble";

const AutoSalesSystemScreen = ({}) => {
  return (
    <>
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <AutoSalesSystemTable />
      </div>

      {/* <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      </div> */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AutoSalesSystemScreen;
