import React from "react";
import { useNavigate } from "react-router-dom";

const DriverOffensePortal = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-5">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <button onClick={(e) => navigate("/pop/dop/ife")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"Issue Fine"}
          >
            Issue Fine
          </div>
        </button>
        <button onClick={(e) => navigate("/pop/dop/fod")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"Fines On Mu Duty"}
          >
            Fines On My Duty
          </div>
        </button>
        <button
          onClick={(e) =>
            navigate("/cgp/tfn", { state: { showPayFineUsingReference: true } })
          }
        >
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"Pay Fine"}
          >
            Pay Fine
          </div>
        </button>
        <button
          onClick={(e) => {
            navigate("lid");
          }}
        >
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"License Dispatch"}
          >
            License Dispatch
          </div>
        </button>
        <button
          onClick={(e) => {
            navigate("lia");
          }}
        >
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"Revoke License"}
          >
            Revoke License
          </div>
        </button>
      </div>
    </div>
  );
};

export default DriverOffensePortal;
