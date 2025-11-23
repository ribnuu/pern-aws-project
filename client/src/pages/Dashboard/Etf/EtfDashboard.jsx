import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ETFDashboard = () => {
  const [etfData, setEtfData] = useState([]);
  const [etfCount, setEtfCount] = useState(0);

  const params = useParams();
  const nic_number = params.etfNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const etfResponse = await axios.post(
          `http://${server_port}:4000/api/etf/receiveByNic`,
          {
            nic_number,
          }
        );
        setEtfCount(etfResponse.data.rowCount);
        setEtfData(etfResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">EMPLOYEES TRUST FUND</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{etfCount}</span>
          <span className="my-auto">eTf(s) received</span>
        </p>
      </div>
      {etfData && (
        <div className="grid lg:grid-cols-3">
          {etfData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">NIC Number</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.nic_number}
                    </div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">Company Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.company_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Company Reg No.
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.company_registration_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Position</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.employment_position}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Employee Number
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.employment_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Salary</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.employment_salary}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">ETF amount</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.employment_etf}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      For the month
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">{data.date}</div>
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

export default ETFDashboard;
