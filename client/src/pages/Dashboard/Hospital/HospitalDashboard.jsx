import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

import { fetchHospitalByNicApi } from "../../../apis/HospitalApiService";

const HospitalDashboard = () => {
  const [hospitalData, setHospitalData] = useState("");

  const params = useParams();
  const nic_number = params.hospitalNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hspitalResponse = await fetchHospitalByNicApi(nic_number);
        if (hspitalResponse.rowCount > 0) {
          setHospitalData(hspitalResponse.rows);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {};
  }, []);
  return (
    <section className="mx-12 my-12">
      <div>
        {hospitalData && (
          <div className="">
            <div className="text-lg text-center">Hospital</div>
            {hospitalData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Hospital Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.hospital_name}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Hospital Address
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.hospital_address}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Hospital Contact
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.hospital_contact}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Doctor involved
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.doctor_met}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Ward Provided
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.ward_provided}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Number of days stayed
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.number_of_days_stayed}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">Next visit</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.next_visit}
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

export default HospitalDashboard;
