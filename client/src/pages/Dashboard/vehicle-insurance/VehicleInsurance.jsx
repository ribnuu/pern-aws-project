import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchLolcVehicleInsuranceApi,
  fetchPeoplesVehicleInsuranceApi,
} from "../../../apis/VehicleInsuranceApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const VehicleInsurance = () => {
  const [vehicleInsuranceLolcData, setVehicleInsuranceLolcData] = useState("");
  const [vehicleInsurancePeoplesData, setVehicleInsurancePeoplesData] =
    useState("");

  const params = useParams();
  const nic_number = params.vehicleInsurance;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vechicleInsuranceLolcResponse =
          await fetchLolcVehicleInsuranceApi(nic_number);
        setVehicleInsuranceLolcData(vechicleInsuranceLolcResponse.rows);
      } catch (error) {
        console.error(error);
      }
      try {
        const vechicleInsurancePeoplesResponse =
          await fetchPeoplesVehicleInsuranceApi(nic_number);
        setVehicleInsurancePeoplesData(vechicleInsurancePeoplesResponse.rows);
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
          VEHICLE INSURANCE CERTIFICATE LOLC
        </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {vehicleInsuranceLolcData && (
          <div className="gap-4">
            {vehicleInsuranceLolcData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                  key={key}
                >
                  <div className="grid grid-cols-5 gap-1">
                    <div className="rounded-lg my-auto col-span-1 ">
                      <img
                        src={`http://localhost:4000${data.vehicle_image_path}`}
                        className="lg:w-60 lg:h-52 w-32 h-28 object-cover -my-16 ml-4 rounded-lg"
                      />
                    </div>
                    <div className="text-black rounded-xl text-xs md:text-base col-span-3 mx-4 ">
                      <div className="">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Policy No
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.policy_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Vehicle Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Period of cover
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.period_of_cover}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Policy type
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.policy_type}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Name of insured
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.name_of_insured}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Address
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.address}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date time of Issue
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.datetime_of_issue}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date time of Expiry
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.datetime_of_expiry}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg my-auto col-span-1 ">
                      <img
                        src={`http://localhost:4000${data.insurance_image_path}`}
                        className="lg:w-60 lg:h-52 w-32 h-28 object-contain -my-16 ml-4 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">
          VEHICLE INSURANCE CERTIFICATE PEOPLES
        </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {vehicleInsurancePeoplesData && (
          <div className="gap-4">
            {vehicleInsurancePeoplesData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                  key={key}
                >
                  <div className="grid grid-cols-5 gap-1">
                    <div className="rounded-lg my-auto col-span-1 ">
                      <img
                        src={`http://localhost:4000${data.vehicle_image_path}`}
                        className="lg:w-60 lg:h-52 w-32 h-28 object-cover -my-16 ml-4 rounded-lg"
                      />
                    </div>
                    <div className="text-black rounded-xl text-xs md:text-base col-span-3 mx-4 ">
                      <div className="">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Policy No
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.policy_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Vehicle Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Period of cover
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.period_of_cover}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Policy type
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.policy_type}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Name of insured
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.name_of_insured}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Address
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.address}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date time of Issue
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.datetime_of_issue}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Date time of Expiry
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.datetime_of_expiry}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg my-auto col-span-1 ">
                      <img
                        src={`http://localhost:4000${data.insurance_image_path}`}
                        className="lg:w-60 lg:h-52 w-32 h-28 object-contain -my-16 ml-4 rounded-lg"
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

export default VehicleInsurance;
