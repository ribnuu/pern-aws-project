import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBirthParentsByNic,
  fetchMarriageCertificateByNicApi,
} from "../../../apis/BirthApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const BirthMarriageDeath = () => {
  const [birthData, setBirthData] = useState([]);
  const [MarriageData, setMarriageData] = useState([]);
  const [epfCount, setEpfCount] = useState(0);

  const params = useParams();
  const nic_number = params.nicNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const birthResponse = await fetchBirthParentsByNic(nic_number);
        console.log(birthResponse.rows[0]);
        setBirthData(birthResponse.rows);
      } catch (error) {
        console.error(error);
      }

      try {
        const marriageResponse = await fetchMarriageCertificateByNicApi(
          nic_number
        );
        console.log(marriageResponse.rows[0]);
        setMarriageData(marriageResponse.rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      <div>
        {birthData && (
          <div>
            <div className="border border-black uppercase flex justify-between rounded-md">
              <div className="mx-auto my-auto text-2xl">Birth</div>
              <p className="mx-4 text-right">
                <span className="text-5xl mx-2">{epfCount}</span>
                <span className="my-auto">epf(s) received</span>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {birthData.map((data, key) => {
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
                        <div className="col-span-5 ">
                          Child Citizen Code Number
                        </div>
                        <div className="ml-8"> |</div>
                        <div className="col-span-6 ">
                          {data.citizen_code_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 ">Father Nic Number</div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 ">
                          {data.father_nic_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 ">Mother Nic Number</div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6  ">
                          {data.mother_nic_number}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div>
        {MarriageData && (
          <div>
            <div className="border border-black uppercase flex justify-between rounded-md">
              <div className="mx-auto my-auto text-2xl">
                Marriage Certificate
              </div>
              <p className="mx-4 text-right">
                <span className="text-5xl mx-2">{epfCount}</span>
                <span className="my-auto">epf(s) received</span>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {MarriageData.map((data, key) => {
                const nicIdNumber = data.nic_number;
                return (
                  <div
                    className="border border-black text-black px-4 py-2 rounded-md text-xs md:text-base my-2"
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 ">Bride Nic Number</div>
                        <div className="ml-8"> |</div>
                        <div className="col-span-6 ">
                          {data.bride_nic_number}
                        </div>
                      </div>
                      <div className="grid-cols-12  grid text-md">
                        <div className="col-span-5 ">Groom Nic Number</div>
                        <div className="ml-8"> |</div>
                        <div className="col-span-6 ">
                          {data.groom_nic_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 ">
                          Witness One Nic Number
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6 ">
                          {data.witness_one_nic_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 ">
                          Witness Two Nic Number
                        </div>
                        <div className="ml-8">|</div>
                        <div className="col-span-6  ">
                          {data.witness_two_nic_number}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BirthMarriageDeath;
