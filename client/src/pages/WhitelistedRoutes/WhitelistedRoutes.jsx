import React from "react";
import RouteForm from "./RouteForm";
import RouteTable from "./RouteTable";

const WhitelistedRoutes = () => {
  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black p-6">
      <h1 className="text-2xl font-bold mb-6">Whitelisted Routes</h1>
      <RouteForm />
      <RouteTable />
    </div>
  );
};

export default WhitelistedRoutes;
