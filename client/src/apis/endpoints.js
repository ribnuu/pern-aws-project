const server_endpoint = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
const environment = import.meta.env.VITE_ENVIRONMENT;

let baseUrl = `http://${server_endpoint}:4000/api`;

if (environment === "PRODUCTION") {
  baseUrl = `https://${server_endpoint}/api`;
}

export const BASE_URL = baseUrl;

// House Holders
export const HOUSE_HOLDERS_CREATE_FULL_HOUSE_HOLDER_PROCESS = `${BASE_URL}/ccc/householders/create-full-process`;
export const HOUSE_HOLDERS_FETCH_ALL_HOUSE_HOLDERS = `${BASE_URL}/ccc/householders/house-holders`;
export const HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID = `${BASE_URL}/ccc/householders/house-holders/:id/data`;
export const HOUSE_HOLDERS_UPDATE_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID = `${BASE_URL}/ccc/householders/house-holders/:id`;
export const HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA = `${BASE_URL}/ccc/householders/house-holders/data`;
export const HOUSE_HOLDER_CONFIRM = `${BASE_URL}/ccc/householders/house-holders/confirm/:id`;

// Ccc Hotel Gateway System
export const CCC_HOTEL_GATEWAY_SYSTEM_CREATE_HOTEL = `${BASE_URL}/ccc/hotel-gateway-system/ccc-hotels`;
export const CCC_HOTEL_GATEWAY_SYSTEM_FETCH_ALL_HOTELS = `${BASE_URL}/ccc/hotel-gateway-system/ccc-hotels`;
export const CCC_HOTEL_GATEWAY_SYSTEM_FETCH_HOTEL_BY_ID = `${BASE_URL}/ccc/hotel-gateway-system/ccc-hotels/:id`;
export const CCC_HOTEL_GATEWAY_SYSTEM_UPDATE_HOTEL_BY_ID = `${BASE_URL}/ccc/hotel-gateway-system/ccc-hotels/:id`;

// Department Arrest Reasons
export const DEPARTMENT_ARREST_REASONS_SEARCH = `${BASE_URL}/ccc/ccc-department-arrest-reasons/search`;

// Police Traffic Offense Insights
export const CCC_POLICE_TRAFFIC_OFFENSE_INSIGHTS_GET_LICENSE_IN_HAND_BY_FILTERS = `${BASE_URL}/ccc/police-traffic-offense-report/license-in-hand-by-filters`;

// Police Station
export const CCC_POLICE_STATION_SEARCH = `${BASE_URL}/ccc/police-station/search`;
export const CCC_POLICE_STATION_ASSIGN_POLICE_OFFICER = `${BASE_URL}/ccc/police-station/assign-police-officer`;

// CCC Master buttons
export const CCC_MASTER_BUTTONS_CREATE_BUTTON = `${BASE_URL}/pages/createButton`;

// CCC Rights | Assign Rights Tree View
export const CCC_RIGHTS_GENERATE_TREE_VIEW_FOR_ALL_PAGES_BY_GROUP_OR_ROLE_ID = `${BASE_URL}/ccc-rights/generate-tree-view-data-by-group-or-role-id`;
export const CCC_RIGHTS_UPDATE_TREE_VIEW_DATA = `${BASE_URL}/ccc-rights/update-tree-view-data`;

// CCC Department Drivers License Dispatch
export const CCC_DEPARTMENT_DRIVERS_LICENSE_DISPATCHES_CREATE = `${BASE_URL}/ccc-department-drivers-license-dispatches`;

// CCC SEARCH USER
export const CCC_SEARCH_USER_BY_GROUP_ID_ROLE_ID_AND_SEARCH_TERM = `${BASE_URL}/ccc-search/by-group-id-role-id-and-search-term`;

// CCC Traffic Offense Report
export const CCC_TRAFFIC_OFFENSE_REPORT_GET_LICENSE_IN_HAND = `${BASE_URL}/ccc-traffic-offense-report/get-license-in-hand`;

// Drivers Offense Portal
export const DOP_GET_FINES_ON_MY_DUTY = `${BASE_URL}/departmentDriversOffensePortal/finesOnMyDuty/:userId`;
export const DOP_UPDATE_DRIVER_OFFENSE_MOBILE_NUMBER_BY_ID = `${BASE_URL}/departmentDriversOffensePortal/mobileNumber/:id`;
export const DOP_GET_DRIVER_OFFENSE_BY_REFERENCE_NUMBER = `${BASE_URL}/departmentDriversOffensePortal/offenseByRefNo/:referenceNumber`;
export const DOP_GET_FINES_ON_MY_NUMBER = `${BASE_URL}/department-driver-offense-portal/offense-by-user`;
export const DOP_GET_PAID_FINES_ON_MY_NUMBER = `${BASE_URL}/department-driver-offense-portal/piad-offense-by-user`;
// Rights
export const RIGHTS_GET_LANDING_PAGE_BUTTONS_BY_USER_ID = `${BASE_URL}/rights/get-landing-page-buttons-by-user-id`;
export const RIGHTS_GET_BUTTONS_BY_USER_AND_PAGE_ID = `${BASE_URL}/rights/get-buttons-by-user-and-page-id`;
export const RIGHTS_GET_BUTTONS_BY_USER_AND_BUTTON_ID = `${BASE_URL}/rights/get-buttons-by-user-and-button-id`;

// CCC Address
export const CCC_ADDRESS_SEARCH_PROVINCE = `${BASE_URL}/ccc-address/provinces/search`;
export const CCC_ADDRESS_SEARCH_DISTRICT = `${BASE_URL}/ccc-address/districts/search`;
export const CCC_ADDRESS_SEARCH_CITY = `${BASE_URL}/ccc-address/cities/search`;

// CCC Police Division
export const CCC_POLICE_DIVISION_SEARCH = `${BASE_URL}/ccc/police-division-master/search`;

//CCC nationality
export const SEARCH_NATIONALITY = `${BASE_URL}/nationality/search`;

// POS Endpoints
export const POS_CREATE_STOCK_BILL = `${BASE_URL}/point-of-sales/stock-bill-detail`;
export const POS_CREATE_RETURN_STOCK_BILL = `${BASE_URL}/point-of-sales/stock-return-bill-detail`;
export const POS_CREATE_STOCK_CUSTOMER_ORDER = `${BASE_URL}/point-of-sales/stock-customer-order-details`;
export const POS_GET_STOCK_CUSTOMER_ORDER = `${BASE_URL}/point-of-sale/stock-customer-order`;
export const POS_GET_ALL_PRODUCTS_BY_COMPANY_ID = `${BASE_URL}/point-of-sales/items/:companyId`;
export const POS_GET_STOCK_BILL_BY_BILL_NUMBER = `${BASE_URL}/point-of-sale/stock-bill-detail/:billNumber`; // FETCH STOCK BILL BY BILL NUMBER
export const POS_GET_STOCK_CUSTOMER_ORDER_BY_ORDER_NUMBER = `${BASE_URL}/point-of-sale/stock-customer-order/:orderNumber`;
export const POS_GET_STOCK_CUSTOMER_INSTITUTION_DATA_BY_STOCK_CUSTOMER_PERSON_MOBILE_NUMBER = `${BASE_URL}/point-of-sales/stock-customer-institution-data-by-stock-customer-person-mobile-number`;
export const POS_GET_ALL_PRODUCTS_BY_COMPANY_ID_FROM_STOCK_ITEM_HEADER = `${BASE_URL}/point-of-sales/items-from-stock-item-header/:companyId`;
export const POS_SEARCH_STOCK_BILL_HEADER = `${BASE_URL}/point-of-sales/stock-bill-header/search`;
export const UPDATE_STOCK_CUSTOMER_ORDER_HEADER = `${BASE_URL}/point-of-sale/stock-customer-order`;
// POS Endpoints - Stock Customer Institution & Stock Customer Person
export const POS_SEARCH_CUSTOMER_INSTITUTION = `${BASE_URL}/point-of-sales/stock-customer-institution/search`;
export const POS_UPDATE_STOCK_CUSTOMER_INSTITUTION = `${BASE_URL}/point-of-sales/stock-customer-institution/:id`;
export const POS_GET_ALL_CUSTOMER_PERSONS_BY_CUSTOMER_INSTITUTION_ID = `${BASE_URL}/point-of-sales/stock-customer-institution/:id`;
export const POS_CREATE_OR_UPDATE_LIST_OF_PERSONS_IN_CUSTOMER_INSTITUTION = `${BASE_URL}/point-of-sales/stock-customer-institution/create-and-update-users/:id`;
export const POS_CREATE_STOCK_CUSTOMER_INSTITUTION = `${BASE_URL}/point-of-sales/stock-customer-institution`;
export const GET_STOCK_CUSTOMER_INSTITUTION_LOGO_BY_INSTITUTION_ID = `${BASE_URL}/point-of-sales/stock-customer-institution/logo/:id`;
export const GET_ALL_STOCK_CUSTOMER_INSTITUTIONS = `${BASE_URL}/point-of-sales/stock-customer-institution`;
export const POS_STOCK_CUS_INS_GET_UNIQUE_ITEM_CODES_FOR_INSTITUTIONS_IN_THE_COMPANY = `${BASE_URL}/point-of-sales/stock-customer-institution/unique-item-codes-for-institutions`;
export const POS_STOCK_CUS_INS_GET_BY_INSTITUTION_ID = `${BASE_URL}/point-of-sales/stock-customer-institution/by-institution-id`;
export const POS_STOCK_SUPPLIER_GET_BY_ID = `${BASE_URL}/point-of-sale/stock/supplier/search`;
export const POS_ITEM_SELECT_BY_ID = `${BASE_URL}/point-of-sales/item/search`;
export const POS_STOCK_PO_NUMBER_SEARCH = `${BASE_URL}/point-of-sale/stock/po/ponumber/search`;
export const POS_STOCK_PO_SUPPLIER_GET = `${BASE_URL}/point-of-sale/po/supplier/`;
export const POS_STOCK_PO_CUSTOM_SUPPLIER_POST = `${BASE_URL}/point-of-sale/stock/supplier/enter-supplier`;
// Bill Pay
export const POS_GET_ALL_PENDING_BILL_HEADERS_BY_STOCK_CUSTOMER_INSTITUTION_ID = `${BASE_URL}/point-of-sales/bill-pay/pending-bill-headers/by-customer-institution-id`;
export const POS_GET_ALL_PENDING_BILL_HEADERS_IN_THE_COMPANY = `${BASE_URL}/point-of-sales/bill-pay/pending-bill-headers/all`;
export const POS_MAKE_BILL_PAYMENT = `${BASE_URL}/point-of-sales/bill-pay/pay`;
export const TOGGLE_STOCK_CUSTOMER_PERSON_IS_DELETED = `${BASE_URL}/point-of-sales/stock-customer-institution/customer-person/:userId/:insId/toggle-deletion`;
// Transactions
export const POS_GET_ALL_TRANSACTIONS_BY_DATE_AND_OTHER_FILTERS = `${BASE_URL}/point-of-sales/transactions`;
export const POS_GET_ALL_PAID_BILL_TRANSACTIONS = `${BASE_URL}/point-of-sales/transactions/paid`;
export const POS_CREATE_REPS_PAID_COMMISSION_ITEM_WISE = `${BASE_URL}/point-of-sales/transactions/rep-com-pay`;
export const POS_GET_ALL_BILLING_INFORMATION_AND_REPS_STOCK_DISPATCH_DATA_BY_FILTERS = `${BASE_URL}/point-of-sales/transactions/bill-data-and-reps-stock-dispatch`;
export const POS_GET_ALL_PAYMENTS_RECEIVED_BY_FILTERS = `${BASE_URL}/point-of-sales/payments-received-by-filters`;
// Stock Item
export const POS_SEARCH_STOCK_ITEMS_IN_THE_COMPANY = `${BASE_URL}/point-of-sales/stock-item/search`;
// Reps Stock Dispatch
export const POS_CREATE_REPS_STOCK_DISPATCH = `${BASE_URL}/point-of-sales/reps-stocks-dispatch`;
export const POS_GET_REPS_STOCK_DISPATCH_BY_FILTERS = `${BASE_URL}/point-of-sales/reps-stocks-dispatch/by-stock-customer-person`;
export const POS_UPDATE_MULTIPLE_REPS_STOCKS_DISPATCHES = `${BASE_URL}/point-of-sales/reps-stocks-dispatch/update-multiple-as-settled`;
// Item Category And Sub Category
export const POS_CREATE_MAIN_CATEGORY = `${BASE_URL}/point-of-sales/item-category-sub-category/category`;
export const POS_CREATE_SUB_CATEGORY = `${BASE_URL}/point-of-sales/item-category-sub-category/sub-category`;
export const GET_All_SUB_CATEGORIES_BY_CATEGORY_CODE = `${BASE_URL}/point-of-sales/item-category-sub-category/all`;
export const POS_SEARCH_ITEM_CATEGORY = `${BASE_URL}/point-of-sales/item-category-sub-category/category/search`;
export const POS_SEARCH_SUB_ITEM_CATEGORY = `${BASE_URL}/point-of-sales/item-sub-category/subcategory/search`;
export const POS_SEARCH_ITEM_SUPPLIER = `${BASE_URL}/point-of-sales/item-supplier/supplier/search`;
export const UPDATE_MULTIPLE_STOCK_ITEM_SUB_CATEGORIES = `${BASE_URL}/point-of-sales/item-category-sub-category/multilple-update`;
//Item Information
export const POS_CREATE_ITEM_INFORMATION = `${BASE_URL}/point-of-sales/iteminfo`;
// Expenses Category And Sub Category
export const POS_EXPENSES_CREATE_MAIN_CAEGORY = `${BASE_URL}/point-of-sales/expenses-category-sub-category/category`;
export const POS_SEARCH_EXPENSES_CATEGORY = `${BASE_URL}/point-of-sales/expenses-category-sub-category/category/search`;
export const POS_CREATE_EXPENSES_SUB_CATEGORY = `${BASE_URL}/point-of-sales/expenses-category-sub-category/sub-category`;
export const GET_All_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE = `${BASE_URL}/point-of-sales/expenses-category-sub-category/all`;
export const UPDATE_MULTIPLE_EXPENSES_SUB_CATEGORIES = `${BASE_URL}/point-of-sales/expenses-category-sub-category/multilple-update`;
export const SEARCH_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE_AND_SEARCH_TERM = `${BASE_URL}/point-of-sales/expenses/subcategories/search/by-category-code`;
export const POS_CREATE_EXPENSES_RECORD = `${BASE_URL}/point-of-sales/expenses/create`;
export const POS_SEARCH_ALL_USRS_IN_THE_COMPANY_BY_ENTITY_TYPE = `${BASE_URL}/point-of-sales/search/users-in-the-pos-company/by-entity-type`;
export const POS_EXPENSES_GET_ALL_BY_FILTERS = `${BASE_URL}/point-of-sales/expenses/headers/all-by-filters`;
export const POS_EXPENSES_GET_EXPENSES_DETAILS_BY_EXPENSE_HEADER_ID = `${BASE_URL}/point-of-sales/expenses/details/by-header-id/:headerId`;
export const POS_EXPENSES_GET_EXPENSES_CATEGORY_SUB_CATEGORY_TREE_VIEW_DATA = `${BASE_URL}/point-of-sales/expenses-category-sub-category/tree-view`;
export const POS_EXPENSES_GET_NOTE_BY_SEARCH = `${BASE_URL}/point-of-sales/search/expenses-note`;
export const POS_EXPENSES_GET_MEASUREMENT_UNITS = `${BASE_URL}/point-of-sales/expenses/expenses-measurement-units`;
export const POS_EXPENSES_GET_UNIT_AND_PRICE_BY_NOTE = `${BASE_URL}/point-of-sale/expenses/units-price-by-note`;
export const POS_EXPENSES_GET_EXPENSES_BY_EXPENSES_NUMBER = `${BASE_URL}/point-of-sales/expenses/by-number/`;
// PDF Generation Endpoints
export const POS_GENERATE_PDF_BY_BILL_NUMBER = `${BASE_URL}/pdf-generation/pos/bill/:billNumber`;
//POS PO Endpoints
export const POS_PO_CREATE = `${BASE_URL}/point-of-sale/po/details`;
export const POS_PO_SEARCH_BY_NUMBER_OR_DATE = `${BASE_URL}/point-of-sale/stock/po/searchByNumberORDate`;
// POS ExpensesCash Source
export const POS_GET_ALL_EXPENSES_CASH_SOURCE_HEADERS = `${BASE_URL}/point-of-sales/pos-expenses-cash-source/header`;
// Bill
export const GET_BILL_BY_BILL_NUMBER = `${BASE_URL}/point-of-sales/bill/:billNumber`;
// GRN
export const GET_GRN_DATA_BY_BILL_NUMBER = `${BASE_URL}/point-of-sales/grn/:billNumber`;
export const CREATE_GRN_RECORD = `${BASE_URL}/point-of-sales/grn`;
export const POS_GRN_SEARCH_BY_NUMBER_OR_DATE = `${BASE_URL}/pos/grn/getGrnByNumber`;
// Stock Item Header
export const SEARCH_PRODUCT_FROM_STOCK_ITEM_HEADER = `${BASE_URL}/point-of-sales/search-product-stock-item-header`;
// Manage Bills
export const POS_MANAGE_BILLS_GET_ALL_BILLS_IN_THE_COMPANY_BY_FILTERS = `${BASE_URL}/point-of-sales/manage-bills/all-bills-by-filters`;
export const POS_MANAGE_BILLS_MARK_BILL_AS_DELETED_BY_BILL_NUMBER = `${BASE_URL}/point-of-sales/manage-bills/:billNumber`;
// POS REPS COMMISSIONS
export const POS_REPS_COMMISSION_GET_ALL_REPS_COMMISSIONS = `${BASE_URL}/pos-reps-commission`;
export const POS_REPS_COMMISSION_GENERATE_PDF_REPORT = `${BASE_URL}/pos-reps-commission/generate-pdf-repoprt`;
// CCC Whitelisted Routes
export const CCC_WHITELISTED_ROUTES_INSERT_RECORD = `${BASE_URL}/ccc/whitelisted-routes`;
export const CCC_WHITELISTED_ROUTES_GET_ALL = `${BASE_URL}/ccc/whitelisted-routes`;

// CCC
// Department Drivers Offense
export const GET_ALL_MASTER_OFFENSES = `${BASE_URL}/departmentDriversOffenseMaster`;
export const GET_PAST_OFFENSES_BY_DRIVER_LICENSE_NUMBER = `${BASE_URL}/departmentDriversOffensePortal/:driverLicenseNo`;
export const CREATE_DRIVER_OFFENSE = `${BASE_URL}/departmentDriversOffensePortal`;

// Department Search History
export const DEPARTMENT_SEARCH_HISTORY_CREATE = `${BASE_URL}/department-search-history`;

// Department Driver Offense Points
export const DEPARTMENT_DRIVER_OFFENSE_POINTS_GET_BY_LICENSE_NUMBER = `${BASE_URL}/ccc/department-driver-offense-points/:licenseNumber`;

// Groups
export const GET_ALL_GROUPS = `${BASE_URL}/groups`;
// Pages
export const GET_PAGES_BY_GROUP_ID = `${BASE_URL}/pages/getPagesByGroupId/:groupId`;

// Users
export const GET_N_USERS_BY_CREATED_AT_DATE = `${BASE_URL}/user/n-users-by-created-date`;
export const SEARCH_USERS = `${BASE_URL}/user/search`;
// User Affiliations
export const GET_ALL_USER_AFFILIATIONS_BY_GROUP_AND_ROLE_ID = `${BASE_URL}/user-affiliations/:groupId/:roleId`;
export const ADD_AFFILIATIONS_FOR_USERS = `${BASE_URL}/user-affiliations`;
// Roles
export const GET_ALL_ROLES = `${BASE_URL}/roles`;
export const GET_ALL_ROLES_BY_GROUP_ID = `${BASE_URL}/roles/byGroupId/:groupId`;
export const CREATE_ROLE = `${BASE_URL}/user/createRole`;
// Profile
export const GET_USER_PROFILE_DATA_BY_USER_ID = `${BASE_URL}/profile/:userId`;
export const UPDATE_USER_PROFILE = `${BASE_URL}/profile/update`;
export const UPDATE_LANGUAGE_IN_PROFILE = `${baseUrl}/profile/update/language`;

// Notifications
export const GET_ALL_NOTIFICATIONS_BY_USER_ID_AND_MOBILE_NUMBER = `${BASE_URL}/notifications`;
export const MARK_NOTIFICATION_AS_READ = `${BASE_URL}/notifications/markAsRead`;

// Pages | Rights
export const GET_COMPONENTS = `${BASE_URL}/pages/getComponents`;
export const GET_SUB_COMPONENTS = `${BASE_URL}/pages/getSubComponents`;
export const GET_BUTTONS = `${BASE_URL}/pages/getButtons`;
export const GET_USER_BUTTONS_RIGHTS_BY_USER_ID = `${BASE_URL}/rights/getUserButtonsRightsByUserId`;
export const GET_USER_BUTTON_RIGHTS_BY_GROUP_ID = `${BASE_URL}/rights/groups/:groupId`;
export const GET_USER_BUTTON_RIGHTS_BY_ROLE_ID = `${BASE_URL}/rights/roles/:roleId`;
export const GET_GROUPS = `${BASE_URL}/user/getGroups`;
export const GET_ROLES = `${BASE_URL}/user/getRoles`;
export const ASSIGN_GROUP_RIGHTS = `${BASE_URL}/rights/assignGroupRights`;
export const ASSIGN_ROLE_RIGHTS = `${BASE_URL}/rights/assignRoleRights`;
export const ASSIGN_USER_RIGHTS = `${BASE_URL}/rights/assignUserRights`;
export const REVOKE_USER_BUTTONS_RIGHTS_BY_USER_ID = `${BASE_URL}/rights/revoke/revokeUserButtonsRightsByUserId`;
export const GET_USERS = `${BASE_URL}/user/getUsers`;

// Authentication Endpoints
export const LOGIN_WITH_MOBILE_NUMBER = `${BASE_URL}/user/loginWithMobileumber`;
export const LOGIN = `${BASE_URL}/user/login`;
export const LOGIN_OTP_CONFIRMATION = `${BASE_URL}/user/loginWithMobileumber/confirmOtp`;
export const REGISTER = `${BASE_URL}/user/register`;
export const RETRIEVE_LAST_ADDED_USER = `${BASE_URL}/user/retrieveLastUserRecord`;
export const REGISTER_ADVANCED = `${BASE_URL}/user/registerAdvanced`;
export const REGISTER_ADVANCED_CONFIRM_OTP = `${BASE_URL}/user/registerAdvanced/confirmOtp`;
export const REGISTER_WITH_MOBILE_NUMBER = `${BASE_URL}/user/registerWithMobileNumber`;
export const REGISTER_WITH_MOBILE_NUMBER_CONFIRM_OTP = `${BASE_URL}/user/registerWithMobileNumber/confirmOtp`;
export const LOGOUT = `${BASE_URL}/user/logout`;

// My Devices
export const GET_MY_DEVICES_BY_NIC = `${BASE_URL}/device-registration/receiveByNic`;

// My Vehicles
export const GET_VEHICLES_BY_NIC = `${BASE_URL}/vehicle/receiveByNic`;
export const GET_USER_BUTTONS_RIGHTS_BY_USER_ID_AND_COMPONENTS_ID = `${BASE_URL}/rights/getUserButtonsRightsByUserIdAndByComponentsId`;

// Voter
export const GET_VOTER_BY_NIC = `${BASE_URL}/voter/receiveByNic`;

// Chat
export const CHAT_ADD_MESSAGE = `${BASE_URL}/message/set`;
export const CHAT_GET_SINGLE_CHAT_BY_CHAT_ID = `${BASE_URL}/getSingleChat/:chatId`;

// Deparment Drivers License Revokes
export const DEPARTMENT_DRIVERS_LICENSE_REVOKES_CREATE = `${BASE_URL}/department-driver-license-revokes`;
export const DEPARTMENT_DRIVERS_LICENSE_REVOKES_GET_BY_LICENSE_NUMBER = `${BASE_URL}/department-driver-license-revokes/:licenseNumber`;
export const DEPARTMENT_DRIVERS_LICENSE_GET_REVOKE_STATUS = `${BASE_URL}/department-driver-license-revokes/revoke-status/:licenseNumber`;
// Customs
export const CUSTOMS_RECIEVE_INDIVIDUAL_BY_NIC = `${BASE_URL}/customs/receiveIndividualByNic`;
export const CUSTOMS_RECIEVE_INDIVIDUAL_CURRENCY_DECLARAION_BY_NIC = `${BASE_URL}/'customs/receiveIndividualCurrencyDeclarationByNic`;
export const CUSTOMS_RECIEVE_DECLARATIONS_BY_NIC = `${BASE_URL}/customs/receiveDeclaration`;
export const CUSTOMS_RECIEVE_INDIVIDUAL_CASES_BY_NIC = `${BASE_URL}/customs/receiveIndividualCasesByNic`;
export const CUSTOMS_RECIEVE_VEHICLES_BY_NIC = `${BASE_URL}/customs/receiveVehiclesByNic`;
export const CUSTOMS_RECIEVE_CUSTOMS_CMPANY_BY_NIC = `${BASE_URL}/customs/receiveCustomsCompany`;
export const CUSTOMS_RECIEVE_COMPANY_CASES_BY_NIC = `${BASE_URL}/customs/receiveCompanyCasesByNic`;

// Passport
export const PASSPORT_GET_PASSPORT_DATA_BY_PASSPORT_NUMBER = `${BASE_URL}/passport/receiveAllData`;
export const PASSPORT_GET_ALL_PASSPORT_ALTERATIONS_BY_PASSPORT_NUMBER = `${BASE_URL}/passport/receiveAlterations`;
export const PASSPORT_GET_ALL_PASSPORT_REASONS_BY_PASSPORT_NUMBER = `${BASE_URL}/passport/receiveReasons`;
export const PASSPORT_RECIEVE_PASSPORT_MISSING_DATA_BY_PASSPORT_NUMBER = `${BASE_URL}/passport/receivePassportMissingDataByPassportNumber`;
export const PASSPORT_RECIEVE_MISING_PASSPORT_DATA_BY_REPORTED_BY = `${BASE_URL}/passport/receivePassportMissingDataByReportedBy`;
export const PASSPORT_RECIEVE_BY_NIC = `${BASE_URL}/passport/receiveByNic`;
export const PASSPORT_RECIEVE_BY_PASSPORT_NUMBER = `${BASE_URL}/passport/receive`;

// POS Rep Sales Visit
export const POS_GET_ALL_LATEST_SALES_VISITS = `${BASE_URL}/point-of-sales/rep-sales-visit/latest`;
export const POS_INSERT_SALES_VISIT_RECORD = `${BASE_URL}/point-of-sales/rep-sales-visit`;

// POS Auto Sales System
export const POS_ASY_GET_FIRST_BILL_FOR_EACH_INSTITUTE = `${BASE_URL}/point-of-sales/auto-sales-system/get-first-bill-for-each-ins`;

// POS Profit and loss
export const POS_GET_PROFIT_AND_LOSS_DATA = `${BASE_URL}/point-of-sales/profit-and-loss/get-profit-and-loss-data`;
export const POS_GET_PROFIT_AND_LOSS_UPDATE_DATA = `${BASE_URL}/point-of-sales/profit-and-loss/get-profit-and-loss-data-update`;

// POS Representatives
export const POS_UPSERT_INSTITUTION_REPRESENTATIVE = `${BASE_URL}/point-of-sales/stock-institution-representatives/create-and-update-users/:id`;
export const POS_GET_ALL_INSTITUTION_REPRESENTATIVES_BY_INSTITUTION_ID = `${BASE_URL}/point-of-sales/stock-institution-representatives/:id`;
export const TOGGLE_STOCK_INSTITUTION_REPRESENTATIVE_IS_DELETED = `${BASE_URL}/point-of-sales/stock-institution-representatives/customer-person/:userId/:insId/toggle-deletion`;
export const POS_STOCK_INSTITUTION_REPRESENTATIVE_SEARCH = `${BASE_URL}/point-of-sales/stock-institution-representatives/search`;
// POS Stock customer person
export const POS_CREATE_STOCK_CUSTOMER_PERSON = `${BASE_URL}/point-of-sales/stock-customer-person`;
export const POS_GET_STOCK_CUSTOMER_PERSON_BY_MOBILE_NUMBER = `${BASE_URL}/point-of-sales/stock-customer-person/search/by-mobile-number`;
// POS Institution Stock Activity Check
export const POS_GET_INSTITUTION_STOCK_ACTIVITY_CHECK_DATA = `${BASE_URL}/point-of-sales/institution-stock-activity-check/all`;

// National Search Engine
export const NSE_INITIAL_SEARCH_FOR_USER = `${BASE_URL}/nse/initialSearchForUser`;
export const NSE_CRATE_SEARCH_TO_WES_TEMP = `${BASE_URL}/wes/createWesTemp`;
export const NSE_TERMINATE_SEARCH = `${BASE_URL}/nse/terminateSearch`;
export const WHOLE_SEARCH_RECIEVE_BY_NIC = `${BASE_URL}/wes/receiveByNic`;
// Immigration
export const IMMIGRATION_RECIEVE_AIRPORT_TRAVEL_HISTORY_BY_NIC = `${BASE_URL}/airport/receiveByNic`;
export const IMMIGRATION_RECIEVE_PORT_TRAVEL_HISTORY_BY_NIC = `${BASE_URL}/port/receiveByNic`;
// Car PArk Services
export const CPS_GET_OGF_CAR_PARK_BY_VEHICLE_NUMBER = `${BASE_URL}/car-park-services/one-galle-face/receiveCarParkOneGalleFaceByVehicleNumber`;
export const CPS_GET_CCC_CAR_PARK_BY_VEHICLE_NUMBER = `${BASE_URL}/car-park-services/colombo-city-centre/receiveCarParkColomboCityCentreByVehicleNumber`;
export const CPS_GET_DELMON_HOSPITAL_CAR_PARK_BY_VEHICLE_NUMBER = `${BASE_URL}/car-park-services/delmon-hospital/receiveCarParkDelmonHospitalByVehicleNumber`;
export const CPS_GET_NAWALOKA_HOSPITAL_CAR_PARK_BY_VEHICLE_NUMBER = `${BASE_URL}/car-park-services/nawaloka-hospital/receiveCarParkNawalokaHospitalByVehicleNumber`;
export const CPS_GET_OGF_CPS_BY_NIC = `${BASE_URL}/car-park-services/one-galle-face/receiveByNic`;
export const CPS_GET_CCC_CPS_BY_NIC = `${BASE_URL}/car-park-services/colombo-city-centre/receiveByNic`;
export const CPS_GET_DELMON_HOSPITAL_CPS_BY_NIC = `${BASE_URL}/car-park-services/delmon-hospital/receiveByNic`;
export const CPS_GET_NAWALOKA_HOSPITAL_CPS_BY_NIC = `${BASE_URL}/car-park-services/nawaloka-hospital/receiveByNic`;
// Expressway
export const EXW_GET_EXPRESSWAY_VEHICLE_BY_NIC = `${BASE_URL}/expressway/receiveByNic`;
export const EXW_GET_EXPRESSWAY_VEHICLE_BY_VEHICLE_NUMBER = `${BASE_URL}/expressway/receiveByVehicleNumber`;
// Tution
export const TUTION_GET_TUTION_CHILD_BY_NIC = `${BASE_URL}/tuition/receiveTuitionChildByNic`;
// Transport
export const TRANSPORT_GET_TRANSPORT_CHILD_BY_NIC = `${BASE_URL}/transport/receiveTransportChildByNic`;
// School
export const SCHOOL_GET_SCHOOL_CHILD_BY_NIC = `${BASE_URL}/school/receiveSchoolChildByNic`;
export const SCHOOL_RECIEVE_SCHOOL_BY_NIC = `${BASE_URL}/school/receiveByNic`;
// Foriegn Employmenet Bureau
export const FEB_GET_FEB_BY_NIC = `${BASE_URL}/foreign-employment-bureau/receiveByNic`;
// Driver Offense
export const DRIVER_OFFENSES_RECIEVE_DRIVER_OFFENSES_BY_NIC = `${BASE_URL}/driving-offense/receiveByNic`;
// Airline
export const AIRLINES_RECIEVE_SRILANKAN_AIRLINES_BY_NIC = `${BASE_URL}/airline/sri-lankan-airlines/receiveByNic`;
// NIC
export const NIC_RECIEVE_BY_NIC_NUMBER = `${BASE_URL}/nic/receive`;
// University
export const UNIVERSITY_RECIEVE_UNIVERSITY_BY_NIC = `${BASE_URL}/university/receiveByNic`;
// ETF
export const ETF_RECIEVE_ETF_BY_NIC = `${BASE_URL}/etf/receiveByNic`;
// EPF
export const EPF_RECIEVE_EPF_BY_NIC = `${BASE_URL}/epf/receiveByNic`;
// Other Educational Bopdies
export const OEB_RECIEVE_NAITA_BY_NIC = `${BASE_URL}/other-educational-bodies/naita/receiveByNic`;
export const OEB_RECIEVE_TVEC_BY_NIC = `${BASE_URL}/other-educational-bodies/tvec/receiveByNic`;
export const OEB_RECIEVE_TEACHER_TRAINING_BY_NIC = `${BASE_URL}/other-educational-bodies/teacher-training/receiveByNic`;
export const OEB_RECIEVE_ICHEM_BY_NIC = `${BASE_URL}/other-educational-bodies/ichem/receiveByNic`;
// Council
export const COUNCILS_RECIEVE_MUNCIAL_COUNCIL_BY_NIC = `${BASE_URL}/council/municipal/receiveByNic`;
export const COUNCILS_RECIEVE_URBAN_COUNCILS_BY_NIC = `${BASE_URL}/council/urban/receiveByNic`;
export const COUNCILS_RECIEVE_PRADESHIYA_SABA_BY_NIC = `${BASE_URL}/council/pradeshiya-sabha/receiveByNic`;
// Inland Revenue
export const INLAND_REVENUE_RECIEVE_BY_NIC = `${BASE_URL}/inland-revenue/receiveByNic`;
// CEA
export const CEA_RECIEVE_CEA_BY_NIC = `${BASE_URL}/cea-license/receiveByNic`;
// Crib
export const CRIB_RECIEVE_CRIB_BY_NIC = `${BASE_URL}/crib/receiveByNic`;
// Atomic Energy Authority
export const ATOMIC_ENERGY_AUTHORITY_RECIEVE_BY_NIC = `${BASE_URL}/atomic-enerygy-authority/receiveByNic`;
// Sri Lanka Medical Council
export const SLMC_RECIEVE_SLMC_BY_NIC = `${BASE_URL}/sri-lanka-medical-council/receiveByNic`;
// Network
export const NETWORK_RECIEVE_BY_NIC = `${BASE_URL}/network/receiveByNic`;
// Election Commission
export const ELECTION_COMMISSION_REVIEVE_BY_NIC = `${BASE_URL}/election/receiveByNic`;
// Gem
export const GEM_RECIEVE_BY_NIC = `${BASE_URL}/gem/receiveByNic`;
// Excise
export const EXCISE_RECIEVE_BY_NIC = `${BASE_URL}/excise/receiveByNic`;
// State Banks
export const STATE_BANKS_RECIEVE_BY_NIC = `${BASE_URL}/state-banks/receiveByNic`;
// TAXI
export const TAXI_UBER_RECIEVE_BY_NIC = `${BASE_URL}/taxi/uber/receiveByNic`;
export const TAXI_PICKME_RECIEVE_BY_NIC = `${BASE_URL}/taxi/pickme/receiveByNic`;
export const TAXI_KANGAROO_RECIEVE_BY_NIC = `${BASE_URL}/taxi/kangaroo/receiveByNic`;
export const TAXI_TAXIYAK_RECIEVE_BY_NIC = `${BASE_URL}/taxi/taxiyak/receiveByNic`;
export const TAXI_UBER_RECIEVE_VEHICLE_DETAILS_BY_VEHICLE_NUMBER = `${BASE_URL}/taxi/uber/receiveUberVehicleDetailsByVehicleNumber`;
export const TAXI_PICKME_RECIEVE_VEHICLE_DETAILS_BY_VEHICLE_NUMBER = `${BASE_URL}/taxi/pickme/receivePickMeVehicleDetailsByVehicleNumber`;
export const TAXI_KANGAROO_RECIEVE_VEHICLE_DETAILS_BY_VEHICLE_NUMBER = `${BASE_URL}/taxi/kangaroo/receiveKangarooVehicleDetailsByVehicleNumber`;
export const TAXI_TAXIYAK_RECIEVE_VEHICLE_DETAILS_BY_NIC_NUMBER = `${BASE_URL}/taxi/taxiyak/receiveAccountDetailsByNic`; // done
// Transport Commission
export const TRANSPORT_COMMISSION_RECIEVE_BY_NIC = `${BASE_URL}/transport-commission/receiveByNic`; // done
export const TRANSPORT_COMMISSION_RECIEVE_BY_VEHICLE_NUMBER = `${BASE_URL}/transport-commission/receiceByVehicleNumber`; // done
// Vehicle
export const NIC_RECEIVE_BY_VEHICLE_NUMBER = `${BASE_URL}/vehicle/receiveNicByVehicleNumber`; // done
// License
export const LICENSE_RECIEVE_BY_LICENSE_NUMBER = `${BASE_URL}/license/receive`; // done
export const LICENSE_RECIEVE_BY_NIC = `${BASE_URL}/license/receiveByNic`; // done
// Vehicle Revenue License
export const VEHICLE_REVENUE_LICENSE_RECIEVE_BY_NIC = `${BASE_URL}/vehicle-revenue-license/receiveByNic`; // done
// Complaint
export const COMPLAINT_RECIEVE_MISSING_NIC_BY_NIC = `${BASE_URL}/complaint/receiveMissingNicByNic`; // done
export const COMPLAINT_RECIEVE_ASSAULT_BY_NIC = `${BASE_URL}/complaint/receiveAssaultByNic`; // done
export const COMPLAINT_RECIEVE_ASSAULTER_BY_NIC = `${BASE_URL}/complaint/receiveAssaulterByNic`; // done
export const COMPLAINT_RECIEVE_DEVICES_BY_NIC = `${BASE_URL}/complaint/receiveMyDevicesByNic`; // done
export const COMPLAINT_RECIEVE_MISING_PASSPORT_BY_NIC = `${BASE_URL}/complaint/receiveMissingPassportByNic`; // done
export const COMPLAINT_RECIEVE_MISSING_LICENSE_BY_NIC = `${BASE_URL}/complaint/receiveMissingLicenseByNic`; // done
// Vehcile Emission
export const VEHICLE_EMISSION_RECIEVE_BY_NIC = `${BASE_URL}/vehicle-emission/receiveByNic`; // done
// Ordinary Level
export const ORDINARY_LEVEL_RECIEVE_BY_NIC = `${BASE_URL}/ol/receiveByNic`; // done
// Vehicle Insurance
export const VEHICLE_INSURANCE_LOLC_RECIEVE_BY_NIC = `${BASE_URL}/vehicle-insurance/lolc/receiveByNic`; // done
export const VEHICLE_INSURANCE_PEOPLES_RECIEVE_BY_NIC = `${BASE_URL}/vehicle-insurance/peoples/receiveByNic`; // done
// Company
export const COMPANY_RECIEVE_BY_NIC = `${BASE_URL}/company/receiveByNic`; // done
// Hospital
export const HOSPITAL_RECIEVE_BY_NIC = `${BASE_URL}/hospital/receiveByNic`; // done
// Police Watch Dog System
export const PWDS_RECIEVE_DEVICES_LIST_BY_NIC = `${BASE_URL}/police-watch-dog-system-nse/receiveMyDevicesListByNic`; // done
export const PWDS_RECIEVE_MISSING_PET_LIST_BY_NIC = `${BASE_URL}/police-watch-dog-system-nse/receiveMissingPetListByNic`; // done
export const PWDS_RECIEVE_MISSING_VEHICLE_LIST_BY_NIC = `${BASE_URL}/police-watch-dog-system-nse/receiveMissingVehicleListByNic`; // done
// Family Chart
export const FAMILY_CHART_RECIEVE_BY_NIC = `${BASE_URL}/family-chart/receiveSelf`; // done
// Citizen Code Number
export const CITIZEN_CODE_NUMBER_RECIEVE_BY_CODE_NUMBER = `${BASE_URL}/citizencodenumber/receiveByCodeNumber`;
// Birth
export const BIRTH_RECIEVE_PARENTS_BY_NIC = `${BASE_URL}/birth/fetchParents`; // done
export const BIRTH_RECIEVE_MARRIAGE_CERTIFICATE_BY_NIC = `${BASE_URL}/birth/fetchMarriageCertificateByNicNumber`; // done

// Payment Gateway Endpoints
export const PAYMENT_GATEWAY_HNB_CREATE_SIGNATURE = `${BASE_URL}/hnb/create-signature`;

//country-nationality Endpoint
export const COUNTRIES_NATIONALITY = `${BASE_URL}/countries`;
