import axios from "axios";
import { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MissingPets = () => {
  const [MissingPetsData, setMissingPetsData] = useState([]);

  const missingPetsByNicNumber = async (nic_number) => {
    try {
      const missingPetsByNicNumberResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMissingPets`
      );
      setMissingPetsData(missingPetsByNicNumberResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let nic_number = localStorage.getItem("nic_number");
    missingPetsByNicNumber(nic_number);
  }, []);

  return (
    <section className="">
      <form onSubmit={() => {}}>
        <div className="relatie z-0 w-full mb-6 group bg-white text-black flex justify-around rounded-lg px-2 py-2 mx-12 my-12">
          <div>
            <label>Choose District : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a district --{" "}
              </option>
              <option value="Colombo">Colombo</option>
              <option value="Ratmalana">Ratmalana</option>
              <option value="Wattala">Wattala</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Gampaha">Gampaha</option>
            </select>
          </div>
          <div>
            <label>Choose Province : </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select a province --{" "}
              </option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="Southern">Southern</option>
            </select>
          </div>
        </div>
      </form>
      <div className="grid lg:grid-cols-3 gap-4 w-full">
        {MissingPetsData.map((data, key) => {
          console.log(data);
          return (
            <div className="mx-auto border border-black rounded-md flex justify-center justify-self-center items-center min-h-screen py-4 my-auto">
              <div className="md:px-20 md:grid gap-5 space-y-4 md:space-y-0">
                <div className="max-w-sm bg-white px-1 pb-2 rounded-md shadow-lg transform hover:scale-105 transition duration-500 border border-black text-xs ">
                  <div className="relative">
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-48 lg:h-64 w-24 h-32 object-cover rounded-md justify-self-center"
                      alt="Colors"
                    />
                  </div>
                  <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                    Missing Pets
                  </h1>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Owner NIC Number : </span>
                      <p className="text-gray-500">{data.owner_nic_number}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Pet Name : </span>
                      <p className="text-gray-500">{data.pet_name}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Pet Age : </span>
                      <p className="text-gray-500">{data.pet_age}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Pets Address : </span>
                      <p className="text-gray-500">{data.pet_address}</p>
                    </div>
                  </div>
                  <div className="my-2">
                    {/* Course details */}
                    <div className=" space-x-1 items-center my-2">
                      <span>Animal Type : </span>
                      <p className="text-gray-500">{data.animal_type}</p>
                    </div>
                    <div className=" space-x-1 items-center my-2">
                      <span>Breed : </span>
                      <p className="text-gray-500">{data.bread}</p>
                    </div>
                  </div>
                </div>
                {/* Other courses... */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-4 px-20">
        Whenever a new case comes up , particular icon will light up with audio
        alarm. If there is a Pets missing match found, the missing Pets tab will
        blink with audio alarm. At same time , if a critical arise , that
        critical case [PEH] will also blink similarly
      </div>
    </section>
  );
};

export default MissingPets;
