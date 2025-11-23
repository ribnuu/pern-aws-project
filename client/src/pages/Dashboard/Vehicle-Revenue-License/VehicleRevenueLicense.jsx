import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recieveVehicleRevenueLicenseDataByNicApi } from "../../../apis/VehicleRevenueLicenseApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const VehicleRevenueLicense = () => {
  const [vehicleRevenueData, setVehicleRevenueData] = useState("");

  const params = useParams();
  const nic_number = params.vehicleRevenueLicense;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleRevenueResponse =
          await recieveVehicleRevenueLicenseDataByNicApi(nic_number);
        setVehicleRevenueData(vehicleRevenueResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">VEHICLE REVENUE LICENSE </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {vehicleRevenueData && (
          <div className="">
            {vehicleRevenueData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                  key={key}
                >
                  <div className="grid grid-cols-8 gap-1 justify-items-center">
                    <div className="rounded-lg my-auto col-span-2 mx-auto">
                      <img
                        src={`http://localhost:4000${data.vehicle_image_path}`}
                        className="lg:w-64 lg:h-52 w-32 h-28 object-cover md:-my-16 md:ml-4 rounded-lg"
                      />
                    </div>
                    <div className="text-black rounded-xl text-xs md:text-base col-span-6 grid grid-cols-2 ">
                      <div className="col-span-1">
                        <div className="grid-cols-11 grid text-md">
                          <div className="col-span-5 lg:col-span-5">Ref No</div>
                          <div className=""> |</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.reference_no}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid text-md">
                          <div className="col-span-5 lg:col-span-5">
                            Vehicle No.
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.vehicle_plate_number}
                          </div>
                        </div>
                        <div className="grid-cols-11  grid text-md">
                          <div className="col-span-5 lg:col-span-5">Date</div>
                          <div className=""> |</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.date}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Total(Rs)
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5 ">
                            {data.rupees}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Valid From
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.valid_from}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Valid To
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.valid_from}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Gross Weight
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.gross_weight}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">Vet No</div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.vet_no}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">Make</div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.vehicle_make}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">Model</div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.vehicle_model}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            No. of Seats
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.no_of_seats}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Engine No.
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.engine_number}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Chasis No.
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.chasis_number}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Vehicle Class
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.vehicle_class}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Year of Mfg
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.year_of_mfg}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Fuel Type
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.fuel_type}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">Name</div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.owner_name}
                          </div>
                        </div>
                        <div className="grid-cols-11 grid">
                          <div className="col-span-5 lg:col-span-5">
                            Address
                          </div>
                          <div className="">|</div>
                          <div className="col-span-5 lg:col-span-5">
                            {data.owner_address}
                          </div>
                        </div>
                      </div>
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

export default VehicleRevenueLicense;
