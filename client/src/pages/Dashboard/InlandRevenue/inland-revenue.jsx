import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const InlandRevenue = () => {
  const [inlandRevenueData, setInlandRevenueData] = useState([]);
  const [inlandRevenueCount, setInlandRevenueCount] = useState(0);

  const params = useParams();
  const nic_number = params.inlandRevenueNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inlandRevenueResponse = await axios.post(
          `http://${server_port}:4000/api/inland-revenue/receiveByNic`,
          {
            nic_number,
          }
        );
        setInlandRevenueCount(inlandRevenueResponse.data.rowCount);
        setInlandRevenueData(inlandRevenueResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8 pb-10">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">INLAND REVENUE</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{inlandRevenueCount}</span>
          <span className="my-auto">tax(es) paid</span>
        </p>
      </div>
      {inlandRevenueData && (
        <div className="">
          {inlandRevenueData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">
                      Tax Payer Name
                    </div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.taxpayer_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Tax Payer Nic
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.taxpayer_nic}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Tax Type</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.tax_type}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Tax Amount</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.tax_amount}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Payment Status
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.payment_status}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Paid Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.collection_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Tax Period</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.tax_period}
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

export default InlandRevenue;
