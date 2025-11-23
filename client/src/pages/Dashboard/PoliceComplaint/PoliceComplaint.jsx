import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recievePassportMissingDataByReportedByApi } from "../../../apis/PassportService";
import {
  fetchComplaintAssaultByNicApi,
  fetchComplaintAssaulterByNicApi,
  fetchComplaintDevicesByNicApi,
  fetchComplaintMissingLicenseByNicApi,
} from "../../../apis/ComplaintApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const PoliceComplaint = () => {
  // Missing Nic
  const [complaintMissingNicData, setComplaintMissingNicData] = useState([]);
  const [NicDataReportedBy, setNicDataReportedBy] = useState([]);

  //Missing Passport
  const [MissingPassportByReportedBy, setMissingPassportByReportedBy] =
    useState([]);
  const [MissingPassortByPassNumber, setMissingPassortByPassNumber] = useState(
    []
  );
  const [MissingPassportByNicNumber, setMissingPassportByNicNumber] = useState(
    []
  );

  //Missing License
  const [MissingLicenseReportedBy, setMissingLicenseReportedBy] = useState([]);
  const [MissingLicenseByNicNumber, setMissingLicenseByNicNumber] = useState(
    []
  );

  // Missing Vehicle
  const [MissingNicReportedBy, setMissingNicReportedBy] = useState([]);

  //Missing Person

  const [MyDevicesReportedBy, setMyDevicesReportedBy] = useState([]);
  const [MyDevicesByNicNumber, setMyDevicesByNicNumber] = useState([]);

  //MissingPets
  const [MissingPetsByNic, setMissingPetsByNic] = useState([]);

  //Missing Vehicle
  const [MissingVehicleByNiC, setMissingVehicleByNiC] = useState([]);

  // Missing Assault and Assaulter
  const [complaintAssaultData, setComplaintAssaultData] = useState([]);
  const [complaintAssaulterData, setComplaintAssaulterData] = useState([]);

  const params = useParams();
  const nic_number = params.nicNumber;

  const missingNicDataByNicNumber = async () => {
    try {
      const missingNicResponse = await axios.post(
        `http://${server_port}:4000/api/nic/receiveMissingData`,
        {
          nic_number,
        }
      );
      setComplaintMissingNicData(missingNicResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const nicDataReportedBy = async () => {
    try {
      const nicDataReportedByResponse = await axios.post(
        `http://${server_port}:4000/api/nic/receiveNicMissingDataByReportedBy`,
        {
          nic_number,
        }
      );
      setNicDataReportedBy(nicDataReportedByResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const assaultDataByNicNumber = async () => {
    try {
      const assaultResponse = await fetchComplaintAssaultByNicApi(nic_number);
      setComplaintAssaultData(assaultResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const assaulterDataByNicNumber = async () => {
    try {
      const assaulterResponse = await fetchComplaintAssaulterByNicApi(
        nic_number
      );
      setComplaintAssaulterData(assaulterResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const missingPassportReportedBy = async () => {
    try {
      const passportMissingDataByReportedBy =
        await recievePassportMissingDataByReportedByApi(nic_number);
      setMissingPassportByReportedBy(passportMissingDataByReportedBy.rows);
    } catch (error) {
      console.error(erroColr);
    }
  };

  const myDevicesByNicNumber = async () => {
    try {
      const MyDevicesByNicNumberResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMyDevicesNic`,
        {
          nic_number,
        }
      );
      setMyDevicesByNicNumber(MyDevicesByNicNumberResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const MyDevicesByReportedNic = async () => {
    try {
      const MyDevicesByReportedNicResponse =
        await fetchComplaintDevicesByNicApi(nic_number);
      setMyDevicesReportedBy(MyDevicesByReportedNicResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const receivemissingPetsByNic = async () => {
    try {
      const missingPetsResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMissingPetsByNic`,
        {
          nic_number,
        }
      );
      setMissingPetsByNic(missingPetsByNic.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const missingVehicleDataByNic = async () => {
    const missingVehicleDataByNicResponse = await axios.post(
      `http://${server_port}:4000/api/complaint/receiveMissingVehicleByNic`,
      {
        nic_number,
      }
    );
    setMissingVehicleByNiC(missingVehicleDataByNicResponse.data.rows);
  };

  const missingPassportComplaintByNicNumber = async () => {
    try {
      const missingPassportCOmplaintByNicNumber = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMissingPassportComplaintByNicNumber`,
        {
          nic_number,
        }
      );
      setMissingPassportByNicNumber(
        missingPassportCOmplaintByNicNumber.data.rows
      );
    } catch (error) {
      console.error(error);
    }
  };

  const missingLicenseComplaintByNicNumber = async () => {
    try {
      const missingLicenseComplaintByNicNumber = await axios.post(
        `http://${server_port}:4000/api/complaint/receiveMissingLicenseComplaintByNicNumber`,
        {
          nic_number,
        }
      );
      setMissingLicenseByNicNumber(
        missingLicenseComplaintByNicNumber.data.rows
      );
    } catch (error) {
      console.error(error);
    }
  };

  const missingLicenseReportedBy = async () => {
    try {
      const licenseMissingDataByReportedBy =
        await fetchComplaintMissingLicenseByNicApi(nic_number);
      setMissingLicenseReportedBy(licenseMissingDataByReportedBy.rows);
    } catch (error) {
      console.error(erroColr);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      missingNicDataByNicNumber();
      nicDataReportedBy();
      assaultDataByNicNumber();
      assaulterDataByNicNumber();
      missingPassportReportedBy();
      MyDevicesByReportedNic();
      MyDevicesByNicNumber();
      receivemissingPetsByNic();
      missingVehicleDataByNic();
      missingPassportComplaintByNicNumber();
      missingLicenseComplaintByNicNumber();
      missingLicenseReportedBy();
    };

    fetchData();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      {complaintMissingNicData && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Nic cases <span className="text-xs">(victim)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {complaintMissingNicData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {complaintMissingNicData.map((data, key) => {
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Missing Nic Number</div>
                          <div className="col-span-3">
                            {data.missing_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {NicDataReportedBy && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Nic Cases <span className="text-xs">(Reported by)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {NicDataReportedBy && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {NicDataReportedBy.map((data, key) => {
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Missing Nic Number</div>
                          <div className="col-span-3">
                            {data.missing_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Passport Number */}
      {MissingPassportByNicNumber && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing passport cases <span className="text-xs">(Victim)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {MissingPassportByNicNumber && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingPassportByNicNumber.map((data, key) => {
                  console.log(data);
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Passport Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_passport_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reported by */}
      {MissingPassportByReportedBy && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing passport cases{" "}
              <span className="text-xs">(reported by)</span>- {nic_number}
            </div>
          </div>
          <div>
            {MissingPassportByReportedBy && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingPassportByReportedBy.map((data, key) => {
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Passport Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_passport_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Passport Number */}
      {MissingLicenseByNicNumber && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing license cases <span className="text-xs">(Victim)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {MissingLicenseByNicNumber && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingLicenseByNicNumber.map((data, key) => {
                  console.log(data);
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing License Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_license_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reported by */}
      {MissingLicenseReportedBy && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing license cases{" "}
              <span className="text-xs">(reported by)</span>- {nic_number}
            </div>
          </div>
          <div>
            {MissingLicenseReportedBy && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingLicenseReportedBy.map((data, key) => {
                  const eventDate = new Date(data.lost_date_time);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing License Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_license_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last Seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported By</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* This NIC Holder being missed */}
      {MyDevicesByNicNumber && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Person <span className="text-xs">(victim)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {MyDevicesByNicNumber && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MyDevicesByNicNumber.map((data, key) => {
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Nic Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Missing Person Name</div>
                          <div className="col-span-3">
                            {data.missing_person_name}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Address
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_address}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Description
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Person Reported */}
      {MyDevicesReportedBy && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Person <span className="text-xs">(reported by)</span> -{" "}
              {nic_number}
            </div>
          </div>
          <div>
            {MyDevicesReportedBy && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MyDevicesReportedBy.map((data, key) => {
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Nic Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Missing Person Name</div>
                          <div className="col-span-3">
                            {data.missing_person_name}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Address
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_address}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Person Description
                          </div>
                          <div className="col-span-3">
                            {data.missing_person_description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Was this person once missed */}
      {MyDevicesReportedBy &&
        +(
          <div>
            <div className=" uppercase border flex justify-between border-black rounded-md">
              <div className="mx-auto my-auto text-2xl">
                Missing Person <span className="text-xs">(victim)</span> -{" "}
                {nic_number}
              </div>
            </div>
            <div>
              {MyDevicesReportedBy && (
                <div className="grid lg:grid-cols-2 gap-4 my-4">
                  {MyDevicesReportedBy.map((data, key) => {
                    return (
                      <div className="bg-white text-black rounded-md" key={key}>
                        <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                          <div>Work Station</div>
                          <div>User</div>
                          <div>Police Station</div>
                          <div>Complaint Number</div>
                        </div>
                        <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                          <div>{data.workstation_id}</div>
                          <div>{data.user_id}</div>
                          <div>{data.police_station_id}</div>
                          <div>{data.complaint_number}</div>
                        </div>
                        <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                          <div className="grid grid-cols-6">
                            <div className="col-span-3">
                              Assaulter Nic Number
                            </div>
                            <div className="col-span-3">
                              {data.assaulter_nic_number}
                            </div>
                          </div>
                          <div className="grid grid-cols-6">
                            <div className="col-span-3">Assault Location</div>
                            <div className="col-span-3">
                              {data.assault_location}
                            </div>
                          </div>
                          <div className="grid grid-cols-6">
                            <div className="col-span-3">Assault Date time</div>
                            <div className="col-span-3">
                              {data.lost_datetime}
                            </div>
                          </div>
                          <div className="grid grid-cols-6">
                            <div className="col-span-3">Victim Nic Number</div>
                            <div className="col-span-3">
                              {data.victim_nic_number}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      {complaintAssaultData && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Assault <span className="text-xs">(victim)</span> - {nic_number}
            </div>
          </div>
          <div>
            {complaintAssaultData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {complaintAssaultData.map((data, key) => {
                  const eventDate = new Date(data.assault_datetime);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assaulter Nic Number</div>
                          <div className="col-span-3">
                            {data.assaulter_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Location</div>
                          <div className="col-span-3">
                            {data.assault_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Victim Nic Number</div>
                          <div className="col-span-3">
                            {data.victim_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {complaintAssaulterData && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Assault <span className="text-xs">(assault)</span> - {nic_number}
            </div>
          </div>
          <div>
            {complaintAssaulterData && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {complaintAssaulterData.map((data, key) => {
                  const eventDate = new Date(data.assault_datetime);
                  const newDate = new Intl.DateTimeFormat("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(eventDate);

                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assaulter Nic Number</div>
                          <div className="col-span-3">
                            {data.assaulter_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Location</div>
                          <div className="col-span-3">
                            {data.assault_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Victim Nic Number</div>
                          <div className="col-span-3">
                            {data.victim_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Vehicle */}
      {MissingVehicleByNiC && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Vehicle - {nic_number}
            </div>
          </div>
          <div>
            {MissingVehicleByNiC && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingVehicleByNiC.map((data, key) => {
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Missing Vehicle Number
                          </div>
                          <div className="col-span-3">
                            {data.missing_vehicle_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Vehicle Owner Name</div>
                          <div className="col-span-3">
                            {data.missing_vehicle_owner_name}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">
                            Vehicle Owner Address
                          </div>
                          <div className="col-span-3">
                            {data.missing_vehicle_owner_address}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Make</div>
                          <div className="col-span-3">
                            {data.missing_vehicle_make}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Model</div>
                          <div className="col-span-3">
                            {data.missing_vehicle_model}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Lost date time</div>
                          <div className="col-span-3">
                            {data.lost_date_time}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last seen date time</div>
                          <div className="col-span-3">
                            {data.last_seen_date_time}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Last seen Location</div>
                          <div className="col-span-3">
                            {data.last_seen_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Reported Nic Number</div>
                          <div className="col-span-3">
                            {data.reported_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Vehicle Description</div>
                          <div className="col-span-3">
                            {data.missing_vehicle_description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Pets */}
      {MissingPetsByNic && (
        <div>
          <div className=" uppercase border flex justify-between border-black rounded-md">
            <div className="mx-auto my-auto text-2xl">
              Missing Pets - {nic_number}
            </div>
          </div>
          <div>
            {MissingPetsByNic && (
              <div className="grid lg:grid-cols-2 gap-4 my-4">
                {MissingPetsByNic.map((data, key) => {
                  return (
                    <div className="bg-white text-black rounded-md" key={key}>
                      <div className="grid grid-cols-4 px-2  text-base text-center border-y-2 border-black">
                        <div>Work Station</div>
                        <div>User</div>
                        <div>Police Station</div>
                        <div>Complaint Number</div>
                      </div>
                      <div className="grid grid-cols-4 px-2 border-b-2 text-center border-black text-xs bg-gray-900 text-white">
                        <div>{data.workstation_id}</div>
                        <div>{data.user_id}</div>
                        <div>{data.police_station_id}</div>
                        <div>{data.complaint_number}</div>
                      </div>
                      <div className="flex flex-col px-2 py-6 bg-gray-400 rounded-b-lg">
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assaulter Nic Number</div>
                          <div className="col-span-3">
                            {data.assaulter_nic_number}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Location</div>
                          <div className="col-span-3">
                            {data.assault_location}
                          </div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Assault Date time</div>
                          <div className="col-span-3">{newDate}</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="col-span-3">Victim Nic Number</div>
                          <div className="col-span-3">
                            {data.victim_nic_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PoliceComplaint;
