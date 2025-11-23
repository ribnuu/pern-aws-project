import person from "../../assets/person3.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const WantedPersons = () => {
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

  const [WantedPersonsData, setWantedPersonsData] = useState([]);

  const [DistrictList, setDistrictList] = useState([]);

  const [DistrictToFilter, setDistrictToFilter] = useState("");

  const [InitialDistrict, setInitialDistrict] = useState("");

  const wantedPersonByNicNumber = async (nic_number) => {
    try {
      const wantedPersonByNicNumberResponseByDistrictId = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveWantedPerson`
      );
      setWantedPersonsData(
        wantedPersonByNicNumberResponseByDistrictId.data.rows
      );
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
          const wantedPersonByNicNumberResponseByDistrictId = await axios.post(
            `http://${server_port}:4000/api/complaint/receiveWantedPersonByDistrictId`,
            {
              district_id: userData.data[0].district_id,
            }
          );
          setWantedPersonsData(
            wantedPersonByNicNumberResponseByDistrictId.data.rows
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const wantedPersonByNicNumberResponseByDistrictId = await axios.post(
            `http://${server_port}:4000/api/complaint/receiveWantedPersonByDistrictId`,
            {
              district_id: DistrictToFilter,
            }
          );
          setWantedPersonsData(
            wantedPersonByNicNumberResponseByDistrictId.data.rows
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    wantedPersonByNicNumber(nic_number);
    fetchUserData(nic_number);
    fetchDistrict();
  }, [DistrictToFilter]);

  return (
    <section>
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
        {WantedPersonsData.map((data, key) => {
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
                    Wanted Persons
                  </h1>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>NIC Number : </span>
                      <p className="text-gray-500">{data.nic_number}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Full Name : </span>
                      <p className="text-gray-500">{data.full_name}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Date Of Birth : </span>
                      <p className="text-gray-500">{data.date_of_birth}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Gender : </span>
                      <p className="text-gray-500">{data.gender}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Nationality : </span>
                      <p className="text-gray-500">{data.nationality}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Height : </span>
                      <p className="text-gray-500">{data.height}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Weight : </span>
                      <p className="text-gray-500">{data.weight}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Hair Color : </span>
                      <p className="text-gray-500">{data.hair_color}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Eye Color : </span>
                      <p className="text-gray-500">{data.eye_color}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Last Known Location : </span>
                      <p className="text-gray-500">
                        {data.last_known_location}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Crime Committed : </span>
                      <p className="text-gray-500">{data.crime_committed}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Reward : </span>
                      <p className="text-gray-500">{data.reward}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Contact Information : </span>
                      <p className="text-gray-500">
                        {data.contact_information}
                      </p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Reported Datetime : </span>
                      <p className="text-gray-500">{data.reported_date_time}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Reported By Entity : </span>
                      <p className="text-gray-500">{data.reported_by_entity}</p>
                    </div>
                  </div>
                </div>
                {/* Other courses... */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-4 px-20">Warranted people from the courts</div>
    </section>
  );
};

export default WantedPersons;
