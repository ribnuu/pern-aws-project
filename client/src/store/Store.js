import { configureStore } from "@reduxjs/toolkit";
import IssueFineReducer from "./driver-offense/IssueFineSlice";
import NotificationsReducer from "./notifications/NotificationsSlice";
import PayTrafficFineUsingReferenceReducer from "./pay-traffic-fine-usng-reference/PayTrafficFineUsingReference";
import AuthReducer from "./auth/authSlice";
import FormReducer from "./form/FormSlice";
import PointOfSalesReducer from "./point-of-sales/PointOfSalesSlice";
import POSBillPaymentReducer from "./point-of-sales/BillPaymentSlice";
import expensesSliceReducer from "./point-of-sales/ExpensesSlice";
import NavigationReducer from "./navigation/NavigationSlice";
import CustomerInstitutionReducer from "./point-of-sales/CustomerInstitutionSlice";
import ItemCategoryAndSubCategoryReducer from "./point-of-sales/ItemCategorySubCategorySlice";
import TransactionsReducer from "./point-of-sales/TransactionsSlice";
import AssignRightsReducer from "./super-admin/AssignRightsSlice";
import AppRightsReducer from "./app-rights/AppRightsSlice";
import RepSalesVisitReducer from "./point-of-sales/RepSalesVisitSlice";
import InstitutionStockActivityCheckReducer from "./point-of-sales/InstitutionStockActivityCheckSlice";
import BillManagementReducer from "./point-of-sales/BillManagementSlice";
import AppFiltersReducer from "./app-filters/AppFiltersSlice";
import AppLoadingReducer from "./app-loading/AppLoadingSlice";
import AppLanguageReducer from "./app-language/AppLanguageSlice";
import AppBreadCrumbReducer from "./app-breadcrumb-slice/AppBreadCrumbSlice";

export const store = configureStore({
  reducer: {
    issueFineReducer: IssueFineReducer,
    notificationsReducer: NotificationsReducer,
    payTrafficFineUsingReferenceReducer: PayTrafficFineUsingReferenceReducer,
    authReducer: AuthReducer,
    formReducer: FormReducer,
    pointOfSalesReducer: PointOfSalesReducer,
    navigationReducer: NavigationReducer,
    posBillPaymentReducer: POSBillPaymentReducer,
    posExpensesReducer: expensesSliceReducer,
    customerInstitutionReducer: CustomerInstitutionReducer,
    itemCategoryAndSubCategoryReducer: ItemCategoryAndSubCategoryReducer,
    transactionsReducer: TransactionsReducer,
    assignRightsReducer: AssignRightsReducer,
    appRightsReducer: AppRightsReducer,
    repSalesVisitReducer: RepSalesVisitReducer,
    institutionStockActivityCheckReducer: InstitutionStockActivityCheckReducer,
    billManagementReducer: BillManagementReducer,
    appFiltersReducer: AppFiltersReducer,
    appLoadingReducer: AppLoadingReducer,
    appLanguageReducer: AppLanguageReducer,
    appBreadCrumbReducer: AppBreadCrumbReducer,
  },
});

export default store;
