import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const CouncilHome = () => {
  const [municipalData, setMunicipalData] = useState("");
  const [urbanData, setUrbanData] = useState("");
  const [pradeshiyaSabhaData, setPradeshiyaSabhaData] = useState("");
  const [councilCount, setCouncilCount] = useState(0);

  const [bgColor, setBgColor] = useState("bg-green-500");
  const [borderColor, setBorderColor] = useState("border-red-400");
  const [nullBackground, setNullBackground] = useState("bg-red-600");
  const params = useParams();
  const nic_number = params.councilNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const municipalResponse = await axios.post(
          `http://${server_port}:4000/api/council/municipal/receiveByNic`,
          {
            nic_number,
          }
        );
        if (municipalResponse.data.rowCount > 0) {
          setCouncilCount(municipalResponse.data.rowCount);
          setMunicipalData(municipalResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const urbanCouncilResponse = await axios.post(
          `http://${server_port}:4000/api/council/urban/receiveByNic`,
          {
            nic_number,
          }
        );
        if (urbanCouncilResponse.data.rowCount > 0) {
          setCouncilCount(urbanCouncilResponse.data.rowCount);
          setUrbanData(urbanCouncilResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const pradeshiyaSabhaResponse = await axios.post(
          `http://${server_port}:4000/api/council/pradeshiya-sabha/receiveByNic`,
          {
            nic_number,
          }
        );

        if (pradeshiyaSabhaResponse.data.rowCount > 0) {
          setCouncilCount(pradeshiyaSabhaResponse.data.rowCount);
          setPradeshiyaSabhaData(pradeshiyaSabhaResponse.data.rows);
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
        {/* MUNICIPAL DATA */}
        {municipalData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            MUNICIPAL COUNCIL
          </div>
        )}
        {!municipalData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            MUNICIPAL COUNCIL
          </div>
        )}
        {/* PRADEHSHIYA DATA */}
        {pradeshiyaSabhaData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            PRADESHIYA SABHA
          </div>
        )}
        {!pradeshiyaSabhaData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            PRADESHIYA SABHA
          </div>
        )}

        {/* URBAN  DATA */}
        {urbanData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            URBAN COUNCIL
          </div>
        )}
        {!urbanData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            URBAN COUNCIL
          </div>
        )}
      </div>
      <div>
        {municipalData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Municipal Council
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {municipalData.map((data, key) => {
                const nicIdNumber = data.nic_number;
                return (
                  <div className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                    <div className="">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">
                          Business Type
                        </div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.business_type}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Business Name
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.business_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Registration Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registration_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Address</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.address}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          License Start Date
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.license_start_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          License End Date
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.license_end_date}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          {pradeshiyaSabhaData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
                Pradeshiya Sabha
              </div>
              <div className="grid lg:grid-cols-2 gap-2">
                {pradeshiyaSabhaData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                      <div className="">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Business Type
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.business_type}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Business Name
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.business_name}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Registration Number
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.registration_number}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Address
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.address}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            License Start Date
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.license_start_date}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            License End Date
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.license_end_date}
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
          {urbanData && (
            <div className="">
              <div className="lg:text-2xl text-md text-center my-8 rounded-lg  border-2 border-white bg-black uppercase">
                Urban Council
              </div>
              <div className="grid lg:grid-cols-2 gap-2">
                {urbanData.map((data, key) => {
                  const nicIdNumber = data.nic_number;
                  return (
                    <div className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                      <div className="">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Business Type
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.business_type}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Business Name
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.business_name}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Registration Number
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.registration_number}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            Address
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.address}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            License Start Date
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.license_start_date}
                          </div>
                        </div>
                        <div className="grid-cols-12 grid">
                          <div className="col-span-5 lg:col-span-3">
                            License End Date
                          </div>
                          <div className="">|</div>
                          <div className="col-span-6 lg:col-span-7 ">
                            {data.license_end_date}
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

export default CouncilHome;
