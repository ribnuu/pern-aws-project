import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVehicleEmissionByNicApi } from "../../../apis/VehicleEmissionApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const VehicleEmissionCertificate = () => {
  const [vehicleEmissionData, setVehicleEmissionData] = useState("");

  const params = useParams();
  const nic_number = params.vehicleEmissionNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehickeEmissionResponse = await fetchVehicleEmissionByNicApi(
          nic_number
        );
        setVehicleEmissionData(vehickeEmissionResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">
          VEHICLE EMISSION CERTIFICATE{" "}
        </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {vehicleEmissionData && (
          <div className="">
            {vehicleEmissionData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                  key={key}
                >
                  <div className="grid grid-cols-7 gap-1">
                    <div className="rounded-lg my-auto col-span-2 ">
                      <img
                        src={`http://localhost:4000${data.vehicle_image_path}`}
                        className="lg:w-64 lg:h-52 w-32 h-28 object-cover -my-16 ml-4 rounded-lg"
                      />
                    </div>
                    <div className="text-black rounded-xl text-xs md:text-base col-span-4 grid grid-cols-2 ">
                      <div className="col-span-1">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">Ref No</div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.reference_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Vehicle No
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">Centre</div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.centre}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Test Fee
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.test_fee}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date of issue
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.date_of_issue}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date of Validity
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.date_of_validity}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Odometer
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.odometer}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">Lane</div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.lane}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Inspector
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.inspector}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Instrument
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.instrument}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Serial No
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.serial_number}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Make / Model
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_make} / {data.vehicle_model}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">Color</div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_color}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Engine No
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.engine_number}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Chasis No
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.chasis_number}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Vehicle Class
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_class}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Year of Mfg
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.year_of_mfg}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Fuel Type
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.fuel_type}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg my-auto col-span-1 ">
                      <img
                        src={`http://localhost:4000${data.vehicle_emission_image_path}`}
                        className="lg:w-64 lg:h-52 w-32 h-28 object-contain -my-16 mr-4 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleEmissionCertificate;
