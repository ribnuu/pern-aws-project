import React, { useEffect, useState } from "react";
import { getVoterByNicApi } from "../../apis/VoterApiService";

const voterInformation = () => {
  const [votersdata, setvotersdata] = useState([]);
  const getvoterinformation = async (nic_number) => {
    try {
      const voterResponse = await getVoterByNicApi({ nic_number: nic_number });
      console.log(voterResponse.rows);
      setvotersdata(voterResponse.rows);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      let nic_number = localStorage.getItem("nic_number");
      const res = getvoterinformation(nic_number);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section>
      <div className="mx-12 my-12 text-center">
        <div className="bg-white px-2 py-4 rounded-lg">
          <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
            My voter information
          </h1>
          {votersdata.map((data, key) => (
            <div
              className="bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6"
              key={key}
            >
              <div className="rounded-lg w-auto h-auto">
                <img src="" className="h-[100px] w-[120px]" />
              </div>
              <div className="">
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
          ))}
        </div>
      </div>
      <div>Include date year , gs division</div>
    </section>
  );
};

export default voterInformation;
