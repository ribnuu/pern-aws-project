import React from "react";
import BlacklistedPhones from "../PoliceWatchdogSystem/BlacklistedPhones";

const NetworkServiceProvider = () => {
  return (
    <>
      <div>
        Whenever a phone is lost and complained to the TRC , TRC will blacklist
        the phone. Once the phone is blacklisted , the blacklisted IMEI are
        passed to the NSPs via this portal
        <br />
        All NSPs will have a login to this portal
        <br />
        Example - Dialog , Airtel, Mobitel
        <br />
        <br />
        NSPs will help us by identifying if this particular IMEI phone is being
        utilised to make a phone call using their SIM.
        <br />
        And the alert will appear on the watchdog missing phones system
        <br />
        Once the alert is clicked , it will show the person name using the phone
        and their address.
      </div>
      <section className="mx-12 my-1 px-102">
        <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4 flex flex-col">
            <div>IMEI Number - 1124 4515 1571</div>
            <div>Make / Model - iPhone XS</div>
          </div>
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
            <div>IMEI Number - 3965 1535 1549</div>
            <div>Make / Model - iPhone XR</div>
          </div>
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
            <div>IMEI Number - 5564 4515 5896</div>
            <div>Make / Model - Samsung Galaxy Note 8</div>
          </div>
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
            <div>IMEI Number - 8896 6412 7891</div>
            <div>Make / Model - Huawei Mate 2</div>
          </div>
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
            <div>IMEI Number - 4254 5874 3654</div>
            <div>Make / Model - Redmi</div>
          </div>
          <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
            <div>IMEI Number - 9612 1645 5871</div>
            <div>Make / Model - Galaxy S8</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NetworkServiceProvider;
