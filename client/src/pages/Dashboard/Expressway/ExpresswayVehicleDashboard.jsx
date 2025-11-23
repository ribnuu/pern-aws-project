import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ExpresswayVehicleDashboard = () => {
  const [expresswayData, setExpresswayData] = useState("");
  const [expresswayCount, setExpresswayCount] = useState(0);

  const params = useParams();
  const vehicle_number = params.vehicleNumber;
  console.log(vehicle_number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expresswayResponse = await axios.post(
          `http://${server_port}:4000/api/expressway/receiveByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        setExpresswayData(expresswayResponse.data.rows);
        setExpresswayCount(expresswayResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">EXPRESSWAY</div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{expresswayCount}</span>
            <span className="my-auto"></span>
          </p>
        </div>
        {expresswayData && (
          <div className="">
            {expresswayData.map((data, key) => {
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                  key={key}
                >
                  <div className="grid grid-cols-2">
                    <div className="mx-auto my-auto">
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Plate</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6 text-red-500">
                          {data.vehicle_number}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Entry Point</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.entry_point}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Entry Time</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.entry_date}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Exit Point</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.exit_point}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Exit Time</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.exit_date}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Duration</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.duration}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Amount</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.toll_amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div>
        Highway entering time
        <br />
        Highway entering location
        <br />
        Hightway exit time
        <br />
        Hightway exit location
        <br />
        possible exit locations
        <br />
        The entire past travel history using the tollgates
        <br />
        Tollgates are shown on a live map , suspects entering and exiting are
        also shown with date and time on tollgates
        <br />
        <br />
      </div>
    </>
  );
};

export default ExpresswayVehicleDashboard;
