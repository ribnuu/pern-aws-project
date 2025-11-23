import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehiclesByNicNumberApi } from "../../../apis/MyVehiclesApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const WhoElseSearchNSE = () => {
  const [wesData, setWesData] = useState([]);
  const [wesCount, setWesCount] = useState(0);

  const params = useParams();
  const nic_number = params.wesNumber;

  useEffect(() => {
    const fetchData = async () => {
      let vehicle_number = [];
      let passport_number = "";
      try {
        const vehicleResponse = await getVehiclesByNicNumberApi({
          nic_number: nic_number,
        });

        const passportResponse = await axios.post(
          `http://${server_port}:4000/api/passport/receiveByNic`,
          {
            nic_number,
          }
        );
        if (passportResponse.data.rowCount > 0) {
          passport_number = passportResponse.data.rows[0].passport_number;
        }
        if (vehicleResponse.rowCount > 0) {
          let i = 0;
          while (i < vehicleResponse.rowCount) {
            vehicle_number.push(vehicleResponse.rows[i].vehicle_plate_number);
            i++;
          }
        }
        const wesResponse = await axios.post(
          `http://${server_port}:4000/api/wes/receiveByNic`,
          {
            nic_number,
            vehicle_number,
            passport_number,
          }
        );
        setWesCount(wesResponse.data.rowCount);
        setWesData(wesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">
          WHO ELSE SEARCH - {nic_number}
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{wesCount}</span>
          <span className="my-auto">search(es) received</span>
        </p>
      </div>
      {wesData && (
        <div className="grid lg:grid-cols-2 gap-4 my-4">
          {wesData.map((data, key) => {
            const eventDate = new Date(data.search_datetime);

            const newDate = new Intl.DateTimeFormat("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(eventDate);
            const setTimeZone = eventDate.toLocaleString("en-GB", {
              timeZone: "Asia/Kolkata",
            });
            return (
              <div className="bg-white text-black rounded-lg" key={key}>
                <div className="grid grid-cols-5 px-2  text-base text-center border-y-2 border-black">
                  <div>Work Station</div>
                  <div>User</div>
                  <div>Date time</div>
                  <div>Searched By</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-5 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                  <div>{data.workstation_id}</div>
                  <div>{data.user_id}</div>
                  <div>{newDate}</div>
                  <div>{data.searched_by}</div>
                  <div>{data.search_status}</div>
                </div>
                <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                  <div className="grid grid-cols-6">
                    <div className="col-span-5">
                      Vehicle Emission Certificate :
                    </div>
                    <div className="col-span-1">
                      {data.department_vehicle_emission_certificate}
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-5">Department EPF</div>
                    <div className="col-span-1">{data.department_epf}</div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-5">
                      Department Foreign Employment Bureau
                    </div>
                    <div className="col-span-1">
                      {data.department_foreign_employment_bureau}
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-5">Driver Offense Portal</div>
                    <div className="col-span-1">
                      {data.department_driver_offense_portal}
                    </div>
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

export default WhoElseSearchNSE;
