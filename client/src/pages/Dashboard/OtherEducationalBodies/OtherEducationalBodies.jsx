import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const OtherEducationalBodies = () => {
  const [naitaData, setNaitaData] = useState("");
  const [tvecData, setTvecData] = useState("");
  const [technicalCollegeData, setTechnicalCollegeData] = useState("");
  const [teacherTrainingData, setTeacherTrainingData] = useState("");
  const [ichemData, setIchemData] = useState("");

  const [bgColor, setBgColor] = useState("bg-green-500");
  const [borderColor, setBorderColor] = useState("border-red-400");
  const [nullBackground, setNullBackground] = useState("bg-red-600");

  const params = useParams();
  const nic_number = params.educationNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const naitaResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/naita/receiveByNic`,
          {
            nic_number,
          }
        );
        if (naitaResponse.data.rowCount > 0) {
          setNaitaData(naitaResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const tvecResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/tvec/receiveByNic`,
          {
            nic_number,
          }
        );
        if (tvecResponse.data.rowCount > 0) {
          setTvecData(tvecResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const technicalCollegeResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/technical-college/receiveByNic`,
          {
            nic_number,
          }
        );

        if (technicalCollegeResponse.data.rowCount > 0) {
          setTechnicalCollegeData(technicalCollegeResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const teacherTrainingResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/teacher-training/receiveByNic`,
          {
            nic_number,
          }
        );

        if (teacherTrainingResponse.data.rowCount > 0) {
          setTeacherTrainingData(teacherTrainingResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const ichemResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/ichem/receiveByNic`,
          {
            nic_number,
          }
        );

        if (ichemResponse.data.rowCount > 0) {
          setIchemData(ichemResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        return prevColor === "bg-green-500" ? "bg-blue-500" : "bg-green-500";
      });
    }, 1000);

    const border = setInterval(() => {
      setBorderColor((prevColor) => {
        return prevColor === "border-red-400"
          ? "border-blue-900"
          : "border-red-400";
      });
    }, 1500);

    fetchData();
    return () => {
      clearInterval(interval);
      clearInterval(border);
    };
  }, []);
  return (
    <section className="mx-12 my-12">
      <div className="bg-white lg:grid text-xs grid grid-cols-1 lg:grid-cols-5 p-4 text-gray-950 my-4 gap-2 rounded-lg">
        {/* NAITA DATA */}
        {naitaData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            NAITA
          </div>
        )}
        {!naitaData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            NAITA
          </div>
        )}
        {/* TVEC DATA */}
        {tvecData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            TVEC
          </div>
        )}
        {!tvecData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            TVEC
          </div>
        )}

        {/* TECHNICAL COLLEGE DATA */}
        {technicalCollegeData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            TECHNICAL COLLEGE
          </div>
        )}
        {!technicalCollegeData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            TECHNICAL COLLEGE
          </div>
        )}

        {/* TEACHER TRAINING DATA */}
        {teacherTrainingData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            TEACHER TRAINING COLLEGE
          </div>
        )}
        {!teacherTrainingData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            TEACHER TRAINING COLLEGE
          </div>
        )}

        {/* ICHEM DATA */}
        {ichemData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            ICHEM
          </div>
        )}
        {!ichemData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            ICHEM
          </div>
        )}
      </div>
      <div>
        {naitaData && (
          <div className="">
            <div className="text-lg text-center">NAITA</div>
            {naitaData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    Naita
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
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
                      <div className="col-span-5 lg:col-span-2">Results</div>
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
      <div>
        {tvecData && (
          <div className="">
            <div className="text-lg text-center">TVEC</div>
            {tvecData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    TVEC
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
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
                      <div className="col-span-5 lg:col-span-2">Results</div>
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
      <div>
        {teacherTrainingData && (
          <div className="">
            <div className="text-lg text-center">TEACHER TRAINING</div>
            {teacherTrainingData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    TEACHER TRAINING
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
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
                      <div className="col-span-5 lg:col-span-2">Results</div>
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
      <div>
        {technicalCollegeData && (
          <div className="">
            <div className="text-lg text-center">TECHNICAL COLLEGE</div>
            {technicalCollegeData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    TEACHER TRAINING
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
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
                      <div className="col-span-5 lg:col-span-2">Results</div>
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
      <div>
        {ichemData && (
          <div className="">
            <div className="text-lg text-center">ICHEM</div>
            {ichemData.map((data, key) => {
              const nicIdNumber = data.nic_number;
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 ">
                  <div className="">
                    ICHEM
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">
                        Course Name
                      </div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.course_name}
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
                      <div className="col-span-5 lg:col-span-2">Results</div>
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

export default OtherEducationalBodies;
