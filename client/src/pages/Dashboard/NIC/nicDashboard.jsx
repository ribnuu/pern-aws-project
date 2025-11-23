import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const nicDashboard = ({ nicNumber }) => {
  const [nicData, setNicData] = useState("");
  const [nicAlterationsData, setAlterationsData] = useState("");
  const [nicReasonData, setReasonData] = useState("");
  const [nicMissingDataByNicNumber, setnicMissingDataByNicNumber] = useState(
    []
  );
  const [nicMissingDataByReportedBy, setnicMissingDataByReportedBy] = useState(
    []
  );
  const [nicCount, setNicCount] = useState("");
  const [NicNumber, setNicNumber] = useState([]);

  const params = useParams();
  const nic_number = params.nic || nicNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nicResponse = await axios.post(
          `http://${server_port}:4000/api/nic/receiveAllData`,
          {
            nic_number,
          }
        );
        setNicData(nicResponse.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const nicResponse2 = await axios.post(
          `http://${server_port}:4000/api/nic/receiveAlterations`,
          {
            nic_number,
          }
        );
        setAlterationsData(nicResponse2.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const nicResponse3 = await axios.post(
          `http://${server_port}:4000/api/nic/receiveReasons`,
          {
            nic_number,
          }
        );
        setReasonData(nicResponse3.data);
        setNicCount(nicResponse3.data.length + 1);
      } catch (error) {
        console.log(error);
      }
      //Get Missing Nic Data
      try {
        const nicMissingResponse = await axios.post(
          `http://${server_port}:4000/api/nic/receiveMissingData`,
          {
            nic_number,
          }
        );
        setnicMissingDataByNicNumber(nicMissingResponse.data.rows);
      } catch (error) {
        console.log(error);
      }

      // Get Pcs data who used this nic number when reporting
      try {
        const nicMissingResponseByReportedBy = await axios.post(
          `http://${server_port}:4000/api/nic/receiveNicMissingDataByReportedBy`,
          {
            nic_number,
          }
        );
        setnicMissingDataByReportedBy(nicMissingResponseByReportedBy.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="lg:my-12 my-8">
      {/* Retrieve lost nic */}
      <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2">
        Lost NIC CASES OF - {nic_number}
      </div>
      {nicMissingDataByNicNumber && (
        <div className="grid grid-cols-12 gap-2 mb-4">
          {nicMissingDataByNicNumber.map((data, key) => {
            return (
              <div
                className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-md mb-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Last Seen Location</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.last_seen_location}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Last Seen datetime</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.last_seen_date_time}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Lost datetime</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.lost_date_time}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Reported By</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  text-left">
                      {data.reported_nic_number}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Retrieve lost nic reported by  */}
      <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2">
        NIC CASES REPORTED BY - {nic_number}
      </div>
      {nicMissingDataByReportedBy && (
        <div className="grid grid-cols-12 gap-2 mb-4">
          {nicMissingDataByReportedBy.map((data, key) => {
            return (
              <div
                className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-md mb-2"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Last Seen Location</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.last_seen_location}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Last Seen datetime</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.last_seen_date_time}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Lost datetime</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6">{data.lost_date_time}</div>
                  </div>
                  <div className="grid-cols-12 grid">
                    <div className="col-span-5 ">Reported By</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6  text-left">
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
        <div className="mx-auto my-auto text-2xl">NIC</div>
        <p className="mx-4 text-right">
          <span className="text-5xl mx-2">{nicCount}</span>
          <span className="my-auto">nic(s) issued</span>
        </p>
      </div>
      {nicData && (
        <div className="">
          {nicData.map((data, key) => {
            console.log(data);
            const nicIdNumber = data.nic_number;
            return (
              <div
                className="bg-white text-gray-950 gap-12 p-2 flex rounded-md my-2 text-xs lg:text-lg justify-center border border-black"
                key={key}
              >
                <div className="grid grid-cols-3 lg:justify-between">
                  <div className="rounded-md my-auto ">
                    <img
                      src={`http://${server_port}:4000/images/nic/${data.citizen_image_path}`}
                      className="lg:w-48 lg:h-64 w-24 h-32 object-cover -my-16 ml-4 rounded-md"
                    />
                  </div>
                  <div className="mx-auto my-auto">
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">NIC</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">{data.nic_number}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">Name</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">{data.citizen_name}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">Address</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">
                        {data.house_number} , {data.lane} , {data.road} ,{" "}
                        {data.province_name} , {data.district_name} ,{" "}
                        {data.town_name}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">DOB</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">{data.citizen_dob}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">Gender</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">{data.citizen_gender}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">Place of birth</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">
                        {data.citizen_place_of_birth}
                      </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-12">
                      <div className="lg:col-span-4">Date of issue</div>
                      <div className="hidden lg:col-span-1">|</div>
                      <div className="lg:col-span-7">
                        {data.citizen_date_of_issue}
                      </div>
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
      <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2 mt-10">
        Altered Data of NIC {nic_number}
      </div>
      {nicAlterationsData && (
        <div className="grid grid-cols-12 gap-2">
          {nicAlterationsData.map((data, key) => {
            return (
              <div
                className="bg-white col-span-12 text-black px-4 py-2  text-xs md:text-base rounded-md border border-black"
                key={key}
              >
                <div className="">
                  <div className="grid-cols-12  grid text-md">
                    <div className="col-span-5 lg:col-span-1">
                      Altered Field
                    </div>
                    <div className="ml-8"> |</div>
                    <div className="col-span-6 lg:col-span-9 -ml-12">
                      {data.altered_field}
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
                    <div className="col-span-5 lg:col-span-1">Altered Date</div>
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
      <div className="lg:text-2xl text-md text-center rounded-md border border-black uppercase my-2 mt-10">
        New Nic Provision for NIC {nic_number}
      </div>
      {nicReasonData && (
        <div className="grid grid-cols-12 gap-2">
          {nicReasonData.map((data, key) => {
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
                    <div className="col-span-5 lg:col-span-1">Prov. Date</div>
                    <div className="ml-8">|</div>
                    <div className="col-span-6 lg:col-span-9 -ml-12">
                      {data.provision_date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default nicDashboard;
