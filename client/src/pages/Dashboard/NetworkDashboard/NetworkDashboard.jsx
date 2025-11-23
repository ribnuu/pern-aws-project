import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const NetworkDashboard = () => {
  const [networkData, setNetworkData] = useState("");
  const [networkCount, setNetworkCount] = useState(0);

  const params = useParams();
  const nic_number = params.networkNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const networkResponse = await axios.post(
          `http://${server_port}:4000/api/network/receiveByNic`,
          {
            nic_number,
          }
        );
        setNetworkData(networkResponse.data.rows);
        setNetworkCount(networkResponse.data.rowCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-gray-950 uppercase border-2 flex justify-between border-white rounded-lg">
        <div className="mx-auto my-auto text-2xl">MOBILE NETWORKS RECORDS </div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{networkCount}</span>
          <span className="my-auto">networks(s) connected</span>
        </p>
      </div>
      <div>
        {networkData && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {networkData.map((data, key) => {
              return (
                <div
                  className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base"
                  key={key}
                >
                  <div className="lg:grid lg:grid-cols-2">
                    <div className="rounded-lg my-auto  ">
                      <img
                        src={`http://localhost:4000${data.network_image_path}`}
                        className="lg:w-44 lg:h-44  border-2 border-black w-32 h-32 object-contain ml-12 rounded-lg"
                      />
                    </div>
                    <div className="my-auto">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Mob No.</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.phone_number}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Sim No.</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.sim_number}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 lg:col-span-3">Reg at</div>
                        <div className=""> |</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.registered_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Bought</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.bought_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Network</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.network_name}
                        </div>
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

export default NetworkDashboard;
