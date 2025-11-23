import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NicDashboard from "../pages/Dashboard/NIC/nicDashboard";
import PassportDashboard from "../pages/Dashboard/Passport/passportDashboard";

const NSEResults = ({
  nicTabUpdate,
  nicNumber,
  nicLoader,
  nicNull,

  passportTabUpdate,
  passportNumber,
  passportLoader,
  passportNull,

  licenseTabUpdate,
  licenseLoader,
  licenseNumber,
  licenseNull,

  stateBankNull,
  stateBankTabUpdate,
  stateBankAccountNumber,
  stateBankLoader,

  vehicleRegistrationNull,
  vehicleRegistrationTabUpdate,
  vehicleRegistrationNumber,

  voterRegistrationTabUpdate,
  voterRegistrationNumber,
  voterRegistrationNull,
  voterLoader,

  electionCommissionTabUpdate,
  electionCommissionNumber,
  electionCommissionNull,
  electionCommissionLoader,

  expresswayVehicleNumberTabUpdate,
  expresswayVehicleNumber,
  expresswayTabUpdate,
  expresswayNumber,
  expresswayNull,

  exciseTabUpdate,
  exciseNumber,
  exciseNull,
  exciseLoader,

  companyTabUpdate,
  companyNumber,
  companyNull,
  companyLoader,

  cribTabUpdate,
  cribNumber,
  cribNull,
  cribLoader,

  ceaLicenseTabUpdate,
  ceaLicenseNumber,
  ceaLicenseNull,
  ceaLoader,

  inlandRevenueTabUpdate,
  inlandRevenueNumber,
  inlandRevenueNull,
  inlandRevenueLoader,

  transportCommissionTabUpdate,
  transportCommissionVehicleNumberTabUpdate,
  transportCommissionVehicleNumber,
  transportCommissionNumber,
  transportCommissionNull,

  councilTabUpdate,
  councilNumber,
  councilNumberNull,
  councilLoader,

  educationalBodiesTabUpdate,
  educationNumber,
  educationNull,
  educationLoader,

  gemTabUpdate,
  gemNumber,
  gemNull,
  gemLoader,

  epfTabUpdate,
  epfNumber,
  epfNull,

  etfTabUpdate,
  etfNumber,
  etfNull,

  universityTabUpdate,
  universityNumber,
  universityNull,

  schoolTabUpdate,
  schoolNumber,
  schoolNull,

  carParkTabUpdate,
  carParkVehicleNumberTabUpdate,
  carParkVehicleNumber,
  carParkNumber,
  carParkNull,

  foreignEmploymentBureauTabUpdate,
  foreignEmploymentNumber,
  foreignEmploymentNull,

  policeWatchDogTabUpdate,
  policeWatchDogNumber,
  policeWatchDogNull,

  hospitalTabUpdate,
  hospitalNumber,
  hospitalNull,

  drivingOffenseTabUpdate,
  drivingOffenseNumber,
  drivingOffenseNull,

  deviceRegistrationTabUpdate,
  deviceRegistrationNumber,
  deviceRegistartionNull,

  networkTabUpdate,
  networkNumber,
  networkNull,

  taxiTabUpdate,
  taxiVehicleNumberTabUpdate,
  taxiVehicleNumber,
  taxiNumber,
  taxiNull,

  medicalCouncilTabUpdate,
  medicalCouncilNumber,
  medicalCouncilNull,

  vehicleEmissionTabUpdate,
  vehicleEmissionNumber,
  vehicleEmissionNull,

  vehicleInsuranceTabUpdate,
  vehicleInsuranceNumber,
  vehicleInsuranceNull,

  vehicleRevenueTabUpdate,
  vehicleRevenueNumber,
  vehicleRevenueNull,

  atomicEnergyAuthorityTabUpdate,
  atomicEnergyAuthorityNumber,
  atomicEnergyAuthorityNull,

  examinationTabUpdate,
  examinationNumber,
  examinationNull,
  examinationLoader,

  immigrationTabUpdate,
  immigrationNumber,
  immigrationNull,
  immigrationLoader,

  airlinesTabUpdate,
  airlinesNumber,
  airlinesNull,
  airlineLoader,

  whoElseSearchTabUpdate,
  whoElseSearchNumber,
  whoElseSearchNull,

  policeComplaintTabUpdate,
  policeComplaintNumber,
  policeComplaintNull,

  customsTabUpdate,
  customsNumber,
  customsNull,

  CitizenCodeNumberTabUpdate,
  CitizenCodeNumber,
  CitizenCodeNull,

  FamilyChartDiagramTabUpdate,
  FamilyChartDiagramNumber,
  FamilyChartDiagramNull,

  ChildrenTuitionServicesTabUpdate,
  ChildrenTuitionServicesNumber,
  ChildrenTuitionNull,

  ChildrenSchoolServicesTabUpdate,
  ChildrenSchoolServicesNumber,
  ChildrenSchoolNull,

  ChildrenTransportServicesTabUpdate,
  ChildrenTransportServicesNumber,
  ChildrenTransportNull,

  BirthMarriageDeathTabUpdate,
  BirthMarriageDeathNumber,
  BirthMarriageDeathNull,
}) => {
  const [bgColor, setBgColor] = useState("bg-green-500");
  const [borderColor, setBorderColor] = useState("border-red-400");
  const [nullBackground, setNullBackground] = useState("bg-red-600");

  const [NationalIdentityCardWindows, setNationalIdentityCardWindows] =
    useState(false);
  const [PassportWindows, setPassportWindows] = useState(false);

  const handleNationalIdentityCard = () => {
    setNationalIdentityCardWindows((prev) => !prev);
    setPassportWindows(false);
  };

  const handlePassport = () => {
    setNationalIdentityCardWindows(false);
    setPassportWindows((prev) => !prev);
  };

  useEffect(() => {
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
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(border);
    };
  }, []);

  return (
    <>
      <div className="lg:grid grid grid-cols-1 lg:grid-cols-5 text-gray-950  text-sm gap-2  font-black my-8 ">
        {!nicTabUpdate && !nicNull && !nicLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            NDC - NATIONAL IDENTITY CARD
          </div>
        )}
        {nicTabUpdate && (
          <div
            onClick={handleNationalIdentityCard}
            to={`/ndc/${nicNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            NDC - NATIONAL IDENTITY CARD
          </div>
        )}
        {nicNull && !nicTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md `}
          >
            NDC - NATIONAL IDENTITY CARD
          </div>
        )}
        {nicLoader && !nicTabUpdate && !nicNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md  bg-white`}
          >
            NDC - NATIONAL IDENTITY CARD
          </div>
        )}

        {/* Citizen Code Number */}
        {!CitizenCodeNumberTabUpdate && !CitizenCodeNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CCN - CITIZEN CODE NUMBER
          </div>
        )}
        {CitizenCodeNumberTabUpdate && (
          <Link
            to={`/nse/ccn/${CitizenCodeNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            CCN - CITIZEN CODE NUMBER
          </Link>
        )}
        {CitizenCodeNull && !CitizenCodeNumberTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md `}
          >
            CCN - CITIZEN CODE NUMBER
          </div>
        )}

        {/* Passport */}

        {!passportTabUpdate && !passportNull && !passportLoader && (
          <div className=" border border-gray-900 px-4 py-2 rounded-md bg-white">
            POL - PASSPORT OFFICE LANKA
          </div>
        )}
        {passportTabUpdate && (
          <div
            onClick={handlePassport}
            to={`/pol/${passportNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            POL - PASSPORT OFFICE LANKA
          </div>
        )}
        {passportNull && !passportTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            POL - PASSPORT OFFICE LANKA
          </div>
        )}
        {passportLoader && !passportTabUpdate && !passportNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            POL - PASSPORT OFFICE LANKA
          </div>
        )}

        {/* License */}

        {!licenseTabUpdate && !licenseNull && !licenseLoader && (
          <div className=" border border-gray-900 px-4 py-2 rounded-md bg-white">
            {" "}
            DLL - DRIVERS LICENSE LANKA
          </div>
        )}
        {licenseTabUpdate && (
          <Link
            to={`/dll/${licenseNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            DLL - DRIVERS LICENSE LANKA
          </Link>
        )}
        {licenseNull && !licenseTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            DLL - DRIVERS LICENSE LANKA
          </div>
        )}
        {licenseLoader && !licenseTabUpdate && !licenseNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            DLL - DRIVERS LICENSE LANKA
          </div>
        )}

        {/*Examination */}
        {!examinationTabUpdate && !examinationNull && !examinationLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            EDD - EXAMINATION DEPARTMENT DATA
          </div>
        )}
        {examinationTabUpdate && (
          <Link
            to={`/exam/${examinationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            EDD - EXAMINATION DEPARTMENT DATA
          </Link>
        )}
        {examinationNull && !examinationTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            EDD - EXAMINATION DEPARTMENT DATA
          </div>
        )}

        {examinationLoader && !examinationTabUpdate && !examinationNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            EDD - EXAMINATION DEPARTMENT DATA
          </div>
        )}

        {/* Immigration */}

        {!immigrationTabUpdate && !immigrationNull && !immigrationLoader && (
          <div className=" border border-gray-900 px-4 py-2 rounded-md bg-white">
            MTD - IMMIGRATION TRAVEL DATA
          </div>
        )}
        {immigrationTabUpdate && (
          <Link
            Link
            to={`/mtd/${immigrationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            MTD - IMMIGRATION TRAVEL DATA
          </Link>
        )}
        {immigrationNull && !immigrationTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            MTD - IMMIGRATION TRAVEL DATA
          </div>
        )}

        {immigrationLoader && !immigrationTabUpdate && !immigrationNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            MTD - IMMIGRATION TRAVEL DATA
          </div>
        )}

        {/* Airlines */}

        {!airlinesTabUpdate && !airlinesNull && !airlineLoader && (
          <div className=" border border-gray-900 px-4 py-2 rounded-md bg-white">
            ATD - AIRLINE TICKETING DATA
          </div>
        )}
        {airlinesTabUpdate && (
          <Link
            Link
            to={`/atd/${airlinesNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            ATD - AIRLINE TICKETING DATA
          </Link>
        )}
        {airlinesNull && !airlinesTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            ATD - AIRLINE TICKETING DATA
          </div>
        )}
        {airlineLoader && !airlinesTabUpdate && !airlinesNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            ATD - AIRLINE TICKETING DATA
          </div>
        )}

        {!stateBankTabUpdate && !stateBankNull && !stateBankLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            SPB - STATE OR PRIVATE BANK
          </div>
        )}
        {stateBankTabUpdate && (
          <Link
            to={`/spb/${stateBankAccountNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            SPB - STATE OR PRIVATE BANK
          </Link>
        )}
        {stateBankNull && !stateBankTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            SPB - STATE OR PRIVATE BANK
          </div>
        )}
        {stateBankLoader && !stateBankTabUpdate && !stateBankTabUpdate && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            SPB - STATE OR PRIVATE BANK
          </div>
        )}
        {!voterRegistrationTabUpdate &&
          !voterRegistrationNull &&
          !voterLoader && (
            <div
              className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
            >
              VED - VOTERS ENROLLEMENT DATA
            </div>
          )}
        {voterRegistrationTabUpdate && (
          <Link
            to={`/ved/${voterRegistrationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            VED - VOTERS ENROLLEMENT DATA
          </Link>
        )}
        {voterRegistrationNull && !voterRegistrationTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            VED - VOTERS ENROLLEMENT DATA
          </div>
        )}
        {voterLoader &&
          !voterRegistrationTabUpdate &&
          !voterRegistrationNull && (
            <div
              className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
            >
              VED - VOTERS ENROLLEMENT DATA
            </div>
          )}

        {!electionCommissionTabUpdate &&
          !electionCommissionNull &&
          !electionCommissionLoader && (
            <div
              className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
            >
              ECD - ELECTION COMMISSION DATA
            </div>
          )}
        {electionCommissionTabUpdate && (
          <Link
            to={`/ecd/${electionCommissionNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            ECD - ELECTION COMMISSION DATA
          </Link>
        )}
        {electionCommissionNull && !electionCommissionTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            ECD - ELECTION COMMISSION DATA
          </div>
        )}
        {electionCommissionLoader &&
          !electionCommissionTabUpdate &&
          !electionCommissionNull && (
            <div
              className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
            >
              ECD - ELECTION COMMISSION DATA
            </div>
          )}

        {!exciseTabUpdate && !exciseNull && !exciseLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            EDD - EXCISE DEPARTMENT DETAILS
          </div>
        )}
        {exciseTabUpdate && (
          <Link
            to={`/edd/${exciseNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            EDD - EXCISE DEPARTMENT DETAILS
          </Link>
        )}
        {exciseNull && !exciseTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            EDD - EXCISE DEPARTMENT DETAILS
          </div>
        )}
        {exciseLoader && !exciseTabUpdate && !exciseNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            EDD - EXCISE DEPARTMENT DETAILS
          </div>
        )}

        {!companyTabUpdate && !companyNull && !companyLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            RCR - REGISTRAR COMPANY RECORDS
          </div>
        )}
        {companyTabUpdate && (
          <Link
            to={`/rcr/${companyNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            RCR - REGISTRAR COMPANY RECORDS
          </Link>
        )}
        {companyNull && !companyTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            RCR - REGISTRAR COMPANY RECORDS
          </div>
        )}

        {companyLoader && !companyTabUpdate && !companyNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            RCR - REGISTRAR COMPANY RECORDS
          </div>
        )}

        {!cribTabUpdate && !cribNull && !cribLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CRB - CREDIT RECORDS BUREAU
          </div>
        )}
        {cribTabUpdate && (
          <Link
            to={`/crb/${cribNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            CRB - CREDIT RECORDS BUREAU
          </Link>
        )}
        {cribNull && !cribTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CRB - CREDIT RECORDS BUREAU
          </div>
        )}
        {cribLoader && !cribTabUpdate && !cribNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            CRB - CREDIT RECORDS BUREAU
          </div>
        )}

        {!ceaLicenseTabUpdate && !ceaLicenseNull && !ceaLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CEA - CENTRAL ENVIRONMENT AUTHORITY
          </div>
        )}
        {ceaLicenseTabUpdate && (
          <Link
            to={`/cea/${ceaLicenseNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            CEA - CENTRAL ENVIRONMENT AUTHORITY
          </Link>
        )}
        {ceaLicenseNull && !ceaLicenseTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CEA - CENTRAL ENVIRONMENT AUTHORITY
          </div>
        )}
        {ceaLoader && !ceaLicenseTabUpdate && !ceaLicenseNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            CEA - CENTRAL ENVIRONMENT AUTHORITY
          </div>
        )}

        {/* Inland Revenue */}
        {!inlandRevenueTabUpdate &&
          !inlandRevenueNull &&
          !inlandRevenueLoader && (
            <div
              className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
            >
              RDR - REVENUE DEPARTMENTS RECORDS
            </div>
          )}
        {inlandRevenueTabUpdate && (
          <Link
            to={`/rdr/${inlandRevenueNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            RDR - REVENUE DEPARTMENTS RECORDS
          </Link>
        )}
        {inlandRevenueNull && !inlandRevenueTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            RDR - REVENUE DEPARTMENTS RECORDS
          </div>
        )}
        {inlandRevenueLoader &&
          !inlandRevenueTabUpdate &&
          !inlandRevenueNull && (
            <div
              className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
            >
              RDR - REVENUE DEPARTMENTS RECORDS
            </div>
          )}

        {/* Council */}
        {!councilTabUpdate && !councilNumberNull && !councilLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            MUP - MUNICIPAL COUNCIL OR UC OR PS
          </div>
        )}
        {councilTabUpdate && (
          <Link
            to={`/mup/${councilNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            MUP - MUNICIPAL COUNCIL OR UC OR PS
          </Link>
        )}
        {councilNumberNull && !councilTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            MUP - MUNICIPAL COUNCIL OR UC OR PS
          </div>
        )}
        {councilLoader && !councilTabUpdate && !councilNumberNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            MUP - MUNICIPAL COUNCIL OR UC OR PS
          </div>
        )}

        {/* Education */}
        {!educationalBodiesTabUpdate && !educationNull && !educationLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            OIE - OTHER EDUCATIONAL INSTITUITIONS
          </div>
        )}
        {educationalBodiesTabUpdate && (
          <Link
            to={`/oie/${educationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            OIE - OTHER EDUCATIONAL INSTITUITIONS
          </Link>
        )}
        {educationNull && !educationalBodiesTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            OIE - OTHER EDUCATIONAL INSTITUITIONS
          </div>
        )}
        {educationLoader && !educationalBodiesTabUpdate && !educationNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            OIE - OTHER EDUCATIONAL INSTITUITIONS
          </div>
        )}

        {/* Gem */}
        {!gemTabUpdate && !gemNull && !gemLoader && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            GCD - GEM CORPORATIONS DETAILS
          </div>
        )}
        {gemTabUpdate && (
          <Link
            to={`/gcd/${gemNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            GCD - GEM CORPORATIONS DETAILS
          </Link>
        )}
        {gemNull && !gemTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            GCD - GEM CORPORATIONS DETAILS
          </div>
        )}
        {gemLoader && !gemTabUpdate && !gemNull && (
          <div
            className={`border ${borderColor}  px-4 py-2 rounded-md bg-white`}
          >
            GCD - GEM CORPORATIONS DETAILS
          </div>
        )}

        {/* EPF */}
        {!epfTabUpdate && !epfNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            EPF - EMPLOYEES PROVIDENT FUND
          </div>
        )}
        {epfTabUpdate && (
          <Link
            to={`/epf/${epfNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            EPF - EMPLOYEES PROVIDENT FUND
          </Link>
        )}
        {epfNull && !epfTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            EPF - EMPLOYEES PROVIDENT FUND
          </div>
        )}

        {/* ETF */}
        {!etfTabUpdate && !etfNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            ETF - EMPLOYEES TRUST FUND
          </div>
        )}
        {etfTabUpdate && (
          <Link
            to={`/etf/${etfNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            ETF - EMPLOYEES TRUST FUND
          </Link>
        )}
        {etfNull && !etfTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            ETF - EMPLOYEES TRUST FUND
          </div>
        )}

        {/* FOREIGN EMPLOYMENT BUREAU */}
        {!foreignEmploymentBureauTabUpdate && !foreignEmploymentNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            FEB - FOREIGN EMPLOYMENT BUREAU
          </div>
        )}
        {foreignEmploymentBureauTabUpdate && (
          <Link
            to={`/feb/${foreignEmploymentNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            FEB - FOREIGN EMPLOYMENT BUREAU
          </Link>
        )}
        {foreignEmploymentNull && !foreignEmploymentBureauTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            FEB - FOREIGN EMPLOYMENT BUREAU
          </div>
        )}

        {/* POLICE WATCHDOG SYSTEM */}
        {!policeWatchDogTabUpdate && !policeWatchDogNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            PWD - POLICE WATCHDOG SYSTEM
          </div>
        )}
        {policeWatchDogTabUpdate && (
          <Link
            to={`/pwd/${policeWatchDogNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            PWD - POLICE WATCHDOG SYSTEM
          </Link>
        )}
        {policeWatchDogNull && !policeWatchDogTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            PWD - POLICE WATCHDOG SYSTEM
          </div>
        )}

        {/* State / Private University SYSTEM */}
        {!universityNull && !universityTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            SPU - STATE OR PRIVATE UNIVERSITIES
          </div>
        )}
        {universityTabUpdate && (
          <Link
            to={`/spu/${universityNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            SPU - STATE OR PRIVATE UNIVERSITIES
          </Link>
        )}
        {universityNull && !universityTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            SPU - STATE OR PRIVATE UNIVERSITIES
          </div>
        )}

        {/* State / Private School SYSTEM */}
        {!schoolNull && !schoolTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            SPS - STATE OR PRIVATE SCHOOLS
          </div>
        )}
        {schoolTabUpdate && (
          <Link
            to={`/sps/${schoolNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            SPU - STATE OR PRIVATE SCHOOLS
          </Link>
        )}
        {schoolNull && !schoolTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            SPU - STATE / PRIVATE SCHOOLS
          </div>
        )}

        {/* State / Private Hospital SYSTEM */}
        {!hospitalNull && !hospitalTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            SPS - STATE OR PRIVATE HOSPITALS
          </div>
        )}
        {hospitalTabUpdate && (
          <Link
            to={`/sph/${hospitalNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            SPU - STATE OR PRIVATE HOSPITALS
          </Link>
        )}
        {hospitalNull && !hospitalTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            SPU - STATE OR PRIVATE HOSPITALS
          </div>
        )}

        {/*DEVICE RESGITRATION PORTAL */}
        {!deviceRegistartionNull && !deviceRegistrationTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            DRP - DEVICE REGISTRATION PORTAL
          </div>
        )}
        {deviceRegistrationTabUpdate && (
          <Link
            to={`/nse/drp/${deviceRegistrationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            DRP - DEVICE REGISTRATION PORTAL
          </Link>
        )}
        {deviceRegistartionNull && !deviceRegistrationTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            DRP - DEVICE REGISTRATION PORTAL
          </div>
        )}
        <div className="border border-gray-900 px-4 py-2 rounded-md bg-white">
          <Link to="/crd">CRD - CRIMINAL RECORDS DIVISION</Link>
        </div>

        {/*MOBILE NETOWRK RECORDS */}
        {!networkTabUpdate && !networkNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            MNR - MOBILE NETWORK RECORDS
          </div>
        )}
        {networkTabUpdate && (
          <Link
            to={`/mnr/${networkNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            MNR - MOBILE NETWORK RECORDS
          </Link>
        )}
        {networkNull && !networkTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            MNR - MOBILE NETWORK RECORDS
          </div>
        )}

        {/*Sri Lanka Medical COuncil RECORDS */}
        {!medicalCouncilTabUpdate && !medicalCouncilNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            SMC - SRI LANKA MEDICAL COUNCIL
          </div>
        )}
        {medicalCouncilTabUpdate && (
          <Link
            to={`/smc/${medicalCouncilNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            SMC - SRI LANKA MEDICAL COUNCIL
          </Link>
        )}
        {medicalCouncilNull && !medicalCouncilTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            SMC - SRI LANKA MEDICAL COUNCIL
          </div>
        )}

        {/*Atomic Energy Authority */}
        {!atomicEnergyAuthorityTabUpdate && !atomicEnergyAuthorityNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            AEA - ATOMIC ENERGY AUTHORITY
          </div>
        )}
        {atomicEnergyAuthorityTabUpdate && (
          <Link
            to={`/aea/${atomicEnergyAuthorityNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            AEA - ATOMIC ENERGY AUTHORITY
          </Link>
        )}
        {atomicEnergyAuthorityNull && !atomicEnergyAuthorityTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            AEA - ATOMIC ENERGY AUTHORITY
          </div>
        )}

        {/* Vehicle Registration */}
        {!vehicleRegistrationTabUpdate && !vehicleRegistrationNull && (
          <div className=" border border-gray-900 px-4 py-2 rounded-md bg-white">
            {" "}
            VRD - VEHICLE REGISTRATION DATA
          </div>
        )}
        {vehicleRegistrationTabUpdate && (
          <Link
            to={`/vrd/${vehicleRegistrationNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            VRD - VEHICLE REGISTRATION DATA
          </Link>
        )}
        {vehicleRegistrationNull && !vehicleRegistrationTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            VRD - VEHICLE REGISTRATION DATA
          </div>
        )}

        {/* EXPRESSWAY */}
        {!expresswayTabUpdate && !expresswayNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            EWD - EXPRESS WAY DETAILS
          </div>
        )}
        {expresswayVehicleNumberTabUpdate && !expresswayTabUpdate && (
          <Link
            to={`/ewd/vehicle/${expresswayVehicleNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            EWD - EXPRESS WAY DETAILS
          </Link>
        )}
        {expresswayTabUpdate && (
          <Link
            to={`/ewd/${expresswayNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            EWD - EXPRESS WAY DETAILS
          </Link>
        )}
        {expresswayNull &&
          !expresswayTabUpdate &&
          !expresswayVehicleNumberTabUpdate && (
            <div
              className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
            >
              EWD - EXPRESS WAY DETAILS
            </div>
          )}

        {/*Vehicle Emission */}
        {!vehicleEmissionTabUpdate && !vehicleEmissionNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            VEC - VEHICLE EMISSION CERTIFICATE
          </div>
        )}
        {vehicleEmissionTabUpdate && (
          <Link
            to={`/vec/${vehicleEmissionNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            VEC - VEHICLE EMISSION CERTIFICATE
          </Link>
        )}
        {vehicleEmissionNull && !vehicleEmissionTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            VEC - VEHICLE EMISSION CERTIFICATE
          </div>
        )}

        {/* Transport Commission */}
        {!transportCommissionTabUpdate && !transportCommissionNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            TCD - TRANSPORT COMMISSION DATA
          </div>
        )}
        {transportCommissionVehicleNumberTabUpdate &&
          !transportCommissionTabUpdate && (
            <Link
              to={`/tcd/vehicle/${transportCommissionVehicleNumber}`}
              className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
              target="_blank"
            >
              TCD - TRANSPORT COMMISSION DATA
            </Link>
          )}
        {transportCommissionTabUpdate &&
          !transportCommissionVehicleNumberTabUpdate && (
            <Link
              to={`/tcd/${transportCommissionNumber}`}
              className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
              target="_blank"
            >
              TCD - TRANSPORT COMMISSION DATA
            </Link>
          )}
        {transportCommissionNull &&
          !transportCommissionTabUpdate &&
          !transportCommissionVehicleNumberTabUpdate && (
            <div
              className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
            >
              TCD - TRANSPORT COMMISSION DATA
            </div>
          )}
        {/* CAR PARK SERVICES */}
        {!carParkTabUpdate &&
          !carParkNull &&
          !carParkVehicleNumberTabUpdate && (
            <div
              className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
            >
              CPR - CAR PARK RECORDS
            </div>
          )}
        {carParkVehicleNumberTabUpdate && !carParkTabUpdate && (
          <Link
            to={`/cpr/vehicle/${carParkVehicleNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            CPR - CAR PARK RECORDS
          </Link>
        )}

        {carParkTabUpdate && (
          <Link
            to={`/cpr/${carParkNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            CPR - CAR PARK RECORDS
          </Link>
        )}
        {carParkNull && !carParkTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CPR - CAR PARK RECORDS
          </div>
        )}

        {/*Vehicle Insurance */}
        {!vehicleInsuranceTabUpdate && !vehicleInsuranceNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            NSD - INSURANCE SUBSCRIPTION DATA
          </div>
        )}
        {vehicleInsuranceTabUpdate && (
          <Link
            to={`/nsd/${vehicleInsuranceNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            NSD - INSURANCE SUBSCRIPTION DATA
          </Link>
        )}
        {vehicleInsuranceNull && !vehicleInsuranceTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            NSD - INSURANCE SUBSCRIPTION DATA
          </div>
        )}
        {/*DRIVING OFFENSE */}
        {!drivingOffenseNull && !drivingOffenseTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            DOD - DRIVER OFFENSE DATA
          </div>
        )}
        {drivingOffenseTabUpdate && (
          <Link
            to={`/nse/dop/${drivingOffenseNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            DOD - DRIVER OFFENSE DATA
          </Link>
        )}
        {drivingOffenseNull && !drivingOffenseTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            DOD - DRIVER OFFENSE DATA
          </div>
        )}

        {/*DSR */}
        {!vehicleRevenueTabUpdate && !vehicleRevenueNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            DSR - DIVISIONAL SECRETARIAT RECORDS
          </div>
        )}
        {vehicleRevenueTabUpdate && (
          <Link
            to={`/dsr/${vehicleRevenueNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            DSR - DIVISIONAL SECRETARIAT RECORDS
          </Link>
        )}
        {vehicleRevenueNull && !vehicleRevenueTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            DSR - DIVISIONAL SECRETARIAT RECORDS
          </div>
        )}

        {/*TAXI RECORDS */}
        {!taxiTabUpdate && !taxiNull && !taxiVehicleNumberTabUpdate && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            TSS - TAXI SERVICES SRI LANKA
          </div>
        )}
        {taxiVehicleNumberTabUpdate && !taxiTabUpdate && (
          <Link
            to={`/tss/vehicle/${taxiVehicleNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            TSS - TAXI SERVICES SRI LANKA
          </Link>
        )}
        {taxiTabUpdate && (
          <Link
            to={`/tss/${taxiNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            TSS - TAXI SERVICES SRI LANKA
          </Link>
        )}
        {taxiNull && !taxiTabUpdate && !taxiVehicleNumberTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            TSS - TAXI SERVICES SRI LANKA
          </div>
        )}

        {/* <div className="border border-gray-900 px-4 py-2 rounded-md bg-white">
          <Link to="/nse/fam">FAM - FOREIGN AFFAIRS MINISTRY</Link>
        </div> */}

        {/*WHO ELSE SEARCH */}
        {!whoElseSearchTabUpdate && !whoElseSearchNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            WES - WHO ELSE SEARCH
          </div>
        )}
        {whoElseSearchTabUpdate && (
          <Link
            to={`/nse/wes/${whoElseSearchNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            WES - WHO ELSE SEARCH
          </Link>
        )}
        {whoElseSearchNull && !whoElseSearchTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            WES - WHO ELSE SEARCH
          </div>
        )}

        {/*POLICE COMPLAINT DATA */}
        {!policeComplaintTabUpdate && !policeComplaintNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            PCS - POLICE COMPLAINT SYSTEM
          </div>
        )}
        {policeComplaintTabUpdate && (
          <Link
            to={`/nse/pcs/${policeComplaintNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md`}
            target="_blank"
          >
            PCS - POLICE COMPLAINT SYSTEM
          </Link>
        )}
        {policeComplaintNull && !policeComplaintTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            PCS - POLICE COMPLAINT SYSTEM
          </div>
        )}

        {/*Customs */}
        {!customsTabUpdate && !customsNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CDD - CUSTOMS DEPARTMENT DATA
          </div>
        )}
        {customsTabUpdate && (
          <Link
            to={`/cdd/${customsNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            CDD - CUSTOMS DEPARTMENT DATA
          </Link>
        )}
        {customsNull && !customsTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CDD - CUSTOMS DEPARTMENT DATA
          </div>
        )}

        {/*Family Chart Diagram */}
        {!FamilyChartDiagramTabUpdate && !FamilyChartDiagramNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            FCD - FAMILY CHART DIAGRAM
          </div>
        )}
        {FamilyChartDiagramTabUpdate && (
          <Link
            to={`/fcd/${FamilyChartDiagramNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            FCD - FAMILY CHART DIAGRAM
          </Link>
        )}
        {FamilyChartDiagramNull && !FamilyChartDiagramTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            FCD - FAMILY CHART DIAGRAM
          </div>
        )}


        {/* BMD services */}
        {!BirthMarriageDeathTabUpdate && !BirthMarriageDeathNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            DMD - BIRTH MARRIAGE DEAT
          </div>
        )}
        {BirthMarriageDeathTabUpdate && (
          <Link
            to={`/nse/dmd/${BirthMarriageDeathNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            DMD - BIRTH MARRIAGE DEAT
          </Link>
        )}
        {BirthMarriageDeathNull && !BirthMarriageDeathTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            DMD - BIRTH MARRIAGE DEAT
          </div>
        )}

        {/* Child class services */}
        {!ChildrenTuitionServicesTabUpdate && !ChildrenTuitionNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CCS - CHILD CLASS SERVICES
          </div>
        )}
        {ChildrenTuitionServicesTabUpdate && (
          <Link
            to={`/nse/ccs/${ChildrenTuitionServicesNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            CCS - CHILD CLASS SERVICES
          </Link>
        )}
        {ChildrenTuitionNull && !ChildrenTuitionServicesTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CCS - CHILD CLASS SERVICES
          </div>
        )}

        {/* Child school services */}
        {!ChildrenSchoolServicesTabUpdate && !ChildrenSchoolNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CCS - CHILD SCHOOL SERVICES
          </div>
        )}
        {ChildrenSchoolServicesTabUpdate && (
          <Link
            to={`/nse/css/${ChildrenSchoolServicesNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            CCS - CHILD SCHOOL SERVICES
          </Link>
        )}
        {ChildrenSchoolNull && !ChildrenSchoolServicesTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CCS - CHILD SCHOOL SERVICES
          </div>
        )}

        {/* Child Transport services */}
        {!ChildrenTransportServicesTabUpdate && !ChildrenTransportNull && (
          <div
            className={`border border-gray-900  px-4 py-2 rounded-md bg-white`}
          >
            CTS - CHILD TRANSPORT SERVICES
          </div>
        )}
        {ChildrenTransportServicesTabUpdate && (
          <Link
            to={`/nse/cts/${ChildrenTransportServicesNumber}`}
            className={`${bgColor} border border-gray-900 px-4 py-2 text-black rounded-md `}
            target="_blank"
          >
            CTS - CHILD TRANSPORT SERVICES
          </Link>
        )}
        {ChildrenTransportNull && !ChildrenTransportServicesTabUpdate && (
          <div
            className={` ${nullBackground} border border-gray-900 px-4 py-2 rounded-md`}
          >
            CTS - CHILD TRANSPORT SERVICES
          </div>
        )}
      </div>
      {NationalIdentityCardWindows && <NicDashboard nicNumber={nicNumber} />}
      {PassportWindows && <PassportDashboard passportNumber={passportNumber} />}
    </>
  );
};

export default NSEResults;
