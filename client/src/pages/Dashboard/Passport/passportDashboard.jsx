import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  recieveAllPassportAlterationsByPassportNumber,
  recieveAllPAssportReasonsByPassportNumber,
  recievePassportDataByPassportNumberApi,
  recievePassportMissingDataByPassportNumberApi,
  recievePassportMissingDataByReportedByApi,
} from "../../../apis/PassportService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const passportDashboard = ({ passportNumber }) => {
  const [passportData, setPassportData] = useState("");
  const [passportAlterationsData, setAlterationsData] = useState("");
  const [passportReasonData, setReasonData] = useState("");
  const [
    passportMissingDataByPassportNumber,
    setPassportMissingDataByPassportNumber,
  ] = useState("");
  const [PassportMissingDataByReportedBy, setPassportMissingDataByReportedBy] =
    useState("");
  const [passportCount, setPassportCount] = useState("");
  const [Nic_Number, setNic_Number] = useState("");

  const params = useParams();
  const passport_number = params.passport || passportNumber;

  useEffect(() => {
    let nic_number = "";
    const fetchData = async () => {
      //Get passport data
      try {
        const passportResponse = await recievePassportDataByPassportNumberApi(
          passport_number
        );
        setPassportData(passportResponse);
        setNic_Number(passportResponse[0].nic_number);

        nic_number = passportResponse[0].nic_number;
      } catch (error) {
        console.error(error);
      }

      //Get passport alterations data
      try {
        const passportResponse2 =
          await recieveAllPassportAlterationsByPassportNumber(passport_number);
        setAlterationsData(passportResponse2);
      } catch (error) {
        console.error(error);
      }
      //Get new passport issue data
      try {
        const passportResponse3 =
          await recieveAllPAssportReasonsByPassportNumber(passport_number);
        setReasonData(passportResponse3);
        setPassportCount(passportResponse3.length + 1);
      } catch (error) {
        console.error(error);
      }

      // Get police complaints records where missing_passport_number
      try {
        const passportMissingDataByPassportNumber =
          await recievePassportMissingDataByPassportNumberApi(passport_number);
        setPassportMissingDataByPassportNumber(
          passportMissingDataByPassportNumber.rows
        );
      } catch (error) {
        console.error(error);
      }

      // Get Police Complaints Records where reported by = nic
      try {
        const passportMissingDataByReportedBy =
          await recievePassportMissingDataByReportedByApi(nic_number);
        setPassportMissingDataByReportedBy(
          passportMissingDataByReportedBy.rows
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <section className=" lg:my-12 my-8">
        <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2">
          Lost Passport Cases of - {passport_number}
        </div>
        {passportMissingDataByPassportNumber && (
          <div className="grid grid-cols-12 gap-2 mb-4">
            {passportMissingDataByPassportNumber.map((data, key) => {
              return (
                <div
                  className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-md mb-2"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5">Last Seen Location</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.last_seen_location}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Last Seen datetime</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.last_seen_date_time}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Lost datetime</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">{data.lost_date_time}</div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Reported By</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.reported_nic_number}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Passport Missing Complaint - Reported By */}

        <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2">
          Passport cases reported By - {Nic_Number}
        </div>
        {PassportMissingDataByReportedBy && (
          <div className="grid grid-cols-12 gap-2 mb-4">
            {PassportMissingDataByReportedBy.map((data, key) => {
              return (
                <div
                  className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-md mb-2"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5">Last Seen Location</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.last_seen_location}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Last Seen datetime</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.last_seen_date_time}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Lost datetime</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">{data.lost_date_time}</div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Reported By</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6">
                        {data.reported_nic_number}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className=" uppercase border flex justify-between border-black rounded-md">
          <div className="mx-auto my-auto text-2xl">Passport</div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{passportCount}</span>
            <span className="my-auto">passport(s) issued</span>
          </p>
        </div>
        {passportData && (
          <div className="">
            {passportData.map((data, key) => {
              const passportIdNumber = data.passport_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-md my-2 text-xs lg:text-lg justify-center border border-black"
                  key={key}
                >
                  <div className="grid grid-cols-3 lg:justify-between">
                    <div className="rounded-md my-auto ">
                      <img
                        src={`http://${server_port}:4000/images/passport/${data.citizen_image_path}`}
                        className="lg:w-48 lg:h-64 w-24 h-32 object-cover -my-16 ml-4 rounded-md"
                      />
                    </div>
                    <div className="mx-auto my-auto">
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Name</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.citizen_name}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Nic No.</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.nic_number}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Passport No.</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.passport_number}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Status</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.citizen_status}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">DOB</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.citizen_dob}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Place of birth</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.place_of_birth}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Issue Date</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.passport_issue_date}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Expiry Date</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.passport_expiry_date}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Address</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.citizen_address}
                        </div>
                      </div>

                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Gender</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.citizen_gender}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Country</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.passport_country}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Profession</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.profession}</div>
                      </div>
                    </div>
                    <div className="rounded-md my-auto ">
                      <img
                        src={`http://${server_port}:4000/images/${data.signature_path}`}
                        className="lg:w-64 lg:h-48 w-32 h-24 object-cover -my-16 ml-4 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="lg:text-2xl text-md text-center my-8 rounded-md  border border-black uppercase">
          Altered Data of passport {passport_number}
        </div>
        {passportAlterationsData && (
          <div className="grid grid-cols-12 gap-2">
            {passportAlterationsData.map((data, key) => {
              return (
                <div
                  className="bg-white col-span-12 text-black px-4 py-2 rounded-md text-xs md:text-base border border-black"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-1">Name</div>
                      <div className="ml-8"> |</div>
                      <div className="col-span-6 lg:col-span-9 -ml-12">
                        {data.citizen_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">
                        Previous Data
                      </div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-9 -ml-12">
                        {data.previous_data}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">New Data</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-8 -ml-12">
                        {data.new_data}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">Reason</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-9 text-left -ml-12">
                        {data.alteration_reason}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">Date</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-9 text-left -ml-12">
                        {data.alteration_date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="lg:text-2xl text-md text-center my-8  border border-black uppercase rounded-md">
          New Passport Provision for Passport {passport_number}
        </div>
        {passportReasonData && (
          <div className="grid grid-cols-12 gap-2">
            {passportReasonData.map((data, key) => {
              return (
                <div
                  className="bg-white col-span-12 text-black px-4 py-2 rounded-md text-xs md:text-base border border-black"
                  key={key}
                >
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-1">Name</div>
                      <div className="ml-8"> |</div>
                      <div className="col-span-6 lg:col-span-9 -ml-12">
                        {data.citizen_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">Reason</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-9 -ml-12">
                        {data.reason_text}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-1">Date</div>
                      <div className="ml-8">|</div>
                      <div className="col-span-6 lg:col-span-9 text-left -ml-12">
                        {data.alteration_date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
};

export default passportDashboard;
