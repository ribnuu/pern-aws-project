const posRepsSalesVisitQueries = require("./queries");

const getAllLatestRepSalesVisitsService = async () => {
  try {
    const response =
      await posRepsSalesVisitQueries.getAllLatestRepSalesVisitsQuery();
    return response;
  } catch (error) {
    throw error;
  }
};

const insertStockRepVisitService = async (data) => {
  try {
    const {
      display,
      fridge,
      institution_name,
      item_code,
      poster,
      menu_card,
      stock_customer_institution_id,
      stock,
    } = data;
    const response = await posRepsSalesVisitQueries.insertStockRepVisitQuery({
      stockCustomerInstitutionId: stock_customer_institution_id,
      customerInstituteName: institution_name,
      itemCode: item_code,
      stock: stock,
      poster: poster,
      display: display,
      fridge: fridge,
      menu_card: menu_card,
      isDeleted: false,
      createdBy: "ahsan",
    });

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllLatestRepSalesVisitsService,
  insertStockRepVisitService,
};
