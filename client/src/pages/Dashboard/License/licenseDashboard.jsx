import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const licenseDashboard = () => {
  const [licenseData, setLicenseData] = useState("");
  const [licenseAlterationsData, setAlterationsData] = useState("");
  const [licenseReasonData, setReasonData] = useState("");
  const [licenseCategoryData, setLicenseCategoryData] = useState("");
  const [licenseCount, setLicenseCount] = useState("");
  const [
    licenseMissingDataByLicenseNumber,
    setLicenseMissingDataByLicenseNumber,
  ] = useState("");
  const [Nic_Number, setNic_Number] = useState("");
  const [LicenseMissingDataReportedBy, setLicenseMissingDataReportedBy] =
    useState([]);

  const license_number = localStorage.getItem("nic_number");

  useEffect(() => {
    const fetchData = async () => {
      let nic_number = "";
      try {
        const licenseResponse = await axios.post(
          `http://${server_port}:4000/api/license/receiveAllData`,
          {
            license_number,
          }
        );
        setLicenseData(licenseResponse.data);
        nic_number = licenseResponse.data[0].nic_number;
        setNic_Number(nic_number);
      } catch (error) {
        console.log(error);
      }
      try {
        const licenseResponse2 = await axios.post(
          `http://${server_port}:4000/api/license/receiveAlterations`,
          {
            license_number,
          }
        );
        setAlterationsData(licenseResponse2.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const licenseResponse3 = await axios.post(
          `http://${server_port}:4000/api/license/receiveReasons`,
          {
            license_number,
          }
        );
        setReasonData(licenseResponse3.data);
        setLicenseCount(licenseResponse3.data.length + 1);
      } catch (error) {
        console.error(error);
      }
      try {
        const licenseCategoryResponse = await axios.post(
          `http://${server_port}:4000/api/license/receiveCategory`,
          {
            license_number,
          }
        );
        setLicenseCategoryData(licenseCategoryResponse.data);
      } catch (error) {
        console.log(error);
      }

      // Get license missing data by license number
      try {
        const licenseMissingData = await axios.post(
          `http://${server_port}:4000/api/license/receiveLicenseMissingData`,
          {
            license_number,
          }
        );
        setLicenseMissingDataByLicenseNumber(licenseMissingData.data.rows);
      } catch (error) {
        console.log(error);
      }

      // Get license missing data by nic number
      try {
        const licenseMissingDataReportedBy = await axios.post(
          `http://${server_port}:4000/api/license/receiveLicenseMissingDataByReportedBy`,
          {
            nic_number: nic_number,
          }
        );
        setLicenseMissingDataReportedBy(licenseMissingDataReportedBy.data.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <section className="mx-12 lg:my-12 my-8">
        {/* Get lost license by license number records */}
        <div className="lg:text-2xl text-md text-center rounded-lg  border border-black uppercase my-2">
          Lost License Cases Of - {license_number}
        </div>
        {licenseMissingDataByLicenseNumber && (
          <div className="grid grid-cols-12 gap-2 mb-4">
            {licenseMissingDataByLicenseNumber.map((data, key) => {
              return (
                <div className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-lg mb-2">
                  <div className="">
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Last Seen Location</div>
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
                      <div className="col-span-5">Reported By</div>
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

        {/* Get lost license by reported_by_nic  */}
        <div className="lg:text-2xl text-md text-center rounded-lg  border border-black uppercase my-2">
          License Cases reported by - {Nic_Number}
        </div>
        {LicenseMissingDataReportedBy && (
          <div className="grid grid-cols-12 gap-2 mb-4">
            {LicenseMissingDataReportedBy.map((data, key) => {
              return (
                <div className="bg-red-500 col-span-12 text-white px-4 py-2  text-xs md:text-base rounded-lg mb-2">
                  <div className="">
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 ">Last Seen Location</div>
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
                      <div className="col-span-5">Reported By</div>
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

        {/* License Records */}
        <div className=" uppercase border flex justify-between border-black rounded-lg">
          <div className="mx-auto my-auto text-2xl">License</div>
          <p className="mx-4 text-right">
            <span className="text-5xl mx-2">{licenseCount}</span>
            <span className="my-auto">license(s) issued</span>
          </p>
        </div>
        {licenseData && (
          <div className="">
            {licenseData.map((data, key) => {
              const licenseIdNumber = data.license_number;
              return (
                <div
                  className="bg-white text-gray-950 gap-12 p-2 flex rounded-lg my-2 text-xs lg:text-lg justify-center border border-black"
                  key={key}
                >
                  <div className="grid grid-cols-12 lg:justify-between text-xs">
                    <div className="rounded-lg my-auto col-span-2">
                      <img
                        src={`http://${server_port}:4000/images/license/${data.license_image_path}`}
                        className="lg:w-36 lg:h-40 w-24 h-32 object-cover -my-16 ml-4 rounded-lg"
                      />
                    </div>
                    <div className="mx-auto my-auto col-span-4">
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Name</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.citizen_name}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Nic No</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.nic_number}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">License No</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.license_number}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Issue Date</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.license_issue_date}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Expiry Date</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.license_expiry_date}
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
                        <div className="lg:col-span-4">DOB</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.citizen_dob}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Gender</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">
                          {data.citizen_gender}
                        </div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Blood Group</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.blood_group}</div>
                      </div>
                      <div className="lg:grid lg:grid-cols-12">
                        <div className="lg:col-span-4">Vision</div>
                        <div className="hidden lg:col-span-1">|</div>
                        <div className="lg:col-span-7">{data.vision}</div>
                      </div>
                    </div>
                    <div className="col-span-4 mx-auto my-auto">
                      {licenseCategoryData && (
                        <div className="  text-xs border-black">
                          <div className="lg:grid lg:grid-cols-12 border-b-2 border-black gap-8 bg-gray-700 text-white">
                            <div className="col-span-4 whitespace-nowrap">
                              Category Name
                            </div>
                            <div className="col-span-3 whitespace-nowrap">
                              Issue Date
                            </div>
                            <div className="col-span-3 whitespace-nowrap">
                              Expiry Date
                            </div>
                            <div className="">Res.</div>
                          </div>
                          {licenseCategoryData.map((data, key) => {
                            return (
                              <div className="lg:grid lg:grid-cols-12 border-y-2 border-black gap-8">
                                <div className="col-span-4 whitespace-nowrap">
                                  {data.category_name}
                                </div>
                                <div className="col-span-3 whitespace-nowrap">
                                  {data.date_of_issue}
                                </div>
                                <div className="col-span-3 whitespace-nowrap">
                                  {data.date_of_expiry}
                                </div>
                                <div className="">{data.restrictions}</div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg my-auto col-span-2 ">
                      <img
                        src={`http://${server_port}:4000/images/${data.signature_path}`}
                        className="lg:w-56 lg:h-32 w-32 h-24 object-cover -my-16 ml-4 rounded-lg border border-black "
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="lg:text-2xl text-md text-center my-4 rounded-lg  border border-black uppercase">
          Altered Data of License {license_number}
        </div>
        {licenseAlterationsData && (
          <div className="grid grid-cols-12 gap-2">
            {licenseAlterationsData.map((data, key) => {
              return (
                <div
                  className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base border border-black "
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
                        {data.date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="lg:text-2xl text-md text-center my-8  border border-black uppercase rounded-lg">
          New License Provision for License {license_number}
        </div>
        {licenseReasonData && (
          <div className="grid grid-cols-12 gap-2">
            {licenseReasonData.map((data, key) => {
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base border border-black ">
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
                      <div className="col-span-6 lg:col-span-9 -ml-12">
                        {data.date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="lg:text-2xl text-md text-center my-8  border border-black uppercase rounded-lg">
          License Category for License {license_number}
        </div>
        {licenseCategoryData && (
          <div className="grid grid-cols-12 gap-2">
            {licenseCategoryData.map((data, key) => {
              return (
                <div className="bg-white col-span-12 text-black px-4 py-2 rounded-xl text-xs md:text-base border border-black ">
                  <div className="">
                    <div className="grid-cols-12  grid text-md">
                      <div className="col-span-5 lg:col-span-2">Category</div>
                      <div className=""> |</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.category_name}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">Start Date</div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.date_of_issue}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Expiry Date
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.date_of_expiry}
                      </div>
                    </div>
                    <div className="grid-cols-12 grid">
                      <div className="col-span-5 lg:col-span-2">
                        Restrictions
                      </div>
                      <div className="">|</div>
                      <div className="col-span-6 lg:col-span-8">
                        {data.restrictions}
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

export default licenseDashboard;
