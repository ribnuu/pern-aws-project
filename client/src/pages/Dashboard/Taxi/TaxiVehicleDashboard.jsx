import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const TaxiDashboardVehicle = () => {
  const [uberTaxiData, setUberTaxiData] = useState("");
  const [uberTaxiCount, setUberTaxiCount] = useState(0);
  const [uberTaxiAccountData, setUberTaxiAccountData] = useState("");

  const [pickMeTaxiData, setPickMeTaxiData] = useState("");
  const [pickMeTaxiCount, setPickMeTaxiCount] = useState(0);
  const [pickMeTaxiAccountData, setPickMeAccountData] = useState("");

  const [kangarooTaxiData, setKangarooTaxiData] = useState("");
  const [kangarooTaxiCount, setKangarooTaxiCount] = useState(0);
  const [kangarooTaxiAccountData, setKangarooAccountData] = useState("");

  const [taxiyakData, setTaxiyakTaxiData] = useState("");
  const [taxiyakTaxiCount, setTaxiyakTaxiCount] = useState(0);
  const [taxiyakTaxiAccountData, setTaxiyakAccountData] = useState("");

  const params = useParams();
  const vehicle_number = params.taxiNumber;
  console.log(vehicle_number);

  useEffect(() => {
    const fetchData = async () => {
      //uber

      try {
        const uberTaxiHireResponse = await axios.post(
          `http://${server_port}:4000/api/taxi/uber/receiveUberVehicleDetailsByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        setUberTaxiData(uberTaxiHireResponse.data.rows);
        setUberTaxiCount(uberTaxiHireResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
      //pickme

      //pickme

      try {
        const pickMeTaxiHireResponse = await axios.post(
          `http://${server_port}:4000/api/taxi/pickme/receivePickMeVehicleDetailsByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        setPickMeTaxiData(pickMeTaxiHireResponse.data.rows);
        setPickMeTaxiCount(pickMeTaxiHireResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }

      //Kangaroo

      //Kangaroo

      try {
        const kangarooTaxiHireResponse = await axios.post(
          `http://${server_port}:4000/api/taxi/kangaroo/receiveKangarooVehicleDetailsByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        setKangarooTaxiData(kangarooTaxiHireResponse.data.rows);
        setKangarooTaxiCount(kangarooTaxiHireResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }

      //Taxiyak

      try {
        const taxiyakTaxiHireResponse = await axios.post(
          `http://${server_port}:4000/api/taxi/taxiyak/receiveTaxiyakVehicleDetailsByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        setTaxiyakTaxiData(taxiyakTaxiHireResponse.data.rows);
        setTaxiyakTaxiCount(taxiyakTaxiHireResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            TAXI SERVICES SRI LANKA - UBER
          </div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{uberTaxiCount}</span>
            <span className="my-auto">hires(s) taken</span>
          </p>
        </div>
        <div></div>
        <div>
          {uberTaxiData && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {uberTaxiData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                    key={key}
                  >
                    <div className="">
                      Uber
                      <div className="my-auto">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup Location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off Location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Start Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_start_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            End Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_end_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Status
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_status}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Fare
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_fare}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Car Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
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
      </div>
      <div className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            TAXI SERVICES SRI LANKA - PickMe
          </div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{pickMeTaxiCount}</span>
            <span className="my-auto">hires(s) taken</span>
          </p>
        </div>

        <div>
          {pickMeTaxiData && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {pickMeTaxiData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                    key={key}
                  >
                    <div className="">
                      PickMe
                      <div className="my-auto">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup Latitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup Longitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off Location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off location
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Start Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_start_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            End Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_end_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Status
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_status}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Fare
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_fare}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Car Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
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
      </div>
      <div className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            TAXI SERVICES SRI LANKA - Kangaroo
          </div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{kangarooTaxiCount}</span>
            <span className="my-auto">hires(s) taken</span>
          </p>
        </div>
        <div>
          {kangarooTaxiData && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {kangarooTaxiData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                    key={key}
                  >
                    <div className="">
                      Kangaroo
                      <div className="my-auto">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup latitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup longitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off latitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off longitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Start Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_start_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            End Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_end_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Status
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_status}
                          </div>
                        </div>

                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Fare
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_fare}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Car Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
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
      </div>
      <div className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">
            TAXI SERVICES SRI LANKA - Taxiyak
          </div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{kangarooTaxiCount}</span>
            <span className="my-auto">hires(s) taken</span>
          </p>
        </div>

        <div>
          {taxiyakData && (
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              {taxiyakData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                    key={key}
                  >
                    <div className="">
                      Taxiyak
                      <div className="my-auto">
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup latitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Pickup longitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.pickup_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off latitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_latitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Drop off longitude
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.dropoff_location_longitude}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Start Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_start_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            End Datetime
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_end_datetime}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Status
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_status}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Hire Fare
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.hire_fare}
                          </div>
                        </div>
                        <div className="grid-cols-12  grid text-md">
                          <div className="col-span-5 lg:col-span-3">
                            Car Number
                          </div>
                          <div className=""> |</div>
                          <div className="col-span-6 lg:col-span-7">
                            {data.vehicle_number}
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
      </div>
    </section>
  );
};

export default TaxiDashboardVehicle;
