import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ChildrenTuitionDashboard = () => {
  const [tuitionData, setTuitionData] = useState([]);
  const [epfCount, setEpfCount] = useState(0);

  const params = useParams();
  const nic_number = params.nicNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tuitionResponse = await axios.post(
          `http://${server_port}:4000/api/tuition/receiveTuitionChildByNic`,
          {
            nic_number,
          }
        );
        console.log(tuitionResponse.data.rows[0]);
        setTuitionData(tuitionResponse.data.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      <div className="border border-black uppercase flex justify-between rounded-md">
        <div className="mx-auto my-auto text-2xl">Children Tuition</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{epfCount}</span>
          <span className="my-auto">epf(s) received</span>
        </p>
      </div>
      {tuitionData && (
        <div className="grid lg:grid-cols-2 gap-4">
          {tuitionData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="border border-black text-black px-4 py-2 rounded-md text-xs md:text-base my-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 ">Child Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 ">{data.baby_name}</div>
                  </div>
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 ">Tutor Name</div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 ">{data.citizen_name}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Tutory / Institute Name</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 ">{data.tutory_name}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Subject</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  ">{data.subject}</div>
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

export default ChildrenTuitionDashboard;
