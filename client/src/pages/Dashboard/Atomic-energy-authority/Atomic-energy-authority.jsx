import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AtomicEnergyAuthority = () => {
  const [atomicEnergyTechnicianData, setAtomincEnergyTechnicianData] =
    useState("");
  const [atomicEnergyTechnicianCount, setAtomicEnergyTechnicianCount] =
    useState(0);

  const [technicianMachineData, seTechnicianMachineData] = useState("");

  const params = useParams();
  const nic_number = params.atomicEnergyAuthorityNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicianResponse = await axios.post(
          `http://${server_port}:4000/api/atomic-enerygy-authority/receiveByNic`,
          {
            nic_number,
          }
        );
        setAtomincEnergyTechnicianData(technicianResponse.data.rows);
        setAtomicEnergyTechnicianCount(technicianResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }

      try {
        const technicianMachineResponse = await axios.post(
          `http://${server_port}:4000/api/atomic-enerygy-authority/receiveMachinesByNic`,
          {
            nic_number,
          }
        );
        seTechnicianMachineData(technicianMachineResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div>
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            ATOMIC ENERGY AUTHORITY - {nic_number}
          </div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{atomicEnergyTechnicianCount}</span>
            <span className="my-auto">licenses(s) taken</span>
          </p>
        </div>
        <div className="mt-2">
          {atomicEnergyTechnicianData && (
            <div className="">
              {atomicEnergyTechnicianData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-4"
                    key={key}
                  >
                    <div className="my-auto">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">
                          Reg Number
                        </div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registration_number}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Reg Date</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registration_date}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Name</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.citizen_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Address</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.citizen_address}
                        </div>
                      </div>

                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Qualifications
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.qualifications}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            MACHINE LICENSES - {nic_number}
          </div>
        </div>
        <div className="mt-2">
          {technicianMachineData && (
            <div className="">
              {technicianMachineData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-4"
                    key={key}
                  >
                    <div className="my-auto">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">
                          Reg Number
                        </div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registration_number}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Reg Date</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registration_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Qualifications
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.qualifications}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Machine Type
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.machine_type}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Make</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.make}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Model</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.model}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Usage Company Name
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.company_name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AtomicEnergyAuthority;
