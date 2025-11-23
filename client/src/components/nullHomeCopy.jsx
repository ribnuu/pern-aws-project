import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import axios from "axios";
// import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { ResetNavigationState } from "../store/navigation/NavigationSlice";
import { getUserButtonsRightsByUserIdAndComponentsIdApi } from "../apis/RightsApiService";

const nullHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const component_id = "1004000000000006";
  const [HomeMenuQuery] = useOutletContext();
  const [UserButtonList, setUserButtonList] = useState("");
  const [ArrayList, setArrayList] = useState([]);
  const [unchangedArrayList, setunchangedArrayList] = useState([]);
  const redirectUrl = useSelector(
    (state) => state.navigationReducer.redirectUrl
  );
  const arrListName = [
    "PHQ - POLICE HEADQUARTERS",
    "NSE - NATIONAL SEARCH ENGINE",
    "CPM - CHARACTER PROFILING MODULE",
    "DRE - DATA REQUISITION ENGINE",
    "CME - CONNECTION MANAGING ENGINE",
    "DCM - DATABASE CONNECTION MANAGEMENT",
    "DOP - DRIVER OFFENSE PORTAL",
    "CGP - CITIZEN GENERAL PORTAL",
    "PWS - POLICE WATCHDOG SYSTEM",
    "ECC - EMERGENCY CALL CENTER",
    "UMS - USER MANAGEMENT SYSTEM",
    "VMS - VEHICLE MANAGEMENT SYSTEM",
    "DUD - DEPARTMENTAL UNIQUE DASHBOARD",
    "WPD - WARRANTED PEOPLE DATABASE",
    "LTD - LIVE TOWER DETECTION",
    "LTS - LIVE TRACKING SYSTEM",
    "DMS - DRONE MANAGEMENT SYSTEM",
    "RZE - RESTRICTED ZONE ENTRY",
    "PSR - POLICE SCENE REPORTING",
    "DSS - DAILY SUMMARY SCREEN",
    "BCM - BODY CAM MONITORING",
    "DPM - DETAILED POLICE MAP",
    "CRS - CITIZEN RATING SYSTEM",
    "PRS - POLICE RATING SYSTEM",
    "PCS - POLICE COMPLAINT SYSTEM",
    "DMC - DISASTER MANAGEMENT CENTER",
    "PAS - POLICE APPOINTMENT SYSTEM",
    "CSS - CRIME SUMMARY SCREEN",
    "DAS - DUTY ALLOCATION SYSTEM",
    "PMD - POLICE MEDIA DIVISION",
    "PNS - POLICE NOTIFICATION SYSTEM",
    "PRP - PUBLIC REPORT PORTAL",
    "PAL - PROTECTED ARCHAEO LOCATIONS",
    "DSD - DIPLOMATIC SECURITY DIVISION",
    "FAM - FREQUENT ACCIDENT MAP",
    "DRS - DRIVER RATING SYSTEM",
    "POP - POLICE OFFICER PORTAL",
    "PTC - PERSONAL TRACK CONNECTION",
    "PTR - PERSONAL TRACK ROUTE",
    "PTA - PERSONAL TRACK ACTIVITY",
    "WMS - WEAPONS MANAGEMENT SYSTEM",
    "FMS - FUEL MANAGEMENT SYSTEM",
    "ONP - OFFICER NOTIFICATION PANEL",
    "NIB - NATIONAL INTELLIGENCE BUREAU",
    "AOC - ANTI ORGANIZED CRIME",
    "VSE - VEHICLE SEARCH ENGINE",
    "CCC - CENTRAL CYBER COMMAND",
    "RGS - REPORT GENERATING SYSTEM",
    "MOD - MINISTRY OF DEFENCE",
    "LSS - LIVE STREAMING SYSTEM",
    "CPS - CAR PARK SYSTEM",
    "STL - SMART TRANSPORT LIGHT",
    "OMR - OWNER MISMATCH RECORD",
    "STS - SMART TRANSPORT SYSTEM",
    "TRC - TELECOM REGULATORY COMMISSION",
    "NSP - NETWORK SERVICE PORTAL",
    "CMS - CITIZEN MANAGEMENT SYSTEM",
    "CFP - CITIZEN FEEDBACK PORTAL",
    "PFP - POLICE FEEDBACK PORTAL",
    "DRP - DEVICE REGISTRATION PORTAL",
    "DTP - DEVICE TRANSFER PORTAL",
    "CCS - COURT CASE SYSTEM",
    "DOA - DEPARTMENT OF ARCHAEOLOGY",
    "TPS - TRAVEL PASS SYSTEM",
    "MOH - MINISTRY OF HEALTH",
    "NPC - NATIONAL POLICE COMMISSION",
    "TNS - TRAIN NETWORK SYSTEM",
    "HEP - HIGHWAY EXIT PORTAL",
    "DSO - DIVISIONAL SECRETERIAT SYSTEM",
    "VIE - VEHICLE INSURANCE ENTITY",
    "DMT - DEPARTMENT OF MOTOR TRAFFIC",
    "ECS - EMISSION CERTIFICATE SYSTEM",
    "CFC - CEYLON FISHERIES CORPORATION",
    "CDS - CAMERA DISPATCH SYSTEM",
    "ASR - ARTIFICIAL SMART READER",
    "PBS - PANIC BUTTON SERVICE",
    "TVS - TRAFFIC VIOLATION SYSTEM",
  ];
  const fetchButtonsByUserId = async (user_id, component_id) => {
    const buttonByUserIdResponse =
      await getUserButtonsRightsByUserIdAndComponentsIdApi({
        user_id,
        component_id,
      });
    if (buttonByUserIdResponse.length > 0) {
      setUserButtonList(buttonByUserIdResponse);
      for (let i = 0; i < buttonByUserIdResponse.length; i++) {
        console.log(buttonByUserIdResponse[i].button_display_name);
        if (
          !unchangedArrayList.includes(
            buttonByUserIdResponse[i].button_display_name
          )
        ) {
          // If the value is not present, add it to the array
          ArrayList.push(buttonByUserIdResponse[i].button_display_name);
          unchangedArrayList.push(
            buttonByUserIdResponse[i].button_display_name
          );
        }
      }
    } else {
    }
  };

  const handleHomeSearch = (HomeMenuQuery) => {
    const getRoleUserSearch = HomeMenuQuery.toUpperCase();
    if (getRoleUserSearch.length > 0) {
      const searchData = unchangedArrayList.filter((item) =>
        item.toUpperCase().includes(getRoleUserSearch)
      );
      setArrayList(searchData);
    } else {
      setArrayList(unchangedArrayList);
    }
  };

  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    fetchButtonsByUserId(user_id, component_id);
    handleHomeSearch(HomeMenuQuery);
  }, [HomeMenuQuery]);

  useEffect(() => {
    // Check if redirectUrl is not null or empty
    if (redirectUrl && redirectUrl !== "") {
      // Dispatch an action to reset the navigation state
      dispatch(ResetNavigationState());

      // Navigate to the redirect URL
      navigate(redirectUrl);
    }
    // Dependency array: the effect will run whenever redirectUrl changes
  }, [redirectUrl]);

  return (
    <>
      <section className="mx-5 pb-10">
        {ArrayList && (
          <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
            {ArrayList.map((data, key) => {
              console.log(data);
              let route = data?.button_routes;
              if (!route) {
                route = data.toLowerCase().substring(0, 3);
              }
              return (
                <button onClick={(e) => navigate(route)} key={key}>
                  <div
                    className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left"
                    key={key}
                  >
                    {data}
                  </div>
                </button>
              );
            })}
            <button onClick={(e) => navigate("/pmt")}>
              <div
                className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left"
                key={"key"}
              >
                MAKE PAYMENT
              </div>
            </button>
            {/* <button onClick={(e) => navigate("/hnb-payment-test")}>
              <div
                className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left"
                key={"hnb-payment-test"}
              >
                HNB PAYMENT TEST
              </div>
            </button> */}
          </div>
        )}

        {/* <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        {arrListName.map((data, key) => {
          let route = data.toLowerCase().substring(0, 3);
          return (
            <div
              className="bg-white text-gray-950 border border-gray-900 rounded-md px-4 py-2"
              key={key}
            >
              <Link to={route}>{data}</Link>
            </div>
          );
        })}
      </div> */}

        {/* <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:text-xs gap-2 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/phq">PHQ - POLICE HEADQUARTERS</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/nse">NSE - NATIONAL SEARCH ENGINE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cpm">CPM - CHARACTER PROFILING MODULE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dre">DRE - DATA REQUISITION ENGINE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cme">CME - CONNECTION MANAGING ENGINE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dcm">DCM - DATABASE CONNECTION MANAGEMENT</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dop">DOP - DRIVER OFFENSE PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cgp">CGP - CITIZEN GENERAL PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pws">PWS - POLICE WATCHDOG SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ecc">ECC - EMERGENCY CALL CENTER</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ums">UMS - USER MANAGEMENT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/vms">VMS - VEHICLE MANAGEMENT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dud">DUD - DEPARTMENTAL UNIQUE DASHBOARD</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/wpd">WPD - WARRANTED PEOPLE DATABASE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ltd">LTD - LIVE TOWER DETECTION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/lts">LTS - LIVE TRACKING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dms">DMS - DRONE MANAGEMENT SYSYTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/rze">RZE - RESTRICTED ZONE ENTRY</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/psr">PSR - POLICE SCENE REPORTING</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dss">DSS - DAILY SUMMARY SCREEN</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/bcm">BCM - BODY CAM MONITORING</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dpm">DPM - DETAILED POLICE MAP</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/crs">CRS - CITIZEN RATING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/prs">PRS - POLICE RATING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pcs">PCS - POLICE COMPLAINT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dmc">DMC - DISASTER MANAGEMENT CENTER</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pas">PAS - POLICE APPOINTMENT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/css">CSS - CRIME SUMMARY SCREEN</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/das">DAS - DUTY ALLOCATION SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pmd">PMD - POLICE MEDIA DIVISION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pns">PNS - POLICE NOTIFICATION SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/prp">PRP - PUBLIC REPORT PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pal">PAL - PROTECTED ARCHAEO LOCATIONS</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dsd">DSD - DIPLOMATIC SECURITY DIVISION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/fam">FAM - FREQUENT ACCIDENT MAP</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/drs">DRS - DRIVER RATING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pop">POP - POLICE OFFICER PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ptc">PTC - PERSONAL TRACK CONNECTION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ptr">PTR - PERSONAL TRACK ROUTE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pta">PTA - PERSONAL TRACK ACTIVITY</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/wms">WMS - WEAPONS MANAGEMENT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/fms">FMS - FUEL MANAGEMENT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/onp">ONP - OFFICER NOTIFICATION PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/nib">NIB - NATIONAL INTELLIGENCE BUREAU</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/aoc">AOC - ANTI ORGANIZED CRIME</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/vse">VSE - VEHICLE SEARCH ENGINE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ccc">CCC - CENTRAL CYBER COMMAND</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/rgs">RGS - REPORT GENERATING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/mod">MOD - MINISTRY OF DEFENCE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/lss">LSS - LIVE STEAMING SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/lss">CPS - CAR PARK SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/stl">STL - SMART TRAFFIC LIGHT</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/omr">OMR - OWNER MISMATCH RECORD</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/sts">STS - SMART TRANSPORT SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/trc">TRC - TELECOM REGULATORY COMMISSION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/nsp">NSP - NETWORK SERVICE PROVIDER</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cms">CMS - CITIZEN MANAGEMENT SYSTEM</Link>
        </div>

        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cfp">CFP - CITIZEN FEEDBACK PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/pfp">PFP - POLICE FEEDBACK PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/drp">DRP - DEVICE REGISTRATION PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dtp">DTP - DEVICE TRANSFER PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ccs">CCS - COURT CASE SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/doa">DOA - DEPARTMENT OF ARCHAEOLOGY</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/tps">TPS - TRAVEL PASS SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/moh">MOH - MINISTRY OF HEALTH</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/npc">NPC - NATIONAL POLICE COMMISSION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/tns">TNS - TRAIN NETWORK SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/hep">HEP - HIGHWAY EXIT PORTAL</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dso">DSO - DIVISIONAL SECRETARIAT OFFICE</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/vie">VIE - VEHICLE INSURANCE ENTITY</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/dmt">DMT - DEPARTMENT OF MOTOR TRAFFIC</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/ecs">ECS - EMISSION CERTIFICATE SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cfc">CFC - CEYLON FISHERIES CORPORATION</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/cds">CDS - CAMERA DISPATCH SYSTEM</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2">
          <Link to="/asr">ASR - ARTIFICIAL SMART READER</Link>
        </div>
      </div> */}
      </section>
    </>
  );
};

export default nullHome;
