import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const CeaDashboard = () => {
  const [ceaLicenseData, setCeaLicenseData] = useState([]);
  const [ceaLicenseCount, setCeaLicenseCount] = useState(0);

  const params = useParams();
  const nic_number = params.ceaLicenseNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ceaLicenseReponse = await axios.post(
          `http://${server_port}:4000/api/cea-license/receiveByNic`,
          {
            nic_number,
          }
        );
        setCeaLicenseCount(ceaLicenseReponse.data.rowCount);
        setCeaLicenseData(ceaLicenseReponse.data.rows);
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
          CENTRAL ENVIRONMENTAL AUTHORITY
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{ceaLicenseCount}</span>
          <span className="my-auto">license(s) issued</span>
        </p>
      </div>
      {ceaLicenseData && (
        <div className="">
          {ceaLicenseData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">
                      Institution Name
                    </div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.institution_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">License Type</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.license_type}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Owner Nic Number
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.owner_nic_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      License Start Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.license_start_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      License End Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.license_end_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Permit Number
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.permit_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">District</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.location}
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

export default CeaDashboard;
