import React from "react";
import { Link } from "react-router-dom";

const DivisionalSecretariatOffice = () => {
  return (
    <section className="mx-12 my-12">
      <div className="flex justify-around gap-4">
        <Link to="set">
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4 cursor-pointer">
            Set Appointment
          </div>
        </Link>
        <Link to="view">
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4 cursor-pointer">
            View my appointments
          </div>
        </Link>
      </div>
      <div>Renew Vehicle License Instant</div>
    </section>
  );
};

export default DivisionalSecretariatOffice;
