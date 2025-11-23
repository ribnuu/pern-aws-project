import axios from "axios";
import { useEffect, useState } from "react";
import { recieveLicenseDataByNicApi } from "../../../apis/LicenseApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MyLicense = () => {
  const [MyLicenseData, setMyLicenseData] = useState([]);

  const myLicenseByNicNumber = async (nic_number) => {
    try {
      const myLicenseByNicNumberResponse = await recieveLicenseDataByNicApi(
        nic_number
      );
      setMyLicenseData(myLicenseByNicNumberResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    myLicenseByNicNumber(nic_number);
  }, []);

  return (
    <section className="">
      <form onSubmit={() => {}}>
        <div className="relative z-0 w-full mb-6 group bg-white text-black flex justify-around rounded-md px-2 py-2 my-12">
          <div>
            <label>Choose District : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a district --{" "}
              </option>
              <option value="Colombo">Colombo</option>
              <option value="Ratmalana">Ratmalana</option>
              <option value="Wattala">Wattala</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Gampaha">Gampaha</option>
            </select>
          </div>
          <div>
            <label>Choose Province : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a province --{" "}
              </option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>
        </div>
      </form>
      <div className="grid md:grid-cols-5 gap-4 my-auto">
        {MyLicenseData.map((data, key) => {
          console.log(data);
          return (
            <div className="rounded-md items-center text-center" key={key}>
              <div className="md:grid gap-5 space-y-4 md:space-y-0">
                <div className="px-1 pb-2 rounded-md shadow-lg transform hover:scale-105 transition duration-500 border border-black text-xs ">
                  <div className="mt-1">
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.license_image_path}`}
                      className="lg:w-48 lg:h-64 w-24 h-32 object-cover mx-auto rounded-md justify-center"
                      alt="Colors"
                    />
                  </div>
                  <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                    My License
                  </h1>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>NIC Number : </span>
                      <p className="text-gray-500">{data.nic_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Citizen Name : </span>
                      <p className="text-gray-500">{data.citizen_name}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Citizen Gender : </span>
                      <p className="text-gray-500">{data.citizen_gender}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Citizen DOB : </span>
                      <p className="text-gray-500">{data.citizen_dob}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Citizen Address : </span>
                      <p className="text-gray-500">{data.citizen_address}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Blood Group : </span>
                      <p className="text-gray-500">{data.blood_group}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>License Number : </span>
                      <p className="text-gray-500">{data.license_number}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>License Issuing Authority : </span>
                      <p className="text-gray-500">
                        {data.license_issuing_authority}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>License Issue Date : </span>
                      <p className="text-gray-500">{data.license_issue_date}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>License Expiry Date : </span>
                      <p className="text-gray-500">
                        {data.license_expiry_date}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Date : </span>
                      <p className="text-gray-500">{data.date}</p>
                    </div>
                  </div>
                </div>
                {/* Other courses... */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyLicense;
