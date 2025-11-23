import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const TechnicalCollege = () => {
  const [technicalCollegeData, setTechnicalCollegeData] = useState([]);
  const [technicalCollegeCount, setTechnicalCollegeCount] = useState(0);

  const params = useParams();
  const nic_number = params.technicalCollegeNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicalCollegeResponse = await axios.post(
          `http://${server_port}:4000/api/technical-college/receiveByNic`,
          {
            nic_number,
          }
        );
        setTechnicalCollegeData(technicalCollegeResponse.data.rows);
        setTechnicalCollegeCount(technicalCollegeResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase text-right">
        <p className="mx-4">
          <span className="text-5xl mx-2">{technicalCollegeCount}</span>
          <span className="my-auto">courses attended</span>
        </p>
      </div>
      {technicalCollegeData && (
        <div className="">
          {technicalCollegeData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-2">Course Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.course_name}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Enrollment Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8">
                      {data.enrollment_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Graduation Date
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.graduation_date}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">
                      Course Credits
                    </div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.course_credits}
                    </div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 lg:col-span-2">Course Level</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-8 ">
                      {data.course_level}
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

export default TechnicalCollege;
