import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehiclesByNicNumberApi } from "../apis/MyVehiclesApiService";

const myvehicles = () => {
  const [MyVehiclesData, setMyVehiclesData] = useState([]);

  const myVehiclesByNICNumber = async (nic_number) => {
    try {
      const myVehiclesByNICNumberResponse = await getVehiclesByNicNumberApi({
        nic_number: nic_number,
      });

      setMyVehiclesData(myVehiclesByNICNumberResponse.rows);
      console.log(myVehiclesByNICNumberResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    myVehiclesByNICNumber(nic_number);
  }, []);

  return (
    <section className="mx-12 my-12">
      <div className="flex flex-row-reverse my-4">
        <Link to="/cgp/addVehicless">
          <button className="bg-gray-800 px-2 py-4 flex mx-4 gap-4 uppercase">
            <BsPlusLg />
            <span className="text-xs text-white">Add My Vehicless</span>
          </button>
        </Link>
      </div>
      <div className="">
        {MyVehiclesData && (
          <div className="grid lg:grid-cols-3 gap-4">
            {MyVehiclesData.map((data, key) => (
              <div
                className="bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6"
                key={key}
              >
                <div className="rounded-lg w-auto h-auto">
                  {/* <img src={vehicle} className='h-[100px] w-[120px]'/> */}
                </div>
                <div className="my-4">
                  <div className="flex gap-2">
                    <div>Vehicle Plate Number :</div>
                    <div>{data.vehicle_plate_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Vehicle Model :</div>
                    <div>{data.vehicle_model}</div>
                  </div>
                  <div className="flex gap-2">
                    <div> Year of MFG :</div>
                    <div>{data.year_of_mfg}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Vehicle Make :</div>
                    <div>{data.vehicle_make}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Vehicle Color :</div>
                    <div>{data.vehicle_color}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Vehicle Class :</div>
                    <div>{data.vehicle_class}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>NIC Number :</div>
                    <div>{data.nic_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Registered at :</div>
                    <div>{data.registered_at}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Owner Name :</div>
                    <div>{data.owner_name}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Owner Address :</div>
                    <div>{data.owner_address}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Chasis Number :</div>
                    <div>{data.chasis_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Engine Number :</div>
                    <div>{data.engine_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Fuel Type :</div>
                    <div>{data.fuel_type}</div>
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
export default myvehicles;
