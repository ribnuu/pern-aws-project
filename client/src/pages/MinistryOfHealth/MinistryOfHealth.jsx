import React from "react";
import { Link } from "react-router-dom";

const MinistryOfHealth = () => {
  return (
    <section className="mx-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:text-xs gap-2 text-sm font-black py-12 uppercase">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="hps">HPS - HOSPITAL PASS SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-2">
          <Link to="epd">EPD - EPIDEMIOLOGY HEALTH MINISTRY</Link>
        </div>
      </div>
    </section>
  );
};

export default MinistryOfHealth;
