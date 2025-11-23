import {
  POS_GET_ALL_INSTITUTION_REPRESENTATIVES_BY_INSTITUTION_ID,
  POS_UPSERT_INSTITUTION_REPRESENTATIVE,
  TOGGLE_STOCK_INSTITUTION_REPRESENTATIVE_IS_DELETED,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getAllRepresentativesByInstitutionId = async (institutionId) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_ALL_INSTITUTION_REPRESENTATIVES_BY_INSTITUTION_ID.replace(
        ":id",
        institutionId
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrUpdateListOfRepresentatiesInInstitutionApi = async (
  id,
  data
) => {
  try {
    const response = await API_ENDPOINT.put(
      POS_UPSERT_INSTITUTION_REPRESENTATIVE.replace(":id", id),
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleStockCustomerInstitutionRepresentativeIsDeletedStatusApi =
  async (stockCustomInsId, stockCusPerId) => {
    try {
      const response = await API_ENDPOINT.put(
        TOGGLE_STOCK_INSTITUTION_REPRESENTATIVE_IS_DELETED.replace(
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
