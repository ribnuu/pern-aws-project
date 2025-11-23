import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const SriLankaMedicalCouncil = () => {
  const [medicalCouncilData, setMedicalCouncilData] = useState("");
  const [medicalCouncilCount, setMedicalCouncilCount] = useState(0);

  const params = useParams();
  const nic_number = params.medicalCouncilNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicalCouncilResponse = await axios.post(
          `http://${server_port}:4000/api/sri-lanka-medical-council/receiveByNic`,
          {
            nic_number,
          }
        );
        setMedicalCouncilData(medicalCouncilResponse.data.rows);
        setMedicalCouncilCount(medicalCouncilResponse.data.rowCount);
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
          SRI LANKA MEDICAL COUNCIL
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{medicalCouncilCount}</span>
          <span className="my-auto">licenses(s) taken</span>
        </p>
      </div>
      <div className="mt-2">
        {medicalCouncilData && (
          <div className="">
            {medicalCouncilData.map((data, key) => {
              console.log(data);
              return (
                <div
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-4"
                  key={key}
                >
                  <div className="my-auto">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-3">Reg Number</div>
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
                        {data.name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-3">Address</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.address}
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
                      <div className="col-span-5 lg:col-span-3">Register</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.register_name}
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

export default SriLankaMedicalCouncil;
