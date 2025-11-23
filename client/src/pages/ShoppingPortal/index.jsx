import React, { useEffect, useState } from "react";
// import MyPreviousFinePayments from "./MyPreviousFinePayments";
// import FinesPaidForOthers from "./FinesPaidForOthers";
// import PayFineUsingReference from "./PayFineUsingReference";
import { useLocation, useNavigate } from "react-router-dom";

const ShoppingPortal = () => {
  const navigate = useNavigate();
  // Access current location state using useLocation hook from react-router-dom
  const location = useLocation();

  // State to manage the selected button for navigation
  const [selectedButton, setSelectedButton] = useState(null);

  // Extract reference number from location state
  const refNoFromNavigate = location.state?.refNoFromNavigate;
  const showPayFineUsingReference = location.state?.showPayFineUsingReference;

  // Effect to automatically select "payFineUsingReference" button when refNoFromNavigate changes
  useEffect(() => {
    if (refNoFromNavigate) {
      setSelectedButton("payFineUsingReference");
    }
  }, [refNoFromNavigate]);

  useEffect(() => {
    if (showPayFineUsingReference) {
      setSelectedButton("payFineUsingReference");
    }
  }, [showPayFineUsingReference]);

  return (
    <div>
      {/* Grid layout for buttons */}
      <div className="mx-5 grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
        {/* Button for "Pay fine for others" */}
        <button
          onClick={(e) => {
            navigate("/shp/1001");
          }}
        >
          <div
            className={`${
              selectedButton === "payFineUsingReference"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Kulfi Delight
          </div>
        </button>
        {/* Button for "My previous fine payments" */}
        <button
          onClick={(e) => {
            navigate("/shp/1002");
          }}
        >
          <div
            className={`${
              selectedButton === "myPreviousFinePayments"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Yasser Biriyani
          </div>
        </button>
        {/* Button for "Fines paid for others" */}
        <button
          onClick={(e) => {
            navigate("/shp/1003");
          }}
        >
          <div
            className={`${
              selectedButton === "finePaidForOthers"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Zuhni Mobiles
          </div>
        </button>
        <button onClick={(e) => navigate("/pmt")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left"
            key={"key"}
          >
            PAYMENT
          </div>
        </button>
      </div>

      {/* Conditional rendering based on selectedButton state */}
      {/* {selectedButton === "payFineForMySelf" && <PayFineForMySelf />} */}
      {/* {selectedButton === "payFineUsingReference" && <PayFineUsingReference />}
      {selectedButton === "myPreviousFinePayments" && <MyPreviousFinePayments />}
      {selectedButton === "finePaidForOthers" && <FinesPaidForOthers />} */}
    </div>
  );
};

export default ShoppingPortal;
