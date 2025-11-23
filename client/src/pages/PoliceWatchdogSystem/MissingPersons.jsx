import axios from "axios";
import { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MissingPersons = () => {
  const [formData, setformData] = useState({
    district_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDistrictToFilter(value);
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [MissingPersonData, setMissingPersonData] = useState([]);

  const [DistrictList, setDistrictList] = useState([]);

  const [DistrictToFilter, setDistrictToFilter] = useState("");

  const [InitialDistrict, setInitialDistrict] = useState("");

  const missingPersonByNicNumber = async (nic_number) => {
    if (DistrictToFilter == "") {
    } else {
      try {
        const missingPersonByNicNumberResponseByDistrictId = await axios.post(
          `http://${server_port}:4000/api/complaint/receiveMissingPersonByDistrictId`,
          {
            district_id: DistrictToFilter,
          }
        );
        setMissingPersonData(
          missingPersonByNicNumberResponseByDistrictId.data.rows
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchDistrict = async () => {
    try {
      const fetchDistrictResponse = await axios.post(
        `http://${server_port}:4000/police/master-police/getDistricts`
      );
      setDistrictList(fetchDistrictResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async (nic_number) => {
    try {
      const userData = await axios.post(
        `http://${server_port}:4000/api/nic/receiveAllData`,
        {
          nic_number,
        }
      );
      console.log(userData.data[0].district_id);
      setInitialDistrict(userData.data[0].district_id);
      if (DistrictToFilter == "") {
        try {
          const missingPersonByNicNumberResponseByDistrictId = await axios.post(
            `http://${server_port}:4000/api/complaint/receiveMissingPersonByDistrictId`,
            {
              district_id: userData.data[0].district_id,
            }
          );
          setMissingPersonData(
            missingPersonByNicNumberResponseByDistrictId.data.rows
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    missingPersonByNicNumber(nic_number);
    fetchUserData(nic_number);
    fetchDistrict();
  }, [DistrictToFilter]);

  return (
    <section className="">
      <form onSubmit={() => {}}>
        <div className=" mb-6  bg-white text-black rounded-md">
          <div>
            {DistrictList && (
              <div className="">
                <div>
                  <select
                    id="role"
                    className="select w-full bg-white border border-black rounded-md  "
                    name="component_pages_id"
                    value={formData.district_id}
                    onChange={handleChange}
                    required
                  >
                    <option selected="">Select District</option>
                    {DistrictList.map((data, key) => {
                      return (
                        <option value={data.district_id} key={key}>
                          {data.district_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="grid md:grid-cols-5 gap-4">
        {MissingPersonData.map((data, key) => {
          console.log(data);
          return (
            <div className="rounded-md items-center text-center" key={key}>
              <div className="md:grid gap-5 space-y-4 md:space-y-0">
                <div className="px-1 pb-2 rounded-md shadow-lg transform hover:scale-105 transition duration-500 border border-black text-xs ">
                  <div className="mt-1">
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-48 lg:h-64 w-24 h-32 object-cover mx-auto rounded-md justify-center"
                      alt="Colors"
                    />
                  </div>
                  <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                    Missing Person
                  </h1>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Person Name : </span>
                      <p className="text-gray-500">
                        {data.missing_person_name}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Person Last Seen Date Time : </span>
                      <p className="text-gray-500">
                        {data.last_seen_date_time}
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Person Last Seen Location : </span>
                      <p className="text-gray-500">{data.last_seen_location}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Lost Date Time : </span>
                      <p className="text-gray-500">{data.lost_date_time}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Person Description : </span>
                      <p className="text-gray-500">
                        {data.missing_person_description}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Missing Person NIC Number : </span>
                      <p className="text-gray-500">
                        {data.missing_person_nic_number}
                      </p>
                    </div>

                    <div className=" space-x-1 items-center my-2">
                      <span>Reported NIC Number : </span>
                      <p className="text-gray-500">
                        {data.reported_nic_number}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Other courses... */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MissingPersons;
