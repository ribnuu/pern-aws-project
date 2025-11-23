import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrdinaryLevelBYNicApi } from "../../../apis/OrdinaryLevelApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ExaminationDashboard = () => {
  const [examinationOLData, setExaminationOLData] = useState([]);
  const [examinationALData, setExaminationALData] = useState([]);

  const [indexNumber, setIndexNumber] = useState("");

  const params = useParams();
  const nic_number = params.examinationNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const olResponse = await fetchOrdinaryLevelBYNicApi(nic_number);
        setExaminationOLData(olResponse.data.rows);
        setIndexNumber(olResponse.data.rows[0].index_number);
      } catch (error) {
        console.error(error);
      }
      try {
        const alResponse = await axios.post(
          `http://${server_port}:4000/api/al/receiveByNic`,
          {
            nic_number,
          }
        );
        setExaminationALData(alResponse.data.rows);
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
          EXAMINATION OL - {indexNumber}
        </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {examinationOLData && (
          <div className="grid lg:grid-cols-3">
            {examinationOLData.map((data, key) => {
              return (
                <div
                  className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Subject Name
                      </div>
                      <div className="ml-8"> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.subject_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Subject Results
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.subject_results}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            EXAMINATION AL - {indexNumber}
          </div>
          <p className="mx-4 text-right"></p>
        </div>

        {examinationALData && (
          <div className="grid lg:grid-cols-3">
            {examinationALData.map((data, key) => {
              return (
                <div
                  className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Subject Name
                      </div>
                      <div className="ml-8"> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.subject_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Subject Results
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.subject_results}
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

export default ExaminationDashboard;
