import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const DrivingOffenseDashboard = () => {
  const [drivingOffenseData, setDrivingOffenseData] = useState("");
  const [drivingOffenseCount, setDrivingOffenseCount] = useState(0);

  const [drivingPointsData, setDrivingPointsData] = useState("");

  const params = useParams();
  const nic_number = params.drivingOffenseNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drivingOffenseResponse = await axios.post(
          `http://${server_port}:4000/api/driving-offense/receiveByNic`,
          {
            nic_number,
          }
        );
        setDrivingOffenseData(drivingOffenseResponse.data.rows);
        setDrivingOffenseCount(drivingOffenseResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
      try {
        const drivingPointsResponse = await axios.post(
          `http://${server_port}:4000/api/driving-points/receiveByNic`,
          {
            nic_number,
          }
        );
        setDrivingPointsData(drivingPointsResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-8 my-4">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg my-4">
        <div className="mx-auto my-auto text-2xl">DRIVER OFFENSE DATA</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{drivingOffenseCount}</span>
          <span className="my-auto">driving(s) offenses</span>
        </p>
      </div>
      <div>
        {drivingOffenseData && (
          <div className="grid grid-cols-2 gap-4">
            {drivingOffenseData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              console.log(data);
              return (
                <div
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-3">
                        Offense Date time
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.offense_datetime}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-3">
                        Offense type
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.offense_type}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-3">
                        Offense Location
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.offense_location}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-3">
                        Fine Amount
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.fine_amount}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-3">
                        Payment Status
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.payment_status}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-3">Courts</div>
                      <div className="">|</div>
                      {data.iscourts}
                      <div className="col-span-6 lg:col-span-7"></div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-3">
                        Courts Date
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-7">
                        {data.courts_date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="my-4">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg my-4">
          <div className="mx-auto my-auto text-2xl">DRIVER POINTS DATA</div>
        </div>

        {drivingPointsData && (
          <div className="rounded-lg bg-white text-black">
            <div className="grid grid-cols-4 px-4 py-2 gap-1 border-b-2 border-black">
              <div className="text-lg">DATE TIME</div>
              <div className="text-lg">ACTIVITIES</div>
              <div className="text-lg">POINT</div>
              <div className="text-lg">BALANCE</div>
            </div>
            <div>
              {drivingPointsData.map((data, key) => {
                return (
                  <div
                    className=" text-black px-4 py-2 text-xs md:text-base grid grid-cols-4 gap-1"
                    key={key}
                  >
                    <div>{data.last_offense_date}</div>
                    <div>{data.activities}</div>
                    <div>{data.last_offense_points}</div>
                    <div>{data.total_points}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DrivingOffenseDashboard;
