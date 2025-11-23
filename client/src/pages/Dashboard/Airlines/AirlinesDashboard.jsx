import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AirlinesDashboard = () => {
  const [srilankanAirlinesData, setSrilankanAirlinesData] = useState("");
  const [spiceJetAirlinesData, setSpiceJetAirlinesData] = useState("");
  const params = useParams();
  const nic_number = params.airlinesNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const srilankanAirlineResponse = await axios.post(
          `http://${server_port}:4000/api/airline/sri-lankan-airlines/receiveByNic`,
          {
            nic_number,
          }
        );
        setSrilankanAirlinesData(srilankanAirlineResponse.data.rows);
      } catch (error) {
        console.log(error);
      }
      try {
        const spicejetAirlinesResponse = await axios.post(
          `http://${server_port}:4000/api/airline/spicejet-airlines/receiveByNic`,
          {
            nic_number,
          }
        );
        setSpiceJetAirlinesData(spicejetAirlinesResponse.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="mx-12 lg:my-12 my-8">
        <div>
          {srilankanAirlinesData && (
            <div>
              <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
                <div className="mx-auto my-auto text-2xl">
                  SRI LANKAN AIRLINES
                </div>
                <p className="mx-4 text-right"></p>
              </div>
              {srilankanAirlinesData && (
                <div className="">
                  {srilankanAirlinesData.map((data, key) => {
                    console.log;
                    const nicIdNumber = data.nic_number;
                    return (
                      <div
                        className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-2"
                        key={key}
                      >
                        <div className="grid grid-cols-2">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.airlines_image_path}`}
                              className="lg:w-44 lg:h-44  border-2 border-black w-32 h-32 object-contain ml-12 rounded-lg"
                            />
                          </div>
                          <div className="mx-auto my-auto">
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Ticket No.</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.ticket_number}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Seat No.</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.seat_number}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Seat Class</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.seat_class}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Meal Type</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.meal_type}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Dep. datetime</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.departure_datetime}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Arr. Datetime</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.arrival_datetime}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Dep. Airport</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.departure_airport}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Arr. Airport</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.arrival_airport}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Flight Number</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.flight_number}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="">
          {spiceJetAirlinesData && (
            <div>
              <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
                <div className="mx-auto my-auto text-2xl">
                  SPICE JET AIRLINES
                </div>
                <p className="mx-4 text-right"></p>
              </div>
              {spiceJetAirlinesData && (
                <div className="">
                  {spiceJetAirlinesData.map((data, key) => {
                    console.log;
                    const nicIdNumber = data.nic_number;
                    return (
                      <div
                        className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-2"
                        key={key}
                      >
                        <div className="grid grid-cols-2">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.airlines_image_path}`}
                              className="lg:w-44 lg:h-44  border-2 border-black w-32 h-32 object-contain ml-12 rounded-lg"
                            />
                          </div>
                          <div className="mx-auto my-auto">
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Ticket No.</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.ticket_number}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Seat No.</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.seat_number}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Seat Class</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.seat_class}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Meal Type</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.meal_type}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Dep. datetime</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.departure_datetime}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Arr. Datetime</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.arrival_datetime}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Dep. Airport</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.departure_airport}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Arr. Airport</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.arrival_airport}
                              </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-12">
                              <div className="lg:col-span-5">Flight Number</div>
                              <div className="hidden lg:col-span-1">|</div>
                              <div className="lg:col-span-6">
                                {data.flight_number}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AirlinesDashboard;
