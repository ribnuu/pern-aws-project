import React from "react";
import CustomerForm from "./CustomerForm";

const CustomerProfileScreen = () => {
  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Profile</h1>
      <CustomerForm />
      {/* <RouteForm />
      <RouteTable /> */}
    </div>
  );
};

export default CustomerProfileScreen;
