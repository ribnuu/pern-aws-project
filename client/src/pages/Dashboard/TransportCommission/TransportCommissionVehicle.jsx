import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { receieveByVehicleNumberTransportCommissionApi } from "../../../apis/TransportCommissionApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const TransportCommissionVehicle = () => {
  document.title = "Transport Commission";

  const [transportCommissionData, setTransportCommissionData] = useState([]);
  const [transportCommissionCount, setTransportCommissionCount] = useState(0);

  const params = useParams();
  const vehicle_number = params.vehicleNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transportCommissionResponse =
          await receieveByVehicleNumberTransportCommissionApi(vehicle_number);
        setTransportCommissionCount(transportCommissionResponse.rowCount);
        setTransportCommissionData(transportCommissionResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className=" lg:my-12 my-8">
      <div className="bg-white uppercase flex justify-between rounded-md border border-black">
        <div className="mx-auto my-auto text-2xl">TRANSPORT COMMISSION</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{transportCommissionCount}</span>
          <span className="my-auto">vehicle(s) registered</span>
        </p>
      </div>
      {transportCommissionData && (
        <div className="">
          {transportCommissionData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-gray-950 gap-12 p-2 flex rounded-md border-2 border-black text-xs lg:text-lg my-12"
                key={key}
              >
                <div className="grid grid-cols-2">
                  <div className="rounded-md my-auto ">
                    <img
                      src={`http://
                      ${server_port}:4000${data.vehicle_image_path}`}
                      className="lg:w-64 lg:h-52 w-32 h-28 object-cover -my-16 ml-4 rounded-md"
                      alt="Image not found in Vehicle Registration Database"
                    />
                  </div>
                  <div className="mx-auto my-auto">
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Plate</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.vehicle_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Make</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.vehicle_make}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Model</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.vehicle_model}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Colour</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.vehicle_color}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Route Number</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.routes_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Permit Number</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.routes_permit_number}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Start Date</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.permit_start_date}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">End Date</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.permit_end_date}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Route Start</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.routes_start}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Route End</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.routes_end}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        If there are no data in the vehicle registration but if permit is given.
        It will show on this page and will return only the permit table data as
        there is no inner join connection to the vehicle registration data.
      </div>
    </section>
  );
};

export default TransportCommissionVehicle;
