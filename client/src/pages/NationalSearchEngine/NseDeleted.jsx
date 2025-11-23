import React, { useEffect, useState } from "react";
import CharacterInfo from "../Character/LicenseInfo";
import { AiOutlineSearch } from "react-icons/ai";
import NSEResults from "../../components/NSEResults";
import axios from "axios";
import { getMyDevicesByNICApi } from "../../apis/DevicesApiService";
import { getVehiclesByNicNumberApi } from "../../apis/MyVehiclesApiService";
import { getVoterByNicApi } from "../../apis/VoterApiService";
import { fetchVehicleEmissionByNicApi } from "../../apis/VehicleEmissionApiService";
import { fetchLolcVehicleInsuranceApi } from "../../apis/VehicleInsuranceApiService";
import { fetchCompanyByNicApi } from "../../apis/CompanyApiService";
import { fetchHospitalByNicApi } from "../../apis/HospitalApiService";
import {
  fetchMissingPetListByNicApi,
  fetchMissingVehicleListByNicApi,
  recieveDevicesListByNicApi,
} from "../../apis/PoliceWatchDogSystemApiService";
import { recieveVehicleRevenueLicenseDataByNicApi } from "../../apis/VehicleRevenueLicenseApiService";
import {
  recieveLicenseDataByLicenseNumber,
  recieveLicenseDataByNicApi,
} from "../../apis/LicenseApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const Nse_Deleted = () => {
  const [bgColor, setBgColor] = useState("bg-green-500");

  // const [nicData, setNicData] = useState([]);
  // const [passportData, setPassportData] = useState([]);
  // const [licenseData, setLicenseData] = useState([]);

  const [nicTabUpdate, setNicTabUpdate] = useState(false);
  const [passportTabUpdate, setPassportTabUpdate] = useState(false);
  const [licenseTabUpdate, setLicenseTapUpdate] = useState(false);
  const [stateBankTabUpdate, setStateBankTapUpdate] = useState(false);
  const [vehicleRegistrationTabUpdate, setVehicleRegistrationTabUpdate] =
    useState(false);
  const [voterRegistrationTabUpdate, setVoterRegistrationTabUpdate] =
    useState(false);
  const [electionCommissionTabUpdate, setElectionCommissionTabUpdate] =
    useState(false);
  const [expresswayTabUpdate, setExpresswayTabUpdate] = useState(false);

  const [nicNumber, setNicNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [stateBankAccountNumber, setStateBankAccountNumber] = useState("");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState("");
  const [voterRegistrationNumber, setVoterRegistrationNumber] = useState("");
  const [electionCommissionNumber, setElectionCommissionNumber] = useState("");
  const [expresswayNumber, setExpresswayNumber] = useState("");

  const [passportNull, setPassportNull] = useState(null);
  const [licenseNull, setLicenseNull] = useState(null);
  const [nicNull, setNicNull] = useState(null);
  const [stateBankNull, setStateBankNull] = useState(null);
  const [vehicleRegistrationNull, setVehicleRegistrationNull] = useState(null);
  const [voterRegistrationNull, setVoterRegistrationNull] = useState(null);
  const [electionCommissionNull, setElectionCommissionNull] = useState(null);
  const [expresswayNull, setExpresswayNull] = useState(null);

  // Teacher Training
  const [teacherTrainingTabUpdate, setTeacherTrainingTabUpdate] =
    useState(false);
  const [teacherTrainingNumber, setTeacherTrainingNumber] = useState("");
  const [teacherTrainingNull, setTeacherTrainingyNull] = useState(null);

  // Excise
  const [exciseTabUpdate, setExciseTabUpdate] = useState(false);
  const [exciseNumber, setExciseNumber] = useState("");
  const [exciseNull, setExciseNull] = useState(null);

  // Technical College
  const [technicalCollegeTabUpdate, setTechnicalCollegeTabUpdate] =
    useState(false);
  const [technicalCollegeNumber, setTechnicalCollegeNumber] = useState("");
  const [technicalCollegeNull, setTechnicalCollegeNull] = useState(null);

  // Company
  const [companyTabUpdate, setCompanyTabUpdate] = useState(false);
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyNull, setCompanyNull] = useState(null);

  // Crib
  const [cribTabUpdate, setCribTabUpdate] = useState(false);
  const [cribNumber, setCribNumber] = useState("");
  const [cribNull, setCribNull] = useState(null);

  // Cea License
  const [ceaLicenseTabUpdate, setCeaLicenseTabUpdate] = useState(false);
  const [ceaLicenseNumber, setCeaLicenseNumber] = useState("");
  const [ceaLicenseNull, setCeaLicenseNull] = useState(null);

  // Inland Revenue
  const [inlandRevenueTabUpdate, setInlandRevenueTabUpdate] = useState(false);
  const [inlandRevenueNumber, setInlandRevenueNumber] = useState("");
  const [inlandRevenueNull, setInlandRevenueNull] = useState(null);

  // Transport Commission
  const [transportCommissionTabUpdate, setTransportCommissionTabUpdate] =
    useState(false);
  const [transportCommissionNumber, setTransportCommissionNumber] =
    useState("");
  const [transportCommissionNull, setTransportCommissionNull] = useState(null);

  // Council
  const [councilTabUpdate, setCouncilTabUpdate] = useState(false);
  const [councilNumber, setCouncilNumber] = useState();
  const [councilNumberNull, setCouncilNumberNull] = useState(null);

  // EducationalBodies
  const [educationalBodiesTabUpdate, setEducationalBodiesTabUpdate] =
    useState(false);
  const [educationNumber, setEducationNumber] = useState();
  const [educationNull, setEducationaNull] = useState(null);

  // Gem
  const [gemTabUpdate, setGemTabUpdate] = useState(false);
  const [gemNumber, setGemNumber] = useState();
  const [gemNull, setGemNull] = useState(null);

  // Epf
  const [epfTabUpdate, setEpfTabUpdate] = useState(false);
  const [epfNumber, setEpfNumber] = useState();
  const [epfNull, setEpfNull] = useState(null);

  // Etf
  const [etfTabUpdate, setEtfTabUpdate] = useState(false);
  const [etfNumber, setEtfNumber] = useState();
  const [etfNull, setEtfNull] = useState(null);

  // University
  const [universityTabUpdate, setUniversityTabUpdate] = useState(false);
  const [universityNumber, setuniversityNumber] = useState();
  const [universityNull, setuniversityNull] = useState(null);

  // School
  const [schoolTabUpdate, setSchoolTabUpdate] = useState(false);
  const [schoolNumber, setSchoolNumber] = useState();
  const [schoolNull, setSchoolNull] = useState(null);

  // Car Park Services
  const [carParkTabUpdate, setCarParkTabUpdate] = useState(false);
  const [carParkNumber, setCarParkNumber] = useState();
  const [carParkNull, setCarParkNull] = useState(null);

  // Hospital
  const [hospitalTabUpdate, setHospitalTabUpdate] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState();
  const [hospitalNull, setHospitalNull] = useState(null);

  // Driving Offense
  const [drivingOffenseTabUpdate, setDrivingOffenseTabUpdate] = useState(false);
  const [drivingOffenseNumber, setDrivingOffenseNumber] = useState();
  const [drivingOffenseNull, setDrivingOffenseNull] = useState(null);

  // Hospital
  const [deviceRegistrationTabUpdate, setDeviceRegistrationTabUpdate] =
    useState(false);
  const [deviceRegistrationNumber, setDeviceRegistrationNumber] = useState();
  const [deviceRegistartionNull, setDeviceRegistrationNull] = useState(null);

  // Foreign Employment Bureau
  const [
    foreignEmploymentBureauTabUpdate,
    setForeignEmploymentBureauTabUpdate,
  ] = useState(false);
  const [foreignEmploymentNumber, setForeignEmploymentNumber] = useState();
  const [foreignEmploymentNull, setforeignEmploymentNull] = useState(null);

  // Police Watch Dog System
  const [policeWatchDogTabUpdate, setPoliceWatchDogTabUpdate] = useState(false);
  const [policeWatchDogNumber, setPoliceWatchDogNumber] = useState();
  const [policeWatchDogNull, setPoliceWatchDogNull] = useState(null);

  // Network System
  const [networkTabUpdate, setNetworkTabUpdate] = useState(false);
  const [networkNumber, setNetworkNumber] = useState();
  const [networkNull, setNetworkNull] = useState(null);

  // Taxi System
  const [taxiTabUpdate, setTaxiTabUpdate] = useState(false);
  const [taxiNumber, setTaxiNumber] = useState();
  const [taxiNull, setTaxiNull] = useState(null);

  // Sri Lanka Medical Council
  const [medicalCouncilTabUpdate, setMedicalCouncilTabUpdate] = useState(false);
  const [medicalCouncilNumber, setMedicalCouncilNumber] = useState();
  const [medicalCouncilNull, setMedicalCouncilNull] = useState(null);

  // Sri Lanka Medical Council
  const [vehicleInsuranceTabUpdate, setVehicleInsuranceTabUpdate] =
    useState(false);
  const [vehicleInsuranceNumber, setVehicleInsuranceNumber] = useState();
  const [vehicleInsuranceNull, setVehicleInsuranceNull] = useState(null);

  // Vehicle Emission Certficate
  const [vehicleEmissionTabUpdate, setVehicleEmissionTabUpdate] =
    useState(false);
  const [vehicleEmissionNumber, setVehicleEmissionNumber] = useState();
  const [vehicleEmissionNull, setVehicleEmissionNull] = useState(null);

  // Vehicle Revenue License
  const [vehicleRevenueTabUpdate, setVehicleRevenueTabUpdate] = useState(false);
  const [vehicleRevenueNumber, setVehicleRevenueNumber] = useState();
  const [vehicleRevenueNull, setVehicleRevenueNull] = useState(null);

  // Atomic Energy Authority
  const [atomicEnergyAuthorityTabUpdate, setAtomicEnergyAuthorityTabUpdate] =
    useState(false);
  const [atomicEnergyAuthorityNumber, setAtomicEnergyAuthorityNumber] =
    useState();
  const [atomicEnergyAuthorityNull, setAtomicEnergyAuthorityNull] =
    useState(null);

  //Loaders need to be completed

  const [nicLoader, setNicLoader] = useState(null);
  const [passportLoader, setPassportLoader] = useState(null);
  const [licenseLoader, setLicenseLoader] = useState(null);
  const [stateBankLoader, setStateBankLoader] = useState(null);
  const [electionCommissionLoader, setElectionCommissionLoader] =
    useState(null);

  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    nic_number: "",
    passport_number: "",
    license_number: "",
    vehicle_number: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    // const CombineSearchNic = async (nicToSearch) => {
    //   console.log(nicToSearch);
    //   try {
    //     const nicResponse = await axios.post(
    //       `http://${server_port}:4000/api/nic/receive`,
    //       {
    //         nic_number: nicToSearch,
    //       }
    //     );
    //     if (nicResponse.data.rowCount > 0) {
    //       return 60;
    //     } else {
    //       return 40;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    e.preventDefault();
    // Passport Data
    if (formData.passport_number !== "") {
      try {
        const passportResponse = await axios.post(
          `http://${server_port}:4000/api/passport/receive`,
          {
            passport_number: formData.passport_number,
          }
        );
        if (passportResponse.data.rowCount > 0) {
          setPassportTabUpdate(true);
          setPassportNumber(passportResponse.data.rows[0].passport_number);
          try {
            const nicResponse = await axios.post(
              `http://${server_port}:4000/api/nic/receive`,
              {
                nic_number: passportResponse.data.rows[0].nic_number,
              }
            );
            if (nicResponse.data.rowCount > 0) {
              setNicTabUpdate(true);
              setNicNumber(nicResponse.data.rows[0].nic_number);
              try {
                const licenseResponse = await recieveLicenseDataByNicApi(
                  nicResponse.data.rows[0].nic_number
                );
                if (licenseResponse.rowCount > 0) {
                  setLicenseTapUpdate(true);
                  setLicenseNumber(licenseResponse.rows[0].license_number);
                } else {
                  //SET LICENSE TO NULL
                  setLicenseNull(true);
                }
              } catch (error) {
                console.error(error);
              }
            } else {
              // SET NIC TO NULL
              setNicNull(true);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          //SET PASSPORT TO NULL
          setPassportNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const foreignEmploymentBureauResponse = await axios.post(
          `http://${server_port}:4000/api/foreign-employment-bureau/receiveByPassport`,
          {
            passport_number: formData.passport_number,
          }
        );
        console.log(foreignEmploymentBureauResponse);
        if (foreignEmploymentBureauResponse.data.rowCount > 0) {
          setForeignEmploymentBureauTabUpdate(true);
          setForeignEmploymentNumber(
            foreignEmploymentBureauResponse.data.rows[0].passport_number
          );
        } else {
          //SET LICENSE TO NULL
          setforeignEmploymentNull(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    //Nic Number
    if (formData.nic_number != "") {
      //nic

      // const receivedNic = await CombineSearchNic(formData.nic_number);
      // console.log(receivedNic);
      try {
        const nicResponse = await axios.post(
          `http://${server_port}:4000/api/nic/receive`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (nicResponse.data.rowCount > 0) {
          setNicTabUpdate(true);
          setNicNumber(nicResponse.data.rows[0].nic_number);
          try {
            const licenseResponse = await recieveLicenseDataByNicApi(
              formData.nic_number
            );
            if (licenseResponse.data.rowCount > 0) {
              setLicenseTapUpdate(true);
              setLicenseNumber(licenseResponse.data.rows[0].license_number);
            } else {
              setLicenseNull(true);
            }
          } catch (error) {
            console.error(error);
          }
          try {
            const passportResponse = await axios.post(
              `http://${server_port}:4000/api/passport/receiveByNic`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (passportResponse.data.rowCount > 0) {
              setPassportTabUpdate(true);
              setPassportNumber(passportResponse.data.rows[0].passport_number);
            } else {
              setPassportNull(true);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          setNicNull(true);
          setPassportNull(true);
          setLicenseNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //bank
      try {
        const stateBankResponse = await axios.post(
          `http://${server_port}:4000/api/state-banks/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (stateBankResponse.data.rowCount > 0) {
          setStateBankTapUpdate(true);
          setStateBankAccountNumber(stateBankResponse.data.rows[0].nic_number);
        } else {
          setStateBankNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //vechile registration
      try {
        const vehicleRegistrationResponse = await getVehiclesByNicNumberApi({
          nic_number: formData.nic_number,
        });

        if (vehicleRegistrationResponse.rowCount > 0) {
          setVehicleRegistrationTabUpdate(true);
          setVehicleRegistrationNumber(
            vehicleRegistrationResponse.rows[0].nic_number
          );
          try {
            const transportCommissionResponse = await axios.post(
              `http://${server_port}:4000/api/transport-commission/receiveByVehicleNumber`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (transportCommissionResponse.data.rowCount > 0) {
              setTransportCommissionTabUpdate(true);
              setTransportCommissionNumber(
                vehicleRegistrationResponse.rows[0].nic_number
              );
            } else {
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          setTransportCommissionNull(true);
          setVehicleRegistrationNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //voter registration
      try {
        const voterRegistrationResponse = await getVoterByNicApi({
          nic_number: formData.nic_number,
        });

        if (voterRegistrationResponse.rowCount > 0) {
          setVoterRegistrationTabUpdate(true);
          setVoterRegistrationNumber(
            voterRegistrationResponse.rows[0].nic_number
          );
        } else {
          setVoterRegistrationNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //Election Commission
      try {
        setElectionCommissionLoader(true);
        async function fetchElectionCommissionResponse() {
          try {
            const electionCommissionResponse = await axios.post(
              `http://${server_port}:4000/api/election/receiveByNic`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (electionCommissionResponse.data.rowCount > 0) {
              setElectionCommissionTabUpdate(true);
              setElectionCommissionNumber(
                electionCommissionResponse.data.rows[0].nic_number
              );
              setElectionCommissionLoader(false);
            } else {
              setElectionCommissionNull(true);
            }
          } catch (error) {
            console.error(error);
          }
        }
        setTimeout(fetchElectionCommissionResponse, 0);
      } catch (error) {
        console.error(error);
      }
      //Express way
      try {
        const expresswayResponse = await axios.post(
          `http://${server_port}:4000/api/expressway/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (expresswayResponse.data.rowCount > 0) {
          setExpresswayTabUpdate(true);
          setExpresswayNumber(expresswayResponse.data.rows[0].nic_number);
        } else {
          setExpresswayNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //Gem Response
      try {
        const gemResponse = await axios.post(
          `http://${server_port}:4000/api/gem/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (gemResponse.data.rowCount > 0) {
          setGemTabUpdate(true);
          setGemNumber(gemResponse.data.rows[0].nic_number);
        } else {
          setGemNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //excise response
      try {
        const exciseResponse = await axios.post(
          `http://${server_port}:4000/api/excise/receiveByNic`,
          {
            nic_number: formData.nic_number,
            onDownloadProgress: (progressEvent) => {
              const loaded = progressEvent.loaded;
              const total = progressEvent.total;
              const progressPercent = (loaded * 100) / total;
              setProgress(progressPercent);
            },
          }
        );
        if (exciseResponse.data.rowCount > 0) {
          setExciseTabUpdate(true);
          setExciseNumber(exciseResponse.data.rows[0].owner_nic_number);
        } else {
          setExciseNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //company
      try {
        const companyResponse = await fetchCompanyByNicApi(formData.nic_number);
        if (companyResponse.rowCount > 0) {
          setCompanyTabUpdate(true);
          setCompanyNumber(companyResponse.rows[0].nic_number);
        } else {
          setCompanyNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //crib
      try {
        const cribResponse = await axios.post(
          `http://${server_port}:4000/api/crib/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (cribResponse.data.rowCount > 0) {
          setCribTabUpdate(true);
          setCribNumber(cribResponse.data.rows[0].nic_number);
        } else {
          setCribNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //cea
      try {
        const ceaResponse = await axios.post(
          `http://${server_port}:4000/api/cea-license/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (ceaResponse.data.rowCount > 0) {
          setCeaLicenseTabUpdate(true);
          setCeaLicenseNumber(ceaResponse.data.rows[0].owner_nic_number);
        } else {
          setCeaLicenseNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //inland
      try {
        const inlandRevenueResponse = await axios.post(
          `http://${server_port}:4000/api/inland-revenue/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (inlandRevenueResponse.data.rowCount > 0) {
          setInlandRevenueTabUpdate(true);
          setInlandRevenueNumber(
            inlandRevenueResponse.data.rows[0].taxpayer_nic
          );
        } else {
          setInlandRevenueNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      //Council
      try {
        const municalCouncilRespone = await axios.post(
          `http://${server_port}:4000/api/council/municipal/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (municalCouncilRespone.data.rowCount > 0) {
          setCouncilTabUpdate(true);
          setCouncilNumber(municalCouncilRespone.data.rows[0].nic_number);
        } else {
          try {
            const urbanCouncilResponse = await axios.post(
              `http://${server_port}:4000/api/council/urban/receiveByNic`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (urbanCouncilResponse.data.rowCount > 0) {
              setCouncilTabUpdate(true);
              setCouncilNumber(urbanCouncilResponse.data.rows[0].nic_number);
            } else {
              try {
                const pradeshiyaSabhaResponse = await axios.post(
                  `http://${server_port}:4000/api/council/pradeshiya-sabha/receiveByNic`,
                  {
                    nic_number: formData.nic_number,
                  }
                );
                if (pradeshiyaSabhaResponse.data.rowCount > 0) {
                  setCouncilTabUpdate(true);
                  setCouncilNumber(
                    pradeshiyaSabhaResponse.data.rows[0].nic_number
                  );
                } else {
                  setCouncilNumberNull(true);
                }
              } catch (error) {}
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
      //Educational Bodies
      try {
        // Naita
        const naitaResponse = await axios.post(
          `http://${server_port}:4000/api/other-educational-bodies/naita/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (naitaResponse.data.rowCount > 0) {
          setEducationalBodiesTabUpdate(true);
          setEducationNumber(naitaResponse.data.rows[0].nic_number);
        } else {
          try {
            //TVEC
            const tvecResponse = await axios.post(
              `http://${server_port}:4000/api/other-educational-bodies/tvec/receiveByNic`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (tvecResponse.data.rowCount > 0) {
              setEducationalBodiesTabUpdate(true);
              setEducationNumber(tvecResponse.data.rows[0].nic_number);
            } else {
              try {
                //Technical College
                const technicalCollegeResponse = await axios.post(
                  `http://${server_port}:4000/api/other-educational-bodies/tvec/receiveByNic`,
                  {
                    nic_number: formData.nic_number,
                  }
                );
                if (technicalCollegeResponse.data.rowCount > 0) {
                  setEducationalBodiesTabUpdate(true);
                  setEducationNumber(
                    technicalCollegeResponse.data.rows[0].nic_number
                  );
                } else {
                  try {
                    //TEACHER TRAINING
                    const tvecResponse = await axios.post(
                      `http://${server_port}:4000/api/other-educational-bodies/teacher-training/receiveByNic`,
                      {
                        nic_number: formData.nic_number,
                      }
                    );
                    if (tvecResponse.data.rowCount > 0) {
                      setEducationalBodiesTabUpdate(true);
                      setEducationNumber(tvecResponse.data.rows[0].nic_number);
                    } else {
                      try {
                        //ICHEM
                        const technicalCollegeResponse = await axios.post(
                          `http://${server_port}:4000/api/other-educational-bodies/ichem/receiveByNic`,
                          {
                            nic_number: formData.nic_number,
                          }
                        );
                        if (technicalCollegeResponse.data.rowCount > 0) {
                          setEducationalBodiesTabUpdate(true);
                          setEducationNumber(
                            technicalCollegeResponse.data.rows[0].nic_number
                          );
                        } else {
                          setEducationaNull(true);
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              } catch (error) {}
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
      // epf
      try {
        const epfResponse = await axios.post(
          `http://${server_port}:4000/api/epf/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (epfResponse.data.rowCount > 0) {
          setEpfTabUpdate(true);
          setEpfNumber(epfResponse.data.rows[0].nic_number);
        } else {
          setEpfNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const etfResponse = await axios.post(
          `http://${server_port}:4000/api/etf/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (etfResponse.data.rowCount > 0) {
          setEtfTabUpdate(true);
          setEtfNumber(etfResponse.data.rows[0].nic_number);
        } else {
          setEtfNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      // Uni
      try {
        const universityResponse = await axios.post(
          `http://${server_port}:4000/api/university/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (universityResponse.data.rowCount > 0) {
          setUniversityTabUpdate(true);
          setuniversityNumber(universityResponse.data.rows[0].nic_number);
        } else {
          setuniversityNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // School
      try {
        const schoolResponse = await axios.post(
          `http://${server_port}:4000/api/school/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (schoolResponse.data.rowCount > 0) {
          setSchoolTabUpdate(true);
          setSchoolNumber(schoolResponse.data.rows[0].nic_number);
        } else {
          setSchoolNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Driving Offense
      try {
        const drivingOffenseResponse = await axios.post(
          `http://${server_port}:4000/api/driving-offense/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (drivingOffenseResponse.data.rowCount > 0) {
          setDrivingOffenseTabUpdate(true);
          setDrivingOffenseNumber(
            drivingOffenseResponse.data.rows[0].nic_number
          );
        } else {
          setDrivingOffenseNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Network
      try {
        const networkResponse = await axios.post(
          `http://${server_port}:4000/api/network/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (networkResponse.data.rowCount > 0) {
          setNetworkTabUpdate(true);
          setNetworkNumber(networkResponse.data.rows[0].nic_number);
        } else {
          setNetworkNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      // Taxi
      try {
        const taxiResponse = await axios.post(
          `http://${server_port}:4000/api/taxi/uber/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (taxiResponse.data.rowCount > 0) {
          setTaxiTabUpdate(true);
          setTaxiNumber(taxiResponse.data.rows[0].nic_number);
        } else {
          setTaxiNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Medical Council
      try {
        const medicalCouncilResponse = await axios.post(
          `http://${server_port}:4000/api/sri-lanka-medical-council/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (medicalCouncilResponse.data.rowCount > 0) {
          setMedicalCouncilTabUpdate(true);
          setMedicalCouncilNumber(
            medicalCouncilResponse.data.rows[0].nic_number
          );
        } else {
          setMedicalCouncilNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Device Registration
      try {
        const deviceRegistrationResponse = await getMyDevicesByNICApi({
          nic_number: formData.nic_number,
        });
        if (deviceRegistrationResponse.rowCount > 0) {
          setDeviceRegistrationTabUpdate(true);
          setDeviceRegistrationNumber(
            deviceRegistrationResponse.rows[0].nic_number
          );
        } else {
          setDeviceRegistrationNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Hospital
      try {
        const hospitalResponse = await fetchHospitalByNicApi(
          formData.nic_number
        );
        if (hospitalResponse.rowCount > 0) {
          setHospitalTabUpdate(true);
          setHospitalNumber(hospitalResponse.rows[0].nic_number);
        } else {
          setHospitalNull(true);
        }
      } catch (error) {
        console.error(error);
      }
      // Emission Certificate
      try {
        const emissionResponse = await fetchVehicleEmissionByNicApi(
          formData.nic_number
        );
        if (emissionResponse.rowCount > 0) {
          setVehicleEmissionTabUpdate(true);
          setVehicleEmissionNumber(emissionResponse.rows[0].nic_number);
        } else {
          setVehicleEmissionNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Insurance Certificate
      try {
        const insuranceResponse = await fetchLolcVehicleInsuranceApi(
          formData.nic_number
        );
        if (insuranceResponse.rowCount > 0) {
          setVehicleInsuranceTabUpdate(true);
          setVehicleInsuranceNumber(insuranceResponse.rows[0].nic_number);
        } else {
          setVehicleInsuranceNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Vehicle Revenue - DSR
      try {
        const vehicleRevenueResponse =
          await recieveVehicleRevenueLicenseDataByNicApi(formData.nic_number);
        if (vehicleRevenueResponse.rowCount > 0) {
          setVehicleRevenueTabUpdate(true);
          setVehicleRevenueNumber(vehicleRevenueResponse.rows[0].nic_number);
        } else {
          setVehicleRevenueNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Atomic Energy Authority
      try {
        const atomicEnergyAuthorityResponse = await axios.post(
          `http://${server_port}:4000/api/atomic-enerygy-authority/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (atomicEnergyAuthorityResponse.data.rowCount > 0) {
          setAtomicEnergyAuthorityTabUpdate(true);
          setAtomicEnergyAuthorityNumber(
            atomicEnergyAuthorityResponse.data.rows[0].nic_number
          );
        } else {
          setAtomicEnergyAuthorityNull(true);
        }
      } catch (error) {
        console.error(error);
      }

      // Car park
      try {
        const carParkServicesOneGalleFaceResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/one-galle-face/receiveByNic`,
          {
            nic_number: formData.nic_number,
          }
        );
        if (carParkServicesOneGalleFaceResponse.data.rowCount > 0) {
          setCarParkTabUpdate(true);
          setCarParkNumber(
            carParkServicesOneGalleFaceResponse.data.rows[0].nic_number
          );
        } else {
          const carParkServicesColomboCityResponse = await axios.post(
            `http://${server_port}:4000/api/car-park-services/colombo-city-centre/receiveByNic`,
            {
              nic_number: formData.nic_number,
            }
          );
          if (carParkServicesColomboCityResponse.data.rowCount > 0) {
            setCarParkTabUpdate(true);
            setCarParkNumber(
              carParkServicesColomboCityResponse.data.rows[0].nic_number
            );
          } else {
            const carParkServicesDelmonHospitalResponse = await axios.post(
              `http://${server_port}:4000/api/car-park-services/delmon-hospital/receiveByNic`,
              {
                nic_number: formData.nic_number,
              }
            );
            if (carParkServicesDelmonHospitalResponse.data.rowCount > 0) {
              setCarParkTabUpdate(true);
              setCarParkNumber(
                carParkServicesDelmonHospitalResponse.data.rows[0].nic_number
              );
            } else {
              const carParkServicesNawalokaResponse = await axios.post(
                `http://${server_port}:4000/api/car-park-services/nawaloka-hospital/receiveByNic`,
                {
                  nic_number: formData.nic_number,
                }
              );
              if (carParkServicesNawalokaResponse.data.rowCount > 0) {
                setCarParkTabUpdate(true);
                setCarParkNumber(
                  carParkServicesNawalokaResponse.data.rows[0].nic_number
                );
              } else {
                setCarParkNull(true);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }

      //Police watch dog
      try {
        const MyDevicesResponse = await recieveDevicesListByNicApi(
          formData.nic_number
        );
        if (MyDevicesResponse.rowCount > 0) {
          setPoliceWatchDogTabUpdate(true);
          setPoliceWatchDogNumber(MyDevicesResponse.rows[0].nic_number);
        } else {
          try {
            const missingPetResponse = await fetchMissingPetListByNicApi(
              formData.nic_number
            );
            if (missingPetResponse.rowCount > 0) {
              setPoliceWatchDogTabUpdate(true);
              setPoliceWatchDogNumber(missingPetResponse.rows[0].nic_number);
            } else {
              try {
                const missingPetResponse =
                  await fetchMissingVehicleListByNicApi(formData.nic_number);
                if (missingPetResponse.rowCount > 0) {
                  setPoliceWatchDogTabUpdate(true);
                  setPoliceWatchDogNumber(
                    missingPetResponse.rows[0].nic_number
                  );
                } else {
                  setPoliceWatchDogNull(true);
                }
              } catch (error) {}
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }

      //Last bracket for nic
    }

    //License Number
    if (formData.license_number != "") {
      try {
        const licenseResponse = await recieveLicenseDataByLicenseNumber(
          formData.license_number
        );

        if (licenseResponse.rowCount > 0) {
          setLicenseTapUpdate(true);
          setLicenseNumber(licenseResponse.rows[0].license_number);
          try {
            const nicResponse = await axios.post(
              `http://${server_port}:4000/api/nic/receive`,
              {
                nic_number: licenseResponse.rows[0].nic_number,
              }
            );
            if (nicResponse.data.rowCount > 0) {
              setNicTabUpdate(true);
              setNicNumber(nicResponse.data.rows[0].nic_number);
              try {
                const passportResponse = await axios.post(
                  `http://${server_port}:4000/api/passport/receiveByNic`,
                  {
                    nic_number: nicResponse.data.rows[0].nic_number,
                  }
                );
                if (passportResponse.data.rowCount > 0) {
                  setPassportTabUpdate(true);
                  setPassportNumber(
                    passportResponse.data.rows[0].passport_number
                  );
                } else {
                  setPassportNull(true);
                }
              } catch (error) {
                console.error(error);
              }
            } else {
              setNicNull(true);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          setLicenseNull(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className="mx-12 my-12">
      <div className="">
        {/* <Tab nicTabUpdate={nicTabUpdate} passportNumber={passportNumber} nicNumber={nicNumber} passportTabUpdate={passportTabUpdate} licenseTabUpdate={licenseTabUpdate} licenseNumber={licenseNumber} /> */}

        <NSEResults
          nicTabUpdate={nicTabUpdate}
          nicNumber={nicNumber}
          nicNull={nicNull}
          nicLoader={nicLoader}
          passportNumber={passportNumber}
          passportTabUpdate={passportTabUpdate}
          passportNull={passportNull}
          passportLoader={passportLoader}
          licenseTabUpdate={licenseTabUpdate}
          licenseNumber={licenseNumber}
          licenseNull={licenseNull}
          licenseLoader={licenseLoader}
          stateBankTabUpdate={stateBankTabUpdate}
          stateBankAccountNumber={stateBankAccountNumber}
          stateBankNull={stateBankNull}
          vehicleRegistrationTabUpdate={vehicleRegistrationTabUpdate}
          vehicleRegistrationNumber={vehicleRegistrationNumber}
          vehicleRegistrationNull={vehicleRegistrationNull}
          voterRegistrationTabUpdate={voterRegistrationTabUpdate}
          voterRegistrationNumber={voterRegistrationNumber}
          voterRegistrationNull={voterRegistrationNull}
          electionCommissionTabUpdate={electionCommissionTabUpdate}
          electionCommissionNumber={electionCommissionNumber}
          electionCommissionNull={electionCommissionNull}
          electionCommissionLoader={electionCommissionLoader}
          expresswayTabUpdate={expresswayTabUpdate}
          expresswayNumber={expresswayNumber}
          expresswayNull={expresswayNull}
          teacherTrainingTabUpdate={teacherTrainingTabUpdate}
          teacherTrainingNumber={teacherTrainingNumber}
          teacherTrainingNull={teacherTrainingNull}
          exciseTabUpdate={exciseTabUpdate}
          exciseNumber={exciseNumber}
          exciseNull={exciseNull}
          technicalCollegeTabUpdate={technicalCollegeTabUpdate}
          technicalCollegeNumber={technicalCollegeNumber}
          technicalCollegeNull={technicalCollegeNull}
          companyTabUpdate={companyTabUpdate}
          companyNumber={companyNumber}
          companyNull={companyNull}
          cribTabUpdate={cribTabUpdate}
          cribNumber={cribNumber}
          cribNull={cribNull}
          ceaLicenseTabUpdate={ceaLicenseTabUpdate}
          ceaLicenseNumber={ceaLicenseNumber}
          ceaLicenseNull={ceaLicenseNull}
          inlandRevenueTabUpdate={inlandRevenueTabUpdate}
          inlandRevenueNumber={inlandRevenueNumber}
          inlandRevenueNull={inlandRevenueNull}
          transportCommissionTabUpdate={transportCommissionTabUpdate}
          transportCommissionNumber={transportCommissionNumber}
          transportCommissionNull={transportCommissionNull}
          councilTabUpdate={councilTabUpdate}
          councilNumber={councilNumber}
          councilNumberNull={councilNumberNull}
          educationalBodiesTabUpdate={educationalBodiesTabUpdate}
          educationNumber={educationNumber}
          educationNull={educationNull}
          gemTabUpdate={gemTabUpdate}
          gemNumber={gemNumber}
          gemNull={gemNull}
          epfTabUpdate={epfTabUpdate}
          epfNumber={epfNumber}
          epfNull={epfNull}
          etfTabUpdate={etfTabUpdate}
          etfNumber={etfNumber}
          etfNull={etfNull}
          universityTabUpdate={universityTabUpdate}
          universityNumber={universityNumber}
          universityNull={universityNull}
          schoolTabUpdate={schoolTabUpdate}
          schoolNumber={schoolNumber}
          schoolNull={schoolNull}
          carParkTabUpdate={carParkTabUpdate}
          carParkNumber={carParkNumber}
          carParkNull={carParkNull}
          foreignEmploymentBureauTabUpdate={foreignEmploymentBureauTabUpdate}
          foreignEmploymentNumber={foreignEmploymentNumber}
          foreignEmploymentNull={foreignEmploymentNull}
          policeWatchDogTabUpdate={policeWatchDogTabUpdate}
          policeWatchDogNumber={policeWatchDogNumber}
          policeWatchDogNull={policeWatchDogNull}
          hospitalTabUpdate={hospitalTabUpdate}
          hospitalNumber={hospitalNumber}
          hospitalNull={hospitalNull}
          drivingOffenseTabUpdate={drivingOffenseTabUpdate}
          drivingOffenseNumber={drivingOffenseNumber}
          drivingOffenseNull={drivingOffenseNull}
          deviceRegistrationTabUpdate={deviceRegistrationTabUpdate}
          deviceRegistrationNumber={deviceRegistrationNumber}
          deviceRegistartionNull={deviceRegistartionNull}
          networkTabUpdate={networkTabUpdate}
          networkNumber={networkNumber}
          networkNull={networkNull}
          taxiTabUpdate={taxiTabUpdate}
          taxiNumber={taxiNumber}
          taxiNull={taxiNull}
          medicalCouncilTabUpdate={medicalCouncilTabUpdate}
          medicalCouncilNumber={medicalCouncilNumber}
          medicalCouncilNull={medicalCouncilNull}
          vehicleEmissionTabUpdate={vehicleEmissionTabUpdate}
          vehicleEmissionNumber={vehicleEmissionNumber}
          vehicleEmissionNull={vehicleEmissionNull}
          vehicleInsuranceTabUpdate={vehicleInsuranceTabUpdate}
          vehicleInsuranceNumber={vehicleInsuranceNumber}
          vehicleInsuranceNull={vehicleInsuranceNull}
          vehicleRevenueTabUpdate={vehicleRevenueTabUpdate}
          vehicleRevenueNumber={vehicleRevenueNumber}
          vehicleRevenueNull={vehicleRevenueNull}
          atomicEnergyAuthorityTabUpdate={atomicEnergyAuthorityTabUpdate}
          atomicEnergyAuthorityNumber={atomicEnergyAuthorityNumber}
          atomicEnergyAuthorityNull={atomicEnergyAuthorityNull}
        />

        <div className="bg-white rounded-lg  p-4 mt-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="nic_number"
                id="nic_number"
                className="block py-1.5 px-0 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black border-4 border-black rounded-lg"
                placeholder=" "
                onChange={handleChange}
              />
              <label
                htmlFor="nic_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                onChange={handleChange}
                value=""
              >
                National Identity Card
              </label>
            </div>
            <div className="relative z-0 w-full  group">
              <input
                type="text"
                name="passport_number"
                id="passport_number"
                className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-4 border-black rounded-lg"
                placeholder=" "
                onChange={handleChange}
                value={formData.passport_number}
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                onChange={() => {}}
                value=""
              >
                Passport Number
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="license_number"
                id="license_number"
                className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-4 border-black rounded-lg"
                placeholder=" "
                onChange={handleChange}
                value={formData.license_number}
              />
              <label
                htmlFor="table_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                onChange={() => {}}
                value=""
              >
                License Number
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="vehicle_number"
                id="vehicle_number"
                className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-4 border-black rounded-lg"
                placeholder=" "
                onChange={handleChange}
                value={formData.vehicle_number}
              />
              <label
                htmlFor="vehicle_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
              >
                Vehicle Number
              </label>
            </div>
            {/* <div className="relative z-0 w-full mb-6 group">
              <input type="date" name="dob" id="dob" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} value={formData.dob} />
              <label htmlFor="dob" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => { }} value=''>Date of Birth</label>
            </div> */}
            <div className="relative z-0 mx-auto w-full group flex justify-between gap-12">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-36 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 "
              >
                <AiOutlineSearch className="my-auto" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Nse_Deleted;
