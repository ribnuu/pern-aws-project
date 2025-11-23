const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");

const warrantedRoutes = require("./routes/warrantedpeople.routes");
const policeRatingRoutes = require("./routes/policeRating.routes");
const policescenereportingRoutes = require("./routes/policeSceneReporting.routes");
const policeAppointmentRoutes = require("./routes/policeAppointment.routes");
const masterPoliceRoutes = require("./routes/master-police/master-police.routes");
const dutyAllocationRoutes = require("./routes/duty-allocation/duty-allocation.routes");
const nicRoutes = require("./routes/nic/nic.routes");
const chatRoutes = require("./routes/chat/chat.routes");
const passportRoutes = require("./routes/passport/passport.routes");
const licenseRoutes = require("./routes/license/license.routes");
const stateBankRoutes = require("./routes/state-banks/stateBanks.routes");
const vehicleRoutes = require("./routes/vehicle/vehicle.routes");
const votersRoutes = require("./routes/voters-registration/votersRegistration.routes");
const electionRoutes = require("./routes/election-commission/electionCommission.routes");
const expresswayRoutes = require("./routes/expressway/expressway.routes");
const exciseRoutes = require("./routes/excise/excise.routes");
const companyRoutes = require("./routes/company/company.routes");
const cribRoutes = require("./routes/crib/crib.routes");
const ceaRoutes = require("./routes/cea/cea.routes");
const inlandRevenueRoutes = require("./routes/inland-revenue/inlandRevenue.routes");
const transportCommissionRoutes = require("./routes/transport-commission/transportCommission.routes");
const councilRoutes = require("./routes/council/council.routes");
const otherEducationalRoutes = require("./routes/other-educational-bodies/otherEducationalBodies.routes");
const gemRoutes = require("./routes/gem/gem.routes");
const epfRoutes = require("./routes/epf/epf.routes");
const etfRoutes = require("./routes/etf/etf.routes");
const universityRoutes = require("./routes/university/university.routes");
const schoolRoutes = require("./routes/school/school.routes");
const carParkServicesRoutes = require("./routes/car-park-services/carParkServices.routes");
const foreignEmploymentRoutes = require("./routes/foreign-employment-bureau/foreignEmploymentBureau.routes");
const policeWatchDogSystemNseRoutes = require("./routes/police-watchdog-system-nse/policeWatchDogSystemNse.routes");
const hospitalRoutes = require("./routes/hospital/hospital.routes");
const drivingOffenseRoutes = require("./routes/driving-offense/drivingOffense.routes");
const deviceRegistrationRoutes = require("./routes/device-registration/deviceRegistration.routes");
const mobileNetworkRoutes = require("./routes/network/network.routes");
const taxiRoutes = require("./routes/taxi/taxi.routes");
const sriLankaMedicalCouncilRoutes = require("./routes/sri-lanka-medical-council/sriLankaMedicalCouncil.routes");
const vehicleEmissionRoutes = require("./routes/vehicle-emission-certificate/vehicleEmissionCertificate.routes");
const vehicleInsuranceRoutes = require("./routes/vehicle-insurance/vehicleInsurance.routes");
const vehicleRevenueLicenseRoutes = require("./routes/vehicle-revenue-license/vehicleRevenueLicense.routes");
const atomicEnergyRoutes = require("./routes/atomic-energy-authority/atomicEnergyAuthority.routes");
const userRoutes = require("./routes/user/user.routes");
const profileRoutes = require("./routes/profile/profile.routes");
const examinationRoutes = require("./routes/examination/examination.routes");
const immigrationRoutes = require("./routes/immigration/immigration.routes");
const airlinesRoutes = require("./routes/airlines/airlines.routes");
const wesRoutes = require("./routes/search/search.routes");
const complaintRoutes = require("./routes/complaint/complaint.routes");
const customsRoutes = require("./routes/customs/customs.routes");
const userSearchRoutes = require("./routes/search/user_search.routes");
const pagesRoutes = require("./routes/pages/pages.routes");
const rightsRoutes = require("./routes/rights/rights.routes");
const citizenCodeNumberRoutes = require("./routes/citizen-code-number/citizenCodeNumber.routes");
const birthDeathMarriageRoutes = require("./routes/BirthDeathMarriage/birthDeathMarriage.routes");
const searchEveryMinuteController = require("./controllers/search/search_every_minute.controller");
const departmentChildSchoolServices = require("./routes/school/departmentSchool.routes");
const tuitionRoutes = require("./routes/tuition/tuition.routes");
const childrenTransportRoutes = require("./routes/childrenTransport/children-transport.routes");
const familyChartRoutes = require("./routes/FamilyChart/familyChart.routes");
const housemaidRoutes = require("./routes/HousemaidRoutes/Housemaid.routes");
const driverRoutes = require("./routes/DriverRoutes/Driver.Routes");
const departmentDriversOffensePortalRoutes = require("./routes/department-drivers-offense-portal/departmentDriversOffensePortal.routes");
const departmentDriversOffenseMasterRoutes = require("./routes/department-drivers-offense-master/departmentDriversOffenseMaster.routes");
const testRoutes = require("./routes/test/test.routes");
const notificationRoutes = require("./routes/notifications/notifications.routes");
const pointOfSalesRoutes = require("./routes/pointOfSales/pointOfSales.routes");
const hnbPaymentRoutes = require("./routes/hnb-payment/hnbPayment.routes");
const groupRoutes = require("./routes/group/group.routes");
const rolesRoutes = require("./routes/roles/roles.routes");
const userAffiliationsRoutes = require("./routes/user-affiliations/userAffiliations.routes");
const stockCustomerInstitutionRoutes = require("./routes/pos-stock-customer-institution/posStockCustomerInstitution.routes");
const posBillpayRoutes = require("./routes/pos-billpay/posBillpay.routes");
const posItemCaegorySubCategoryRoutes = require("./routes/pos-item-category-sub-category/posItemCategorySubCategory.routes");
const posExpensesCaegorySubCategoryRoutes = require("./routes/pos-expenses-category-sub-category/posItemCategorySubCategory.routes");
const posExpensesRoutes = require("./routes/pos-expenses/posExpensesRoutes.routes");
const pdfGenerationRoutes = require("./routes/pdf-generation/pdfGeneration.routes");
const posExpensesCashSourceRoutes = require("./routes/pos-expenses-cash-source/posExpensesCashSource.routes");
const posRepSalesVisitRoutes = require("./routes/pos-rep-sales-visit/posRepSalesVisit.routes");
const posAutoSalesSystemRoutes = require("./routes/pos-auto-sales-system/posAutoSalesSystem.routes");
const posProfitAndLossRoutes = require("./routes/pos-profit-and-loss/posProfitAndLoss.routes");
const posRepresentativesRoutes = require("./routes/pos-representatives/posRepresentatives.routes");
const stockCustomerPersonRoutes = require("./routes/pos-stock-customer-person/posStockCustomerPerson.routes");
const posTransactionsRoutes = require("./routes/pos-transactions/posTransactions.routes");
const posStockItemRoutes = require("./routes/pos-stock-item/posStockItem.routes");
const posStockRepsDispatchRoutes = require("./routes/pos-reps-stock-dispatch/posRepsStockDispatch.routes");
const posInstitutionStockActivityCheckRoutes = require("./routes/pos-institution-stock-activity-check/posInstitutionStockActivityCheck.routes");
const posBillManagementRoutes = require("./routes/pos-bill-management/posBillManagement.routes");

const app = express();
const fs = require("fs");
const https = require("https");
const hostname = "0.0.0.0";
// Define the path to your SSL/TLS certificate files
const certPath = "C:/node_pol.lk/node_pol_lk.crt";
const caPath = "C:/node_pol.lk/node_pol_lk.ca-bundle";
const keyPath = "C:/node_pol.lk/node_pol_lk.key";
// Read the certificate files
const httpsOptions = {
  cert: fs.readFileSync(certPath),
  ca: fs.readFileSync(caPath),
  key: fs.readFileSync(keyPath),
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("", (req, res) => {});
// If the user terminates or server terminates. It should remove the wes temp and update it to wes master along with the status message

cron.schedule("*/1 * * * *", () => {
  searchEveryMinuteController.checkWesTempEveryMinute();
  searchEveryMinuteController.checkForTwentyFourHoursOldRecordEveryMinute();
});

app.use(cors());
app.use("/images", express.static("images"));

app.get("/new", (req, res) => {
  res.send({ msg: "Node server is up and running" });
});

app.use(complaintRoutes);
app.use(warrantedRoutes);
app.use(policeRatingRoutes);
app.use(policescenereportingRoutes);
app.use(policeAppointmentRoutes);
app.use(masterPoliceRoutes);
app.use(dutyAllocationRoutes);
app.use(chatRoutes);
app.use(nicRoutes);
app.use(passportRoutes);
app.use(licenseRoutes);
app.use(stateBankRoutes);
app.use(vehicleRoutes);
app.use(votersRoutes);
app.use(electionRoutes);
app.use(expresswayRoutes);
app.use(exciseRoutes);
app.use(companyRoutes);
app.use(cribRoutes);
app.use(ceaRoutes);
app.use(inlandRevenueRoutes);
app.use(transportCommissionRoutes);
app.use(councilRoutes);
app.use(otherEducationalRoutes);
app.use(gemRoutes);
app.use(epfRoutes);
app.use(etfRoutes);
app.use(universityRoutes);
app.use(schoolRoutes);
app.use(carParkServicesRoutes);
app.use(foreignEmploymentRoutes);
app.use(policeWatchDogSystemNseRoutes);
app.use(hospitalRoutes);
app.use(drivingOffenseRoutes);
app.use(deviceRegistrationRoutes);
app.use(mobileNetworkRoutes);
app.use(taxiRoutes);
app.use(sriLankaMedicalCouncilRoutes);
app.use(vehicleEmissionRoutes);
app.use(vehicleInsuranceRoutes);
app.use(vehicleRevenueLicenseRoutes);
app.use(atomicEnergyRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(examinationRoutes);
app.use(immigrationRoutes);
app.use(airlinesRoutes);
app.use(wesRoutes);
app.use(customsRoutes);
app.use(pagesRoutes);
//app.use(complaintRoutes);
app.use(userSearchRoutes);
app.use(rightsRoutes);
app.use(citizenCodeNumberRoutes);
app.use(birthDeathMarriageRoutes);
app.use(departmentChildSchoolServices);
app.use(tuitionRoutes);
app.use(familyChartRoutes);
app.use(housemaidRoutes);
app.use(childrenTransportRoutes);
app.use(driverRoutes);
app.use(departmentDriversOffensePortalRoutes);
app.use(departmentDriversOffenseMasterRoutes);
app.use(testRoutes);
app.use(notificationRoutes);
app.use(pointOfSalesRoutes);
app.use(hnbPaymentRoutes);
app.use(groupRoutes);
app.use(rolesRoutes);
app.use(userAffiliationsRoutes);
app.use(stockCustomerInstitutionRoutes);
app.use(posBillpayRoutes);
app.use(posItemCaegorySubCategoryRoutes);
app.use(posExpensesCaegorySubCategoryRoutes);
app.use(posExpensesRoutes);
app.use(pdfGenerationRoutes);
app.use(posExpensesCashSourceRoutes);
app.use(posRepSalesVisitRoutes);
app.use(posAutoSalesSystemRoutes);
app.use(posProfitAndLossRoutes);
app.use(posRepresentativesRoutes);
app.use(stockCustomerPersonRoutes);
app.use(posTransactionsRoutes);
app.use(posStockItemRoutes);
app.use(posStockRepsDispatchRoutes);
app.use(posInstitutionStockActivityCheckRoutes);
app.use(posBillManagementRoutes);

const port = 443;

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(port, hostname);
