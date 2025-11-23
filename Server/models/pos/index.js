const defineStockBillHeader = require("./StockBillHeader");
const defineStockBillDetail = require("./StockBillDetail");
const defineStockCustomerInstitution = require("./StockCustomerInstitution");
const defineStockCustomerPerson = require("./StockCustomerPerson");
const defineStockItemHeader = require("./StockItemHeader");
const defineStockRepsComm = require("./StockRepsComm");
const defineStockBillpayDetail = require("./StockBillpayDetail");
const defineStockBillpayHeader = require("./StockBillpayHeader");
const defineStockInstitutionRepresentative = require("./StockInstitutionRepresentative");
const defineStockRepsPaid = require("./StockRepsPaid");
const getSequelizeInstance = require("../../config/connectionManager");
const defineStockRepsDispatch = require("./StockRepsDispatch");
const defineStockRepsVisit = require("./StockRepsVisit");
const defineStockTransactionUpdate = require("./StockTransactionUpdate");
const defineStockInstitutionStaff = require("./StockInstitutionStaff");
const defineAddress = require("./Address");
const defineExpensesCategory = require("./ExpensesCategory");
const defineExpensesSubCategory = require("./ExpensesSubCategory");
const defineExpensesHeader = require("./ExpensesHeader");
const defineExpensesCashSourceHeader = require("./ExpensesCashSourceHeader");
// const defineExpensesCashSourceDetail = require("./ExpensesCashSourceDetail");
const defineExpensesDetail = require("./ExpensesDetail");
const defineStockBillReturnHeader = require("./stockBillReturnHeader");
const defineStockBillReturnDetail = require("./stockBillReturnDetail");

const setUpAssociations = (db_name) => {
  const sequelize = getSequelizeInstance(db_name);

  // Define models
  const StockBillHeader = defineStockBillHeader(sequelize);
  const StockBillDetail = defineStockBillDetail(sequelize);
  const StockCustomerInstitution = defineStockCustomerInstitution(sequelize);
  const StockCustomerPerson = defineStockCustomerPerson(sequelize);
  const StockItemHeader = defineStockItemHeader(sequelize);
  const StockRepsComm = defineStockRepsComm(sequelize);
  const StockBillpayHeader = defineStockBillpayHeader(sequelize);
  const StockBillpayDetail = defineStockBillpayDetail(sequelize);
  const StockBillReturnHeader = defineStockBillReturnHeader(sequelize);
  const StockBillReturnDetail = defineStockBillReturnDetail(sequelize);
  const StockInstitutionRepresentative =
    defineStockInstitutionRepresentative(sequelize);
  const StockRepsPaid = defineStockRepsPaid(sequelize);
  const StockRepsDispatch = defineStockRepsDispatch(sequelize);
  const StockRepsVisit = defineStockRepsVisit(sequelize);
  const StockTransactionUpdate = defineStockTransactionUpdate(sequelize);
  const StockInstitutionStaff = defineStockInstitutionStaff(sequelize);
  const Address = defineAddress(sequelize);
  const ExpensesCategory = defineExpensesCategory(sequelize);
  const ExpensesSubCategory = defineExpensesSubCategory(sequelize);
  const ExpensesHeader = defineExpensesHeader(sequelize);
  const ExpensesCashSourceHeader = defineExpensesCashSourceHeader(sequelize);
  // const ExpensesCashSourceDetail = defineExpensesCashSourceDetail(sequelize);
  const ExpensesDetail = defineExpensesDetail(sequelize);

  // Stock Bill
  StockBillHeader.hasMany(StockBillDetail, {
    foreignKey: "bill_number",
    sourceKey: "bill_number",
    as: "billDetails",
  });
  StockCustomerInstitution.hasMany(StockBillHeader, {
    foreignKey: "stock_customer_institution_id",
    sourceKey: "id",
    as: "bills",
  });

  StockBillDetail.belongsTo(StockBillHeader, {
    foreignKey: "bill_number",
    targetKey: "bill_number",
    as: "header",
  });

  StockBillHeader.belongsTo(StockCustomerInstitution, {
    foreignKey: "stock_customer_institution_id",
    targetKey: "id",
    as: "customerInstitution",
  });

  StockBillHeader.belongsTo(StockCustomerPerson, {
    foreignKey: "stock_customer_person_id",
    targetKey: "id",
    as: "customerPerson",
  });
  StockCustomerPerson.hasMany(StockBillHeader, {
    foreignKey: "stock_customer_person_id",
    sourceKey: "id",
    as: "bills",
  });

  // Stock Item Header and Stock Bill Detail associations
  StockItemHeader.hasMany(StockBillDetail, {
    foreignKey: "item_code",
    sourceKey: "item_code",
    as: "itemDetails",
  });

  StockBillDetail.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  // Stock Reps Comm and Stock Customer Person associations
  StockRepsComm.belongsTo(StockCustomerPerson, {
    foreignKey: "customer_person_id",
    targetKey: "id",
    as: "customerPerson",
  });

  StockCustomerPerson.hasMany(StockRepsComm, {
    foreignKey: "customer_person_id",
    sourceKey: "id",
    as: "repsCommissions",
  });

  // Stock Reps Comm and Stock Item Header associations
  StockRepsComm.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  StockItemHeader.hasMany(StockRepsComm, {
    foreignKey: "item_code",
    sourceKey: "item_code",
    as: "repsCommissions",
  });

  // Stock Billpay Header and Stock Billpay Detail associations
  StockBillpayHeader.hasMany(StockBillpayDetail, {
    foreignKey: "billpay_header_id",
    sourceKey: "id",
    as: "details",
  });

  StockBillpayDetail.belongsTo(StockBillpayHeader, {
    foreignKey: "billpay_header_id",
    targetKey: "id",
    as: "header",
  });

  // Stock Billpay Detail and Stock Bill Header associations
  StockBillpayDetail.belongsTo(StockBillHeader, {
    foreignKey: "bill_number",
    targetKey: "bill_number",
    as: "billPayDetail",
  });

  StockBillHeader.hasMany(StockBillpayDetail, {
    foreignKey: "bill_number",
    sourceKey: "bill_number",
    as: "billPayDetail",
  });

  //StockBillReturnHeader and StockBillReturnDetail
  StockBillReturnHeader.hasMany(StockBillReturnDetail, {
    foreignKey: "return_bill_number",
    sourceKey: "return_bill_number",
    as: "returnDetails",
  });

  StockBillReturnDetail.belongsTo(StockBillReturnHeader, {
    foreignKey: "return_bill_number",
    targetKey: "return_bill_number",
  });

  // StockBillReturnHeader belongs to StockCustomerInstitution
  StockBillReturnHeader.belongsTo(StockCustomerInstitution, {
    foreignKey: "stock_customer_institution_id",
    as: "customerInstitution",
  });

  // StockInstitutionRepresentative and StockCustomerPerson
  StockInstitutionRepresentative.belongsTo(StockCustomerPerson, {
    foreignKey: "stock_customer_person_id",
    targetKey: "id",
    as: "customerPerson",
  });

  StockCustomerPerson.hasMany(StockInstitutionRepresentative, {
    foreignKey: "stock_customer_person_id",
    sourceKey: "id",
    as: "institutionRepresentatives",
  });

  StockInstitutionRepresentative.belongsTo(StockCustomerInstitution, {
    foreignKey: "institution_id",
    targetKey: "id",
    as: "customerInstitution",
  });

  StockCustomerInstitution.hasMany(StockInstitutionRepresentative, {
    foreignKey: "institution_id",
    sourceKey: "id",
    as: "representatives",
  });

  // StockRepsPaid associations
  StockBillHeader.hasMany(StockRepsPaid, {
    foreignKey: "bill_number",
    sourceKey: "bill_number",
    as: "repsPaidDetails", // Alias for the StockRepsPaid association
  });

  StockRepsPaid.belongsTo(StockBillHeader, {
    foreignKey: "bill_number",
    targetKey: "bill_number",
    as: "billHeader",
  });

  StockRepsPaid.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  // StockRepsDispatch and StockItemHeader associations
  StockRepsDispatch.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  StockItemHeader.hasMany(StockRepsDispatch, {
    foreignKey: "item_code",
    sourceKey: "item_code",
    as: "dispatches",
  });

  // StockRepsDispatch and StockCustomerPerson associations
  StockRepsDispatch.belongsTo(StockCustomerPerson, {
    foreignKey: "created_by",
    targetKey: "id",
    as: "creator",
  });

  StockCustomerPerson.hasMany(StockRepsDispatch, {
    foreignKey: "created_by",
    sourceKey: "id",
    as: "dispatches",
  });

  // StockRepsVisit and StockCustomerInstitution associations
  StockRepsVisit.belongsTo(StockCustomerInstitution, {
    foreignKey: "stock_customer_institution_id",
    targetKey: "id",
    as: "customerInstitution",
  });

  StockCustomerInstitution.hasMany(StockRepsVisit, {
    foreignKey: "stock_customer_institution_id",
    sourceKey: "id",
    as: "repsVisits",
  });

  // StockRepsVisit and StockItemHeader associations
  StockRepsVisit.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  StockItemHeader.hasMany(StockRepsVisit, {
    foreignKey: "item_code",
    sourceKey: "item_code",
    as: "repsVisits",
  });

  // // StockInstitutionRepresentative and StockBillHeader association
  // StockInstitutionRepresentative.hasMany(StockBillHeader, {
  //   foreignKey: "stock_institution_representative_id",
  //   sourceKey: "id",
  //   as: "bills",
  // });

  // StockBillHeader.belongsTo(StockInstitutionRepresentative, {
  //   foreignKey: "stock_institution_representative_id",
  //   targetKey: "id",
  //   as: "institutionRepresentative",
  // });

  // Stock Transaction Update and Stock Item Header associations
  StockTransactionUpdate.belongsTo(StockItemHeader, {
    foreignKey: "item_code",
    targetKey: "item_code",
    as: "itemHeader",
  });

  StockItemHeader.hasMany(StockTransactionUpdate, {
    foreignKey: "item_code",
    sourceKey: "item_code",
    as: "transactions",
  });

  // Stock Transaction Update and Stock Bill Header associations
  StockTransactionUpdate.belongsTo(StockBillHeader, {
    foreignKey: "bill_number",
    targetKey: "bill_number",
    as: "billHeader",
  });

  StockBillHeader.hasMany(StockTransactionUpdate, {
    foreignKey: "bill_number",
    sourceKey: "bill_number",
    as: "transactionUpdates",
  });

  // Stock Transaction Update and Stock Customer Institution associations
  StockTransactionUpdate.belongsTo(StockCustomerInstitution, {
    foreignKey: "customer_institution_id",
    targetKey: "id",
    as: "customerInstitution",
  });

  StockCustomerInstitution.hasMany(StockTransactionUpdate, {
    foreignKey: "customer_institution_id",
    sourceKey: "id",
    as: "transactions",
  });

  // StockInstitutionStaff and StockCustomerInstitution
  StockInstitutionStaff.belongsTo(StockCustomerInstitution, {
    foreignKey: "institution_id",
    targetKey: "id",
    as: "staffInstitution",
  });

  StockCustomerInstitution.hasMany(StockInstitutionStaff, {
    foreignKey: "institution_id",
    sourceKey: "id",
    as: "institutionStaffs",
  });

  // StockInstitutionStaff and StockCustomerPerson
  StockInstitutionStaff.belongsTo(StockCustomerPerson, {
    foreignKey: "stock_customer_person_id",
    targetKey: "id",
    as: "institutionStaffCustomerPerson",
  });

  StockCustomerPerson.hasMany(StockInstitutionStaff, {
    foreignKey: "stock_customer_person_id",
    targetKey: "id",
    as: "customerPersonInstitutionStaff",
  });

  // Address model associations
  Address.belongsTo(StockCustomerInstitution, {
    foreignKey: "reference_id",
    targetKey: "id",
    as: "customerInstitution",
    constraints: false, // Allow linking to StockCustomerInstitution or StockCustomerPerson
  });

  Address.belongsTo(StockCustomerPerson, {
    foreignKey: "reference_id",
    targetKey: "id",
    as: "customerPerson",
    constraints: false, // Allow linking to StockCustomerInstitution or StockCustomerPerson
  });

  StockCustomerInstitution.hasMany(Address, {
    foreignKey: "reference_id",
    sourceKey: "id",
    as: "addresses",
  });

  StockCustomerPerson.hasMany(Address, {
    foreignKey: "reference_id",
    sourceKey: "id",
    as: "addresses",
  });

  // 1. ExpensesSubCategory belongs to ExpensesCategory
  ExpensesSubCategory.belongsTo(ExpensesCategory, {
    foreignKey: "category_code",
    targetKey: "category_code",
    as: "category",
  });

  ExpensesCategory.hasMany(ExpensesSubCategory, {
    foreignKey: "category_code",
    sourceKey: "category_code",
    as: "subCategories",
  });

  // 2. ExpensesDetail belongs to ExpensesCategory and ExpensesSubCategory
  ExpensesDetail.belongsTo(ExpensesCategory, {
    foreignKey: "category_code",
    targetKey: "category_code",
    as: "category",
  });

  ExpensesDetail.belongsTo(ExpensesSubCategory, {
    foreignKey: "sub_category_code",
    targetKey: "sub_category_code",
    as: "subCategory",
  });

  // 3. ExpensesDetail belongs to ExpensesHeader
  ExpensesDetail.belongsTo(ExpensesHeader, {
    foreignKey: "expense_header_id",
    targetKey: "id",
    as: "header",
  });

  ExpensesHeader.hasMany(ExpensesDetail, {
    foreignKey: "expense_header_id",
    sourceKey: "id",
    as: "details",
  });

  ExpensesHeader.hasOne(ExpensesCashSourceHeader, {
    sourceKey: "paid_from",
    foreignKey: "code",
    as: "cashSource",
  });

  // // 4. ExpensesCashSourceDetail belongs to ExpensesCashSourceHeader and ExpensesDetail
  // ExpensesCashSourceDetail.belongsTo(ExpensesCashSourceHeader, {
  //   foreignKey: "expenses_cash_source_header_id",
  //   targetKey: "id",
  //   as: "cashSourceHeader",
  // });

  // ExpensesCashSourceHeader.hasMany(ExpensesCashSourceDetail, {
  //   foreignKey: "expenses_cash_source_header_id",
  //   sourceKey: "id",
  //   as: "cashSourceDetails",
  // });

  // ExpensesCashSourceDetail.belongsTo(ExpensesDetail, {
  //   foreignKey: "expenses_detail_id",
  //   targetKey: "id",
  //   as: "detail",
  // });

  // ExpensesDetail.hasMany(ExpensesCashSourceDetail, {
  //   foreignKey: "expenses_detail_id",
  //   sourceKey: "id",
  //   as: "cashSourceDetails",
  // });

  // 5. ExpensesCashSourceDetail belongs to ExpensesHeader
  // ExpensesCashSourceDetail.belongsTo(ExpensesHeader, {
  //   foreignKey: "expenses_header_id",
  //   targetKey: "id",
  //   as: "header",
  // });

  // ExpensesHeader.hasMany(ExpensesCashSourceDetail, {
  //   foreignKey: "expenses_header_id",
  //   sourceKey: "id",
  //   as: "cashSourceDetails",
  // });

  return {
    sequelize,
    StockBillHeader,
    StockBillDetail,
    StockBillReturnHeader,
    StockBillReturnDetail,
    StockCustomerInstitution,
    StockCustomerPerson,
    StockItemHeader,
    StockRepsComm,
    StockBillpayHeader,
    StockBillpayDetail,
    StockRepsPaid,
    StockRepsDispatch,
    StockInstitutionRepresentative,
    StockRepsVisit,
    StockTransactionUpdate,
    StockInstitutionStaff,
    Address,
    ExpensesCategory,
    ExpensesSubCategory,
    ExpensesHeader,
    ExpensesCashSourceHeader,
    // ExpensesCashSourceDetail,
    ExpensesDetail,
  };
};

module.exports = setUpAssociations;
