import { useEffect, useState } from "react";
import { getMyDevicesByNICApi } from "../apis/DevicesApiService";

const MyDevices = () => {
  const [MyDevicesData, setMyDeviceData] = useState([]);

  const MyDeviceByNICNumber = async (nic_number) => {
    try {
      const MydeviceByNICNumberResponse = await getMyDevicesByNICApi({
        nic_number: nic_number,
      });

      setMyDeviceData(MydeviceByNICNumberResponse.rows);
      console.log(MydeviceByNICNumberResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    MyDeviceByNICNumber(nic_number);
  }, []);

  return (
    <section className="mx-12 my-12">
      <div className="">
        {MyDevicesData && (
          <div className="grid lg:grid-cols-3 gap-4">
            {MyDevicesData.map((data, key) => (
              <div
                className="bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6"
                key={key}
              >
                <div className="rounded-lg w-auto h-auto">
                  {/* <img src={vehicle} className='h-[100px] w-[120px]'/> */}
                </div>
                <div className="my-4">
                  <div className="flex gap-2">
                    <div>Device IMEI :</div>
                    <div>{data.device_imei_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Mac Address :</div>
                    <div>{data.device_mac_address}</div>
                  </div>
                  <div className="flex gap-2">
                    <div> Device Registrated datetime :</div>
                    <div>{data.device_registered_datetime}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Type :</div>
                    <div>{data.device_type}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Make :</div>
                    <div>{data.device_make}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Model :</div>
                    <div>{data.device_model}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>NIC Number :</div>
                    <div>{data.nic_number}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default MyDevices;
