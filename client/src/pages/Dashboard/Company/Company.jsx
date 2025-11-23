import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCompanyByNicApi } from "../../../apis/CompanyApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const Company = () => {
  const [companyData, setCompanyData] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);

  const params = useParams();
  const nic_number = params.companyNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await fetchCompanyByNicApi(nic_number);
        setCompanyCount(companyResponse.rowCount);
        setCompanyData(companyResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">COMPANY REGISTRAR</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{companyCount}</span>
          <span className="my-auto">compan(ies) involvement</span>
        </p>
      </div>
      {companyData && (
        <div className="">
          {companyData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">Company Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.company_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Registration Number
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.registration_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Address</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.address}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Contact Number
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.contact_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Company Email
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.email}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Company Contact No.
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.contact_number}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Start Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.start_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Job Role</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.job_role}
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

export default Company;
