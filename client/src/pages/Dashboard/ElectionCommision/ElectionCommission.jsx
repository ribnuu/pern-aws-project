import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const ElectionCommission = () => {
  const [electionData, setElectionData] = useState("");
  const [electionCount, setElectionCount] = useState(0);

  const params = useParams();
  const nic_number = params.electionNumber;
  console.log(nic_number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electionResponse = await axios.post(
          `http://${server_port}:4000/api/election/receiveByNic`,
          {
            nic_number,
          }
        );
        setElectionData(electionResponse.data.rows);
        setElectionCount(electionResponse.data.rowCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="mx-12 lg:my-12 my-8">
        <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
          <div className="mx-auto my-auto text-2xl">ELECTION COMMISSION</div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{electionCount}</span>
            <span className="my-auto">election(s) contested</span>
          </p>
        </div>
        {electionData && (
          <div className="">
            {electionData.map((data, key) => {
              console.log;
              const nicIdNumber = data.nic_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg text-xs lg:text-lg my-2"
                  key={key}
                >
                  <div className="grid grid-cols-2">
                    <div className="rounded-lg my-auto  ">
                      <img
                        src={`http://localhost:4000${data.party_logo_path}`}
                        className="lg:w-44 lg:h-44  border-2 border-black w-32 h-32 object-contain ml-12 rounded-lg"
                      />
                    </div>
                    <div className="mx-auto my-auto">
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Name</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.contester_name}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Address</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.contester_address}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">DOB</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.contester_dob}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Constituency</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.contester_constituency}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Party</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">{data.party_name}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Preferential Number</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.preferential_number}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Election year</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.election_year}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-5">Election Type</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-6">
                          {data.election_type}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default ElectionCommission;
