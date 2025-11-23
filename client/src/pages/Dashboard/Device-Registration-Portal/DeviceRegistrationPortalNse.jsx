import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyDevicesByNICApi } from "../../../apis/DevicesApiService";

const DeviceRegistrationDashboard = () => {
  const [deviceRegistrationData, setDeviceRegistrationData] = useState("");
  const [deviceRegistrationCount, setDeviceRegistrationCount] = useState(0);

  const params = useParams();
  const nic_number = params.deviceRegistrationNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deviceRegistrationResponse = await getMyDevicesByNICApi({
          nic_number: nic_number,
        });
        setDeviceRegistrationData(deviceRegistrationResponse.rows);
        setDeviceRegistrationCount(deviceRegistrationResponse.rowCount);
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
          DEVICE REGISTRATION PORTAL
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{deviceRegistrationCount}</span>
          <span className="my-auto">devices(s) registered</span>
        </p>
      </div>
      <div>
        {deviceRegistrationData && (
          <div className="grid grid-cols-2 gap-4">
            {deviceRegistrationData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              console.log(data);
              return (
                <div
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Device Type
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.device_type}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Device Make
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.device_make}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Device Modal
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.device_model}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        IMEI Number
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.device_imei_number}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Mac Address
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.device_mac_address}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Registered Date time
                      </div>
                      <div className="">|</div>
                      {data.device_registered_datetime}
                      <div className="col-span-6 lg:col-span-8"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DeviceRegistrationDashboard;
