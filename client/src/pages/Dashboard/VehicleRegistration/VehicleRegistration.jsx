import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehiclesByNicNumberApi } from "../../../apis/MyVehiclesApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const VehicleRegistration = () => {
  const [vehicleData, setVehicleData] = useState("");
  const [vehicleCount, setVehicleCount] = useState(0);

  const params = useParams();
  const nic_number = params.vehicleRegistrationNumber;
  console.log(nic_number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleResponse = await getVehiclesByNicNumberApi({
          nic_number: nic_number,
        });
        setVehicleData(vehicleResponse.rows);
        setVehicleCount(vehicleResponse.rowCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">VEHICLE REGISTRATION</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{vehicleCount}</span>
          <span className="my-auto">vehicles(s)</span>
        </p>
      </div>
      {vehicleData && (
        <div className="">
          {vehicleData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                key={key}
              >
                <div className="grid grid-cols-2">
                  <div className="rounded-lg my-auto ">
                    <img
                      src={`http://${server_port}:4000${data.vehicle_image_path}`}
                      className="lg:w-64 lg:h-52 w-32 h-28 object-cover -my-16 ml-4 rounded-lg"
                    />
                  </div>
                  <div className="mx-auto my-auto">
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Plate</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.vehicle_plate_number}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Make</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.vehicle_make}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Model</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.vehicle_model}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Colour</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.vehicle_color}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Chasis</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.chasis_number}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Engine</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.engine_number}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Registered On</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6 ml-4">
                        {data.registered_at}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VehicleRegistration;
