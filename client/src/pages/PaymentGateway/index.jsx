import React from "react";
import { Link } from "react-router-dom";

const PaymentGateway = () => {
  return (
    <div>
      <div className="mx-5 grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
        <Link to="/pmt/checkout" state={{ amount: 20 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Consultation Services - LKR 20
          </div>
        </Link>
        <Link to="/pmt/checkout" state={{ amount: 2500 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Consultation Services - LKR 2500
          </div>
        </Link>
        <Link to="/pmt/checkout" state={{ amount: 4000 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Penetration Testing - LKR 4000
          </div>
        </Link>
        <Link to="/pmt/checkout" state={{ amount: 2500 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Network Security Implementation - LKR 2500
          </div>
        </Link>
        <Link to="/pmt/checkout" state={{ amount: 3000 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Cloud Security Implementation - LKR 3000
          </div>
        </Link>
        <Link to="/pmt/checkout" state={{ amount: 5000 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            Governance Risk and Compliance - LKR 5000
          </div>
        </Link>
        <Link to="/pmt/ntb-checkout" state={{ amount: 5000 }}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase">
            NTB PAYMENT TEST
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentGateway;
