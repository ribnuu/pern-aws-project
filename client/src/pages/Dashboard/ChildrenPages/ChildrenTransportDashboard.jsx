import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ChildrenTransportDashboard = () => {
  const [trasnportData, setTransportData] = useState([]);
  const [epfCount, setEpfCount] = useState(0);

  const params = useParams();
  const nic_number = params.nicNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transportResponse = await axios.post(
          `http://${server_port}:4000/api/transport/receiveTransportChildByNic`,
          {
            nic_number,
          }
        );
        console.log(transportResponse.data.rows[0]);
        setTransportData(transportResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      <div className="border border-black uppercase flex justify-between rounded-md">
        <div className="mx-auto my-auto text-2xl">Children Transport</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{epfCount}</span>
          <span className="my-auto">epf(s) received</span>
        </p>
      </div>
      {trasnportData && (
        <div className="grid lg:grid-cols-2 gap-4">
          {trasnportData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="border border-black text-black px-4 py-2 rounded-md text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 ">Child Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 ">{data.baby_name}</div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 ">Vehicle Number</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 ">{data.vehicle_number}</div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 ">Driver Mobile / Nic</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 ">
                      {data.driver_mobile_number} / {data.driver_nic_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Route From</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 ">{data.start_route}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Route To</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  ">{data.end_route}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Transport Service Name</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  ">
                      {data.transport_service_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Owner Mobile / Nic</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  ">
                      {data.owner_mobile_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Start Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 ">{data.start_date}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">End Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  ">{data.end_date}</div>
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

export default ChildrenTransportDashboard;
