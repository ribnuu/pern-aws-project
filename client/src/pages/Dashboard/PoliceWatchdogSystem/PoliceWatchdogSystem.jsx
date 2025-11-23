import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMissingPetListByNicApi,
  fetchMissingVehicleListByNicApi,
  recieveDevicesListByNicApi,
} from "../../../apis/PoliceWatchDogSystemApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const PoliceWatchdogSystem = () => {
  const [MyDevicesData, setMyDevicesData] = useState("");
  const [missingPetData, setMissingPetData] = useState("");
  const [missingVehicleData, setMissingVehicleData] = useState("");
  const [wantedPersonData, setWantedPersonData] = useState("");
  const [blackListedPhoneData, setBlackListedPhoneData] = useState("");
  const [policeEmergencyHandlerData, setPoliceEmergencyHandlerData] =
    useState("");
  const [numberPlateMismatchData, setNumberPlateMismatchData] = useState("");
  const [abnormalCrowdDetectionData, setAbnormalCrowdDetectionData] =
    useState("");
  const [unavailableNumberPlateData, setUnavailableNumberData] = useState("");
  const [missingListOtherItemsData, setMissingListOtherItemsData] =
    useState("");
  const [suspectedDeviceRegistrationData, setSuspectedDeviceRegistrationData] =
    useState("");
  const [suspectedTreasureHuntersData, setSuspectedTreasureHuntersData] =
    useState("");
  const [riotsForecastSystemData, setRiotsForecastSystemData] = useState("");
  const [findRequirementListData, setFindRequirementListData] = useState("");
  const [entryBanDetectionData, setEntryBanDetectionData] = useState("");

  const [bgColor, setBgColor] = useState("bg-green-500");
  const [borderColor, setBorderColor] = useState("border-red-400");
  const [nullBackground, setNullBackground] = useState("bg-red-600");
  const params = useParams();
  const nic_number = params.policeWatchdogNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const MyDevicesResponse = await recieveDevicesListByNicApi(nic_number);
        if (MyDevicesResponse.rowCount > 0) {
          setMyDevicesData(MyDevicesResponse.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const missingPetResponse = await fetchMissingPetListByNicApi(
          nic_number
        );
        if (missingPetResponse.rowCount > 0) {
          setMissingPetData(missingPetResponse.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const missingVehicleResponse = await fetchMissingVehicleListByNicApi(
          nic_number
        );
        if (missingVehicleResponse.rowCount > 0) {
          setMissingVehicleData(missingVehicleResponse.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const wantedPersonResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveWantedPersonListByNic`,
          {
            nic_number,
          }
        );
        if (wantedPersonResponse.data.rowCount > 0) {
          setWantedPersonData(wantedPersonResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const blackListedResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveBlackListedPhonesListByNic`,
          {
            nic_number,
          }
        );
        if (blackListedResponse.data.rowCount > 0) {
          setBlackListedPhoneData(blackListedResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const policeEmergencyHandlerResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveEmergencyHandlerByNic`,
          {
            nic_number,
          }
        );
        if (policeEmergencyHandlerResponse.data.rowCount > 0) {
          setPoliceEmergencyHandlerData(
            policeEmergencyHandlerResponse.data.rows
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const missingOtherItemsResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveMissingOtherItemsListByNic`,
          {
            nic_number,
          }
        );
        if (missingOtherItemsResponse.data.rowCount > 0) {
          setMissingListOtherItemsData(missingOtherItemsResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const entryBanDetectionResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiventryBanDetectionByNic`,
          {
            nic_number,
          }
        );
        if (entryBanDetectionResponse.data.rowCount > 0) {
          setEntryBanDetectionData(entryBanDetectionResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const numberPlateMismatchResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveNumberPlateMismatchByNic`,
          {
            nic_number,
          }
        );
        if (numberPlateMismatchResponse.data.rowCount > 0) {
          setNumberPlateMismatchData(numberPlateMismatchResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const unavailableNumberPlateResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveUnavailableNumberPlateByNic`,
          {
            nic_number,
          }
        );
        if (unavailableNumberPlateResponse.data.rowCount > 0) {
          setUnavailableNumberData(unavailableNumberPlateResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const finRequirementListResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveFindPersonOrVehicleByNic`,
          {
            nic_number,
          }
        );
        if (finRequirementListResponse.data.rowCount > 0) {
          setFindRequirementListData(finRequirementListResponse.data.rows);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const abnormalCrowdDetectionResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveAbnormalCrowdDetectionByNic`,
          {
            nic_number,
          }
        );
        if (abnormalCrowdDetectionResponse.data.rowCount > 0) {
          setAbnormalCrowdDetectionData(
            abnormalCrowdDetectionResponse.data.rows
          );
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const suspectedTreasureHuntersResponse = await axios.post(
          `http://${server_port}:4000/api/police-watch-dog-system-nse/receiveSuspectedTreasureHuntersByNic`,
          {
            nic_number,
          }
        );
        if (suspectedTreasureHuntersResponse.data.rowCount > 0) {
          setSuspectedTreasureHuntersData(
            suspectedTreasureHuntersResponse.data.rows
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        return prevColor === "bg-green-500" ? "bg-blue-500" : "bg-green-500";
      });
    }, 1000);

    const border = setInterval(() => {
      setBorderColor((prevColor) => {
        return prevColor === "border-red-400"
          ? "border-blue-900"
          : "border-red-400";
      });
    }, 1500);

    fetchData();
    return () => {
      clearInterval(interval);
      clearInterval(border);
    };
  }, []);

  return (
    <section className="mx-12 lg:my-12 my-8">
      <div className="bg-white lg:grid text-xs grid grid-cols-1 lg:grid-cols-3 p-4 text-gray-950 my-4 gap-2 rounded-lg uppercase">
        {/* Missing Person DATA */}
        {MyDevicesData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            MPL - Missing Person
          </div>
        )}
        {!MyDevicesData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            MPL - Missing Person List
          </div>
        )}

        {/* Missing Pets Data */}
        {missingPetData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            MLP - MISSING LIST OF PETS
          </div>
        )}
        {!missingPetData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            MLP - MISSING LIST OF PETS
          </div>
        )}

        {/* Missing Vehicle Data */}
        {missingVehicleData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            MVL - MISSING VEHICLE LIST
          </div>
        )}
        {!missingVehicleData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            MVL - MISSING VEHICLE LIST
          </div>
        )}

        {/* WPL - WANTED PERSONS LIST */}
        {wantedPersonData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            WPL - WANTED PERSONS LIST
          </div>
        )}
        {!wantedPersonData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            WPL - WANTED PERSONS LIST
          </div>
        )}

        {/* BPL - BLACKLISTED PHONES LIST */}
        {blackListedPhoneData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            BPL - BLACKLISTED PHONES LIST
          </div>
        )}
        {!blackListedPhoneData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            BPL - BLACKLISTED PHONES LIST
          </div>
        )}

        {/* PEH - POLICE EMERGENCY HANDLER */}
        {policeEmergencyHandlerData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            PEH - POLICE EMERGENCY HANDLER
          </div>
        )}
        {!policeEmergencyHandlerData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            PEH - POLICE EMERGENCY HANDLER
          </div>
        )}

        {/*NPM - NUMBER PLATE MISMATCH */}
        {numberPlateMismatchData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            NPM - NUMBER PLATE MISMATCH
          </div>
        )}
        {!numberPlateMismatchData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            NPM - NUMBER PLATE MISMATCH
          </div>
        )}

        {/*ACD - ABNORMAL CROWD DETECTION */}
        {abnormalCrowdDetectionData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            ACD - ABNORMAL CROWD DETECTION
          </div>
        )}
        {!abnormalCrowdDetectionData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            ACD - ABNORMAL CROWD DETECTION
          </div>
        )}

        {/*UNP - UNAVAILABLE NUMBER PLATE */}
        {unavailableNumberPlateData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            UNP - UNAVAILABLE NUMBER PLATE
          </div>
        )}
        {!unavailableNumberPlateData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            UNP - UNAVAILABLE NUMBER PLATE
          </div>
        )}

        {/*MLO - MISSING LIST OTHER ITEMS */}
        {missingListOtherItemsData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            MLO - MISSING LIST OTHER ITEMS
          </div>
        )}
        {!missingListOtherItemsData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            MLO - MISSING LIST OTHER ITEMS
          </div>
        )}

        {/*SDR - SUSPECTED DEVICE REGISTRATION */}
        {suspectedDeviceRegistrationData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            SDR - SUSPECTED DEVICE REGISTRATION
          </div>
        )}
        {!suspectedDeviceRegistrationData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            SDR - SUSPECTED DEVICE REGISTRATION
          </div>
        )}

        {/*STH - SUSPECTED TREASURE HUNTERS */}
        {suspectedTreasureHuntersData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            STH - SUSPECTED TREASURE HUNTERS
          </div>
        )}
        {!suspectedTreasureHuntersData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            STR - SUSPECTED TREASURE HUNTERS
          </div>
        )}

        {/* RFS - RIOTS FORECAST SYSTEM */}
        {riotsForecastSystemData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            RFS - RIOTS FORECAST SYSTEM
          </div>
        )}
        {!riotsForecastSystemData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            RFS - RIOTS FORECAST SYSTEM
          </div>
        )}

        {/* FRL - FIND REQUIREMENT LIST */}
        {findRequirementListData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            FRL - FIND REQUIREMENT LIST
          </div>
        )}
        {!findRequirementListData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            FRL - FIND REQUIREMENT LIST
          </div>
        )}

        {/* EBD - ENTRY BAN DETECTION */}
        {entryBanDetectionData && (
          <div
            className={`${bgColor} border-4 border-gray-900 px-4 py-2 text-white rounded-lg`}
            target="_blank"
          >
            EBD - ENTRY BAN DETECTION
          </div>
        )}
        {!entryBanDetectionData && (
          <div
            className={` ${nullBackground} border-4 border-gray-900 px-4 py-2 rounded-lg`}
          >
            EBD - ENTRY BAN DETECTION
          </div>
        )}
      </div>

      {/* Missing Person List */}
      <div>
        {MyDevicesData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              MISSING PERSON - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {MyDevicesData.map((data, key) => {
                const nicIdNumber = data.nic_number;
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Height</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.height}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Weight</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.weight}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Hair Color
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.hair_color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Eye Color
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.eye_color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Last seen location
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.last_seen_location}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date Last Seen
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_last_seen}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Circumstances
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.circumstances}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contact Info.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="flex gap-2 bg-slate-200 border-x-2 border-b-4 border-red-400  -mx-4 -mb-2 py-2 px-2 rounded-b-lg">
                        <div className=" ">{data.additional_details}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Missing Pet List */}
      <div>
        {missingPetData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              MISSING PET - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {missingPetData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Pet Name</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.pet_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Species</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.species}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Breed</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.breed}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Color</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date Last Seen
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_last_seen}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Circumstances
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.circumstances}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contact Info.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Additional Details
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.additional_details}
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

      {/* Missing Vehicle List */}
      <div>
        {missingVehicleData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              MISSING VEHICLE - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {missingVehicleData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          License Plate
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.license_plate_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Color</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.vehicle_color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Make / Model
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.vehicle_make} / {data.vehicle_model}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date Last Seen
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_last_seen}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Circumstances
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.circumstances}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contact Info.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Additional Details
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.additional_details}
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

      {/* Wanted Person List */}
      <div>
        {wantedPersonData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Wanted Person List - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {wantedPersonData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Nationality
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.nationality}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Height</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.height}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Weight</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.weight}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Hair color
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.hair_color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Eye color
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.eye_color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Crime Committed
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.crime_committed}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Reported Date time
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_date_time}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Reported By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_by_entity}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contact Info.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Reward</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reward}
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

      {/* BlackListed List */}
      <div>
        {blackListedPhoneData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Black Listed Phones - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {blackListedPhoneData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Brand</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.brand}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Model</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.model}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Color</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.color}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Date</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_of_blacklist}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Reason </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reason}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contact Info.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lost Location
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.lost_location}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          IMEI Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.imei_number}
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

      {/* Police Emergenecy List */}
      <div>
        {policeEmergencyHandlerData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Police Emergency Handler - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {policeEmergencyHandlerData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Handler Code
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.emergency_handler_code}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Location</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.location}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Cause</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.cause}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Description
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.description}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Contacted Time{" "}
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contacted_datetime}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Network Name
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.network_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Phone No.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.phone_number}
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

      {/* Number Plate Mismatch List */}
      <div>
        {numberPlateMismatchData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Number Plate Mismatch - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {numberPlateMismatchData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Vehicle Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.vehicle_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Reported By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_by}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Location 1
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.location1}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Datetime 1
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.datetime1}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Location 2
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.location2}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Datetime 2
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.datetime2}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Camera 1 Serial No.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.camera_identification1}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Camera 2 Serial No.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.camera_identification2}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Suspicious Desc.
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.description}
                        </div>
                      </div>
                    </div>
                    <div>
                      Suspicious Description.For example , if AAA-1133. This
                      vehicle is going for license renewal at 10. Emission test
                      at 11. But at 12 they are in Jaffna roundabout. Which got
                      caught in the camera. How within one hour the vehicle went
                      from colombo to jaffna in 1 hour. So description will was
                      at these places at these times
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Abnormal Crowd Detection List */}
      <div>
        {abnormalCrowdDetectionData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Abnormal Crowd Detction - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {abnormalCrowdDetectionData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Location Latitude
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.abnormal_crowd_latitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Location Longitude
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.abnormal_crowd_longitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date time
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.abnormal_crowd_datetime}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          No. of people
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.abnormal_crowd_no_of_people}
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

      {/* Unavailable Number Plate List */}
      <div>
        {unavailableNumberPlateData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Unavailable Number Plate - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {unavailableNumberPlateData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Vehicle Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.number_plate}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Reported By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_by}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">Latitude</div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.latitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Longitude
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.longitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date Time
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_datetime}
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

      {/* Missing Other Items List */}
      <div>
        {missingListOtherItemsData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Missing Other Items LIST - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {missingListOtherItemsData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Item Name
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.item_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Description
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.description}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Missing Date
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_missing}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lodged By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lost Location
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.lost_location}
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

      {/* Suspected Treasure Hunters List */}
      <div>
        {suspectedTreasureHuntersData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Suspected Treasure Hunters - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {suspectedTreasureHuntersData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Treasure Latitude
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.treasure_latitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Treasure Longitude
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.treasure_longitude}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Date time
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.treasure_datetime}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Identified By - Camera
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.treasure_suspect_detected_camera}
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

      {/* Missing Other Items List */}
      <div>
        {missingListOtherItemsData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Missing Other Items LIST - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {missingListOtherItemsData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Item Name
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.item_name}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Description
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.description}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Missing Date
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.date_missing}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lodged By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.contact_information}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lost Location
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.lost_location}
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

      {/* Find Requirement List */}
      <div>
        {findRequirementListData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Find Requirement List - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {findRequirementListData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lookout begin date
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.lookout_begin_on_date}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lookout Performed By
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.lookout_performed_by}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Lookout for which case
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.lookout_for_which_case}
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

      {/* Entry Ban Detection */}
      <div>
        {entryBanDetectionData && (
          <div className="">
            <div className="lg:text-2xl text-md text-center my-8 rounded-lg border-2 border-white bg-black uppercase">
              Entry Ban Detection - {nic_number}
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              {entryBanDetectionData.map((data, key) => {
                return (
                  <div
                    className="bg-white text-black px-4 py-2 rounded-xl text-xs md:text-base my-2 "
                    key={key}
                  >
                    <div className="">
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Passport Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7">
                          {data.passport_number}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Reported by
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.reported_by}
                        </div>
                      </div>
                      <div className="grid-cols-12 grid">
                        <div className="col-span-5 lg:col-span-3">
                          Case Number
                        </div>
                        <div className="">|</div>
                        <div className="col-span-6 lg:col-span-7 ">
                          {data.case_number}
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

export default PoliceWatchdogSystem;
