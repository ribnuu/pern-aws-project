import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const EPFDashboard = () => {
  const [epfData, setEpfData] = useState([]);
  const [epfCount, setEpfCount] = useState(0);

  const params = useParams();
  const nic_number = params.epfNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const epfResponse = await axios.post(
          `http://${server_port}:4000/api/epf/receiveByNic`,
          {
            nic_number,
          }
        );
        setEpfCount(epfResponse.data.rowCount);
        setEpfData(epfResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">EMPLOYEES PROVIDENT FUND</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{epfCount}</span>
          <span className="my-auto">epf(s) received</span>
        </p>
      </div>
      {epfData && (
        <div className="grid lg:grid-cols-2 gap-4">
          {epfData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
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
                    <div className="col-span-5 lg:col-span-2">EPF amount</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.employment_epf}
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

export default EPFDashboard;
