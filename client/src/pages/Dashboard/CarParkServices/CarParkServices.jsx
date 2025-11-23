import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const CarParkServices = () => {
  const [oneGalleFaceData, setOneGalleFaceData] = useState("");
  const [colomboCityCentreData, setColomboCityCentreData] = useState("");
  const [nawalokaHospitalData, setNawalokaHospitalData] = useState("");
  const [delmonHospitalData, setDelmonHospitalData] = useState("");

  const [bgColor, setBgColor] = useState("bg-green-500");
  const [borderColor, setBorderColor] = useState("border-red-400");
  const [nullBackground, setNullBackground] = useState("bg-red-600");
  const params = useParams();
  const nic_number = params.carParkNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oneGalleFaceResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/one-galle-face/receiveByNic`,
          {
            nic_number,
          }
        );
        if (oneGalleFaceResponse.data.rowCount > 0) {
          setOneGalleFaceData(oneGalleFaceResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const colomboCityCentreResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/colombo-city-centre/receiveByNic`,
          {
            nic_number,
          }
        );
        if (colomboCityCentreResponse.data.rowCount > 0) {
          setColomboCityCentreData(colomboCityCentreResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const nawalokaResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/nawaloka-hospital/receiveByNic`,
          {
            nic_number,
          }
        );
        if (nawalokaResponse.data.rowCount > 0) {
          setNawalokaHospitalData(nawalokaResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const delmonHospitalResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/delmon-hospital/receiveByNic`,
          {
            nic_number,
          }
        );
        if (delmonHospitalResponse.data.rowCount > 0) {
          setDelmonHospitalData(delmonHospitalResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        return prevColor === "bg-green-500" ? "bg-blue-500" : "bg-green-500";
      });
    }, 1000);

    const border = setInterval(() => {
      setBorderColor((prevColor) => {
        return prevColor === "border-red-400"
          ? "border-blue-900"
          : "border-red-400";
      });
    }, 1500);

    fetchData();
    return () => {
      clearInterval(interval);
      clearInterval(border);
    };
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-white lg:grid text-xs grid grid-cols-1 lg:grid-cols-3 p-4 text-gray-950 my-4 gap-2 rounded-lg">
        {/* ONE GALLE FACE DATA */}
        {oneGalleFaceData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            CAR PARK ONE GALLE FACE
          </div>
        )}
        {!oneGalleFaceData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            CAR PARK ONE GALLE FACE
          </div>
        )}
        {/* COLOMBO CITY CENTRE DATA */}
        {colomboCityCentreData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            CAR PARK COLOMBO CITY CENTRE
          </div>
        )}
        {!colomboCityCentreData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            CAR PARK COLOMBO CITY CENTRE
          </div>
        )}

        {/* DELMON HOSPITAL DATA */}
        {delmonHospitalData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            CAR PARK DELMON HOSPITAL
          </div>
        )}
        {!delmonHospitalData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            CAR PARK DELMON HOSPITAL
          </div>
        )}

        {/* NAWALOKA HOSPITAL DATA */}
        {nawalokaHospitalData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            CAR PARK NAWALOKA HOSPITAL
          </div>
        )}
        {!nawalokaHospitalData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            CAR PARK NAWALOKA HOSPITA
          </div>
        )}
      </div>
      <div>
        <div>
          {oneGalleFaceData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg bg-black border-2 border-white uppercase">
                Car Park One Galle Face
              </div>
              <div className="grid grid-cols-2 gap-2">
                {oneGalleFaceData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div
                      className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                      key={key}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.vehicle_image_path}`}
                              className="lg:w-32 lg:h-24  border-2 border-black w-32 h-32 object-contain rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 my-auto">
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Number
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_number}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Entry Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.entry_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Exit Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.exit_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Make / Model
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_make} / {data.vehicle_model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div>
          {colomboCityCentreData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg bg-black border-2 border-white uppercase">
                CAR PARK COLOMBO CITY CENTRE
              </div>
              <div className="grid grid-cols-2 gap-2">
                {colomboCityCentreData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div
                      className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                      key={key}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.vehicle_image_path}`}
                              className="lg:w-32 lg:h-24  border-2 border-black w-32 h-32 object-contain rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 my-auto">
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Number
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_number}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Entry Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.entry_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Exit Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.exit_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Make / Model
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_make} / {data.vehicle_model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          {delmonHospitalData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg bg-black border-2 border-white uppercase">
                CAR PARK DELMON HOSPITAL
              </div>
              <div className="grid grid-cols-2 gap-2">
                {delmonHospitalData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div
                      className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                      key={key}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.vehicle_image_path}`}
                              className="lg:w-32 lg:h-24  border-2 border-black w-32 h-32 object-contain rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 my-auto">
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Number
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_number}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Entry Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.entry_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Exit Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.exit_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Make / Model
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_make} / {data.vehicle_model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          {nawalokaHospitalData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg bg-black border-2 border-white uppercase">
                NAWALOKA HOSPITAL
              </div>
              <div className="grid grid-cols-2 gap-2">
                {nawalokaHospitalData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div
                      className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                      key={key}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <div className="rounded-lg my-auto  ">
                            <img
                              src={`http://localhost:4000${data.vehicle_image_path}`}
                              className="lg:w-32 lg:h-24  border-2 border-black w-32 h-32 object-contain rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 my-auto">
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Number
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_number}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Entry Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.entry_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Exit Time
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.exit_datetime}
                            </div>
                          </div>
                          <div className="grid-cols-12  grid text-md">
                            <div className="col-span-5 lg:col-span-5">
                              Vehicle Make / Model
                            </div>
                            <div className=""> |</div>
                            <div className="col-span-6 lg:col-span-5">
                              {data.vehicle_make} / {data.vehicle_model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarParkServices;
