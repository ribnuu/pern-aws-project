import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const TeacherTraining = () => {
  const [teacherTrainingData, setTeacherTrainingData] = useState("");
  const [teacherTrainingCount, setTeacherTrainingCount] = useState(0);

  const params = useParams();
  const nic_number = params.teacherTrainingNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherTrainingResponse = await axios.post(
          `http://${server_port}:4000/api/teacher-training/receiveByNic`,
          {
            nic_number,
          }
        );
        setTeacherTrainingCount(teacherTrainingResponse.data.rowCount);
        setTeacherTrainingData(teacherTrainingResponse.data.rows);
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
          <span className="text-5xl mx-2">{teacherTrainingCount}</span>
          <span className="my-auto">course(s)</span>
        </p>
      </div>
      {teacherTrainingData && (
        <div className="">
          {teacherTrainingData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-12"
                key={key}
              >
                <div className="grid w-max">
                  <div className="mx-auto my-auto">
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Name</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.course_name}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Enrollment</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.enrollment_date}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Graduated</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.graduation_date}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Credits</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.course_credits}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Course Level</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.course_level}</div>
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

export default TeacherTraining;
