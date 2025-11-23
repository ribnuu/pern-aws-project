import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import NSEResults from "../../components/NSEResults";
import {
  updateWesDepartmentForeignEmploymentBureauTrue,
  updateWesDepartmentVehicleEmissionTrue,
  updateWesDepartmentEPFTrue,
  updateWesDriverOffensePortalTrue,
  updateWesDepartmentForeignEmploymentBureauFalse,
  updateWesDepartmentVehicleEmissionFalse,
  updateWesDepartmentEPFFalse,
  updateWesDriverOffensePortalFalse,
} from "./SourceFunction";
import { getMyDevicesByNICApi } from "../../apis/DevicesApiService";
import { getVehiclesByNicNumberApi } from "../../apis/MyVehiclesApiService";
import { getVoterByNicApi } from "../../apis/VoterApiService";
import { customsRecieveIndividualByNICApi } from "../../apis/CustomsApiService";
import {
  fetchBirthParentsByNic,
  fetchMarriageCertificateByNicApi,
} from "../../apis/BirthApiService";
import { fetchCitizenCodeNumberByNicApi } from "../../apis/CitizenCodeNumberApiService";
import { fetchFamilyChartByNicApi } from "../../apis/FamilyChartApiService";
import {
  fetchMissingPetListByNicApi,
  fetchMissingVehicleListByNicApi,
  recieveDevicesListByNicApi,
} from "../../apis/PoliceWatchDogSystemApiService";
import { fetchHospitalByNicApi } from "../../apis/HospitalApiService";
import { fetchCompanyByNicApi } from "../../apis/CompanyApiService";
import {
  fetchLolcVehicleInsuranceApi,
  fetchPeoplesVehicleInsuranceApi,
} from "../../apis/VehicleInsuranceApiService";
import { fetchOrdinaryLevelBYNicApi } from "../../apis/OrdinaryLevelApiService";
import { fetchVehicleEmissionByNicApi } from "../../apis/VehicleEmissionApiService";
import {
  fetchComplaintAssaultByNicApi,
  fetchComplaintAssaulterByNicApi,
  fetchComplaintDevicesByNicApi,
  fetchComplaintMissingLicenseByNicApi,
  fetchComplaintMissingNicByNicApi,
  fetchComplaintMissingPersonByNicApi,
} from "../../apis/ComplaintApiService";
import { recieveVehicleRevenueLicenseDataByNicApi } from "../../apis/VehicleRevenueLicenseApiService";
import {
  recieveLicenseDataByLicenseNumber,
  recieveLicenseDataByNicApi,
} from "../../apis/LicenseApiService";
import { receiveNicByVehcileNumber } from "../../apis/NICApiService";
import {
  receieveByNICTransportCommissionApi,
  receieveByVehicleNumberTransportCommissionApi,
} from "../../apis/TransportCommissionApiService";
import { taxiyakReceiveAccountDetailsByVehicleNICNumber } from "../../apis/TaxiApiService";

const NationalSearchEngine = () => {
  const [userId, setuserId] = useState("");
  const [workStationId, setworkStationId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [Message, setMessage] = useState("");
  const [SearchUserExists, setSearchUserExists] = useState(false);
  const [nicTabUpdate, setNicTabUpdate] = useState(false);
  const [passportTabUpdate, setPassportTabUpdate] = useState(false);
  const [vehicleRegistrationTabUpdate, setVehicleRegistrationTabUpdate] =
    useState(false);
  const [electionCommissionTabUpdate, setElectionCommissionTabUpdate] =
    useState(false);

  //voters registration
  const [voterRegistrationTabUpdate, setVoterRegistrationTabUpdate] =
    useState(false);
  const [VoterRegistrationLoader, setVoterRegistrationLoader] = useState(false);

  //License
  const [LicenseLoader, setLicenseLoader] = useState(false);
  const [licenseTabUpdate, setLicenseTapUpdate] = useState(false);

  //Expressway
  const [expresswayTabUpdate, setExpresswayTabUpdate] = useState(false);
  const [
    expresswayVehicleNumberTabUpdate,
    setExpresswayVehicleNumberTabUpdate,
  ] = useState(false);
  const [expresswayVehicleNumber, setExpresswayVehicleNumber] = useState("");

  const [nicNumber, setNicNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState("");
  const [voterRegistrationNumber, setVoterRegistrationNumber] = useState("");
  const [electionCommissionNumber, setElectionCommissionNumber] = useState("");
  const [expresswayNumber, setExpresswayNumber] = useState("");

  const [passportNull, setPassportNull] = useState(null);
  const [licenseNull, setLicenseNull] = useState(null);
  const [nicNull, setNicNull] = useState(null);
  const [vehicleRegistrationNull, setVehicleRegistrationNull] = useState(null);
  const [voterRegistrationNull, setVoterRegistrationNull] = useState(null);
  const [electionCommissionNull, setElectionCommissionNull] = useState(null);
  const [expresswayNull, setExpresswayNull] = useState(null);

  //State bank
  const [stateBankAccountNumber, setStateBankAccountNumber] = useState("");
  const [stateBankNull, setStateBankNull] = useState(null);
  const [stateBankTabUpdate, setStateBankTapUpdate] = useState(false);
  const [StateBankLoader, setStateBankLoader] = useState(false);

  // Teacher Training
  const [teacherTrainingTabUpdate, setTeacherTrainingTabUpdate] =
    useState(false);
  const [teacherTrainingNumber, setTeacherTrainingNumber] = useState("");
  const [teacherTrainingNull, setTeacherTrainingyNull] = useState(null);

  // Excise
  const [exciseTabUpdate, setExciseTabUpdate] = useState(false);
  const [exciseNumber, setExciseNumber] = useState("");
  const [exciseNull, setExciseNull] = useState(null);
  const [ExciseLoader, setExciseLoader] = useState(false);
  // Technical College
  const [technicalCollegeTabUpdate, setTechnicalCollegeTabUpdate] =
    useState(false);
  const [technicalCollegeNumber, setTechnicalCollegeNumber] = useState("");
  const [technicalCollegeNull, setTechnicalCollegeNull] = useState(null);

  // Company
  const [companyTabUpdate, setCompanyTabUpdate] = useState(false);
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyNull, setCompanyNull] = useState(null);
  const [CompanyLoader, setCompanyLoader] = useState(false);

  // Crib
  const [cribTabUpdate, setCribTabUpdate] = useState(false);
  const [cribNumber, setCribNumber] = useState("");
  const [cribNull, setCribNull] = useState(null);
  const [CribLoader, setCribLoader] = useState(false);

  // Cea License
  const [ceaLicenseTabUpdate, setCeaLicenseTabUpdate] = useState(false);
  const [ceaLicenseNumber, setCeaLicenseNumber] = useState("");
  const [ceaLicenseNull, setCeaLicenseNull] = useState(null);
  const [CeaLoader, setCeaLoader] = useState(false);

  // Inland Revenue
  const [inlandRevenueTabUpdate, setInlandRevenueTabUpdate] = useState(false);
  const [inlandRevenueNumber, setInlandRevenueNumber] = useState("");
  const [inlandRevenueNull, setInlandRevenueNull] = useState(null);
  const [InlandRevenueLoader, setInlandRevenueLoader] = useState(false);

  // Airlines
  const [airlinesTabUpdate, setAirlinesTabUpdate] = useState(false);
  const [airlinesNumber, setAirlinesNumber] = useState("");
  const [airlinesNull, setAirlinesNull] = useState(null);
  const [AirlineLoader, setAirlineLoader] = useState(false);

  // Transport Commission
  const [transportCommissionTabUpdate, setTransportCommissionTabUpdate] =
    useState(false);
  const [
    transportCommissionVehicleNumberTabUpdate,
    setTransportCommissionVehicleNumberTabUpdate,
  ] = useState(false);
  const [
    transportCommissionVehicleNumber,
    setTransportCommissionVehicleNumber,
  ] = useState("");
  const [transportCommissionNumber, setTransportCommissionNumber] =
    useState("");
  const [transportCommissionNull, setTransportCommissionNull] = useState(null);

  // Council
  const [councilTabUpdate, setCouncilTabUpdate] = useState(false);
  const [councilNumber, setCouncilNumber] = useState();
  const [councilNumberNull, setCouncilNumberNull] = useState(null);
  const [CouncilLoader, setCouncilLoader] = useState(false);

  // EducationalBodies
  const [educationalBodiesTabUpdate, setEducationalBodiesTabUpdate] =
    useState(false);
  const [educationNumber, setEducationNumber] = useState();
  const [educationNull, setEducationaNull] = useState(null);
  const [EducationLoader, setEducationLoader] = useState(false);

  // Gem
  const [gemTabUpdate, setGemTabUpdate] = useState(false);
  const [gemNumber, setGemNumber] = useState();
  const [gemNull, setGemNull] = useState(null);
  const [GemLoader, setGemLoader] = useState(false);

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
  const [carParkVehicleNumberTabUpdate, setCarParkVehicleNumberTabUpdate] =
    useState(false);
  const [carParkVehicleNumber, setCarParkVehicleNumber] = useState("");
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
  const [taxiVehicleNumberTabUpdate, setTaxiVehicleNumberTabUpdate] =
    useState("");
  const [taxiVehicleNumber, setVehicleTaxiVehicleNumber] = useState();
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

  // Examination
  const [examinationTabUpdate, setExaminationTabUpdate] = useState(false);
  const [examinationNumber, setExaminationNumber] = useState();
  const [examinationNull, setExaminationNull] = useState(null);
  const [ExaminationLoader, setExaminationLoader] = useState(false);

  // Immigration
  const [immigrationTabUpdate, setImmigrationTabUpdate] = useState(false);
  const [immigrationNumber, setImmigrationNumber] = useState();
  const [immigrationNull, setImmigrationNull] = useState(null);
  const [ImmigrationLoader, setImmigrationLoader] = useState(false);

  // Customs
  const [customsTabUpdate, setCustomsTabUpdate] = useState(false);
  const [customsNumber, setCustomsNumber] = useState();
  const [customsNull, setCustomsNull] = useState(null);

  // Who Else Search
  const [whoElseSearchTabUpdate, setWhoElseSearchTabUpdate] = useState(false);
  const [whoElseSearchNumber, setWhoElseSearchNumber] = useState();
  const [whoElseSearchNull, setWhoElseSearchNull] = useState(null);

  //Police Complaint
  const [policeComplaintTabUpdate, setPoliceComplaintTabUpdate] =
    useState(false);
  const [policeComplaintNumber, setPoliceComplaitNumber] = useState();
  const [policeComplaintNull, setPoliceComplaintNull] = useState(null);

  // Atomic Energy Authority
  const [atomicEnergyAuthorityTabUpdate, setAtomicEnergyAuthorityTabUpdate] =
    useState(false);
  const [atomicEnergyAuthorityNumber, setAtomicEnergyAuthorityNumber] =
    useState();
  const [atomicEnergyAuthorityNull, setAtomicEnergyAuthorityNull] =
    useState(null);

  //Family chart diagram
  const [FamilyChartDiagramTabUpdate, setFamilyChartDiagramTabUpdate] =
    useState("");
  const [FamilyChartDiagramNumber, setFamilyChartDiagramNumber] = useState("");
  const [FamilyChartDiagramNull, setFamilyChartDiagramNull] = useState("");

  //Citizen Code Number
  const [CitizenCodeNumberTabUpdate, setCitizenCodeNumberTabUpdate] =
    useState(false);
  const [CitizenCodeNumber, setCitizenCodeNumber] = useState("");
  const [CitizenCodeNull, setCitizenCodeNull] = useState(null);

  //Children Tuition Services
  const [
    ChildrenTuitionServicesTabUpdate,
    setChildrenTuitionServicesTabUpdate,
  ] = useState("");
  const [ChildrenTuitionServicesNumber, setChildrenTuitionServicesNumber] =
    useState("");
  const [ChildrenTuitionNull, setChildrenTuitionNull] = useState("");

  //Children School Services
  const [ChildrenSchoolServicesTabUpdate, setChildrenSchoolServicesTabUpdate] =
    useState("");
  const [ChildrenSchoolServicesNumber, setChildrenSchoolServicesNumber] =
    useState("");
  const [ChildrenSchoolNull, setChildrenSchoolNull] = useState("");

  //Children School Services
  const [
    ChildrenTransportServicesTabUpdate,
    setChildrenTransportServicesTabUpdate,
  ] = useState("");
  const [ChildrenTransportServicesNumber, setChildrenTransportServicesNumber] =
    useState("");
  const [ChildrenTransportNull, setChildrenTransportNull] = useState("");

  //Birth Marriage Death
  const [BirthMarriageDeathTabUpdate, setBirthMarriageDeathTabUpdate] =
    useState("");
  const [BirthMarriageDeathNumber, setBirthMarriageDeathNumber] = useState("");
  const [BirthMarriageDeathNull, setBirthMarriageDeathNull] = useState("");

  //Loaders need to be completed

  const [nicLoader, setNicLoader] = useState(null);
  const [passportLoader, setPassportLoader] = useState(null);
  const [electionCommissionLoader, setElectionCommissionLoader] =
    useState(null);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    nic_number: "",
    passport_number: "",
    license_number: "",
    vehicle_number: "",
    citizen_code_number: "",
  });

  const initializeSearch = async (data) => {
    const searched_by = data;
    let workstationIdToCheck = localStorage.getItem("workstation_id");
    let userIdToCheck = localStorage.getItem("user_id");
    try {
      const searchExistResponse = await axios.post(
        `http://${server_port}:4000/api/nse/initialSearchForUser`,
        {
          user_id_to_check: userIdToCheck,
          workstation_id_to_check: workstationIdToCheck,
        }
      );
      if (searchExistResponse.data.rowCount > 0) {
        if (searchExistResponse.data.rows[0].user_id == userIdToCheck) {
          console.log(userIdToCheck + " user");
          setMessage("User Id");
        } else {
          console.log(workstationIdToCheck + " workstation");
          setMessage("Workstation Id");
        }

        setSearchUserExists(true);
      } else {
        console.log("Insert into WES TEMP");
        try {
          const initialSearchResponse = await axios.post(
            `http://${server_port}:4000/api/wes/createWesTemp`,
            {
              searched_by,
              latitude,
              longitude,
              user_id: userId,
              workstation_id: workStationId,
            }
          );
          if (formData.vehicle_number !== "") {
            console.log(formData.vehicle_number);
            searchByVehicleNumber(formData.vehicle_number);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const terminateSearch = async () => {
    setSearchUserExists(false);
    try {
      const terminateSearchResponse = await axios.post(
        `http://${server_port}:4000/api/nse/terminateSearch`,
        {
          userId,
          workStationId,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const searchCustomsIndividualByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const expressWayNicResponse =
        await await customsRecieveIndividualByNICApi(nic_number_to_search);
      if (expressWayNicResponse.rowCount > 0) {
        setCustomsTabUpdate(true);
        setCustomsNumber(nic_Number);
      } else {
        setCustomsNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchImmigrationByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setImmigrationLoader(true);
    try {
      const immigrationAirportResponse = await axios.post(
        `http://${server_port}:4000/api/airport/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (immigrationAirportResponse.data.rowCount > 0) {
        setImmigrationTabUpdate(true);
        setImmigrationLoader(false);
        setImmigrationNumber(nic_Number);
      } else {
        try {
          const immigrationPortResponse = await axios.post(
            `http://${server_port}:4000/api/port/receiveByNic`,
            {
              nic_number: nic_Number,
            }
          );
          if (immigrationPortResponse.data.rowCount > 0) {
            setImmigrationTabUpdate(true);
            setImmigrationLoader(false);
            setImmigrationNumber(nic_Number);
          } else {
            setImmigrationLoader(false);
            setImmigrationNull(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCarParkServicesByVehicleNumber = async (
    vehicle_number_to_search
  ) => {
    const vehicle_number = vehicle_number_to_search;
    console.log(vehicle_number);
    try {
      const carParkServicesOneGalleFaceResponse = await axios.post(
        `http://${server_port}:4000/api/car-park-services/one-galle-face/receiveCarParkOneGalleFaceByVehicleNumber`,
        {
          vehicle_number,
        }
      );
      if (carParkServicesOneGalleFaceResponse.data.rowCount > 0) {
        setCarParkVehicleNumberTabUpdate(true);
        setCarParkVehicleNumber(vehicle_number);
      } else {
        const carParkServicesColomboCityResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/colombo-city-centre/receiveCarParkColomboCityCentreByVehicleNumber`,
          {
            vehicle_number,
          }
        );
        if (carParkServicesColomboCityResponse.data.rowCount > 0) {
          setCarParkVehicleNumberTabUpdate(true);
          setCarParkVehicleNumber(vehicle_number);
        } else {
          const carParkServicesDelmonHospitalResponse = await axios.post(
            `http://${server_port}:4000/api/car-park-services/delmon-hospital/receiveCarParkDelmonHospitalByVehicleNumber`,
            {
              vehicle_number,
            }
          );
          if (carParkServicesDelmonHospitalResponse.data.rowCount > 0) {
            setCarParkVehicleNumberTabUpdate(true);
            setCarParkVehicleNumber(vehicle_number);
          } else {
            const carParkServicesNawalokaResponse = await axios.post(
              `http://${server_port}:4000/api/car-park-services/nawaloka-hospital/receiveCarParkNawalokaHospitalByVehicleNumber`,
              {
                vehicle_number,
              }
            );
            if (carParkServicesNawalokaResponse.data.rowCount > 0) {
              setCarParkVehicleNumberTabUpdate(true);
              setCarParkVehicleNumber(vehicle_number);
            } else {
              setCarParkNull(true);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchExpressWayByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const expressWayNicResponse = await axios.post(
        `http://${server_port}:4000/api/expressway/receiveByNic`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      if (expressWayNicResponse.data.rowCount > 0) {
        setExpresswayTabUpdate(true);
        setExpresswayNumber(expressWayNicResponse.data.rows[0].nic_number);
      } else {
        setExpresswayNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchChildrenTuitionServicesByNicNumber = async (
    nic_number_to_search
  ) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const childrenTuitionServicesResponse = await axios.post(
        `http://${server_port}:4000/api/tuition/receiveTuitionChildByNic`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      console.log(childrenTuitionServicesResponse.data.rows);
      if (childrenTuitionServicesResponse.data.rowCount > 0) {
        setChildrenTuitionServicesTabUpdate(true);
        setChildrenTuitionServicesNumber(nicNumberToSearch);
      } else {
        setChildrenTuitionNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchChildrenTransportServicesByNicNumber = async (
    nic_number_to_search
  ) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const childrenTransportServicesResponse = await axios.post(
        `http://${server_port}:4000/api/transport/receiveTransportChildByNic`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      console.log(childrenTransportServicesResponse.data.rows);
      if (childrenTransportServicesResponse.data.rowCount > 0) {
        setChildrenTransportServicesTabUpdate(true);
        setChildrenTransportServicesNumber(nicNumberToSearch);
      } else {
        setChildrenTransportNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchChildrenSchoolServicesByNicNumber = async (
    nic_number_to_search
  ) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const childrenSchoolServicesResponse = await axios.post(
        `http://${server_port}:4000/api/school/receiveSchoolChildByNic`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      console.log(childrenSchoolServicesResponse.data.rows);
      if (childrenSchoolServicesResponse.data.rowCount > 0) {
        setChildrenSchoolServicesTabUpdate(true);
        setChildrenSchoolServicesNumber(nicNumberToSearch);
      } else {
        setChildrenSchoolNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchExpressWayByVehicleNumber = async (vehicle_number_to_search) => {
    const vehicleNumberToSearch = vehicle_number_to_search;
    try {
      const expresswayResponse = await axios.post(
        `http://${server_port}:4000/api/expressway/receiveByVehicleNumber`,
        {
          vehicle_number: vehicleNumberToSearch,
        }
      );
      if (expresswayResponse.data.rowCount > 0) {
        setExpresswayVehicleNumberTabUpdate(true);
        setExpresswayVehicleNumber(
          expresswayResponse.data.rows[0].vehicle_number
        );
      } else {
        setExpresswayNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVotersRegistrationByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    setVoterRegistrationLoader(true);
    try {
      const voterRegistrationResponse = await getVoterByNicApi({
        nic_number: nicNumberToSearch,
      });
      if (voterRegistrationResponse.rowCount > 0) {
        setVoterRegistrationLoader(false);
        setVoterRegistrationNumber(
          voterRegistrationResponse.rows[0].nic_number
        );
        setVoterRegistrationTabUpdate(true);
      } else {
        setVoterRegistrationLoader(false);
        setVoterRegistrationNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchForeignEmploymentBureauByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const foreignEmploymentBureauResponse = await axios.post(
        `http://${server_port}:4000/api/foreign-employment-bureau/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (foreignEmploymentBureauResponse.data.rowCount > 0) {
        setForeignEmploymentBureauTabUpdate(true);
        setForeignEmploymentNumber(nic_Number);
        updateWesDepartmentForeignEmploymentBureauTrue(userId, workStationId);
      } else {
        updateWesDepartmentForeignEmploymentBureauFalse(userId, workStationId);
        setforeignEmploymentNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchDriverOffensePortalByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const drivingOffenseResponse = await axios.post(
        `http://${server_port}:4000/api/driving-offense/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (drivingOffenseResponse.data.rowCount > 0) {
        setDrivingOffenseTabUpdate(true);
        setDrivingOffenseNumber(nic_Number);
        updateWesDriverOffensePortalTrue(userId, workStationId);
      } else {
        updateWesDriverOffensePortalFalse(userId, workStationId);
        setDrivingOffenseNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCarParkRecordsByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const carParkServicesOneGalleFaceResponse = await axios.post(
        `http://${server_port}:4000/api/car-park-services/one-galle-face/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (carParkServicesOneGalleFaceResponse.data.rowCount > 0) {
        setCarParkTabUpdate(true);
        setCarParkNumber(nic_Number);
      } else {
        const carParkServicesColomboCityResponse = await axios.post(
          `http://${server_port}:4000/api/car-park-services/colombo-city-centre/receiveByNic`,
          {
            nic_number: nic_Number,
          }
        );
        if (carParkServicesColomboCityResponse.data.rowCount > 0) {
          setCarParkTabUpdate(true);
          setCarParkNumber(nic_Number);
        } else {
          const carParkServicesDelmonHospitalResponse = await axios.post(
            `http://${server_port}:4000/api/car-park-services/delmon-hospital/receiveByNic`,
            {
              nic_number: nic_Number,
            }
          );
          if (carParkServicesDelmonHospitalResponse.data.rowCount > 0) {
            setCarParkTabUpdate(true);
            setCarParkNumber(nic_Number);
          } else {
            const carParkServicesNawalokaResponse = await axios.post(
              `http://${server_port}:4000/api/car-park-services/nawaloka-hospital/receiveByNic`,
              {
                nic_number: nic_Number,
              }
            );
            if (carParkServicesNawalokaResponse.data.rowCount > 0) {
              setCarParkTabUpdate(true);
              setCarParkNumber(nic_Number);
            } else {
              setCarParkNull(true);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchAirlineTicketingDataByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setAirlineLoader(true);
    try {
      const sriLankaAirlineResponse = await axios.post(
        `http://${server_port}:4000/api/airline/sri-lankan-airlines/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (sriLankaAirlineResponse.data.rowCount > 0) {
        setAirlineLoader(false);
        setAirlinesNumber(nic_Number);
        setAirlinesTabUpdate(true);
      } else {
        setAirlineLoader(false);
        setAirlinesNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchWhoElseSearch = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const whoElseSearchResponse = await axios.post(
        `http://${server_port}:4000/api/wes/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (whoElseSearchResponse.data.rowCount > 0) {
        setWhoElseSearchTabUpdate(true);
        setWhoElseSearchNumber(nic_Number);
      } else {
        setWhoElseSearchNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nseSearchLicense = async (license_number_to_search) => {
    const licenseNumberToSearch = license_number_to_search;
  };

  const searchNicByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    setNicLoader(true);
    try {
      const nicResponse = await axios.post(
        `http://${server_port}:4000/api/nic/receive`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      if (nicResponse.data.rowCount > 0) {
        setNicLoader(false);
        setNicNumber(nicNumberToSearch);
        setNicTabUpdate(true);
        searchVotersRegistrationByNic(nicNumberToSearch);
        searchExpressWayByNic(nicNumberToSearch);
        searchVehicleRevenueLicenseByNic(nicNumberToSearch);
        searchVehicleEmissionByNic(nicNumberToSearch);
        searchVehicleInsuranceByNic(nicNumberToSearch);
        searchBankByNic(nicNumberToSearch);
        searchTransportCommissionByNic(nicNumberToSearch);
        searchTaxiByNicNumber(nicNumberToSearch);
        searchVehicleByNic(nicNumberToSearch);
        searchExaminationByNic(nicNumberToSearch);
        searchImmigrationByNic(nicNumberToSearch);
        searchAirlineTicketingDataByNic(nicNumberToSearch);
        searchForeignEmploymentBureauByNic(nicNumberToSearch);
        searchCarParkRecordsByNic(nicNumberToSearch);
        searchDriverOffensePortalByNic(nicNumberToSearch);
        searchWhoElseSearch(nicNumberToSearch);
        searchPoliceComplaintByNic(nicNumberToSearch);
        searchCustomsIndividualByNic(nicNumberToSearch);
        searchMobileNetworksByNic(nicNumberToSearch);
        searchSriLankaMedicalCouncilByNic(nicNumberToSearch);
        searchAtomicEnergyAuthorityByNic(nicNumberToSearch);
        searchElectionCommissionByNic(nicNumberToSearch);
        searchGemByNic(nicNumberToSearch);
        searchExciseDepartmentByNic(nicNumberToSearch);
        searchCompanyRegistrarByNic(nicNumberToSearch);
        searchCribByNic(nicNumberToSearch);
        searchCeaByNic(nicNumberToSearch);
        searchRevenueDepartmentByNic(nicNumberToSearch);
        searchCouncilByNic(nicNumberToSearch);
        searchOtherEducationalBodiesByNic(nicNumberToSearch);
        searchEpfByNic(nicNumberToSearch);
        searchEtfByNic(nicNumberToSearch);
        searchUniversityByNic(nicNumberToSearch);
        searchSchoolByNic(nicNumberToSearch);
        searchPassportByNic(nicNumberToSearch);
        searchLicenseByNic(nicNumberToSearch);
        searchHospitalByNic(nicNumberToSearch);
        searchPoliceWatchDogSystem(nicNumberToSearch);
        searchDeviceRegistrationByNic(nicNumberToSearch);
        searchFamilyChartDiagramByNic(nicNumberToSearch);
        searchChildrenTuitionServicesByNicNumber(nicNumberToSearch);
        searchChildrenSchoolServicesByNicNumber(nicNumberToSearch);
        searchChildrenTransportServicesByNicNumber(nicNumberToSearch);
        searchBirthMarriageDeathByNic(nicNumberToSearch);
      } else {
        updateWesDepartmentEPFFalse(userId, workStationId);
        updateWesDepartmentForeignEmploymentBureauFalse(userId, workStationId);
        updateWesDepartmentVehicleEmissionFalse(userId, workStationId);
        updateWesDriverOffensePortalFalse(userId, workStationId);
        setNicNull(true);
        setNicLoader(false);
        setVoterRegistrationNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchSchoolByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const schoolResponse = await axios.post(
        `http://${server_port}:4000/api/school/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (schoolResponse.data.rowCount > 0) {
        setSchoolTabUpdate(true);
        setSchoolNumber(nic_Number);
      } else {
        setSchoolNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchUniversityByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    // Uni
    try {
      const universityResponse = await axios.post(
        `http://${server_port}:4000/api/university/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (universityResponse.data.rowCount > 0) {
        setUniversityTabUpdate(true);
        setuniversityNumber(nic_Number);
      } else {
        setuniversityNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchEtfByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const etfResponse = await axios.post(
        `http://${server_port}:4000/api/etf/receiveByNic`,
        {
          nic_number: nic_Number,
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
  };

  const searchEpfByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const epfResponse = await axios.post(
        `http://${server_port}:4000/api/epf/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (epfResponse.data.rowCount > 0) {
        setEpfTabUpdate(true);
        setEpfNumber(nic_Number);
        updateWesDepartmentEPFTrue(userId, workStationId);
      } else {
        updateWesDepartmentEPFFalse(userId, workStationId);

        setEpfNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchOtherEducationalBodiesByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setEducationLoader(true);

    //Educational Bodies
    try {
      // Naita
      const naitaResponse = await axios.post(
        `http://${server_port}:4000/api/other-educational-bodies/naita/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (naitaResponse.data.rowCount > 0) {
        setEducationLoader(false);
        setEducationalBodiesTabUpdate(true);
        setEducationNumber(nic_Number);
      } else {
        try {
          //TVEC
          const tvecResponse = await axios.post(
            `http://${server_port}:4000/api/other-educational-bodies/tvec/receiveByNic`,
            {
              nic_number: nic_Number,
            }
          );
          if (tvecResponse.data.rowCount > 0) {
            setEducationLoader(false);
            setEducationalBodiesTabUpdate(true);
            setEducationNumber(nic_Number);
          } else {
            try {
              //Technical College
              const technicalCollegeResponse = await axios.post(
                `http://${server_port}:4000/api/other-educational-bodies/tvec/receiveByNic`,
                {
                  nic_number: nic_Number,
                }
              );
              if (technicalCollegeResponse.data.rowCount > 0) {
                setEducationLoader(false);
                setEducationalBodiesTabUpdate(true);
                setEducationNumber(nic_Number);
              } else {
                try {
                  //TEACHER TRAINING
                  const tvecResponse = await axios.post(
                    `http://${server_port}:4000/api/other-educational-bodies/teacher-training/receiveByNic`,
                    {
                      nic_number: nic_Number,
                    }
                  );
                  if (tvecResponse.data.rowCount > 0) {
                    setEducationLoader(false);
                    setEducationalBodiesTabUpdate(true);
                    setEducationNumber(nic_Number);
                  } else {
                    try {
                      //ICHEM
                      const technicalCollegeResponse = await axios.post(
                        `http://${server_port}:4000/api/other-educational-bodies/ichem/receiveByNic`,
                        {
                          nic_number: nic_Number,
                        }
                      );
                      if (technicalCollegeResponse.data.rowCount > 0) {
                        setEducationLoader(false);
                        setEducationalBodiesTabUpdate(true);
                        setEducationNumber(nic_Number);
                      } else {
                        setEducationLoader(false);
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
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCouncilByNic = async (nic_number_to_search) => {
    setCouncilLoader(true);
    const nic_Number = nic_number_to_search;
    //Council
    try {
      const municalCouncilRespone = await axios.post(
        `http://${server_port}:4000/api/council/municipal/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (municalCouncilRespone.data.rowCount > 0) {
        setCouncilLoader(false);

        setCouncilTabUpdate(true);
        setCouncilNumber(nic_Number);
      } else {
        try {
          const urbanCouncilResponse = await axios.post(
            `http://${server_port}:4000/api/council/urban/receiveByNic`,
            {
              nic_number: nic_Number,
            }
          );
          if (urbanCouncilResponse.data.rowCount > 0) {
            setCouncilLoader(false);

            setCouncilTabUpdate(true);
            setCouncilNumber(nic_Number);
          } else {
            try {
              const pradeshiyaSabhaResponse = await axios.post(
                `http://${server_port}:4000/api/council/pradeshiya-sabha/receiveByNic`,
                {
                  nic_number: nic_Number,
                }
              );
              if (pradeshiyaSabhaResponse.data.rowCount > 0) {
                setCouncilLoader(false);
                setCouncilTabUpdate(true);
                setCouncilNumber(nic_Number);
              } else {
                setCouncilLoader(false);
                setCouncilNumberNull(true);
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchRevenueDepartmentByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    //inland
    setInlandRevenueLoader(true);
    try {
      const inlandRevenueResponse = await axios.post(
        `http://${server_port}:4000/api/inland-revenue/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (inlandRevenueResponse.data.rowCount > 0) {
        setInlandRevenueTabUpdate(true);
        setInlandRevenueLoader(false);
        setInlandRevenueNumber(nic_Number);
      } else {
        setInlandRevenueLoader(false);
        setInlandRevenueNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCeaByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setCeaLoader(true);
    try {
      const ceaResponse = await axios.post(
        `http://${server_port}:4000/api/cea-license/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (ceaResponse.data.rowCount > 0) {
        setCeaLoader(false);
        setCeaLicenseTabUpdate(true);
        setCeaLicenseNumber(nic_Number);
      } else {
        setCeaLoader(false);
        setCeaLicenseNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCribByNic = async (nic_number_to_search) => {
    setCribLoader(true);
    const nic_Number = nic_number_to_search;
    //crib
    try {
      const cribResponse = await axios.post(
        `http://${server_port}:4000/api/crib/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (cribResponse.data.rowCount > 0) {
        setCribLoader(false);
        setCribTabUpdate(true);
        setCribNumber(nic_Number);
      } else {
        setCribLoader(false);
        setCribNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchAtomicEnergyAuthorityByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    // Atomic Energy Authority
    try {
      const atomicEnergyAuthorityResponse = await axios.post(
        `http://${server_port}:4000/api/atomic-enerygy-authority/receiveByNic`,
        {
          nic_number: nic_Number,
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
  };

  const searchSriLankaMedicalCouncilByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const medicalCouncilResponse = await axios.post(
        `http://${server_port}:4000/api/sri-lanka-medical-council/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (medicalCouncilResponse.data.rowCount > 0) {
        setMedicalCouncilTabUpdate(true);
        setMedicalCouncilNumber(nic_Number);
      } else {
        setMedicalCouncilNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchMobileNetworksByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const networkResponse = await axios.post(
        `http://${server_port}:4000/api/network/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (networkResponse.data.rowCount > 0) {
        setNetworkTabUpdate(true);
        setNetworkNumber(nic_Number);
      } else {
        setNetworkNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVehicleByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const vehicleResponse = await getVehiclesByNicNumberApi({
        nic_number: nic_Number,
      });

      if (vehicleResponse.rowCount > 0) {
        setVehicleRegistrationTabUpdate(true);
        setVehicleRegistrationNumber(nic_Number);
      } else {
        setVehicleRegistrationNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchElectionCommissionByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      setElectionCommissionLoader(true);
      try {
        const electionCommissionResponse = await axios.post(
          `http://${server_port}:4000/api/election/receiveByNic`,
          {
            nic_number: nic_Number,
          }
        );
        if (electionCommissionResponse.data.rowCount > 0) {
          setElectionCommissionTabUpdate(true);
          setElectionCommissionNumber(nic_Number);
          setElectionCommissionLoader(false);
        } else {
          setElectionCommissionNull(true);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchGemByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setGemLoader(true);
    try {
      const gemResponse = await axios.post(
        `http://${server_port}:4000/api/gem/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (gemResponse.data.rowCount > 0) {
        setGemTabUpdate(true);
        setGemLoader(false);
        setGemNumber(gemResponse.data.rows[0].nic_number);
      } else {
        setGemLoader(false);
        setGemNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchExciseDepartmentByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setExciseLoader(true);
    try {
      const exciseResponse = await axios.post(
        `http://${server_port}:4000/api/excise/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (exciseResponse.data.rowCount > 0) {
        setExciseLoader(false);
        setExciseTabUpdate(true);
        setExciseNumber(exciseResponse.data.rows[0].owner_nic_number);
      } else {
        setExciseLoader(false);
        setExciseNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchBankByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setStateBankLoader(true);
    try {
      const stateBankResponse = await axios.post(
        `http://${server_port}:4000/api/state-banks/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (stateBankResponse.data.rowCount > 0) {
        setStateBankLoader(false);
        setStateBankTapUpdate(true);
        setStateBankAccountNumber(nic_Number);
      } else {
        setStateBankLoader(false);
        setStateBankNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchTaxiByNicNumber = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const taxiUberResponse = await axios.post(
        `http://${server_port}:4000/api/taxi/uber/receiveByNic`,
        {
          nic_number: nic_Number,
        }
      );
      if (taxiUberResponse.data.rowCount > 0) {
        setTaxiTabUpdate(true);
        setTaxiNumber(nic_Number);
      } else {
        try {
          const taxiPickMeResponse = await axios.post(
            `http://${server_port}:4000/api/taxi/pickme/receiveByNic`,
            {
              nic_number: nic_Number,
            }
          );
          if (taxiPickMeResponse.data.rowCount > 0) {
            setTaxiTabUpdate(true);
            setTaxiNumber(nic_Number);
          } else {
            try {
              const taxiKangarooMeResponse = await axios.post(
                `http://${server_port}:4000/api/taxi/kangaroo/receiveByNic`,
                {
                  nic_number: nic_Number,
                }
              );
              if (taxiKangarooMeResponse.data.rowCount > 0) {
                setTaxiTabUpdate(true);
                setTaxiNumber(nic_Number);
              } else {
                try {
                  const taxiTaxiyakMeResponse = await axios.post(
                    `http://${server_port}:4000/api/taxi/taxiyak/receiveByNic`,
                    {
                      nic_number: nic_Number,
                    }
                  );
                  if (taxiTaxiyakMeResponse.data.rowCount > 0) {
                    setTaxiTabUpdate(true);
                    setTaxiNumber(nic_Number);
                  } else {
                    setTaxiNull(true);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchTaxiByVehicleNumber = async (vehicle_number_to_search) => {
    const vehicleNumberToSearch = vehicle_number_to_search;
    try {
      const taxiUberResponse = await axios.post(
        `http://${server_port}:4000/api/taxi/uber/receiveUberVehicleDetailsByVehicleNumber`,
        {
          vehicle_number: vehicleNumberToSearch,
        }
      );
      if (taxiUberResponse.data.rowCount > 0) {
        setTaxiVehicleNumberTabUpdate(true);
        setVehicleTaxiVehicleNumber(vehicleNumberToSearch);
      } else {
        try {
          const taxiPickMeResponse = await axios.post(
            `http://${server_port}:4000/api/taxi/pickme/receivePickMeVehicleDetailsByVehicleNumber`,
            {
              vehicle_number: vehicleNumberToSearch,
            }
          );
          if (taxiPickMeResponse.data.rowCount > 0) {
            setTaxiVehicleNumberTabUpdate(true);
            setVehicleTaxiVehicleNumber(vehicleNumberToSearch);
          } else {
            try {
              const taxiKangarooMeResponse = await axios.post(
                `http://${server_port}:4000/api/taxi/kangaroo/receiveKangarooVehicleDetailsByVehicleNumber`,
                {
                  vehicle_number: vehicleNumberToSearch,
                }
              );
              if (taxiKangarooMeResponse.data.rowCount > 0) {
                setTaxiVehicleNumberTabUpdate(true);
                setVehicleTaxiVehicleNumber(vehicleNumberToSearch);
              } else {
                try {
                  // const taxiTaxiyakMeResponse = await axios.post(
                  //   `http://${server_port}:4000/api/taxi/taxiyak/receiveAccountDetailsByNic`,
                  //   {
                  //     vehicle_number: vehicleNumberToSearch,
                  //   }
                  // );
                  const taxiTaxiyakMeResponse =
                    await taxiyakReceiveAccountDetailsByVehicleNICNumber(
                      vehicleNumberToSearch
                    );
                  if (taxiTaxiyakMeResponse.rowCount > 0) {
                    setTaxiVehicleNumberTabUpdate(true);
                    setVehicleTaxiVehicleNumber(vehicleNumberToSearch);
                  } else {
                    setTaxiTabUpdate(false);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchTransportCommissionByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const transportCommissionResponse =
        await receieveByNICTransportCommissionApi(nic_Number);
      if (transportCommissionResponse.rowCount > 0) {
        setTransportCommissionNumber(nic_Number);
        setTransportCommissionTabUpdate(true);
      } else {
        setTransportCommissionNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchTransportCommissionByVehicleNumber = async (
    vehicle_number_to_search
  ) => {
    const vehicleNumberToSearch = vehicle_number_to_search;
    try {
      const transportCommissionResponse =
        await receieveByVehicleNumberTransportCommissionApi(
          vehicle_number_to_search
        );

      if (transportCommissionResponse.rowCount > 0) {
        setTransportCommissionVehicleNumber(vehicleNumberToSearch);
        setTransportCommissionVehicleNumberTabUpdate(true);
      } else {
        setTransportCommissionNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchPassportByNic = async (nic_number_to_search) => {
    setPassportLoader(true);
    const nicNumberToSearch = nic_number_to_search;
    try {
      const passportResponse = await axios.post(
        `http://${server_port}:4000/api/passport/receiveByNic`,
        {
          nic_number: nicNumberToSearch,
        }
      );
      if (passportResponse.data.rowCount > 0) {
        setPassportLoader(false);
        setPassportTabUpdate(true);
        setPassportNumber(passportResponse.data.rows[0].passport_number);
      } else {
        setPassportNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchPassportByPassport = async (passport_number) => {
    try {
      const passportResponse = await axios.post(
        `http://${server_port}:4000/api/passport/receive`,
        {
          passport_number,
        }
      );
      if (passportResponse.data.rowCount > 0) {
        setPassportTabUpdate(true);
        setPassportNumber(passport_number);
        searchNicByNic(passportResponse.data.rows[0].nic_number);
      } else {
        setLicenseNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchByVehicleNumber = async (vehicle_number_to_search) => {
    const vehicleNumberToSearch = vehicle_number_to_search;
    try {
      const vehicleResponse = await receiveNicByVehcileNumber(
        vehicleNumberToSearch
      );
      if (vehicleResponse.rowCount > 0) {
        setNicNumber(vehicleResponse.nic_number);
        setVehicleRegistrationNumber(vehicleNumberToSearch);
        searchNicByNic(vehicleResponse.rows[0].nic_number);
        setVehicleRegistrationTabUpdate(true);
      } else {
        searchTransportCommissionByVehicleNumber(vehicleNumberToSearch);
        searchExpressWayByVehicleNumber(vehicleNumberToSearch);
        searchTaxiByVehicleNumber(vehicleNumberToSearch);
        searchCarParkServicesByVehicleNumber(vehicleNumberToSearch);
        setNicNull(true);
        setVoterRegistrationNull(true);
        setVehicleRegistrationNull(true);
        setVehicleEmissionNull(true);
        setVehicleInsuranceNull(true);
        setVehicleRevenueNull(true);
        setExpresswayNull(true);
        setTransportCommissionNull(true);
        setLicenseNull(true);
        setPassportNull(true);
        setExaminationNull(true);
        setImmigrationNull(true);
        setAirlinesNull(true);
        setStateBankNull(true);
        setElectionCommissionNull(true);
        setCompanyNull(true);
        setCribNull(true);
        setCeaLicenseNull(true);
        setInlandRevenueNull(true);
        setCouncilNumberNull(true);
        setGemNull(true);
        setEpfNull(true);
        setEtfNull(true);
        setforeignEmploymentNull(true);
        setPoliceWatchDogNull(true);
        setuniversityNull(true);
        setSchoolNull(true);
        setHospitalNull(true);
        setDeviceRegistrationNull(true);
        setMedicalCouncilNull(true);
        setAtomicEnergyAuthorityNull(true);

        //Should make all to null
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchLicenseByLicense = async (license_number) => {
    try {
      const licenseResponse = await recieveLicenseDataByLicenseNumber(
        license_number
      );
      if (licenseResponse.data.rowCount > 0) {
        setLicenseTapUpdate(true);
        setLicenseNumber(license_number);
        searchNicByNic(licenseResponse.data.rows[0].nic_number);
      } else {
        setLicenseNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchLicenseByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    setLicenseLoader(true);
    try {
      const licenseResponse = await recieveLicenseDataByNicApi(
        nicNumberToSearch
      );
      if (licenseResponse.data.rowCount > 0) {
        setLicenseLoader(false);
        setLicenseTapUpdate(true);
        setLicenseNumber(licenseResponse.data.rows[0].license_number);
      } else {
        setLicenseLoader(false);
        setLicenseNull(true);
        setLicenseLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVehicleRevenueLicenseByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const vehicleRevenueResponse =
        await recieveVehicleRevenueLicenseDataByNicApi(nicNumberToSearch);
      if (vehicleRevenueResponse.rowCount > 0) {
        setVehicleRevenueTabUpdate(true);
        setVehicleRevenueNumber(nic_number_to_search);
      } else {
        setVehicleRevenueNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchPoliceComplaintByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    try {
      const missingNicResponse = await fetchComplaintMissingNicByNicApi(
        nic_Number
      );
      if (missingNicResponse.rowCount > 0) {
        setPoliceComplaintTabUpdate(true);
        setPoliceComplaitNumber(nic_Number);
      } else {
        const assaultResponse = await fetchComplaintAssaultByNicApi(nic_Number);
        if (assaultResponse.rowCount > 0) {
          setPoliceComplaintTabUpdate(true);
          setPoliceComplaitNumber(nic_Number);
        } else {
          const assaulterResponse = await fetchComplaintAssaulterByNicApi(
            nic_Number
          );
          if (assaulterResponse.rowCount > 0) {
            setPoliceComplaintTabUpdate(true);
            setPoliceComplaitNumber(nic_Number);
          } else {
            const MyDevicesResponse = await fetchComplaintDevicesByNicApi(
              nic_Number
            );
            if (missingNicResponse.rowCount > 0) {
              setPoliceComplaintTabUpdate(true);
              setPoliceComplaitNumber(nic_Number);
            } else {
              const missingPassportResponse =
                await fetchComplaintMissingPersonByNicApi(nic_Number);
              if (missingPassportResponse.rowCount > 0) {
                setPoliceComplaintTabUpdate(true);
                setPoliceComplaitNumber(nic_Number);
              } else {
                const missingDrivingLicenseResponse =
                  await fetchComplaintMissingLicenseByNicApi(nic_Number);
                if (missingDrivingLicenseResponse.rowCount > 0) {
                  setPoliceComplaintTabUpdate(true);
                  setPoliceComplaitNumber(nic_Number);
                } else {
                  setPoliceComplaintTabUpdate(true);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVehicleEmissionByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const emissionResponse = await fetchVehicleEmissionByNicApi(
        nicNumberToSearch
      );
      if (emissionResponse.rowCount > 0) {
        setVehicleEmissionTabUpdate(true);
        setVehicleEmissionNumber(nicNumberToSearch);
        updateWesDepartmentVehicleEmissionTrue(userId, workStationId);
      } else {
        updateWesDepartmentVehicleEmissionFalse(userId, workStationId);
        setVehicleEmissionNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchExaminationByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    setExaminationLoader(true);
    try {
      const olResponse = await fetchOrdinaryLevelBYNicApi(nic_Number);
      if (olResponse.rowCount > 0) {
        setExaminationLoader(false);
        setExaminationTabUpdate(true);
        setExaminationNumber(nic_Number);
      } else {
        setExaminationLoader(false);
        setExaminationNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVehicleInsuranceByNic = async (nic_number_to_search) => {
    const nicNumberToSearch = nic_number_to_search;
    try {
      const vehicleInsuranceResponse = await fetchLolcVehicleInsuranceApi(
        nicNumberToSearch
      );
      if (vehicleInsuranceResponse.rowCount > 0) {
        setVehicleInsuranceTabUpdate(true);
        setVehicleInsuranceNumber(nicNumberToSearch);
      } else {
        try {
          const vehicleInsuranceResponse =
            await fetchPeoplesVehicleInsuranceApi(nicNumberToSearch);
          if (vehicleInsuranceResponse.rowCount > 0) {
            setVehicleInsuranceTabUpdate(true);
            setVehicleInsuranceNumber(nicNumberToSearch);
          } else {
            setVehicleInsuranceNull(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchCompanyRegistrarByNic = async (nic_number_to_search) => {
    setCompanyLoader(true);
    const nic_Number = nic_number_to_search;
    try {
      const companyResponse = await fetchCompanyByNicApi(nic_Number);
      if (companyResponse.rowCount > 0) {
        setCompanyTabUpdate(true);
        setCompanyLoader(false);
        setCompanyNumber(nic_Number);
      } else {
        setCompanyNull(true);
        setCompanyLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchHospitalByNic = async (nic_number_to_search) => {
    const nic_number = nic_number_to_search;
    try {
      const hospitalResponse = await fetchHospitalByNicApi(nic_number);
      if (hospitalResponse.rowCount > 0) {
        setHospitalTabUpdate(true);
        setHospitalNumber(hospitalResponse.rows[0].nic_number);
      } else {
        setHospitalNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchPoliceWatchDogSystem = async (nic_number_to_search) => {
    const nic_number = nic_number_to_search;
    try {
      const MyDevicesResponse = await recieveDevicesListByNicApi(nic_number);
      if (MyDevicesResponse.rowCount > 0) {
        setPoliceWatchDogTabUpdate(true);
        setPoliceWatchDogNumber(MyDevicesResponse.rows[0].nic_number);
      } else {
        try {
          const missingPetResponse = await fetchMissingPetListByNicApi(
            nic_number
          );
          if (missingPetResponse.rowCount > 0) {
            setPoliceWatchDogTabUpdate(true);
            setPoliceWatchDogNumber(missingPetResponse.rows[0].nic_number);
          } else {
            try {
              const missingPetResponse = await fetchMissingVehicleListByNicApi(
                nic_number
              );
              if (missingPetResponse.rowCount > 0) {
                setPoliceWatchDogTabUpdate(true);
                setPoliceWatchDogNumber(missingPetResponse.rows[0].nic_number);
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
  };

  const searchFamilyChartDiagramByNic = async (nic_number_to_search) => {
    const nic_number = nic_number_to_search;
    try {
      const familyChartSelfResponse = await fetchFamilyChartByNicApi(
        nic_number
      );
      if (familyChartSelfResponse.rowCount > 0) {
        setFamilyChartDiagramTabUpdate(true);
        setFamilyChartDiagramNumber(familyChartSelfResponse.rows[0].nic_number);
      } else {
        setFamilyChartDiagramNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchDeviceRegistrationByNic = async (nic_number_to_search) => {
    const nic_number = nic_number_to_search;
    try {
      const deviceRegistrationResponse = await getMyDevicesByNICApi({
        nic_number: nic_number,
      });
      if (deviceRegistrationResponse.data.rowCount > 0) {
        setDeviceRegistrationTabUpdate(true);
        setDeviceRegistrationNumber(
          deviceRegistrationResponse.data.rows[0].nic_number
        );
      } else {
        setDeviceRegistrationNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nseSearchCitizenCodeNumber = async (citizen_code_number) => {
    let citizen_code_number_to_send = citizen_code_number;
    try {
      const citizenCodeNumberResponse = await fetchCitizenCodeNumberByNicApi(
        citizen_code_number_to_send
      );
      if (citizenCodeNumberResponse.rowCount > 0) {
        setCitizenCodeNumberTabUpdate(true);
        setCitizenCodeNumber(
          citizenCodeNumberResponse.rows[0].citizen_code_number
        );
        searchNicByNic(citizenCodeNumberResponse.rows[0].nic_number);
      } else {
        setCitizenCodeNull(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchBirthMarriageDeathByNic = async (nic_number_to_search) => {
    const nic_Number = nic_number_to_search;
    //BMD
    try {
      const birthCertificate = await fetchBirthParentsByNic(nic_Number);
      if (birthCertificate.rowCount > 0) {
        setBirthMarriageDeathTabUpdate(true);
        setBirthMarriageDeathNumber(nic_Number);
      } else {
        try {
          const marriageCertificate = await fetchMarriageCertificateByNicApi(
            nic_Number
          );
          if (marriageCertificate.rowCount > 0) {
            setBirthMarriageDeathTabUpdate(true);
            setBirthMarriageDeathNumber(nic_Number);
          } else {
            setBirthMarriageDeathNull(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    if (formData.vehicle_number !== "") {
      let vehicle_number = formData.vehicle_number;
      initializeSearch(vehicle_number);
    }

    e.preventDefault();
    // Passport Data
    if (formData.passport_number !== "") {
      let passport_number = formData.passport_number;
      searchPassportByPassport(passport_number);
    }
    //Nic Number
    if (formData.nic_number != "") {
      let nic_number = formData.nic_number;
      searchNicByNic(nic_number);
    }

    //License Number
    if (formData.license_number != "") {
      try {
        let license_number = formData.license_number;
        searchLicenseByLicense(license_number);
      } catch (error) {
        console.error(error);
      }
    }

    if (formData.citizen_code_number != "") {
      nseSearchCitizenCodeNumber(formData.citizen_code_number);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setuserId(localStorage.getItem("user_id"));
    setworkStationId(localStorage.getItem("workstation_id"));
  }, []);
  return (
    <section className="mx-5 my-12 pb-12">
      <div className="">
        {/* <Tab nicTabUpdate={nicTabUpdate} passportNumber={passportNumber} nicNumber={nicNumber} passportTabUpdate={passportTabUpdate} licenseTabUpdate={licenseTabUpdate} licenseNumber={licenseNumber} /> */}
        <div className=" py-2 rounded-md mt-4">
          <form onSubmit={handleSubmit} className="">
            <div className="grid lg:grid-cols-5 gap-2">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="nic_number"
                  id="nic_number"
                  className="block py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border border-black rounded-md px-2 bg-gray-600 "
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="nic_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                  onChange={handleChange}
                  value=""
                >
                  NATIONAL ID NUMBER
                </label>
              </div>
              <div className="relative z-0 w-full text-white">
                <input
                  type="text"
                  name="passport_number"
                  id="passport_number"
                  className="block px-2 py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-white border border-black rounded-md bg-gray-600"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.passport_number}
                />
                <label
                  htmlFor="passport_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                  onChange={() => {}}
                  value=""
                >
                  PASSPORT NUMBER
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="license_number"
                  id="license_number"
                  className="block py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-white border border-black rounded-md px-4 bg-gray-600"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.license_number}
                />
                <label
                  htmlFor="table_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                  onChange={() => {}}
                  value=""
                >
                  LICENSE NUMBER
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="vehicle_number"
                  id="vehicle_number"
                  className="block py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black border border-black rounded-md px-4 bg-gray-600"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.vehicle_number}
                />
                <label
                  htmlFor="vehicle_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                >
                  VEHICLE NUMBER
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="citizen_code_number"
                  id="citizen_id"
                  className="block py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-white border border-black rounded-md px-4 bg-gray-600"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.citizen_code_number}
                />
                <label
                  htmlFor="citizen_code_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                  onChange={() => {}}
                  value=""
                >
                  CITIZEN CODE NUMBER
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="citizen_id"
                  id="citizen_id"
                  className="block py-2 w-full text-sm bg-transparent  appearance-none dark:text-black dark:border-red-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-white border border-black rounded-md px-4 bg-gray-600"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.license_number}
                />
                <label
                  htmlFor="citizen_id"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-2"
                  onChange={() => {}}
                  value=""
                >
                  COMPANY NUMBER
                </label>
              </div>
            </div>
            <div className="relative z-0 mx-auto group flex justify-between gap-12 mt-2 w-full">
              {!SearchUserExists && (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 px-4 py-2.5 lg:w-screen text-center"
                >
                  <div className="my-auto">
                    <AiOutlineSearch className="" />
                  </div>
                  <div className="">Search</div>
                </button>
              )}
            </div>
          </form>
        </div>

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
          licenseLoader={LicenseLoader}
          licenseNumber={licenseNumber}
          licenseNull={licenseNull}
          stateBankTabUpdate={stateBankTabUpdate}
          stateBankAccountNumber={stateBankAccountNumber}
          stateBankNull={stateBankNull}
          stateBankLoader={StateBankLoader}
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
          expresswayVehicleNumberTabUpdate={expresswayVehicleNumberTabUpdate}
          expresswayVehicleNumber={expresswayVehicleNumber}
          expresswayNumber={expresswayNumber}
          expresswayNull={expresswayNull}
          teacherTrainingTabUpdate={teacherTrainingTabUpdate}
          teacherTrainingNumber={teacherTrainingNumber}
          teacherTrainingNull={teacherTrainingNull}
          exciseTabUpdate={exciseTabUpdate}
          exciseNumber={exciseNumber}
          exciseNull={exciseNull}
          exciseLoader={ExciseLoader}
          technicalCollegeTabUpdate={technicalCollegeTabUpdate}
          technicalCollegeNumber={technicalCollegeNumber}
          technicalCollegeNull={technicalCollegeNull}
          companyTabUpdate={companyTabUpdate}
          companyNumber={companyNumber}
          companyNull={companyNull}
          companyLoader={CompanyLoader}
          cribTabUpdate={cribTabUpdate}
          cribNumber={cribNumber}
          cribNull={cribNull}
          cribLoader={CribLoader}
          ceaLicenseTabUpdate={ceaLicenseTabUpdate}
          ceaLicenseNumber={ceaLicenseNumber}
          ceaLicenseNull={ceaLicenseNull}
          ceaLoader={CeaLoader}
          inlandRevenueTabUpdate={inlandRevenueTabUpdate}
          inlandRevenueNumber={inlandRevenueNumber}
          inlandRevenueNull={inlandRevenueNull}
          inlandRevenueLoader={InlandRevenueLoader}
          transportCommissionTabUpdate={transportCommissionTabUpdate}
          transportCommissionVehicleNumberTabUpdate={
            transportCommissionVehicleNumberTabUpdate
          }
          transportCommissionVehicleNumber={transportCommissionVehicleNumber}
          transportCommissionNumber={transportCommissionNumber}
          transportCommissionNull={transportCommissionNull}
          councilTabUpdate={councilTabUpdate}
          councilNumber={councilNumber}
          councilNumberNull={councilNumberNull}
          councilLoader={CouncilLoader}
          educationalBodiesTabUpdate={educationalBodiesTabUpdate}
          educationNumber={educationNumber}
          educationNull={educationNull}
          educationLoader={EducationLoader}
          gemTabUpdate={gemTabUpdate}
          gemNumber={gemNumber}
          gemNull={gemNull}
          gemLoader={GemLoader}
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
          carParkVehicleNumberTabUpdate={carParkVehicleNumberTabUpdate}
          carParkVehicleNumber={carParkVehicleNumber}
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
          taxiVehicleNumberTabUpdate={taxiVehicleNumberTabUpdate}
          taxiVehicleNumber={taxiVehicleNumber}
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
          examinationTabUpdate={examinationTabUpdate}
          examinationNumber={examinationNumber}
          examinationNull={examinationNull}
          examinationLoader={ExaminationLoader}
          immigrationTabUpdate={immigrationTabUpdate}
          immigrationNumber={immigrationNumber}
          immigrationNull={immigrationNull}
          immigrationLoader={ImmigrationLoader}
          airlinesTabUpdate={airlinesTabUpdate}
          airlinesNumber={airlinesNumber}
          airlinesNull={airlinesNull}
          airlineLoader={AirlineLoader}
          whoElseSearchTabUpdate={whoElseSearchTabUpdate}
          whoElseSearchNumber={whoElseSearchNumber}
          whoElseSearchNull={whoElseSearchNull}
          policeComplaintTabUpdate={policeComplaintTabUpdate}
          policeComplaintNumber={policeComplaintNumber}
          policeComplaintNull={policeComplaintNull}
          customsTabUpdate={customsTabUpdate}
          customsNumber={customsNumber}
          customsNull={customsNull}
          CitizenCodeNumberTabUpdate={CitizenCodeNumberTabUpdate}
          CitizenCodeNumber={CitizenCodeNumber}
          CitizenCodeNull={CitizenCodeNull}
          FamilyChartDiagramTabUpdate={FamilyChartDiagramTabUpdate}
          FamilyChartDiagramNumber={FamilyChartDiagramNumber}
          FamilyChartDiagramNull={FamilyChartDiagramNull}
          ChildrenTuitionServicesTabUpdate={ChildrenTuitionServicesTabUpdate}
          ChildrenTuitionServicesNumber={ChildrenTuitionServicesNumber}
          ChildrenTuitionNull={ChildrenTuitionNull}
          ChildrenSchoolServicesTabUpdate={ChildrenSchoolServicesTabUpdate}
          ChildrenSchoolServicesNumber={ChildrenSchoolServicesNumber}
          ChildrenSchoolNull={ChildrenSchoolNull}
          ChildrenTransportServicesTabUpdate={
            ChildrenTransportServicesTabUpdate
          }
          ChildrenTransportServicesNumber={ChildrenTransportServicesNumber}
          ChildrenTransportNull={ChildrenTransportNull}
          BirthMarriageDeathTabUpdate={BirthMarriageDeathTabUpdate}
          BirthMarriageDeathNumber={BirthMarriageDeathNumber}
          BirthMarriageDeathNull={BirthMarriageDeathNull}
        />
        {SearchUserExists && (
          <div>
            {/* Open the modal using ID.showModal() method */}

            <div
              method="dialog"
              className="bg-red-500 rounded-xl mx-96 border border-white"
            >
              <div className="mx-4 text-center text-xs pt-4">
                <h3 className="font-bold text-sm">
                  A search by this {Message} is undergoing !!!
                </h3>
                <p className="text-white">
                  Do you wish to terminate your last search ?
                </p>
                <div className="modal-action flex justify-center pb-2">
                  <div className="flex justify-between w-64 gap-4">
                    <button
                      className="w-1/2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 border border-white"
                      onClick={terminateSearch}
                    >
                      Terminate
                    </button>
                    <button
                      className="w-1/2 text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-800  border border-white"
                      onClick={() => setSearchUserExists(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </section>
  );
};

export default NationalSearchEngine;
