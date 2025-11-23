import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const Gem = () => {
  const [gemData, setGemData] = useState([]);
  const [gemCount, setGemCount] = useState(0);

  const params = useParams();
  const nic_number = params.gemNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gemResponse = await axios.post(
          `http://${server_port}:4000/api/gem/receiveByNic`,
          {
            nic_number,
          }
        );
        setGemCount(gemResponse.data.rowCount);
        setGemData(gemResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">GEM CORPORATIONS DETAILS</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{gemCount}</span>
          <span className="my-auto">gem(s) involvement</span>
        </p>
      </div>
      {gemData && (
        <div className="grid lg:grid-cols-2 gap-4">
          {gemData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-3">NIC Number</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.nic_number}
                    </div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-3">Gem Type</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.gem_type}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Weight</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.weight}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Value</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.exported_value}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Tax</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.tax_amount}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">
                      Exported address
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.exported_address}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">
                      Exported Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.exported_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Item Reg. No</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.item_registration_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">
                      Company Reg. No
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.company_registration_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Tax Status</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.tax_status}
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

export default Gem;
