import React from "react";
import BillsDataScreen from "./BillsDataScreen";
import ManageBillsFilters from "./ManageBillsFilters";

const ManageBillsScreen = () => {
  return (
    <>
      <ManageBillsFilters />
      <BillsDataScreen />
    </>
  );
};

export default ManageBillsScreen;
