import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const CribDashboard = () => {
  const [cribData, setCribData] = useState([]);
  const [cribCount, setCribCount] = useState(0);

  const params = useParams();
  const nic_number = params.cribNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cribResponse = await axios.post(
          `http://${server_port}:4000/api/crib/receiveByNic`,
          {
            nic_number,
          }
        );
        setCribCount(cribResponse.data.rowCount);
        setCribData(cribResponse.data.rows);
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
          Credit Information Bureau of Sri Lanka
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{cribCount}</span>
          <span className="my-auto">crib(s) history</span>
        </p>
      </div>
      {cribData && (
        <div className="">
          {cribData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">Credit Score</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.credit_score}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Outstanding</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.outstanding_balance}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Status</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.payment_status}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Credit Type</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.credit_type}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Crib Entered Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.crib_entered_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Bank</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.bank_name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        Credit Information bureau of Sri Lanka
        <br />
        It will show if the individual has not repaid any loans / lease / credit
        card bills / payment etc.
      </div>
    </section>
  );
};

export default CribDashboard;
