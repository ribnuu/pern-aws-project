import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const SchoolDashboard = () => {
  const [schoolData, setSchoolData] = useState("");

  const params = useParams();
  const nic_number = params.schoolNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolResponse = await axios.post(
          `http://${server_port}:4000/api/school/receiveByNic`,
          {
            nic_number,
          }
        );
        if (schoolResponse.data.rowCount > 0) {
          setSchoolData(schoolResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {};
  }, []);
  return (
    <section className="mx-12 my-12">
      <div>
        {schoolData && (
          <div className="">
            <div className="text-lg text-center">School</div>
            {schoolData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        School Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.school_name}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        School Address
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.school_address}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Last Passed Grade
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.last_passed_grade}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Last grade Results
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.last_past_grade_results}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">Notes</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.notes}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolDashboard;
