import axios from "axios";
import { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MissingVehicles = () => {
  const [MissingVehicleData, setMissingVehicleData] = useState([]);

  const missingVehicleByNicNumber = async (nic_number) => {
    try {
      const missingVehicleByNicNumberResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMissingVehicle`
      );
      setMissingVehicleData(missingVehicleByNicNumberResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    missingVehicleByNicNumber(nic_number);
  }, []);

  return (
    <section className="">
      <form onSubmit={() => {}}>
        <div className="relatie z-0 w-full mb-6 group bg-white text-black flex justify-around rounded-lg px-2 py-2 mx-12 my-12">
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
      <div className="grid lg:grid-cols-3 gap-4 w-full">
        {MissingVehicleData.map((data, key) => {
          return (
            <div className="mx-auto border border-black rounded-md flex justify-center justify-self-center items-center min-h-screen py-4 my-auto">
              <div className="md:px-20 md:grid gap-5 space-y-4 md:space-y-0">
                <div className="max-w-sm bg-white px-1 pb-2 rounded-md shadow-lg transform hover:scale-105 transition duration-500 border border-black text-xs ">
                  <div className="relative">
                    <img
                      src={`http://${server_port}:4000${data.vehicle_image_path}`}
                      className="lg:w-48 lg:h-64 w-24 h-32 object-cover rounded-md justify-self-center"
                      alt="Colors"
                    />
                  </div>
                  <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                    Missing Vehicle
                  </h1>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span> Missing Vehicle Number : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_number}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Owner Name : </span>
                      <p className="text-gray-500">{data.owner_name}</p>
                    </div>
                  </div>
                  <div className=" space-x-1 items-center my-2">
                    <span>Owner Address : </span>
                    <p className="text-gray-500">{data.owner_address}</p>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Vehicle Owner Name : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_owner_name}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>NIC Number : </span>
                      <p className="text-gray-500">{data.nic_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Complaint Number : </span>
                      <p className="text-gray-500">{data.complaint_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Reported NIC Number : </span>
                      <p className="text-gray-500">
                        {data.reported_nic_number}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Registered at : </span>
                      <p className="text-gray-500">{data.registered_at}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Vehicle Owner Address : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_owner_address}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Last Seen Date Time : </span>
                      <p className="text-gray-500">
                        {data.last_seen_date_time}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Last Seen Location : </span>
                      <p className="text-gray-500">{data.last_seen_location}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Lost Date Time : </span>
                      <p className="text-gray-500">{data.lost_date_time}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Vehicle Description : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_description}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Vehicle Make : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_make}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Vehicle Model : </span>
                      <p className="text-gray-500">
                        {data.missing_vehicle_model}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Chasis Number : </span>
                      <p className="text-gray-500">{data.chasis_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Engine Number : </span>
                      <p className="text-gray-500">{data.engine_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Fuel Type : </span>
                      <p className="text-gray-500">{data.fuel_type}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Vehicle Class : </span>
                      <p className="text-gray-500">{data.vehicle_class}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Vehicle Color : </span>
                      <p className="text-gray-500">{data.vehicle_color}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Vehicle Plate Number : </span>
                      <p className="text-gray-500">
                        {data.vehicle_plate_number}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Vehicle Model : </span>
                      <p className="text-gray-500">{data.vehicle_model}</p>
                    </div>
                  </div>
                </div>
                {/* Other courses... */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-4 px-20">
        Whenever a new case comes up , particular icon will light up with audio
        alarm. If there is a Vehicle missing match found, the missing Vehicle
        tab will blink with audio alarm. At same time , if a critical arise ,
        that critical case [PEH] will also blink similarly
      </div>
    </section>
  );
};

export default MissingVehicles;
