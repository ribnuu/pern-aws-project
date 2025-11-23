import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Connection from "./pages/Connection/Connection";
import Connect from "./pages/Connection/Connect";
// import Navbar from "./components/Navbar";
import Navbar from "./components/SiteNavBar";
import NullHome from "./components/nullHome";
import Requisition from "./components/Requisition/Requisition";
import CharacterRating from "./pages/Character/characterRating";
import Payment from "./pages/DrivingOffensePortal/payment";
import Select from "./pages/DrivingOffensePortal/selectOffense";
import PaymentOption from "./pages/DrivingOffensePortal/paymentOption";
import OtpVerfification from "./pages/CitizenApp/otpVerification";
import SelectFine from "./pages/CitizenApp/selectFine";
import CitizenPaymentGateway from "./pages/CitizenApp/payment";
import ReportIncident from "./pages/CitizenApp/reportIncident";
import PoliceWatchdogSystem from "./pages/PoliceWatchdogSystem/PoliceWatchdogSystem";
import PoliceEmergencyCallCenter from "./pages/PoliceEmergencyCallCenter/policeEmergencyCallCenter";
import CreateVehicles from "./pages/VehicleManagementSystem/createVehicle";
import AssignRoles from "./pages/UserManagementSystem/assignRoles";
import DepartmentUniqueDashboard from "./pages/DepartmentUniqueDashboard/departmentUniqueDashboard";
import NicDashboard from "./pages/Dashboard/NIC/nicDashboard";
import PassportDashboard from "./pages/Dashboard/Passport/passportDashboard";
import LicenseDashboard from "./pages/Dashboard/License/licenseDashboard";
import TelecommunicationsRegulatoryCommison from "./pages/TelecommunicationsRegulatoryCommison/TelecommunicationsRegulatoryCommison";
import NetworkServiceProvider from "./pages/NetworkServiceProvider/NetworkServiceProvider";
import WarrantedPeopleDatabase from "./pages/Dashboard/WarrantedPeopleDatabase/WarrantedPeopleDatabase";
import PoliceHeadquarters from "./pages/Dashboard/PoliceHeadquarters/PoliceHeadquarters";
import RestrictedZoneEntry from "./pages/RestrictedZoneEntry/restrictedZoneEntry";
import DroneMonitoringSystem from "./pages/DroneManagementSystem/droneManagementSystem";
import CitizenHome from "./pages/CitizenApp/citizenHome";
import Notes from "./pages/Notes/notes";
import InitialApplication from "./pages/CitizenApp/initialApplication";
import MyDetails from "./components/myDetails";
import MyVehicles from "./components/myVehicles";
import MissingVehicles from "./pages/PoliceWatchdogSystem/MissingVehicles";
import WantedPersons from "./pages/PoliceWatchdogSystem/WantedPersons";
import CitizenManagementSystem from "./pages/CitizenManagementSystem/citizenManagementSystem";
import PoliceSceneReporting from "./pages/PoliceSceneReporting/policeSceneReporting";
import DailySummaryScreen from "./pages/DailySummaryScreen/DailySummaryScreen";
import BodyCamMonitoring from "./pages/BodyCamMonitoring/bodyCamMonitoring";
import DetailedPoliceMap from "./pages/DetailedPoliceMap/detailedPoliceMap";
import CitizenFeedbackPortal from "./pages/CitizenFeedbackPortal/CitizenFeedbackPortal";
import PoliceFeedbackPortal from "./pages/PoliceFeedbackPortal/PoliceFeedbackPortal";
import PoliceRatingSystem from "./pages/policeRatingSystem/PoliceRatingSystem";
import AddDevices from "./pages/CitizenApp/addDevices";
import MyDevices from "./components/myDevices";
import AppointmentHome from "./pages/CitizenApp/Appointments.jsx/appointmentHome";
import DeviceRegistrationPortal from "./pages/DeviceRegistrationPortal.jsx/deviceRegistrationPortal";
import DeviceTransferPortal from "./pages/DeviceTransferPortal.jsx/deviceTransferPortal";
import FuelQr from "./pages/FuelQr/fuelQr";
import PoliceComplaintSystem from "./pages/PoliceComplaintSystem/policeComplaintSystem";
import DisasterManagemeneCenter from "./pages/DisasterManagementCenter/disasterManagemenentCenter";
import PoliceClearance from "./pages/PoliceClearance/policeClearance";
import VoterInformation from "./pages/Voter/voterInformation";
import DisasterAlert from "./pages/DisasterManagementCenter/disasterAlert";
import MyPoliceRating from "./pages/PoliceRatingSystem/myRating";
import PoliceAppointmentSytem from "./pages/PoliceAppointmentSystem/policeAppointmentSytem";
import SetAppointment from "./pages/PoliceAppointmentSystem/setAppointment";
import ViewAppointment from "./pages/PoliceAppointmentSystem/viewAppointment";
import LoginCitizen from "./pages/CitizenApp/login";
import RegisterCitizen from "./pages/CitizenApp/register";
import CitizenRatingSystemHome from "./pages/CitizenRatingSystem/citizenRatingSystemHome";
import CitizenRatingSystem from "./pages/CitizenRatingPortal.jsx/citizenRatingPortal";
import MyRatingToOthers from "./pages/CitizenRatingSystem/myRatingToOthers";
import OtherRatingToMine from "./pages/CitizenRatingSystem/otherRatingToMine";
import CrimeSummaryScreen from "./pages/CrimeSummaryScreen.jsx/crimeSummaryScreen";
import MeetOfficer from "./pages/CitizenApp/meetOfficer";
import LegalAdviceHome from "./pages/CitizenApp/LegalAdvice/legalAdviceHome";
import MissingPets from "./pages/PoliceWatchdogSystem/MissingPets";
import SeekLegalAdviceHome from "./pages/CitizenApp/LegalAdvice/seekLegalAdvice.jsx/seekLegalAdviceHome";
import MyMedicalRecords from "./pages/CitizenApp/Medical/MedicalRecords/myMedicalRecords";
import DutyAllocationSystem from "./pages/DutyAllocationSystem/dutyAllocationSystem";
import SocialMedia from "./pages/CitizenApp/SocialMedia/socialMedia";
import Settings from "./pages/CitizenApp/Settings/settings";
import CentralCyberCommand from "./pages/CentralCyberCommand/CentralCyberCommand";
import CourtCaseSystem from "./pages/CourtCaseSystem/CourtCaseSystem";
import CourtCases from "./pages/CitizenApp/CourtCases/courtCases";
import PoliceMediaDivision from "./pages/PoliceMediaDivision/policeMediaDivision";
import NewsOrAnnouncement from "./pages/CitizenApp/NewsOrAnnouncement/NewsOrAnnouncement";
import Notifications from "./pages/CitizenApp/Notifications/notifications";
import PoliceNotificationSystem from "./pages/PoliceNotificationSystem/policeNotificationSystem";
import PublicReportPortal from "./pages/PublicReportPortal/publicReportPortal";
import CGPDriverRatingSystem from "./pages/CitizenApp/DriverRatingSystem/driverRatingSystem";
import DepartmentOfArchaeology from "./pages/DepartmentOfArchaeology/departmentOfArchaeology";
import LoadLocation from "./pages/DepartmentOfArchaeology/loadLocation";
import ProtectedArchaeologicalLocations from "./pages/ProtectedArchaeologicalLocations/protectedArchaeologicalLocations";
import DiplomaticSecurityDivision from "./pages/DiplomaticSecurityDivision/diplomaticSecurityDivision";
import DSDLoadLocation from "./pages/DiplomaticSecurityDivision/DSDLoadLocation";
import DSDSetLocation from "./pages/DiplomaticSecurityDivision/DSDSetLocation";
import DOASetLocation from "./pages/DepartmentOfArchaeology/DOASetLocation";
import AllocateDuty from "./pages/DutyAllocationSystem/allocateDuty";
import CurrentDuty from "./pages/DutyAllocationSystem/currentDuty";
import FrequentAccidentMap from "./pages/FrequentAccidentMap/frequentAccidentMap";
import CGPFrequentAccidentMap from "./pages/CitizenApp/FrequentAccidentMap/frequentAccidentMap";
import ReportLocations from "./pages/CitizenApp/FrequentAccidentMap/reportLocations";
import DriverRatingSystem from "./pages/DriverRatingSystem/driverRatingSystem";
import PoliceOfficerPortal from "./pages/PoliceOfficerPortal/policeOfficerPortal";
import MyTickets from "./pages/CitizenApp/Tickets/myTickets";
import MyHospitalPass from "./pages/CitizenApp/HospitalPass/myHospitalPass";
import TravelPassSystem from "./pages/TravelPassSystem/travelPassSystem";
import HospitalPassSystem from "./pages/HospitalPassSystem/hospitalPassSystem";
import MyComplaint from "./pages/CitizenApp/MyComplaint/myComplaint";
import PersonalTrackConnection from "./pages/PersonalTrackConnection/personalTrackConnection";
import PersonalTrackRoute from "./pages/PersonalTrackRoute/PersonalTrackRoute";
import PersonalTrackActivity from "./pages/PersonalTrackActivity/PersonalTrackActivity";
import WeaponsManagementSystem from "./pages/WeaponsManagementSystem/WeaponsManagementSystem";
import WMSAllocate from "./pages/WeaponsManagementSystem/wmsAllocate";
import WMSRepair from "./pages/WeaponsManagementSystem/WMSRepair";
import FuelMaintenanceSystem from "./pages/FuelMaintenanceSystem/fuelMaintenanceSystem";
import VehicleManagementSystemHome from "./pages/VehicleManagementSystem/VehicleManagementSystemHome";
import RepairVehicle from "./pages/VehicleManagementSystem/repairVehicle";
import SuspectedDeviceRegistration from "./pages/SuspectedDeviceRegistration/SuspectedDeviceRegistration";
import SuspectedTreasureHunters from "./pages/SuspectedTreasureHunters/suspectedTreasureHunters";
import ReportTrafficBlock from "./pages/PoliceOfficerPortal/ReportTrafficBlock";
import CourtCaseSystemHome from "./pages/CourtCaseSystem/CourtCaseSystemHome";
import DigitalEvidenceManager from "./pages/CourtCaseSystem/DigitalEvidenceManager";
import CourtOrderManagement from "./pages/CourtCaseSystem/CourtOrderManagement";
import OfficerNotificationPriority from "./pages/OfficerNotificationPriority/officerNotificationPriority";
import NationalPoliceCommision from "./pages/NationalPoliceCommision/nationalPoliceCommision";
import ReviewComplaints from "./pages/NationalPoliceCommision/reviewComplaints";
import LodgeComplaints from "./pages/NationalPoliceCommision/lodgeComplaints";
import PoliceEmergencyCallCenterHome from "./pages/PoliceEmergencyCallCenter/policeEmergencyCallCenterHome";
import LiveTowerDetection from "./pages/LiveTowerDetection/liveTowerDetection";
import Test from "./pages/Test/test";
import PrioritySettings from "./pages/PoliceEmergencyCallCenter/PrioritySettings";
import AddStation from "./pages/MasterPolice/AddStation";
import AddStfCamp from "./pages/MasterPolice/AddStfCamp";
import AddDesignation from "./pages/MasterPolice/AddDesignation";
import AddPoliceOfficer from "./pages/MasterPolice/AddPoliceOfficer";
import AssignPoliceOfficer from "./pages/MasterPolice/AssignPoliceOfficer";
import FileSubmission from "./pages/Test/fileSubmission";
// import PDFViewer from "./pages/Test/PDFViewer";
import ChatUI from "./pages/Chat/chatUI";
import ExpresswayDashboard from "./pages/Dashboard/Expressway/expresswayDashboard";
import PrivateUniversity from "./pages/Dashboard/PrivateUniversity/PrivateUniversity";
import TransportCommission from "./pages/Dashboard/TransportCommission/TransportCommission";
import ElectionCommission from "./pages/Dashboard/ElectionCommision/ElectionCommission";
import ExternalMenu from "./components/ExternalMenu";
import TrainNetworkSystem from "./pages/TrainNetworkSystem/TrainNetworkSystem";
import RiotsForecaseSystem from "./pages/PoliceWatchdogSystem/RiotsForecastSystem/RiotsForecaseSystem";
import Insurance from "./pages/Dashboard/Insurance/Insurance";
import DivisionalSecretariat from "./pages/Dashboard/DivisionalSecretariat/DivisionalSecretariat";
import NationalIntelligenceBureau from "./pages/NationalIntelligenceBureau/NationalIntelligenceBureau";
import CriminalRecordsDivision from "./pages/CriminalRecordsDivision/CriminalRecordsDivision";
import IssuesWithoutFine from "./pages/DrivingOffensePortal/IssuesWithoutFine";
import LiveTrackingSystem from "./pages/LiveTrackingSystem/LiveTrackingSystem";
import VehicleSearchEngine from "./pages/VehicleSearchEngine/VehicleSearchEngine";
import FindPersonOrVehicle from "./pages/PoliceWatchdogSystem/FindPersonOrVehicle/FindPersonOrVehicle";
import WhoElseSearch from "./pages/CentralCyberCommand/WhoElseSearch/WhoElseSearch";
import CCCFindPersonOrVehicle from "./pages/CentralCyberCommand/CCCFindPersonOrVehicle/CCCFindPersonOrVehicle";
import WidgetManager from "./pages/CentralCyberCommand/WidgetManager";
import RequestForHelp from "./pages/RequestForHelp/RequestForHelp";
import DriverPointsSystem from "./pages/DrivingOffensePortal/DriverPointsSystem/DriverPointsSystem";
import ReportGeneratingSystem from "./pages/ReportGeneratingSystem/ReportGeneratingSystem";
import PoliceForceUpdate from "./pages/ReportGeneratingSystem/PoliceForceUpdate/PoliceForceUpdate";
import ExampleDehiwala from "./pages/ReportGeneratingSystem/PoliceForceUpdate/ExampleDehiwala";
import ExampleWellawatte from "./pages/ReportGeneratingSystem/PoliceForceUpdate/ExampleWellawatte";
import TravelRouteReport from "./pages/ReportGeneratingSystem/TravelRouteReport/TravelRouteReport";
import HighwayExitPortal from "./pages/HighwayExitPortal/HighwayExitPortal";
import MinistryOfDefence from "./pages/MinistryOfDefence/MinistryOfDefence";
import PermissionToImport from "./pages/MinistryOfDefence/PermissionToImport";
import WeaponsLicenseIssued from "./pages/MinistryOfDefence/WeaponsLicenseIssued";
import SpecialLettersUpdate from "./pages/MinistryOfDefence/SpecialLettersUpdate";
import EntryBanDetection from "./pages/PoliceWatchdogSystem/EntryBanDetection/EntryBanDetection";
import StateBankAccount from "./pages/Dashboard/Bank/StateBankAccount";
import RemoteTermination from "./pages/CentralCyberCommand/RemoteTermination";
import ConnectionStatus from "./pages/CentralCyberCommand/ConnectionStatus";
import LiveStreamingSystem from "./pages/LiveStreamingSystem/LiveStreamingSystem";
import VehicleRegistration from "./pages/Dashboard/VehicleRegistration/VehicleRegistration";
import VotersRegistration from "./pages/Dashboard/VotersRegistration/VotersRegistration";
import DivisionalSecretariatOffice from "./pages/DivisionalSecretariatOffice/DivisionalSecretariatOffice";
import DSOSetAppointment from "./pages/DivisionalSecretariatOffice/DSOSetAppointment";
import DSOViewAppointment from "./pages/DivisionalSecretariatOffice/DSOViewAppointment";
import VehicleInsuranceEntity from "./pages/VehicleInsuranceEntity/VehicleInsuranceEntity";
import VIESetAppointment from "./pages/VehicleInsuranceEntity/VIESetAppointment";
import VIEViewAppointment from "./pages/VehicleInsuranceEntity/VIEViewAppointment";
import DepartmentOfMotorTraffic from "./pages/DepartmentOfMotorTraffic/DepartmentOfMotorTraffic";
import DMTSetAppointment from "./pages/DepartmentOfMotorTraffic/DMTSetAppointment";
import DMTViewAppointment from "./pages/DepartmentOfMotorTraffic/DMTViewAppointment";
import ECSSetAppointment from "./pages/EmissionCertficateSystem/ECSSetAppointment";
import ECSViewAppointment from "./pages/EmissionCertficateSystem/ECSViewAppointment";
import EmissionCertificateSystem from "./pages/EmissionCertficateSystem/EmissionCertificateSystem";
import CeylonFisheriesCorporation from "./pages/External/CeylonFisheriesCorporation/CeylonFisheriesCorporation";
import TeacherTraining from "./pages/Dashboard/TeacherTraining/TeacherTraining";
import ExciseDashboard from "./pages/Dashboard/Excise/ExciseDashboard";
import TechnicalCollege from "./pages/Dashboard/TechnicalColleges/TechnicalColleges";
import Company from "./pages/Dashboard/Company/Company";
import CribDashboard from "./pages/Dashboard/CRIB/Crib";
import CeaDashboard from "./pages/Dashboard/CEA/CEA.JSX";
import InlandRevenue from "./pages/Dashboard/InlandRevenue/inland-revenue";
import BankTransaction from "./pages/Dashboard/Bank/bankTransaction";
import CouncilHome from "./pages/Council/CouncilHome";
import PoliceComplaintSystemNse from "./pages/Dashboard/PoliceComplaintSystem/PoliceComplaintSystem";
import OtherEducationalBodies from "./pages/Dashboard/OtherEducationalBodies/OtherEducationalBodies";
import Gem from "./pages/Dashboard/Gem/gem";
import EPFDashboard from "./pages/Dashboard/Epf/EpfDashboard";
import ETFDashboard from "./pages/Dashboard/Etf/EtfDashboard";
import University from "./pages/Dashboard/Universities/University";
import CarParkServices from "./pages/Dashboard/CarParkServices/CarParkServices";
import SmartTrafficLight from "./pages/SmartTrafficLight/SmartTrafficLight";
import ForeignEmploymentBureau from "./pages/Dashboard/Foreign-Employment-Bureau/ForeignEmploymentBureau";
import NSEPoliceWatchDogSystem from "./pages/Dashboard/PoliceWatchdogSystem/PoliceWatchdogSystem";
import OwnerMismatchRecord from "./pages/Menu/OwnerMismatchRecord/OwnerMismatchRecord";
import Validation from "./components/validation";
import SchoolDashboard from "./pages/Dashboard/School/SchoolDashboard";
import HospitalDashboard from "./pages/Dashboard/Hospital/HospitalDashboard";
import DrivingOffenseDashboard from "./pages/Dashboard/DrivingOffense/DrivingOffense";
import NetworkDashboard from "./pages/Dashboard/NetworkDashboard/NetworkDashboard";
import TaxiDashboard from "./pages/Dashboard/Taxi/TaxiDashboard";
import SriLankaMedicalCouncil from "./pages/Dashboard/Sri-Lanka-Medical-Council/SriLankaMedicalCouncil";
import VehicleEmissionCertificate from "./pages/Dashboard/Vehicle-Emission-Certificate/VehicleEmissionCertificate";
import VehicleInsurance from "./pages/Dashboard/vehicle-insurance/vehicleInsurance";
import VehicleRevenueLicense from "./pages/Dashboard/Vehicle-Revenue-License/VehicleRevenueLicense";
import AtomicEnergyAuthority from "./pages/Dashboard/Atomic-energy-authority/Atomic-energy-authority";
import Login from "./components/Login";
import UserManagementSystem from "./pages/UserManagementSystem/UserManagementSystem";
import ExpresswayVehicleDashboard from "./pages/Dashboard/Expressway/ExpresswayVehicleDashboard";
import TransportCommissionVehicle from "./pages/Dashboard/TransportCommission/TransportCommissionVehicle";
import TaxiDashboardVehicle from "./pages/Dashboard/Taxi/TaxiVehicleDashboard";
import Todo from "./pages/Test/Todo";
import LinksNavbar from "./pages/Test/Links";
import CarParkServicesVehicleNumber from "./pages/Dashboard/CarParkServices/CarParkServiesVehicleNumber";
import ExaminationDashboard from "./pages/Dashboard/Examination/examinationDashboard";
import ImmigrationNseDashboard from "./pages/Dashboard/Immigration/immigrationDashboard";
import AirlinesDashboard from "./pages/Dashboard/Airlines/AirlinesDashboard";
import WhoElseSearchNSE from "./pages/Dashboard/WhoElseSearchNSE/WhoElseSearchNSE";
import CitizenCodeNumber from "./pages/Dashboard/CitizenCodeNumber/CitizenCodeNumber";
import FamilyChartDiagram from "./pages/Dashboard/FamilyChartDiagram/FamilyChartDiagram";
import ChildrenTransportServices from "./pages/CitizenApp/ChildrenTransportServices/ChildrenTransportServices";
import TuitionSportsClasses from "./pages/CitizenApp/TuitionSportsClasses/TuitionSportsClasses";
import PoliceComplaint from "./pages/Dashboard/PoliceComplaint/PoliceComplaint";
import CustomsDashboard from "./pages/Dashboard/Customs/CustomsDashboard";
import MainHome from "./pages/MainHome/MainHome";
import Nse from "./pages/NationalSearchEngine/NationalSearchEngine";
import SmartTransportSystem from "./pages/SmartTransportSystem/SmartTransportSystem";
import SessionTimeout from "./pages/Notes/SessionTimeout";
import VariableSettings from "./pages/Test/VariableSettings";
import WorkstationSettings from "./pages/CentralCyberCommand/WorkstationSettings";
import MobileApplicationSettings from "./pages/CentralCyberCommand/MobileApplicationSettings";
import AudioControls from "./pages/CentralCyberCommand/AudioControls";
import TRCDevicesDatabase from "./pages/TelecommunicationsRegulatoryCommison/TRCDevicesDatabase";
import CameraDispatchSystem from "./pages/CameraDispatchSystem/CameraDispatchSystem";
import MinistryOfHealth from "./pages/MinistryOfHealth/MinistryOfHealth";
import EpidemiologyUnit from "./pages/MinistryOfHealth/EpidemiologyUnit";
import UsageTracking from "./pages/CentralCyberCommand/UsageTracking";
import ArtificialSmartReader from "./pages/ArtificialSmartReader/ArtificialSmartReader";
import TreeView from "./pages/Test/TreeView";
import LocationConfirmation from "./pages/DutyAllocationSystem/LocationConfirmation";
import UMSAssignRightsBackup from "./pages/UserManagementSystem/UMSAssignRightsBackup";
import PanicButtonService from "./pages/PanicButtonService/PanicButtonService";
import TrafficViolationSystem from "./pages/TrafficViolationSystem/TrafficViolationSystem";
import Auditing from "./pages/CentralCyberCommand/Auditing";
import Footer from "./components/Footer";
import ChiefExecutiveOfficer from "./pages/Menu/ChiefExecutiveOfficer.jsx/ChiefExecutiveOfficer";
import TransportCommissionHome from "./pages/TransportCommission/TransportCommissionHome";
import TransportCommissionRegistration from "./pages/TransportCommission/TransportCommisionRegistration";
import ViewPermit from "./pages/TransportCommission/ViewPermit";
import CitizenCodeNumberMenu from "./pages/Menu/OwnerMismatchRecord/CitizenCodeNumberMenu";
import BirthCertificate from "./pages/Menu/BirthDeathMarriageCertificate/BirthCertficate";
import BirthDeathMarriageHome from "./pages/Menu/BirthDeathMarriageCertificate/BirthDeathMarriageHome";
import AddTuitionForm from "./pages/Menu/MinistryOfEducation/Tuition/AddTuitionForm";
import AddSchoolForm from "./pages/Menu/MinistryOfEducation/AddSchoolForm";
import TuitionHome from "./pages/Menu/MinistryOfEducation/Tuition/TuitionHome";
import AddTutory from "./pages/Menu/MinistryOfEducation/Tuition/AddTutory";
import DeathCertificate from "./pages/Menu/BirthDeathMarriageCertificate/DeathCertificate";
import AssignTutory from "./pages/Menu/MinistryOfEducation/Tuition/AssignTutory";
import MarriageCertificate from "./pages/Menu/BirthDeathMarriageCertificate/MarriageCertificate";
import MissingPersons from "./pages/PoliceWatchdogSystem/MissingPersons";
import MyLicense from "./pages/CitizenApp/MyLicense/MyLicense";
import HousemaidMenu from "./pages/CitizenApp/HouseMaid/HousemaidMenu";
import HouseMaidRegistration from "./pages/CitizenApp/HouseMaid/HouseMaidRegistration";
import ChildrenTuitionDashboard from "./pages/Dashboard/ChildrenPages/ChildrenTuitionDashboard";
import HousemaidView from "./pages/CitizenApp/HouseMaid/HousemaidView";
import ChildrenSchoolDashboard from "./pages/Dashboard/ChildrenPages/ChildrenSchoolDashboard";
import DriverMenu from "./pages/CitizenApp/Driver/DriverMenu";
import DriverRegistration from "./pages/CitizenApp/Driver/DriverRegistration";
import DriverView from "./pages/CitizenApp/Driver/DriverView";
import ChildrenTransportDashboard from "./pages/Dashboard/ChildrenPages/ChildrenTransportDashboard";
import BirthMarriageDeath from "./pages/Dashboard/BirthMarriageDeath/BirthMarriageDeath";
import AntiOrganizedCrimeMenu from "./pages/AntiOrganizedCrime/AntiOrganizedCrimeMenu";
import RegisterWithMobileNumber from "./components/RegisterWithMobileNumber";
import ProfileSettings from "./components/ProfileSettings";
import TrafficFineSystem from "./pages/CitizenRatingPortal.jsx/TrafficFineSystem/TrafficFineSystem";
import CustomerCareNumber from "./pages/CustomerCareNumber/CustomerCareNumber";
import PaymentGateway from "./pages/PaymentGateway";
import PaymentGatewayCheckout from "./pages/PaymentGateway/checkout";
import DriverOffensePortal from "./pages/DrivingOffensePortal";
import FinesOnMyDuty from "./pages/DrivingOffensePortal/FinesOnMyDuty/finesOnMyDuty";
import ShoppingPortal from "./pages/ShoppingPortal";
import ShopOne from "./pages/ShoppingPortal/shopOne";
import PointOfSales from "./pages/PointOfSales";
import RefundPolicyPage from "./pages/WebSite/refundPolicyPAge";
import AwardsPage from "./pages/WebSite/awardsPage";
import ServicesPage from "./pages/WebSite/servicesPage";
import TermsAndConditionsPage from "./pages/WebSite/termsAndConditionsPage";
import ContactUsPage from "./pages/WebSite/contactUsPage";
import CompliancePage from "./pages/WebSite/compliancePage";
import CloudSecurityPage from "./pages/WebSite/CloudSecurityPage";
import CareersPage from "./pages/WebSite/careersPage";
import SolutionsPage from "./pages/WebSite/solutionsPage";
import AboutUsPage from "./pages/WebSite/aboutPage";
import MitigatingCyberSecurity from "./pages/WebSite/SecurityChallenge/mitigatingCyberSecurity";
import IdentifyingAndRespondingToThreats from "./pages/WebSite/SecurityChallenge/identNResponToThreats";
import TestingCyberSecurityReadiness from "./pages/WebSite/SecurityChallenge/testinCSReadiness";
import ManagingCloudSecurity from "./pages/WebSite/SecurityChallenge/managingCloudSecurity";
import InvestigatingAndReportingBreaches from "./pages/WebSite/SecurityChallenge/investigatingReportingBreaches";
import ProtectAgainstMalware from "./pages/WebSite/SecurityChallenge/protectAgainstMalware";
import TacklingPhishingAndBECAttacks from "./pages/WebSite/SecurityChallenge/tacklingPhNBecAttacks";
import DefendingAgainstInsiderThreats from "./pages/WebSite/SecurityChallenge/defendingAgainsInsiderThreats";
import AcheivingGdprCompliance from "./pages/WebSite/SecurityChallenge/acheivingGdprCompliance";
import SecureRemoteWorkers from "./pages/WebSite/SecurityChallenge/secureRemoteWorkers";
import BillDetails from "./pages/PointOfSales/billDetails";
import HNBPaymentTest from "./pages/HNBPaymentTest/hnbPaymentTest";
import UMSRegister from "./pages/UserManagementSystem/CreateUser/UMSRegister";
import TrafficOffenseReport from "./pages/ReportGeneratingSystem/TrafficOffenseReport/TrafficOffenseReport";
import ItemInformation from "./pages/PointOfSales/ItemInformation/ItemInformation";
import GRNScreen from "./pages/PointOfSales/GRNScreen/GRNScreen";
import GRNHomeScreen from "./pages/GRNHomeScreen/GRNHomeScreen";
import BillPaymentScreen from "./pages/PointOfSales/BillPaymentScreen/BillPaymentScreen";
import ItemCategorySubCategoryScreen from "./pages/PointOfSales/ItemCategorySubCategoryScreen/ItemCategorySubCategoryScreen";
import POSBillingScreen from "./pages/PointOfSales/BillingScreen/posBillingScreen";
import InstitutionManagementScreen from "./pages/PointOfSales/InstitutionManagementScreen/InstitutionManagementScreen";
import ProfitAndLossScreen from "./pages/PointOfSales/ProfitAndLossScreen/ProfitAndLossScreen";
import ExpensesCategorySubCategoryScreen from "./pages/PointOfSales/ExpensesCategorySubCategoryScreen/ExpensesCategorySubCategoryScreen";
import ExpensesScreen from "./pages/PointOfSales/ExpensesScreen/ExpensesScreen";
import IpAddressSettings from "./pages/IpAddressSettings/IpAddressSettings";
import RepSalesVisitScreen from "./pages/PointOfSales/RepSalesVisitScreen/RepSalesVisitScreen";
import AutoSalesSystemScreen from "./pages/PointOfSales/AutoSalesSystemScreen/AutoSalesSystemScreen";
import InstitutionRepresentativesScreen from "./pages/PointOfSales/InstitutionRepresentativesScreen/InstitutionRepresentativesScreen";
import PaymentFormAndConfirmation from "./pages/HNBPaymentTest/PaymentFormAndConfirmation";
import TransactionsScreen from "./pages/PointOfSales/TransactionsScreen/TransactionsScreen";
import HomeButtonPage from "./pages/HomeButtonPage/HomeButtonPage";
import InstitutionStockActivityCheck from "./pages/PointOfSales/InstitutionStockActivityCheck/InstitutionStockActivityCheck";
import Institutions from "./pages/PointOfSales/Institutions/Institutions";
import ManageBillsScreen from "./pages/PointOfSales/ManageBills/ManageBillsScreen";
import WhitelistedRoutes from "./pages/WhitelistedRoutes/WhitelistedRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import CustomerProfileScreen from "./pages/PointOfSales/CustomerProfileScreen/CustomerProfileScreen";
import NtbPaymentTestCheckoutPage from "./pages/HNBPaymentTest/NtbPaymentTest";
import RepCommissionsPayScreen from "./pages/PointOfSales/RepCommissionsPayScreen/RepCommissionsPayScreen";
import LicenseActionsScreen from "./pages/DrivingOffensePortal/LicenseActionsScreen/LicenseActionsScreen";
import LicenseInHand from "./pages/DrivingOffensePortal/LicenseInHand/LicenseInHand";
import IssueFine from "./pages/DrivingOffensePortal/IssueFine/IssueFine";
import ArrestPerson from "./pages/PoliceOfficerPortal/ArrestPerson/ArrestPerson";
import HotelGatewaySystem from "./pages/HotelGatewaySystem/HotelGatewaySystem";
import HotelRegistration from "./pages/HotelGatewaySystem/HotelRegistration/HotelRegistration";
import ManageHotels from "./pages/HotelGatewaySystem/ManageHotels/ManageHotels";
import Hotels from "./pages/HotelGatewaySystem/Hotels/Hotels";
import HouseHoldersList from "./pages/HouseHoldersList/HouseHoldersList";
import HouseHoldersRegistration from "./pages/HouseHoldersList/HouseHoldersRegistration/HouseHoldersRegistration";
import ManageHouseHoldersList from "./pages/HouseHoldersList/ManageHouseHoldersList/ManageHouseHoldersList";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Houses from "./pages/HouseHoldersList/Houses/Houses";
import HouseReportVerificationDashboard from "./pages/HouseReportVerificationDashboard/HouseReportVerificationDashboard";
import PoHomeScreen from "./pages/PoHomeScreen/poHomeScreen";
import CustomerOrder from "./pages/PointOfSales/CustomerOrder/CustomerOrder";
import CashierSessionDashboard from "./pages/PointOfSales/CashierSessionDashboard/CashierSessionDashboard";
import ProfitAndLossScreenUpdate from "./pages/PointOfSales/ProfitAndLossScreen/ProfitAndLossScreenUpdate";
import POSBillingScreenUpdate from "./pages/PointOfSales/BillingScreen/posBillingScreenUpdate";
import ReturnPOSBillingScreen from "./pages/PointOfSales/BillingScreen/ReturnPOSBillingScreen";

function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Breadcrumbs />
          <Routes>
            {/* <Route path="/" element={<Navbar />}> */}
            <Route path="/" element={<Navbar />}>
              {/* <Route path="/" element={<MainHome />}> */}
              <Route path="/home" element={<HomeButtonPage />} />
              <Route path="/dev" element={<HomeButtonPage />} />
              <Route index element={<MainHome />} />
              <Route path="hme" element={<NullHome />} />
              {/* <Route path="register" element={<Register />} /> */}
              {/* <Route path="register" element={<RegisterAdvanced />} /> */}
              <Route path="register" element={<RegisterWithMobileNumber />} />
              <Route path="/login" element={<Login />} />
              {/* Profile Section */}
              <Route path="profile-settings" element={<ProfileSettings />} />
              {/* Website Routes */}
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/cloud-security" element={<CloudSecurityPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditionsPage />}
              />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route
                path="/security-challenges/mtcs"
                element={<MitigatingCyberSecurity />}
              />
              <Route
                path="/security-challenges/igrt"
                element={<IdentifyingAndRespondingToThreats />}
              />
              <Route
                path="/security-challenges/tcsr"
                element={<TestingCyberSecurityReadiness />}
              />
              <Route
                path="/security-challenges/mgcs"
                element={<ManagingCloudSecurity />}
              />
              <Route
                path="/security-challenges/igrb"
                element={<InvestigatingAndReportingBreaches />}
              />
              <Route
                path="/security-challenges/pgam"
                element={<ProtectAgainstMalware />}
              />
              <Route
                path="/security-challenges/tpba"
                element={<TacklingPhishingAndBECAttacks />}
              />{" "}
              <Route
                path="/security-challenges/dait"
                element={<DefendingAgainstInsiderThreats />}
              />
              <Route
                path="/security-challenges/agdc"
                element={<AcheivingGdprCompliance />}
              />
              <Route
                path="/security-challenges/sgrw"
                element={<SecureRemoteWorkers />}
              />
              {/* --------- End of website routes ---------- */}
              {/* --------- Dynamic Routes ----------------- */}
              {/* Dynamic route for bill details */}
              <Route path="/pos/bln/:billNumber" element={<BillDetails />} />
              {/* --------- End of Dynamic Routes ---------- */}
              {/* Payments Testing */}
              <Route path="/hnb-payment-test" element={<HNBPaymentTest />} />
              <Route
                path="/payment_confirmation"
                element={<PaymentFormAndConfirmation />}
              />
              {/* End of Payments Testing Routes */}
              <Route path="externalMenu" element={<ExternalMenu />} />
              <Route path="cme" element={<Connection />} />
              <Route path="dcm" element={<Connect />} />
              <Route path="nse" element={<Nse />} />
              <Route path="dre" element={<Requisition />} />
              <Route path="cpm" element={<CharacterRating />} />
              {/* Report Generating System */}
              <Route path="/rgs" element={<ReportGeneratingSystem />} />
              <Route path="/rgs/dss" element={<DailySummaryScreen />} />
              <Route path="/rgs/css" element={<CrimeSummaryScreen />} />
              <Route path="/rgs/pfu" element={<PoliceForceUpdate />} />
              <Route
                path="/rgs/travel-route-report"
                element={<TravelRouteReport />}
              />
              <Route path="/rgs/tor" element={<TrafficOffenseReport />} />
              <Route path="/val" element={<Validation />} />
              {/* EXAMPLE PAGES OF PFU */}
              <Route path="/rgs/pfu/dehiwala" element={<ExampleDehiwala />} />
              <Route
                path="/rgs/pfu/wellawatte"
                element={<ExampleWellawatte />}
              />
              {/* Menu */}
              <Route path="omr" element={<OwnerMismatchRecord />} />
              <Route path="ntc" element={<TransportCommissionHome />} />
              <Route
                path="ntc/create"
                element={<TransportCommissionRegistration />}
              />
              <Route path="ntc/view" element={<ViewPermit />} />
              <Route path="ccn" element={<CitizenCodeNumberMenu />} />
              {/* CEO */}
              <Route path="ceo" element={<ChiefExecutiveOfficer />} />
              {/* Driver Offense Portal */}
              {/* <Route path="/dop" element={<IssueFine />} /> */}
              <Route path="/pop/dop" element={<DriverOffensePortal />} />
              <Route path="/pop/dop/ife" element={<IssueFine />} />
              <Route path="/pop/dop/fod" element={<FinesOnMyDuty />} />
              <Route path="/pop/dop/lia" element={<LicenseActionsScreen />} />
              <Route path="/pop/dop/lid" element={<LicenseInHand />} />
              <Route path="/pop/dop/select" element={<Select />} />
              <Route path="/pop/arp" element={<ArrestPerson />} />
              <Route
                path="/pop/dop/paymentOption"
                element={<PaymentOption />}
              />
              <Route path="/dop/payment" element={<Payment />} />
              <Route
                path="/dop/issues-without-fine"
                element={<IssuesWithoutFine />}
              />
              <Route path="/dop/dps" element={<DriverPointsSystem />} />
              {/* Shopping Portal */}
              <Route path="/shp" element={<ShoppingPortal />} />
              <Route path="/shp/1001" element={<ShopOne />} />
              {/* Point of Sales */}
              <Route
                path="/pos"
                element={<PrivateRoute element={<PointOfSales />} />}
              />
              <Route
                path="/pos/bln"
                element={<PrivateRoute element={<POSBillingScreen />} />}
              />
              <Route
                path="/pos/rbln"
                element={<PrivateRoute element={<ReturnPOSBillingScreen />} />}
              />
              <Route
                path="/pos/blnu"
                element={<PrivateRoute element={<POSBillingScreenUpdate />} />}
              />
              <Route
                path="/pos/iin"
                element={<PrivateRoute element={<ItemInformation />} />}
              />
              <Route
                path="/pos/grn"
                element={<PrivateRoute element={<GRNHomeScreen />} />}
              />
              <Route
                path="/pos/po"
                element={<PrivateRoute element={<PoHomeScreen />} />}
              />
              <Route
                path="/pos/bpm"
                element={<PrivateRoute element={<BillPaymentScreen />} />}
              />
              <Route
                path="/pos/item-category-sub-category"
                element={
                  <PrivateRoute element={<ItemCategorySubCategoryScreen />} />
                }
              />
              <Route
                path="/pos/ins"
                element={
                  <PrivateRoute element={<InstitutionManagementScreen />} />
                }
              />
              {/* <Route
                path="/pos/pnl"
                element={<PrivateRoute element={<ProfitAndLossScreen />} />}
              /> */}
              <Route
                path="/pos/pnl"
                element={
                  <PrivateRoute element={<ProfitAndLossScreenUpdate />} />
                }
              />
              <Route
                path="/pos/ecs"
                element={
                  <PrivateRoute
                    element={<ExpensesCategorySubCategoryScreen />}
                  />
                }
              />
              <Route
                path="/pos/eps"
                element={<PrivateRoute element={<ExpensesScreen />} />}
              />
              <Route
                path="/pos/rsv"
                element={<PrivateRoute element={<RepSalesVisitScreen />} />}
              />
              <Route
                path="/pos/asy"
                element={<PrivateRoute element={<AutoSalesSystemScreen />} />}
              />
              <Route
                path="/pos/irs"
                element={
                  <PrivateRoute
                    element={<InstitutionRepresentativesScreen />}
                  />
                }
              />
              <Route
                path="/pos/tac"
                element={<PrivateRoute element={<TransactionsScreen />} />}
              />
              <Route
                path="/pos/isa"
                element={
                  <PrivateRoute element={<InstitutionStockActivityCheck />} />
                }
              />
              <Route
                path="/pos/ind"
                element={<PrivateRoute element={<Institutions />} />}
              />
              <Route
                path="/pos/mbl"
                element={<PrivateRoute element={<ManageBillsScreen />} />}
              />
              <Route
                path="/pos/cpe"
                element={<PrivateRoute element={<CustomerProfileScreen />} />}
              />
              <Route
                path="/pos/rcs"
                element={<PrivateRoute element={<RepCommissionsPayScreen />} />}
              />
              <Route
                path="/pos/cuo"
                element={<PrivateRoute element={<CustomerOrder />} />}
              />
              <Route
                path="/pos/csd"
                element={<PrivateRoute element={<CashierSessionDashboard />} />}
              />
              {/* CGP */}
              <Route path="/cgp/tfn" element={<TrafficFineSystem />} />
              <Route path="/cgp" element={<CitizenHome />} />
              <Route path="/cgp/mydetails" element={<MyDetails />} />
              <Route path="/cgp/myvehicles" element={<MyVehicles />} />
              <Route
                path="/cgp/otpVerification"
                element={<OtpVerfification />}
              />
              <Route path="/cgp/initial" element={<InitialApplication />} />
              <Route path="/cgp/selectFine" element={<SelectFine />} />
              <Route path="/cgp/myLicense" element={<MyLicense />} />
              <Route
                path="/cgp/paymentGateway"
                element={<CitizenPaymentGateway />}
              />
              <Route path="/cgp/reportIncident" element={<ReportIncident />} />
              <Route
                path="/cgp/missingVehicles"
                element={<MissingVehicles />}
              />
              <Route path="/cgp/missingPets" element={<MissingPets />} />
              <Route path="/cgp/missingPersons" element={<MissingPersons />} />
              <Route path="/cgp/wantedPersons" element={<WantedPersons />} />
              <Route path="/cgp/addDevices" element={<AddDevices />} />
              <Route path="/cgp/myDevices" element={<MyDevices />} />
              <Route path="/cgp/dtp" element={<DeviceTransferPortal />} />
              <Route path="/cgp/fuelQr" element={<FuelQr />} />
              <Route path="/cgp/appointments" element={<AppointmentHome />} />
              <Route path="/cgp/voter" element={<VoterInformation />} />
              <Route
                path="/cgp/medical/myMedicalRecords"
                element={<MyMedicalRecords />}
              />
              <Route path="/cgp/meet" element={<MeetOfficer />} />
              <Route path="/cgp/legalAdvice" element={<LegalAdviceHome />} />
              <Route
                path="/cgp/legalAdvice/seek"
                element={<SeekLegalAdviceHome />}
              />
              <Route path="/cgp/social" element={<SocialMedia />} />
              <Route path="/cgp/drs" element={<CGPDriverRatingSystem />} />
              {/* <Route path="/cgp/myRating" element={<MyRating />}/> */}
              <Route path="/cgp/disasterAlert" element={<DisasterAlert />} />
              <Route path="/cgp/login" element={<LoginCitizen />} />
              <Route path="/cgp/register" element={<RegisterCitizen />} />
              <Route path="/cgp/settings" element={<Settings />} />
              <Route
                path="/cgp/appointment/courtCases"
                element={<CourtCases />}
              />
              <Route path="/cgp/news" element={<NewsOrAnnouncement />} />
              <Route path="/not" element={<Notifications />} />
              <Route path="/cgp/fam" element={<CGPFrequentAccidentMap />} />
              <Route path="/cgp/fam/report" element={<ReportLocations />} />
              <Route path="/cgp/myTickets" element={<MyTickets />} />
              <Route path="/cgp/myHospitalPass" element={<MyHospitalPass />} />
              <Route path="/cgp/myComplaint" element={<MyComplaint />} />
              <Route path="/cgp/tps" element={<TravelPassSystem />} />
              <Route path="/cgp/hps" element={<HospitalPassSystem />} />
              <Route path="/cgp/tsc" element={<ChildrenTransportServices />} />
              <Route path="/cgp/cts" element={<TuitionSportsClasses />} />
              <Route
                path="cgp/settings-mobile-application"
                element={<MobileApplicationSettings />}
              />
              <Route path="/cgp/hmr" element={<HousemaidMenu />} />
              <Route
                path="/cgp/hmr/registration"
                element={<HouseMaidRegistration />}
              />
              <Route path="/cgp/hmr/view" element={<HousemaidView />} />
              <Route path="/cgp/mdr" element={<DriverMenu />} />
              <Route
                path="/cgp/mdr/registration"
                element={<DriverRegistration />}
              />
              <Route path="/cgp/mdr/view" element={<DriverView />} />
              <Route path="aoc" element={<AntiOrganizedCrimeMenu />} />
              {/* Police WatchDog System */}
              <Route path="/pws" element={<PoliceWatchdogSystem />} />
              <Route
                path="/pws/find-person-or-vehicle"
                element={<FindPersonOrVehicle />}
              />
              <Route path="/pws/ebd" element={<EntryBanDetection />} />
              {/* Home */}
              {/* Home */}
              {/* Home */}
              {/* TVS  */}
              <Route path="tvs" element={<TrafficViolationSystem />} />
              {/* PBS */}
              <Route path="pbs" element={<PanicButtonService />} />
              {/* MOD */}
              <Route path="mod" element={<MinistryOfDefence />} />
              <Route
                path="mod/permission-to-import"
                element={<PermissionToImport />}
              />
              <Route
                path="mod/weapons-license-issued"
                element={<WeaponsLicenseIssued />}
              />
              <Route
                path="mod/special-letters-update"
                element={<SpecialLettersUpdate />}
              />
              {/* STS */}
              <Route path="sts" element={<SmartTransportSystem />} />
              <Route path="dmd" element={<BirthDeathMarriageHome />} />
              <Route path="dmd/birth" element={<BirthCertificate />} />
              <Route path="dmd/death" element={<DeathCertificate />} />
              <Route path="dmd/marriage" element={<MarriageCertificate />} />
              <Route path="moe" element={<AddSchoolForm />} />
              <Route path="ctr" element={<TuitionHome />} />
              <Route path="ctr/addTutory" element={<AddTutory />} />
              <Route path="ctr/addChildren" element={<AddTuitionForm />} />
              <Route path="ctr/assignTutory" element={<AssignTutory />} />
              {/* External Menu */}
              {/* External Menu */}
              {/* External Menu */}
              {/* CFC */}
              <Route path="cfc" element={<CeylonFisheriesCorporation />} />
              {/* DSO */}
              <Route path="dso" element={<DivisionalSecretariatOffice />} />
              <Route path="dso/set" element={<DSOSetAppointment />} />
              <Route path="dso/view" element={<DSOViewAppointment />} />
              {/* VIE */}
              <Route path="vie" element={<VehicleInsuranceEntity />} />
              <Route path="vie/set" element={<VIESetAppointment />} />
              <Route path="vie/view" element={<VIEViewAppointment />} />
              {/* DMT */}
              <Route path="dmt" element={<DepartmentOfMotorTraffic />} />
              <Route path="dmt/set" element={<DMTSetAppointment />} />
              <Route path="dmt/view" element={<DMTViewAppointment />} />
              {/* ECS */}
              <Route path="ecs" element={<EmissionCertificateSystem />} />
              <Route path="ecs/set" element={<ECSSetAppointment />} />
              <Route path="ecs/view" element={<ECSViewAppointment />} />
              {/* CDS */}
              <Route path="cds" element={<CameraDispatchSystem />} />
              {/* MOH */}
              <Route path="moh" element={<MinistryOfHealth />} />
              <Route path="moh/epd" element={<EpidemiologyUnit />} />
              {/* ASR */}
              <Route path="asr" element={<ArtificialSmartReader />} />
              {/* NSE PAGES */}
              <Route
                path="/nse/ccn/:CitizenCodeNumber"
                element={<CitizenCodeNumber />}
              />
              {/* NIC Pages */}
              <Route path="/ndc/:nic" element={<NicDashboard />} />
              {/* Passport Pages */}
              <Route path="/pol/:passport" element={<PassportDashboard />} />
              {/* License Pages */}
              <Route path="/dll/:license" element={<LicenseDashboard />} />
              {/* Vehicle Registration Pages */}
              <Route
                path="/vrd/:vehicleRegistrationNumber"
                element={<VehicleRegistration />}
              />
              {/* Voters Registration Pages */}
              <Route
                path="/ved/:voterNumber"
                element={<VotersRegistration />}
              />
              {/* Election Commission */}
              <Route
                path="/ecd/:electionNumber"
                element={<ElectionCommission />}
              />
              {/* Bank Pages */}
              <Route
                path="/spb/:accountNumber"
                element={<StateBankAccount />}
              />
              <Route
                path="/bank/transaction-info"
                element={<BankTransaction />}
              />
              {/* Expressway pages */}
              <Route
                path="/ewd/:expresswayNumber"
                element={<ExpresswayDashboard />}
              />
              {/* Expressway pages */}
              <Route
                path="/ewd/vehicle/:vehicleNumber"
                element={<ExpresswayVehicleDashboard />}
              />
              {/* Teacher Training pages */}
              <Route
                path="/teacher-training/tt-info/:teacherTrainingNumber"
                element={<TeacherTraining />}
              />
              {/* Excise pages */}
              <Route path="/edd/:exciseNumber" element={<ExciseDashboard />} />
              {/* Technical College pages */}
              <Route
                path="/technical-college/college-info/:technicalCollegeNumber"
                element={<TechnicalCollege />}
              />
              {/* Company pages */}
              <Route path="/rcr/:companyNumber" element={<Company />} />
              {/* Crib pages */}
              <Route path="/crb/:cribNumber" element={<CribDashboard />} />
              {/* Airlines pages */}
              <Route
                path="/atd/:airlinesNumber"
                element={<AirlinesDashboard />}
              />
              {/* CEA pages */}
              <Route path="/cea/:ceaLicenseNumber" element={<CeaDashboard />} />
              {/* Inland Revenue pages */}
              <Route
                path="/rdr/:inlandRevenueNumber"
                element={<InlandRevenue />}
              />
              {/* Transport Commission pages */}
              <Route
                path="/tcd/:transportCommissionNumber"
                element={<TransportCommission />}
              />
              {/* Transport Commission pages */}
              <Route
                path="/tcd/vehicle/:vehicleNumber"
                element={<TransportCommissionVehicle />}
              />
              {/* Council pages */}
              <Route path="/mup/:councilNumber" element={<CouncilHome />} />
              {/* Other Educational Bodies pages */}
              <Route
                path="/oie/:educationNumber"
                element={<OtherEducationalBodies />}
              />
              {/* Gem pages */}
              <Route path="/gcd/:gemNumber" element={<Gem />} />
              {/* epf pages */}
              <Route path="/epf/:epfNumber" element={<EPFDashboard />} />
              {/* etf pages */}
              <Route path="/etf/:etfNumber" element={<ETFDashboard />} />
              {/* Car Park pages */}
              <Route path="/cpr/:carParkNumber" element={<CarParkServices />} />
              {/* Car Park pages */}
              <Route
                path="/cpr/vehicle/:vehicleNumber"
                element={<CarParkServicesVehicleNumber />}
              />
              {/* Uni pages */}
              <Route path="/spu/:universityNumber" element={<University />} />
              {/* Examination pages */}
              <Route
                path="/exam/:examinationNumber"
                element={<ExaminationDashboard />}
              />
              {/* School pages */}
              <Route path="/sps/:schoolNumber" element={<SchoolDashboard />} />
              {/* Immigration pages */}
              <Route
                path="/mtd/:immigrationNumber"
                element={<ImmigrationNseDashboard />}
              />
              {/* Hospital pages */}
              <Route
                path="/sph/:hospitalNumber"
                element={<HospitalDashboard />}
              />
              {/* Driving Offense pages */}
              <Route
                path="/nse/dop/:drivingOffenseNumber"
                element={<DrivingOffenseDashboard />}
              />
              {/* Device Registration pages */}
              {/* <Route
                path="/nse/drp/:deviceRegistrationNumber"
                element={<DeviceRegistrationDashboard />}
              />

              {/* Mobile Network pages */}
              <Route
                path="/mnr/:networkNumber"
                element={<NetworkDashboard />}
              />
              {/* Taxi Services pages */}
              <Route path="/tss/:taxiNumber" element={<TaxiDashboard />} />
              {/* Taxi Services pages */}
              <Route
                path="/tss/vehicle/:taxiNumber"
                element={<TaxiDashboardVehicle />}
              />
              {/* Sri Lanka Medical Council pages */}
              <Route
                path="/smc/:medicalCouncilNumber"
                element={<SriLankaMedicalCouncil />}
              />
              {/* Foreign Employment Bureau pages */}
              <Route
                path="/feb/:foreignEmploymentBureauNumber"
                element={<ForeignEmploymentBureau />}
              />
              {/* PCS pages */}
              <Route path="/nse/pcs" element={<PoliceComplaintSystemNse />} />
              {/* PCS pages */}
              <Route path="/nse/pcs/:nicNumber" element={<PoliceComplaint />} />
              {/* PCS pages */}
              <Route path="/nse/pcs" element={<PoliceComplaintSystemNse />} />
              {/* Police watchdog Syste pages */}
              <Route
                path="/pwd/:policeWatchdogNumber"
                element={<NSEPoliceWatchDogSystem />}
              />
              {/* Vehicle Emission pages */}
              <Route
                path="/vec/:vehicleEmissionNumber"
                element={<VehicleEmissionCertificate />}
              />
              {/* Vehicle Isnurance pages */}
              <Route
                path="/nsd/:vehicleInsurance"
                element={<VehicleInsurance />}
              />
              {/* Vehicle Revenue License pages */}
              <Route
                path="/dsr/:vehicleRevenueLicense"
                element={<VehicleRevenueLicense />}
              />
              {/* Who Else Search */}
              <Route
                path="/nse/wes/:wesNumber"
                element={<WhoElseSearchNSE />}
              />
              {/* Customs */}
              <Route
                path="/cdd/:customsNumber"
                element={<CustomsDashboard />}
              />
              {/*
               Atomic Energy Authority pages */}
              <Route
                path="/aea/:atomicEnergyAuthorityNumber"
                element={<AtomicEnergyAuthority />}
              />
              {/* Pages from NSE */}
              <Route path="expressway" element={<ExpresswayDashboard />} />
              {/* <Route path="university" element={<University />} /> */}
              <Route
                path="private-universities"
                element={<PrivateUniversity />}
              />
              <Route
                path="transport-commission"
                element={<TransportCommission />}
              />
              <Route
                path="election-commission"
                element={<ElectionCommission />}
              />
              <Route
                path="government-school"
                element={<ElectionCommission />}
              />
              <Route path="private-school" element={<ElectionCommission />} />
              {/* Dashboard */}
              {/* Citizen Code Number */}
              <Route path="/ccn" element={<CitizenCodeNumber />} />
              {/* Family Chart Diagram */}
              <Route path="/fcd/:nicNumber" element={<FamilyChartDiagram />} />
              {/* Children Tuition */}
              <Route
                path="/nse/ccs/:nicNumber"
                element={<ChildrenTuitionDashboard />}
              />
              <Route
                path="/nse/cts/:nicNumber"
                element={<ChildrenTransportDashboard />}
              />
              {/* Children School */}
              <Route
                path="/nse/css/:nicNumber"
                element={<ChildrenSchoolDashboard />}
              />
              {/* Birth Marriage Death */}
              <Route
                path="/nse/dmd/:nicNumber"
                element={<BirthMarriageDeath />}
              />
              <Route
                path="/police/ecc"
                element={<PoliceEmergencyCallCenter />}
              />
              <Route path="/ecc" element={<PoliceEmergencyCallCenterHome />} />
              <Route path="/police/priority" element={<PrioritySettings />} />
              <Route path="ums" element={<UserManagementSystem />} />
              <Route path="ums/crt" element={<UMSRegister />} />
              <Route path="ums/assign" element={<AssignRoles />} />
              <Route path="cms" element={<CitizenManagementSystem />} />
              <Route path="crs" element={<CitizenRatingSystemHome />} />
              <Route path="crs/myRating" element={<MyRatingToOthers />} />
              <Route path="crs/otherRating" element={<OtherRatingToMine />} />
              <Route path="crs/rate" element={<CitizenRatingSystem />} />
              <Route path="vms" element={<VehicleManagementSystemHome />} />
              <Route path="vms/allocate" element={<CreateVehicles />} />
              <Route path="vms/repair" element={<RepairVehicle />} />
              <Route path="dud" element={<DepartmentUniqueDashboard />} />
              {/* TeleCommunications Regulatory Commission */}
              <Route
                path="trc"
                element={<TelecommunicationsRegulatoryCommison />}
              />
              <Route
                path="trc/device-database"
                element={<TRCDevicesDatabase />}
              />
              <Route path="nsp" element={<NetworkServiceProvider />} />
              <Route path="wpd" element={<WarrantedPeopleDatabase />} />
              <Route path="rze" element={<RestrictedZoneEntry />} />
              <Route path="dms" element={<DroneMonitoringSystem />} />
              <Route path="dss" element={<DailySummaryScreen />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="psr" element={<PoliceSceneReporting />} />
              <Route path="bcm" element={<BodyCamMonitoring />} />
              <Route path="dpm" element={<DetailedPoliceMap />} />
              <Route path="cfp" element={<CitizenFeedbackPortal />} />
              <Route path="request-for-help" element={<RequestForHelp />} />
              <Route
                path="customer-care-number"
                element={<CustomerCareNumber />}
              />
              <Route path="lss" element={<LiveStreamingSystem />} />
              <Route path="stl" element={<SmartTrafficLight />} />
              {/* CENTRAL CYBER COMMAND */}
              <Route path="ccc" element={<CentralCyberCommand />} />
              <Route
                path="ccc/find-person-or-vehicle"
                element={<CCCFindPersonOrVehicle />}
              />
              <Route path="ccc/audio-controls" element={<AudioControls />} />
              <Route
                path="ccc/remote-termination"
                element={<RemoteTermination />}
              />
              <Route
                path="ccc/connection-status"
                element={<ConnectionStatus />}
              />
              <Route path="ccc/widget-manager" element={<WidgetManager />} />
              <Route path="ccc/usage-tracking" element={<UsageTracking />} />
              <Route path="ccc/auditing" element={<Auditing />} />
              <Route
                path="ccc/ip-address-settings"
                element={<IpAddressSettings />}
              />
              <Route path="ccc/wlr" element={<WhitelistedRoutes />} />
              {/*  */}
              <Route path="ccs" element={<CourtCaseSystemHome />} />
              <Route path="ccs/schedule" element={<CourtCaseSystem />} />
              <Route path="ccs/dem" element={<DigitalEvidenceManager />} />
              <Route path="ccs/com" element={<CourtOrderManagement />} />
              <Route path="pfp" element={<PoliceFeedbackPortal />} />
              <Route path="prs" element={<PoliceRatingSystem />} />
              <Route path="drp" element={<DeviceRegistrationPortal />} />
              <Route path="pcs" element={<PoliceComplaintSystem />} />
              <Route path="dmc" element={<DisasterManagemeneCenter />} />
              <Route path="pas" element={<PoliceAppointmentSytem />} />
              <Route path="pas/set" element={<SetAppointment />} />
              <Route path="pas/view" element={<ViewAppointment />} />
              <Route path="clearance" element={<PoliceClearance />} />
              <Route path="myRating" element={<MyPoliceRating />} />
              <Route path="css" element={<CrimeSummaryScreen />} />
              <Route path="das" element={<DutyAllocationSystem />} />
              <Route path="das/allocate" element={<AllocateDuty />} />
              <Route path="das/past-duties" element={<CurrentDuty />} />
              <Route
                path="das/location-confirmation"
                element={<LocationConfirmation />}
              />
              <Route path="pmd" element={<PoliceMediaDivision />} />
              <Route path="pns" element={<PoliceNotificationSystem />} />
              <Route path="tns" element={<TrainNetworkSystem />} />
              <Route path="prp" element={<PublicReportPortal />} />
              <Route path="doa" element={<DepartmentOfArchaeology />} />
              <Route path="doa/load" element={<LoadLocation />} />
              <Route path="doa/set" element={<DOASetLocation />} />
              <Route
                path="pal"
                element={<ProtectedArchaeologicalLocations />}
              />
              <Route path="dsd" element={<DiplomaticSecurityDivision />} />
              <Route path="dsd/load" element={<DSDLoadLocation />} />
              <Route path="dsd/set" element={<DSDSetLocation />} />
              <Route path="fam" element={<FrequentAccidentMap />} />
              <Route path="drs" element={<DriverRatingSystem />} />
              <Route path="pop" element={<PoliceOfficerPortal />} />
              <Route path="pop/rtb" element={<ReportTrafficBlock />} />
              <Route path="ptc" element={<PersonalTrackConnection />} />
              <Route path="pta" element={<PersonalTrackActivity />} />
              <Route path="ptr" element={<PersonalTrackRoute />} />
              <Route path="wms" element={<WeaponsManagementSystem />} />
              <Route path="wms/allocate" element={<WMSAllocate />} />
              <Route path="wms/repair" element={<WMSRepair />} />
              <Route path="fms" element={<FuelMaintenanceSystem />} />
              <Route path="sdr" element={<SuspectedDeviceRegistration />} />
              <Route path="sth" element={<SuspectedTreasureHunters />} />
              <Route path="onp" element={<OfficerNotificationPriority />} />
              <Route path="npc" element={<NationalPoliceCommision />} />
              <Route path="npc/review" element={<ReviewComplaints />} />
              <Route path="npc/lodge" element={<LodgeComplaints />} />
              <Route path="ltd" element={<LiveTowerDetection />} />
              <Route path="insurance" element={<Insurance />} />
              <Route
                path="divisional-secretariat"
                element={<DivisionalSecretariat />}
              />
              <Route path="Riots" element={<RiotsForecaseSystem />} />
              <Route path="nib" element={<NationalIntelligenceBureau />} />
              <Route path="crd" element={<CriminalRecordsDivision />} />
              <Route path="lts" element={<LiveTrackingSystem />} />
              <Route path="vse" element={<VehicleSearchEngine />} />
              <Route path="wes" element={<WhoElseSearch />} />
              <Route path="hep" element={<HighwayExitPortal />} />
              {/*  Test pages */}
              <Route path="test" element={<Test />} />
              <Route path="fileSub" element={<FileSubmission />} />
              {/* <Route path="pdfViewer" element={<PDFViewer />} /> */}
              <Route path="/chatUI/:chatId" element={<ChatUI />} />
              <Route path="/UMSTest" element={<UMSAssignRightsBackup />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/links" element={<LinksNavbar />} />
              <Route path="/session-timeout" element={<SessionTimeout />} />
              <Route path="/variable-settings" element={<VariableSettings />} />
              <Route path="/tree-view" element={<TreeView />} />
              <Route
                path="/workstation-settings"
                element={<WorkstationSettings />}
              />
              {/* Dashboard police Section */}
              <Route path="/phq" element={<PoliceHeadquarters />} />
              <Route
                path="police/dashboard/addStation"
                element={<AddStation />}
              />
              <Route path="police/dashboard/addSTF" element={<AddStfCamp />} />
              <Route
                path="police/dashboard/addDesignation"
                element={<AddDesignation />}
              />
              <Route
                path="police/dashboard/addPoliceOfficer"
                element={<AddPoliceOfficer />}
              />
              <Route
                path="police/dashboard/assignPoliceOfficer"
                element={<AssignPoliceOfficer />}
              />
              {/* Payment Gateway Integration -> /pmt */}
              <Route path="/pmt" element={<PaymentGateway />} />
              <Route
                path="/pmt/checkout"
                // element={<PaymentGatewayCheckout />}
                element={<PaymentFormAndConfirmation />}
              />
              <Route
                path="/pmt/ntb-checkout"
                // element={<PaymentGatewayCheckout />}
                element={<NtbPaymentTestCheckoutPage />}
              />
              {/* Hotel Gateway System */}
              <Route
                path="/hgs"
                element={<PrivateRoute element={<HotelGatewaySystem />} />}
              />
              <Route
                path="/hgs/reg"
                element={<PrivateRoute element={<HotelRegistration />} />}
              />
              <Route
                path="/hgs/mhs"
                element={<PrivateRoute element={<ManageHotels />} />}
              />
              <Route
                path="/hgs/hls"
                element={<PrivateRoute element={<Hotels />} />}
              />
              {/* House Holders List */}
              <Route
                path="/hhl"
                element={<PrivateRoute element={<HouseHoldersList />} />}
              />
              <Route
                path="/hhl/reg"
                element={
                  <PrivateRoute element={<HouseHoldersRegistration />} />
                }
              />
              <Route
                path="/hhl/mng"
                element={<PrivateRoute element={<ManageHouseHoldersList />} />}
              />
              <Route
                path="/hhl/rep"
                element={<PrivateRoute element={<Houses />} />}
              />
              {/* householder , hotels report confirmation dashboard */}
              <Route
                path="/hhl/rvd"
                element={
                  <PrivateRoute
                    element={<HouseReportVerificationDashboard />}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <LanguageSelectionHomeScreen /> */}
        <Footer />
      </div>
      {/* Police and Ecc - PHQ - ECC */}
    </>
  );
}

export default App;
