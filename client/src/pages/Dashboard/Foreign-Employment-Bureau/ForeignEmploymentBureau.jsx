import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ForeignEmploymentBureau = () => {
  const [foreignEmploymentBureau, setForeignEmployementBureau] = useState([]);
  const [foreignEmploymentBureauCount, setForeignEmploymentBureauCount] =
    useState(0);

  const params = useParams();
  const nic_number = params.foreignEmploymentBureauNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foreignEmploymentResponse = await axios.post(
          `http://${server_port}:4000/api/foreign-employment-bureau/receiveByNic`,
          {
            nic_number,
          }
        );
        setForeignEmploymentBureauCount(
          foreignEmploymentResponse.data.rowCount
        );
        setForeignEmployementBureau(foreignEmploymentResponse.data.rows);
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
          FOREIGN EMPLOYMENT BUREAU
        </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{foreignEmploymentBureauCount}</span>
          <span className="my-auto">feb(s) involvement</span>
        </p>
      </div>
      {foreignEmploymentBureau && (
        <div className="grid lg:grid-cols-2 gap-4">
          {foreignEmploymentBureau.map((data, key) => {
            return (
              <div
                className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-3">
                      Passport Number
                    </div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.passport_number}
                    </div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-3">
                      Name of Worker
                    </div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.worker_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Country</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7">
                      {data.country_of_employment}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Agency</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.employment_agency}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Title</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.job_title}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Start Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.start_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">End Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.end_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Salary</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.salary}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">
                      Contract Status
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.contract_status}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-3">Category</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-7 ">
                      {data.category}
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

export default ForeignEmploymentBureau;
