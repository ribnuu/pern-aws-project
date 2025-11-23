import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ArrestPerson = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    nic_number: "",
    license_number: "",
    passport_number: "",
    phone_number: "",
    address: "",
    arrest_date_time: "",
    arrest_location_latitude: "",
    arrest_location_longitude: "",
    arrest_reason: "",
    arresting_officer_id: "", // Assuming this is set by the logged-in officer
    release_date_time: "",
    remarks: "",
  });

  const [loading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://${server_port}:4000/api/arrest`,
        formData
      );
      if (response.data.success) {
        toast.success("Arrest record added successfully!");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error submitting arrest data:", error);
      toast.error("Failed to submit arrest record.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="m-5 bg-gray-50 rounded-md dark:bg-gray-900 border border-black">
      <div className="bg-white rounded-lg p-8 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="nic_number"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                NIC Number
              </label>
              <input
                type="text"
                id="nic_number"
                name="nic_number"
                value={formData.nic_number}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="license_number"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                License Number
              </label>
              <input
                type="text"
                id="license_number"
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="passport_number"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Passport Number
              </label>
              <input
                type="text"
                id="passport_number"
                name="passport_number"
                value={formData.passport_number}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="arrest_date_time"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrest Date and Time
              </label>
              <input
                type="datetime-local"
                id="arrest_date_time"
                name="arrest_date_time"
                value={formData.arrest_date_time}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* <div className="mb-6">
              <label
                htmlFor="arrest_reason"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrest Reason
              </label>
              <input
                type="text"
                id="arrest_reason"
                name="arrest_reason"
                value={formData.arrest_reason}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div> */}
            <ArrestReasonSearch
              onSelectDistrict={(data) => {
                updateFilter("district", data.district_name);
                updateFilter("district_id", data.district_id);
              }}
              setLoading={setLoadingD}
              loading={loadingD}
              setSearchTerm={setSearchTermD}
              hideLabel={false}
              loadOnMount={false}
              searchTerm={searchTermD}
            />

            <div className="mb-6">
              <label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6 flex justify-end gap-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Arrest Record"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default ArrestPerson;
