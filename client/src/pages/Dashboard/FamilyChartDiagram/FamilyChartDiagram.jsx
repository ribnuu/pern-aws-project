import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import { FaChild } from "react-icons/fa";
import { MdMan2 } from "react-icons/md";
import { IoMdMan, IoMdWoman } from "react-icons/io";
import { fetchFamilyChartByNicApi } from "../../../apis/FamilyChartApiService";

const EPFDashboard = () => {
  const [epfData, setEpfData] = useState([]);
  const [epfCount, setEpfCount] = useState(0);

  const [Gender, setGender] = useState("");

  const [SelfData, setSelfData] = useState("");

  const [FatherData, setFatherData] = useState("");
  const [BiologicalFatherNicNumber, setBiologicalFatherNicNumber] =
    useState("");

  const [StepFatherData, setStepFatherData] = useState([]);

  const [StepMotherData, setStepMotherData] = useState([]);

  const [MotherData, setMotherData] = useState("");
  const [BiologicalMotherNicNumber, setBiologicalMotherNicNumber] =
    useState("");

  const [SiblingData, setSiblingData] = useState("");

  const [ChildrenData, setChildrenData] = useState("");

  const params = useParams();
  const nic_number = params.nicNumber;

  const fetchChildren = async (gender) => {
    try {
      const childrenResponse = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveChildren`,
        {
          nic_number,
          gender,
        }
      );
      setChildrenData(childrenResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelf = async () => {
    try {
      const selfResponse = await fetchFamilyChartByNicApi(nic_number);
      fetchChildren(selfResponse.rows[0].citizen_gender);
      setSelfData(selfResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStepMother = async (father_nic_number, biological_mother) => {
    try {
      const stepMotherResponse = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveStepMother`,
        {
          nic_number: father_nic_number,
          bio_mother_nic_number: biological_mother,
        }
      );
      setStepMotherData(stepMotherResponse.data.rows);
      console.log(stepMotherResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStepFather = async (mother_nic_number, biological_father) => {
    try {
      const stepFatherResponse = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveStepFather`,
        {
          nic_number: mother_nic_number,
          bio_father_nic_number: biological_father,
        }
      );
      setStepFatherData(stepFatherResponse.data.rows);
      console.log(stepFatherResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFather = async () => {
    try {
      const fatherRespone = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveFather`,
        {
          nic_number,
        }
      );
      setFatherData(fatherRespone.data.rows);
      setBiologicalFatherNicNumber(fatherRespone.data.rows[0].nic_number);
      fetchStepMother(
        fatherRespone.data.rows[0].nic_number,
        BiologicalFatherNicNumber
      );
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMother = async () => {
    try {
      const motherResponse = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveMother`,
        {
          nic_number,
        }
      );
      setMotherData(motherResponse.data.rows);
      setBiologicalFatherNicNumber(motherResponse.data.rows[0].nic_number);
      fetchStepFather(
        motherResponse.data.rows[0].nic_number,
        BiologicalMotherNicNumber
      );
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSibling = async () => {
    try {
      const siblingResponse = await axios.post(
        `http://${server_port}:4000/api/family-chart/receiveSiblings`,
        {
          nic_number,
        }
      );
      setSiblingData(siblingResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSelf();
    fetchMother();
    fetchFather();
    fetchSibling();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      <div className=" uppercase flex justify-between border-black border rounded-md">
        <div className="mx-auto my-auto text-2xl">Family Chart Diagram</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{epfCount}</span>
          <span className="my-auto">epf(s) received</span>
        </p>
      </div>
      {/* Parents */}

      <div className="flex justify-evenly border border-black rounded-md px-4 py-2 my-4 gap-2">
        {/* Bio Logical Parents */}
        <div className="flex flex-col border border-gray-500 rounded-md">
          <p className="text-center">Biological Parents</p>
          {FatherData && (
            <div className="">
              {FatherData.map((data, key) => {
                let image_component = (
                  <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
                );
                if (data.department_nic_id != null) {
                  image_component = (
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                    />
                  );
                }
                return (
                  <div
                    className="px-2 p-1 grid grid-cols-2 rounded-md"
                    key={key}
                  >
                    {image_component}
                    <div>
                      <p className="text-xs">{data.citizen_code_number}</p>
                      <p className="text-xs">{data.citizen_name}</p>
                      <p className="text-xs">{data.nic_number}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {MotherData && (
            <div className="">
              {MotherData.map((data, key) => {
                let image_component = (
                  <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
                );
                if (data.department_nic_id != null) {
                  image_component = (
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                    />
                  );
                }
                return (
                  <div
                    className="px-2 p-1 grid grid-cols-2 rounded-md"
                    key={key}
                  >
                    {image_component}
                    <div>
                      <p className="text-xs">{data.citizen_code_number}</p>
                      <p className="text-xs">{data.citizen_name}</p>
                      <p className="text-xs">{data.nic_number}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="border border-black rounded-md px-4 my-2">
          {/* Step Parents */}
          <p className="text-center">Step Parents</p>
          <div className="">
            {StepMotherData && (
              <div>
                <p className="text-center">Step Mother</p>

                {StepMotherData && (
                  <div className="grid grid-cols-3 gap-2 border border-black rounded-md">
                    {StepMotherData.map((data, key) => {
                      let image_component = (
                        <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
                      );
                      if (data.department_nic_id != null) {
                        image_component = (
                          <img
                            src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                            className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                          />
                        );
                      }
                      return (
                        <div className=" px-2 p-1 grid grid-cols-2 " key={key}>
                          {image_component}
                          <div>
                            <p className="text-xs">
                              {data.citizen_code_number}
                            </p>
                            <p className="text-xs">{data.citizen_name}</p>
                            <p className="text-xs">{data.nic_number}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {StepFatherData && (
              <div>
                <p className="text-center">Step Father</p>

                {StepFatherData && (
                  <div className="grid grid-cols-3 gap-2 border border-black rounded-md">
                    {StepFatherData.map((data, key) => {
                      let image_component = (
                        <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
                      );
                      if (data.department_nic_id != null) {
                        image_component = (
                          <img
                            src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                            className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                          />
                        );
                      }
                      return (
                        <div className=" px-2 p-1 grid grid-cols-2 " key={key}>
                          {image_component}
                          <div>
                            <p className="text-xs">
                              {data.citizen_code_number}
                            </p>
                            <p className="text-xs">{data.citizen_name}</p>
                            <p className="text-xs">{data.nic_number}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Self Data */}
      <div className="flex gap-2 border border-black rounded-md px-4 py-2 my-4">
        <div></div>
        <div>
          {SelfData && (
            <div className="flex justify-evenly ">
              <div>
                <div>Self</div>
                <div>
                  <img
                    src={`http://${server_port}:4000/images/nic/${SelfData[0].citizen_image_path}`}
                    className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                  />
                </div>
                <p className="text-xs">{SelfData[0].citizen_code_number}</p>
              </div>
            </div>
          )}
        </div>
        <div className="overflow-scroll w-26">
          <div>Siblings</div>
          {SiblingData && (
            <div className="grid grid-cols-3 gap-2">
              {SiblingData.map((data, key) => {
                let image_component = (
                  <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
                );
                if (data.department_nic_id != null) {
                  image_component = (
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                    />
                  );
                }
                return (
                  <div
                    className="border border-black px-2 p-1 grid grid-cols-2 rounded-md"
                    key={key}
                  >
                    {image_component}
                    <div>
                      <p className="text-xs">{data.citizen_code_number}</p>
                      <p className="text-xs">{data.baby_name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Children Data */}
      <div className="flex justify-between border border-black rounded-md py-2">
        {ChildrenData && (
          <div className="grid grid-cols-3 gap-2 first-letter w-full">
            {ChildrenData.map((data, key) => {
              let image_component = (
                <FaChild className="bg-red-500 lg:w-24 lg:h-24 w-24 h-32 object-cover rounded-md p-4" />
              );
              if (data.department_nic_id != null) {
                image_component = (
                  <img
                    src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                    className="lg:w-24 lg:h-24 w-24 h-32 object-cover  rounded-md"
                  />
                );
              }
              return (
                <div
                  className="border border-black px-2 p-1 grid grid-cols-2 rounded-md"
                  key={key}
                >
                  {image_component}
                  <div>
                    <p className="text-xs">{data.citizen_code_number}</p>
                    <p className="text-xs">{data.baby_name}</p>
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

export default EPFDashboard;
