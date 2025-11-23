import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import { useEffect, useState } from "react";

const HousemaidView = () => {
  const [HousemaidData, setHousemaidData] = useState([]);

  const housemaidByNICNumber = async (nic_number) => {
    try {
      const housemaidByNICNumberResponse = await axios.post(
        `http://${server_port}:4000/api/Housemaid/ViewHousemaid`,
        {
          nic_number,
        }
      );

      setHousemaidData(housemaidByNICNumberResponse.data.rows);
      console.log(housemaidByNICNumberResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    housemaidByNICNumber(nic_number);
  }, []);

  return (
    <section className="mx-12 my-12">
      <div className="">
        {HousemaidData && (
          <div className="grid lg:grid-cols-3 gap-4">
            {HousemaidData.map((data, key) => (
              <div
                className="bg-gray-200 p-4 text-black text-sm w-102 rounded-lg flex space-between gap-6"
                key={key}
              >
                <div className="rounded-lg w-auto h-auto">
                  {/* <img src={vehicle} className='h-[100px] w-[120px]'/> */}
                </div>
                <div className="my-4">
                  <div className="flex gap-2">
                    <div>NIC Number :</div>
                    <div>{data.nic_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Employer NIC Number :</div>
                    <div>{data.employer_nic}</div>
                  </div>
                  <div className="flex gap-2">
                    <div> Start Date :</div>
                    <div>{data.start_date}</div>
                  </div>
                  <div className="flex gap-2">
                    <div>Registered Date :</div>
                    <div>{data.registered_date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default HousemaidView;
