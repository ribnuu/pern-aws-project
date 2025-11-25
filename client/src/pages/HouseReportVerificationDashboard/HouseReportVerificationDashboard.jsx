import React, { useEffect, useState } from "react";
import {
  getHouseHoldersDataApi,
  updateHouseHolderConfirmDataApi,
} from "../../apis/HouseHoldersApiService";

//Reusable component for displaying house details

const HouseDetails = ({ house, verified = false }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  const handleConfirmation = async () => {
    if (isConfirmed) {
      try {
        // Use the API function to update the confirmation
        // const userId = "1234"; // Replace this with the actual user ID logic
        const reqBody = {
          confirmed_user_station_id: "123", // Replace this with the actual station ID logic
          confirmed: true,
        };

        // Use the API function to update the Verification
        const response = await updateHouseHolderConfirmDataApi(
          house.id,
          reqBody
        );

        if (response.success) {
          alert("Details confirmed and updated successfully!");
          window.location.reload();
        } else {
          alert("Failed to update confirmation: " + response.message);
        }
      } catch (error) {
        alert("An error occurred while updating confirmation");
        console.error("api error:", error);
      }
    } else {
      alert("plase confirm the detils before proceeding.");
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* House Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          House Details
        </h2>
        <p>
          <strong>Divisional Secretariat:</strong>{" "}
          {house.divisional_secretariat}
        </p>
        <p>
          <strong>GN Division:</strong> {house.gn_division}
        </p>
        <p>
          <strong>Street Address:</strong> {house.street_address},{" "}
          {house.address_line_2}
        </p>
        <p>
          <strong>Postal Code:</strong> {house.postal_code}
        </p>
        <p>
          <strong>Province ID:</strong> {house.province_id},{" "}
          <strong>District ID:</strong> {house.district_id},{" "}
          <strong>City ID:</strong> {house.city_id}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <a
            href={house.location_url}
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(house.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(house.updated_at).toLocaleString()}
        </p>
      </div>

      {/* Chief Occupants */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Chief Occupants
        </h2>
        {house.chiefOccupants.map((occupant, index) => (
          <div
            key={index}
            className={
              occupant.verified === "verified"
                ? "border-b border-gray-300 pb-4 mb-4 "
                : "border-b border--300 pb-4 mb-4 text-red-400"
            }
          >
            <p>
              <strong>Name:</strong> {occupant.full_name}
            </p>
            <p>
              <strong>NIC/Passport:</strong> {occupant.nic_passport_number}
            </p>
            <p>
              <strong>Contact:</strong> {occupant.contact_number || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {occupant.dob || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {occupant.gender || "N/A"}
            </p>
            <p>
              <strong>Profession:</strong> {occupant.profession || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {occupant.street_address},{" "}
              {occupant.address_line_2}
            </p>
            <p>
              <strong>Email Address:</strong> {occupant.email || "N/A"}
            </p>
            <p>
              <strong>Nationality:</strong> {occupant.nationality || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {occupant.status || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {occupant.city?.city_name || "N/A"}
            </p>
            <p>
              <strong>Province:</strong>{" "}
              {occupant.province?.province_name || "N/A"}
            </p>
            <p>
              <strong>District:</strong>{" "}
              {occupant.district?.district_name || "N/A"}
            </p>
            <p>
              <strong>Postal code:</strong>{" "}
              {occupant.city?.postal_code || "N/A"}
            </p>
            <p>
              <strong>Police Station:</strong>{" "}
              {occupant.policeStation?.police_station_name || "N/A"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(occupant.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(occupant.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Family Members */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Family Members
        </h2>
        {house.familyMembers.map((member, index) => (
          <div
            key={index}
            className={
              member.verified === "verified"
                ? "border-b border-gray-300 pb-4 mb-4 "
                : "border-b border--300 pb-4 mb-4 text-red-400"
            }
          >
            <p>
              <strong>Full Name:</strong> {member.full_name}
            </p>
            <p>
              <strong>NIC/Passport Number:</strong> {member.nic_passport_number}
            </p>
            <p>
              <strong>Date Of Birth:</strong> {member.dob}
            </p>
            <p>
              <strong>Gender:</strong> {member.gender}
            </p>
            <p>
              <strong>Email:</strong> {member.email}
            </p>
            <p>
              <strong>Nationality:</strong> {member.nationality}
            </p>
            <p>
              <strong>Profession:</strong> {member.profession}
            </p>
            <p>
              <strong>Status:</strong> {member.status || "N/A"}
            </p>
            <p>
              <strong>Relationship to Chief:</strong>{" "}
              {member.relationship_to_chief}
            </p>
            <p>
              <strong>Contact:</strong> {member.contact_number}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(member.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(member.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Other Residents */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Other Residents
        </h2>
        {house.otherResidents.map((resident, index) => (
          <div
            key={index}
            className={
              resident.verified === "verified"
                ? "border-b border-gray-300 pb-4 mb-4 "
                : "border-b border--300 pb-4 mb-4 text-red-400"
            }
          >
            <p>
              <strong>Name:</strong> {resident.full_name}
            </p>
            <p>
              <strong>NIC/Passport:</strong> {resident.nic_passport_number}
            </p>
            <p>
              <strong>Nationality:</strong> {resident.nationality}
            </p>
            <p>
              <strong>Address:</strong> {resident.street_address},
              {resident.address_line_2}
            </p>
            <p>
              <strong>Contact Number:</strong> {resident.contact_number}
            </p>
            <p>
              <strong>Gender:</strong> {resident.gender}
            </p>
            <p>
              <strong>City:</strong> {resident.city.city_name}
            </p>
            <p>
              <strong>District:</strong> {resident.district.district_name}
            </p>
            <p>
              <strong>Province:</strong> {resident.province.province_name}
            </p>
            <p>
              <strong>Postal code:</strong> {resident.postal_code}
            </p>
            <p>
              <strong>Contact Number:</strong> {resident.contact_number}
            </p>
            <p>
              <strong>Date Of Birth</strong> {resident.dob}
            </p>
            <p>
              <strong>Profession:</strong> {resident.profession}
            </p>
            <p>
              <strong>Email:</strong> {resident.email}
            </p>
            <p>
              <strong>From Date:</strong>{" "}
              {new Date(resident.from_date).toLocaleDateString()}{" "}
            </p>
            <p>
              <strong>To Date:</strong>{" "}
              {new Date(resident.to_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Purpose of Stay:</strong> {resident.purpose_of_stay}
            </p>
            <p>
              <strong>Status:</strong> {resident.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(resident.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(resident.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Verified section */}
      {!verified && (
        <div className="">
          <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-yellow-600">
              Verification
            </h2>
            <input
              type="checkbox"
              id="confirmation-checkbox"
              checked={isConfirmed}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="confirm-checkbox" className="text-gray-700">
              I verified that the above details are correct.
            </label>
          </div>
          <button
            onClick={handleConfirmation}
            className={`mt-4 px-4 py-2 rounded ${
              isConfirmed
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isConfirmed}
          >
            verified and Proceed
          </button>
        </div>
      )}
    </div>
  );
};

const ReportConfirmationDashboard = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [pendingHouseData, setPendingHouseData] = useState([]);
  const [VerifiedHouseData, setVerifiedHouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHouseHoldersDataApi();
        if (response && response.success) {
          const filterPendingData = response.data.filter((house) => {
            return house.confirmed !== true;
          });
          const filterVerifiedData = response.data.filter((house) => {
            return house.confirmed === true;
          });
          setPendingHouseData(filterPendingData);
          setVerifiedHouseData(filterVerifiedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        House Details Verification Dashboard
      </h1>
      <div className="">
        <div className="">
          <h1 className="text-2xl text-yellow-500 text-center my-4">
            Pending House
          </h1>
          {pendingHouseData.map((house, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              {/* Display only address and city */}
              <div className="flex justify-between items-center">
                <p className="text-gray-700">
                  {house.street_address}, {house.city_id}
                </p>
                <button
                  className="text-blue-500 underline"
                  onClick={() =>
                    setOpenAccordion(openAccordion === index ? null : index)
                  }
                >
                  {openAccordion === index ? "Hide" : "View"}
                </button>
              </div>

              {/* Conditionally render details */}
              {openAccordion === index && <HouseDetails house={house} />}
            </div>
          ))}
        </div>
        <div className="">
          <h1 className="text-2xl text-center my-4 text-green-500">
            Verified House
          </h1>
          {VerifiedHouseData.map((house, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              {/* Display only address and city */}
              <div className="flex justify-between items-center">
                <p className="text-gray-700">
                  {house.street_address}, {house.city_id}
                </p>
                <button
                  className="text-blue-500 underline"
                  onClick={() =>
                    setOpenAccordion(openAccordion === index ? null : index)
                  }
                >
                  {openAccordion === index ? "Hide" : "View"}
                </button>
              </div>

              {/* Conditionally render details */}
              {openAccordion === index && (
                <HouseDetails house={house} verified={true} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportConfirmationDashboard;
