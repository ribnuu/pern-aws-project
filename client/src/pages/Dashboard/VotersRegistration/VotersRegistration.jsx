import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVoterByNicApi } from "../../../apis/VoterApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const VotersRegistration = () => {
  const [voterData, setVoterData] = useState("");
  const [voterCount, setVoterCount] = useState(0);

  const params = useParams();
  const nic_number = params.voterNumber;
  console.log(nic_number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voterResponse = await getVoterByNicApi({
          nic_number: nic_number,
        });
        setVoterData(voterResponse.rows);
        setVoterCount(voterResponse.rowCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">VOTERS REGISTRATION</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{voterCount}</span>
          <span className="my-auto">votes(s) eligibility</span>
        </p>
      </div>
      {voterData && (
        <div className="">
          {voterData.map((data, key) => {
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-gray-950 gap-12 p-2 flex relative rounded-lg text-xs lg:text-lg my-16"
                key={key}
              >
                <div className="grid grid-cols-2">
                  <div className="rounded-lg my-auto ">
                    <img
                      src={`http://localhost:4000${data.voter_image_path}`}
                      className="lg:w-44 lg:h-60 w-24 h-32 object-cover -my-16 ml-4 rounded-lg"
                    />
                  </div>
                  <div className="mx-auto my-auto">
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">NIC</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.nic_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Name</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.voter_name}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Address</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.voter_address}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Gender</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.voter_gender}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">District</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.voter_district}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Constituency</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.voter_constituency}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Polling Divison</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">
                        {data.voter_polling_booth}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Year</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.year}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">PD Number</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.pd_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Serial Number</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.serial_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-5">Admin District</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-6">{data.admin_district}</div>
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

export default VotersRegistration;
