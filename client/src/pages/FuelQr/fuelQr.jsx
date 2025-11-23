import { BiShieldQuarter } from "react-icons/bi";
import qr from "../../assets/qr-code.png";
import { useEffect, useState } from "react";

const fuelQr = () => {
  const [FuelQrData, setFuelQrData] = useState([]);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-12 my-12">
        {FuelQrData.map((data) => (
          <>
            <div className="bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6">
              <div className="rounded-lg w-auto h-auto">
                <img src={qr} className="h-[100px] w-[120px]" />
              </div>
              <div className="my-4">
                <h1>My vehicles and QR</h1>
                <div className="flex gap-2">
                  <div>Owners name :</div>
                  <div>{data.name}</div>
                </div>
                <div className="flex gap-2">
                  <div>Plate number :</div>
                  <div>{data.plateNumber}</div>
                </div>
                <div className="flex gap-2">
                  <div>Make :</div>
                  <div>{data.make}</div>
                </div>
                <div className="flex gap-2">
                  <div>Model :</div>
                  <div>{data.model}</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default fuelQr;
