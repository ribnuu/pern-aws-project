import { useState } from "react";
import MissingVehicles from "./MissingVehicles";
import WantedPersons from "./WantedPersons";
import BlacklistedPhones from "./BlacklistedPhones";
import NumberPlateMismatch from "../../components/numberPlateMismatch";
import PoliceEmergencyHandler from "./PoliceEmergencyHandler";
import MissingPets from "./MissingPets";
import { Link } from "react-router-dom";

const policewatchdogsystem = () => {
  const [MyDevicess, setMyDevicess] = useState(false);
  const [missingVehicles, setMissingVehicles] = useState(false);
  const [wantedPersons, setWantedPersons] = useState(false);
  const [blacklistedPhones, setBlacklistedPhones] = useState(false);
  const [numberPlateMismatch, setNumberPlateMismatch] = useState(false);
  const [policeEmergencyHandler, setPoliceEmergencyHandler] = useState(false);
  const [missingPets, setMissingPets] = useState(false);

  function handleEmergencyHandler() {
    setPoliceEmergencyHandler((prev) => !prev);
    setMissingVehicles(false);
    setWantedPersons(false);
    setBlacklistedPhones(false);
  }

  function handleMyDevicess() {
    setMyDevicess((prev) => !prev);
    setMissingVehicles(false);
    setWantedPersons(false);
    setBlacklistedPhones(false);
  }
  function handleMissingPets() {
    setMissingPets((prev) => !prev);
    setMyDevicess(false);
    setMissingVehicles(false);
    setWantedPersons(false);
    setBlacklistedPhones(false);
  }

  function handleMissingVehicles() {
    setMissingVehicles((prev) => !prev);
    setMyDevicess(false);
    setWantedPersons(false);
    setBlacklistedPhones(false);
  }

  function handleWantedPersons() {
    setWantedPersons((prev) => !prev);
    setMissingVehicles(false);
    setMyDevicess(false);
    setBlacklistedPhones(false);
  }

  function handleBlacklistedPhones() {
    setBlacklistedPhones((prev) => !prev);
    setMissingVehicles(false);
    setMyDevicess(false);
    setWantedPersons(false);
  }

  function handleNumberPlateMismatch() {
    setNumberPlateMismatch((prev) => !prev);
    setMyDevicess(false);
    setWantedPersons(false);
    setBlacklistedPhones(false);
    setPoliceEmergencyHandler(false);
  }

  return (
    <div>
      <section className="mx-12 my-1 px-102 ">
        <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase">
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleMyDevicess}
          >
            MPL - Missing Person List
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleMissingPets}
          >
            MLP - Missing List of Pets
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleMissingVehicles}
          >
            MVL - Missing Vehicle List
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleWantedPersons}
          >
            WPL - Wanted Persons List
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleBlacklistedPhones}
          >
            BPL - Blacklisted Phones List
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleEmergencyHandler}
          >
            PEH - Police Emergency Handler
          </div>
          <div
            className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black"
            onClick={handleNumberPlateMismatch}
          >
            NPM - Number Plate Mismatch
          </div>
          <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
            ACD - Abnormal Crowd Detection
          </div>
          <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
            UNP - Unavailable Number Plate
          </div>
          <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
            MLO - MISSING LIST OTHER ITEMS
          </div>
          <Link to="/sdr">
            <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
              SDR - Suspected Device Registration
            </div>
          </Link>
          <Link to="/sth">
            <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
              STH - Suspected Treasure Hunters
            </div>
          </Link>
          <Link to="/riots">
            <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
              RFS - Riots Forecast System
            </div>
          </Link>
          <Link to="find-person-or-vehicle">
            <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
              FRL - FIND REQUIREMENT LIST
            </div>
          </Link>
          <Link to="ebd">
            <div className="bg-white text-gray-950 rounded-md px-8 py-4 cursor-pointer border border-black">
              EBD - Entry Ban Detection
            </div>
          </Link>
        </div>
      </section>

      {MyDevicess && <MyDevicess />}
      {policeEmergencyHandler && <PoliceEmergencyHandler />}
      {missingVehicles && <MissingVehicles />}
      {wantedPersons && <WantedPersons />}
      {blacklistedPhones && <BlacklistedPhones />}
      {numberPlateMismatch && <NumberPlateMismatch />}
      {missingPets && <MissingPets />}
      <div>
        When the emergency is alerted the police petrol vehicle within the 2.5
        km radius will get alerted. When they touch the critical cases on their
        screen. Google maps will automatically take them to the location where
        the incident is taking place.
        <br />
        <br />
        If a vehicle goes for emission test at 10 and license renewal at 11. and
        at 12 the vehicle is in jaffna. So for which tables we should search and
        find the mismatch and how to do it should be plannes. So he can go to
        insurance renewal , went to dss office. These places they cannotgo
        without a vehicle. So these needs to be found with what methodolgy we
        should plan.
      </div>
    </div>
  );
};

export default policewatchdogsystem;
