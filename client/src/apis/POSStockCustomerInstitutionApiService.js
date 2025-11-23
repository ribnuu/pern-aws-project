import {
  GET_ALL_STOCK_CUSTOMER_INSTITUTIONS,
  GET_STOCK_CUSTOMER_INSTITUTION_LOGO_BY_INSTITUTION_ID,
  POS_CREATE_OR_UPDATE_LIST_OF_PERSONS_IN_CUSTOMER_INSTITUTION,
  POS_CREATE_STOCK_CUSTOMER_INSTITUTION,
  POS_GET_ALL_CUSTOMER_PERSONS_BY_CUSTOMER_INSTITUTION_ID,
  POS_SEARCH_CUSTOMER_INSTITUTION,
  POS_STOCK_CUS_INS_GET_UNIQUE_ITEM_CODES_FOR_INSTITUTIONS_IN_THE_COMPANY,
  POS_STOCK_INSTITUTION_REPRESENTATIVE_SEARCH,
  POS_UPDATE_STOCK_CUSTOMER_INSTITUTION,
  TOGGLE_STOCK_CUSTOMER_PERSON_IS_DELETED,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createStockCustomerInstitutionApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_CREATE_STOCK_CUSTOMER_INSTITUTION,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateStockCustomerInstitutionApi = async (data) => {
  try {
    const response = await API_ENDPOINT.put(
      POS_UPDATE_STOCK_CUSTOMER_INSTITUTION.replace(":id", data.id),
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCustomerPersonsByCustomerInstituionId = async (id) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_ALL_CUSTOMER_PERSONS_BY_CUSTOMER_INSTITUTION_ID.replace(":id", id)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOrUpdateListOfPersonsInCustomerInstitutionApi = async (
  id,
  data
) => {
  try {
    const response = await API_ENDPOINT.put(
      POS_CREATE_OR_UPDATE_LIST_OF_PERSONS_IN_CUSTOMER_INSTITUTION.replace(
        ":id",
        id
      ),
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStockCustomerInstitutionLogoByInstitutionIdApi = async (id) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_STOCK_CUSTOMER_INSTITUTION_LOGO_BY_INSTITUTION_ID.replace(":id", id)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleStockCustomerInstitutionPersonIsDeletedStatusApi = async (
  stockCustomInsId,
  stockCusPerId
) => {
  try {
    const response = await API_ENDPOINT.put(
      TOGGLE_STOCK_CUSTOMER_PERSON_IS_DELETED.replace(
        ":userId",
        stockCusPerId
      ).replace(":insId", stockCustomInsId)
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllStockCustomerInstitutions = async (
  attributes = null,
  includeModels = null
) => {
  try {
    // Prepare query parameters
    const params = {};
    if (attributes) {
      params.attributes = attributes; // Add attributes to query params if provided
    }

    if (includeModels.length > 0) {
      params.includeModels = includeModels; // Add include models to query params
    }

    const response = await API_ENDPOINT.get(
      GET_ALL_STOCK_CUSTOMER_INSTITUTIONS,
      { params }
    ); // Pass params

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchStockCustomerInstitutionApi = async (
  searchTerm,
  loadAll = false,
  loadRepresentative = false,
  loadAddress = false
) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_CUSTOMER_INSTITUTION, {
      searchTerm,
      loadAll,
      loadRepresentative,
      loadAddress,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUniqueItemCodesForEachInstitutionInTheCompanyApi = async (
  filters
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_STOCK_CUS_INS_GET_UNIQUE_ITEM_CODES_FOR_INSTITUTIONS_IN_THE_COMPANY,
      { filters }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchStockInstitutionRepresentativesApi = async ({
  searchTerm,
}) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_STOCK_INSTITUTION_REPRESENTATIVE_SEARCH,
      { searchTerm }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
