import React from "react";
import { useNavigate } from "react-router-dom";

const policeOfficerPortal = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-5">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        {" "}
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            CRP - CASE REPORTING PORTAL
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Uniform Ordering
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Meals Ordering
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Leave Booking
          </div>
        </button>
        <button onClick={(e) => navigate("/das")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Duty Allocation
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Weapons Allocation
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            My Profile
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            How citizens rated me
          </div>
        </button>
        <button onClick={(e) => navigate("/crp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Sickness Reporting
          </div>
        </button>
        <button onClick={(e) => navigate("/rtb")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Report Traffic Block
          </div>
        </button>
        <button onClick={(e) => navigate("/pop/dop")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Driver Offense Portal
          </div>
        </button>
        <button onClick={(e) => navigate("/pop/arp")}>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
            key={"hnb-payment-test"}
          >
            Arrest Person
          </div>
        </button>
      </div>
      <div>
        Police officer will be able to elaborate a situation to a senior officer
        or to his police station using the form , also using live video calls
        and then the senior officer or station OIC or division SP will instruct
        the particular officer on what to do as a next step
      </div>
    </section>
  );
};

export default policeOfficerPortal;
