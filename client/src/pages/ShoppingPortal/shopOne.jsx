import React, { useEffect, useState } from "react";
// import MyPreviousFinePayments from "./MyPreviousFinePayments";
// import FinesPaidForOthers from "./FinesPaidForOthers";
// import PayFineUsingReference from "./PayFineUsingReference";
import { useLocation, useNavigate } from "react-router-dom";

const ShopOne = () => {
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
            navigate("/shp/1000");
          }}
        >
          <div
            className={`${
              selectedButton === "payFineUsingReference"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Dum Biriyani - LKR 400
          </div>
        </button>
        {/* Button for "My previous fine payments" */}
        <button
          onClick={(e) => {
            navigate("/shp/1001");
          }}
        >
          <div
            className={`${
              selectedButton === "myPreviousFinePayments"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Chicken Biriyani - LKR 400
          </div>
        </button>
        {/* Button for "Fines paid for others" */}
        <button
          onClick={(e) => {
            navigate("/shp/1002");
          }}
        >
          <div
            className={`${
              selectedButton === "finePaidForOthers"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Beef Biriyani - LKR 700
          </div>
        </button>
        <button
          onClick={(e) => {
            navigate("/shp/1002");
          }}
        >
          <div
            className={`${
              selectedButton === "finePaidForOthers"
                ? "bg-green-500 text-white"
                : "bg-white text-blue-500"
            } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          >
            Special Biriyani - LKR 900
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShopOne;
