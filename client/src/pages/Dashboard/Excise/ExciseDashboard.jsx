import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ExciseDashboard = () => {
  const [exciseData, setExciseData] = useState("");
  const [exciseCount, setExciseCount] = useState(0);

  const params = useParams();
  const nic_number = params.exciseNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exciseResponse = await axios.post(
          `http://${server_port}:4000/api/excise/receiveByNic`,
          {
            nic_number,
          }
        );
        setExciseCount(exciseResponse.data.rowCount);
        setExciseData(exciseResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">EXCISE DEPARTMENT</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{exciseCount}</span>
          <span className="my-auto">license(s) active</span>
        </p>
      </div>
      {exciseData && (
        <div className="">
          {exciseData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">License</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.license_type}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Instituition Name
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.institution_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      License Start Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.license_start_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      License End Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.license_end_date}
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

export default ExciseDashboard;
