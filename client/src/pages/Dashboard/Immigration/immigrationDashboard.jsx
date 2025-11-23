import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ImmigrationNseDashboard = () => {
  const [immigrationPortData, setImmigrationPortData] = useState([]);
  const [immigrationAirportData, setImmigrationAirportData] = useState([]);

  const [passportNumber, setPassportNumber] = useState([]);

  const params = useParams();
  const nic_number = params.immigrationNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portResponse = await axios.post(
          `http://${server_port}:4000/api/port/receiveByNic`,
          {
            nic_number,
          }
        );
        setImmigrationPortData(portResponse.data.rows);
        setPassportNumber(portResponse.data.rows[0].passport_number);
      } catch (error) {
        console.error(error);
      }
      try {
        const portResponse = await axios.post(
          `http://${server_port}:4000/api/airport/receiveByNic`,
          {
            nic_number,
          }
        );
        setImmigrationAirportData(portResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg my-8">
        <div className="mx-auto my-auto text-2xl">
          Immigration Port - {passportNumber}
        </div>
        <p className="mx-4 text-right"></p>
      </div>
      <div>
        {immigrationPortData && (
          <div className="grid lg:grid-cols-2 gap-4">
            {immigrationPortData.map((data, key) => {
              return (
                <div
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">Visa Type</div>
                      <div className="ml-8"> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.visa_type}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Arrival Date
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.arrival_date}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Arrival port
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.arrival_port}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Departure Date
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.departure_date}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Departure Port
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.departure_port}
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
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg my-8">
          <div className="mx-auto my-auto text-2xl">
            IMMIGRATION AIRPORT - {passportNumber}
          </div>
          <p className="mx-4 text-right"></p>
        </div>

        <div>
          {immigrationAirportData && (
            <div className="grid lg:grid-cols-2 gap-4">
              {immigrationAirportData.map((data, key) => {
                return (
                  <div
                    className="bg-white  text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-2">
                          Visa Type
                        </div>
                        <div className="ml-8"> |</div>
                        <div className="col-span-6 lg:col-span-8">
                          {data.visa_type}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-2">
                          Arrival Date
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 lg:col-span-8">
                          {data.arrival_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-2">
                          Arrival airport
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 lg:col-span-8">
                          {data.arrival_airport}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-2">
                          Departure Date
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 lg:col-span-8">
                          {data.departure_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-2">
                          Departure Airport
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 lg:col-span-8">
                          {data.departure_airport}
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

export default ImmigrationNseDashboard;
