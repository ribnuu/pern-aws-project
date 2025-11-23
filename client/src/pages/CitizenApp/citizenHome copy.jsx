import React from "react";
import { Link } from "react-router-dom";
import { AiFillPhone } from "react-icons/ai";
import { MdTextsms } from "react-icons/md";

const citizenHome = () => {
  return (
    <div>
      {/* <section className="mx-12 px-102 uppercase border border-black rounded-md"> */}
        {/* <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-3 md:text-xs gap-2 text-sm font-black py-12 px-4"> */}
      {/* <div className="flex flex-col lg:flex-row gap-4 lg:-my-6 justify-stretch"> */}
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        {/* <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/ccn" className="">CCN - CITIZEN CODE NUMBER</Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/initial" className="">Payment Gateway</Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/mydetails" className="">My Details</Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/medical/myMedicalRecords" className="">My Medical records</Link>
        </div>


        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/myvehicles" className="">My Vehicles</Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/myLicense" className="">My Licenses</Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="/cgp/reportIncident" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div>
        <div className="bg-white border border-gray-900 rounded-md px-4 py-2">
          <Link to="" className=""></Link>
        </div> */}
          
          {/* <Link to="/ccn">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              CCN - CITIZEN CODE NUMBER
            </div>
          </Link>
          <Link to="/cgp/initial">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Payment Gateway
            </div>
          </Link>
          <Link to="/cgp/mydetails">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Details
            </div>
          </Link>
          <Link to="/cgp/medical/myMedicalRecords">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Medical records
            </div>
          </Link>
          <Link to="/cgp/myvehicles">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Vehicles
            </div>
          </Link>
          <Link to="/cgp/myLicense">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Licenses
            </div>
          </Link>
          <Link to="/cgp/reportIncident">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Report Incident
            </div>
          </Link>
          <Link to="/cgp/missingVehicles">
            <div
              className="bg-white text-g
                ray-950 rounded-md px-8 py-2 cursor-pointer border border-black "
            >
              Missing Vehicles
            </div>
          </Link>

          <Link to="/cgp/missingPets">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Missing Pets
            </div>
          </Link>
          <Link to="/cgp/missingPersons">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Missing persons
            </div>
          </Link>
          <Link to="/cgp/wantedPersons">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Wanted persons
            </div>
          </Link>
          <Link to="/cgp/myDevices">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Devices
            </div>
          </Link>
          <Link to="/cgp/appointments">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Make appointment
            </div>
          </Link>
          <Link to="/cgp/dtp">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Transfer Devices
            </div>
          </Link>
          <Link to="/cgp/fuelQr">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Fuel QR
            </div>
          </Link>
          <Link to="/pfp">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              PFP - Police Feedback Portal
            </div>
          </Link>
          <Link to="/cgp/voter">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Voter Information
            </div>
          </Link>
          <Link to="/cgp/notification">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Notification
            </div>
          </Link>
          <Link to="/cgp/news">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              News or Announcement
            </div>
          </Link>
          <Link to="/cgp/disasterAlert">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Disaster Alert
            </div>
          </Link>
          <Link to="/crs">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              CRS - Citizen Rating System
            </div>
          </Link>
          <Link to="/css">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              CSS - CRIME SUMMARY SCREEN
            </div>
          </Link>
          <Link to="/cgp/myRating">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              How people rated me
            </div>
          </Link>
          <Link to="/cgp/legalAdvice">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Legal Advice
            </div>
          </Link>
          <Link to="/cgp/social">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Social Media
            </div>
          </Link>
          <Link to="/cgp/settings">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Settings
            </div>
          </Link>
          <Link to="/cgp/drs">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Driving Rating System
            </div>
          </Link>
          <Link to="/cgp/fam">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              FAM - FREQUENT ACCIDENT MAP
            </div>
          </Link>
          <Link to="/cgp/hmr">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              House Maid Registration
            </div>
          </Link>
          <Link to="/cgp/mdr">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              House Driver Registration
            </div>
          </Link>
          <Link to="/cgp/myTickets">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Tickets
            </div>
          </Link>
          <Link to="/cgp/myHospitalPass">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Hospital Pass
            </div>
          </Link>
          <Link to="/cgp/myComplaint">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              My Complaint
            </div>
          </Link>
          <Link to="/npc">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              National Police Commision
            </div>
          </Link>
          <Link to="/cts">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Children Transport Services
            </div>
          </Link>
          <Link to="/cts">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              Tuition or Sports or Classes
            </div>
          </Link>
          <Link to="settings-mobile-application">
            <div className="bg-white text-gray-950 rounded-md px-8 py-2 cursor-pointer border border-black ">
              SETTINGS - MOBILE APPLICATION
            </div>
          </Link> */}
        </div>
        <div>
          People will download the app and select the button that says send
          acknowledgement and then fill up nam, then the access giving person
          gets the request and he adds the individual to the relevant app rights
          whatsoever
          <br />
        </div>
        <div className="">
          First app download
          <br />
          Then open it
          <br />
          Touch the button detect
          <br />
          Then type the name
          <br />
          <br />
          Name and imei is passed to the terminal where a person is waiting to
          give access
          <br />
          <br />
          Once he get the IMEI and name, he will grant access with the relevant
          options or menu required for the individual
        </div>
        <div>
          And register it on the database for the public to get access to CGP
        </div>
        <br />
        <div>CGP is accessible only on their registered devices</div>
        <div className="my-4">
          Each login checks location data, username, passwords, registered
          devices.
          <br />
          <br />
          For citizens they can login automatically using imei detection, only
          with passwords and as username , citizen id or nic is loaded
          automatically.
          <br />
          <br />
          If the imei is used for someone else, they can;t use the mobile app,
          they can only login via the police station terminals
          <div className="my-4">
            Device has to be transferred first to login to cgp
          </div>
        </div>
      {/* </section> */}
    </div>
  );
};

export default citizenHome;
