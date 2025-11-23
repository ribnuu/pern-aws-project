import {
  CUSTOMS_RECIEVE_COMPANY_CASES_BY_NIC,
  CUSTOMS_RECIEVE_CUSTOMS_CMPANY_BY_NIC,
  CUSTOMS_RECIEVE_DECLARATIONS_BY_NIC,
  CUSTOMS_RECIEVE_INDIVIDUAL_BY_NIC,
  CUSTOMS_RECIEVE_INDIVIDUAL_CASES_BY_NIC,
  CUSTOMS_RECIEVE_INDIVIDUAL_CURRENCY_DECLARAION_BY_NIC,
  CUSTOMS_RECIEVE_VEHICLES_BY_NIC,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const customsRecieveIndividualByNICApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_INDIVIDUAL_BY_NIC,
      { nic_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveIndividualCurrencyDeclaratonByNICApi = async (
  nic_number
) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_INDIVIDUAL_CURRENCY_DECLARAION_BY_NIC,
      { nic_number }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveDeclarationsByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_DECLARATIONS_BY_NIC,
      { nic_number }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveIndividualCasesByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_INDIVIDUAL_CASES_BY_NIC,
      { nic_number }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveVehiclesByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(CUSTOMS_RECIEVE_VEHICLES_BY_NIC, {
      nic_number,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveCustomsCompanyByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_CUSTOMS_CMPANY_BY_NIC,
      {
        nic_number,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customsRecieveCompanyCasesByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CUSTOMS_RECIEVE_COMPANY_CASES_BY_NIC,
      {
        nic_number,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
