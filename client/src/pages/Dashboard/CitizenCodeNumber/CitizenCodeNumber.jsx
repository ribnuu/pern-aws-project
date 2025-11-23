import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCitizenCodeNumberByNicApi } from "../../../apis/CitizenCodeNumberApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const CitizenCodeNumber = () => {
  const [CitizenCodeNumberData, setCitizenCodeNumberData] = useState([]);

  const params = useParams();
  const citizen_code_number = params.CitizenCodeNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CitizenCodeNumberResponse = await fetchCitizenCodeNumberByNicApi(
          citizen_code_number
        );
        console.log(CitizenCodeNumberResponse.rows);
        setCitizenCodeNumberData(CitizenCodeNumberResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">CITIZEN CODE NUMBER</div>
        <p className="mx-4 text-right"></p>
      </div>
      {CitizenCodeNumberData && (
        <div className="grid lg:grid-cols-2 gap-4">
          {CitizenCodeNumberData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    {data.citizen_code_number}
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

export default CitizenCodeNumber;
