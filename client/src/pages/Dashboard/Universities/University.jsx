import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const University = () => {
  const [universityData, setUniversityData] = useState("");

  const params = useParams();
  const nic_number = params.universityNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const universityResponse = await axios.post(
          `http://${server_port}:4000/api/university/receiveByNic`,
          {
            nic_number,
          }
        );
        if (universityResponse.data.rowCount > 0) {
          setUniversityData(universityResponse.data.rows);
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
        {universityData && (
          <div className="">
            <div className="text-lg text-center">Univeristy</div>
            {universityData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Code
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_code}
                      </div>
                    </div>
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">Department</div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.department}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">University</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.university_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Enrollment Date
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.enrollment_date}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Graduation Date
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.graduation_date}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Course Credits
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_credits}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Course Level
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.course_level}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Final Results
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8 ">
                        {data.final_results}
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

export default University;
