const posStockCustomerInstitutionQueries = require("./queries");
const posAddressQueries = require("../pos-address/queries");
const { saveImage, readImage } = require("../../utils/saveImage");

const getStockCustomerInstitutionLogoFilePathService = async (id) => {
  try {
    const result =
      await posStockCustomerInstitutionQueries.getStockCustomerInstitutionLogoFilePathQuery(
        id
      );
    const imageData = readImage(result?.company_logo_file_path);
    return imageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const stockCustomerInstitutionToggleDeletionService = async (
  institutionId,
  userId
) => {
  try {
    const result =
      await posStockCustomerInstitutionQueries.stockCustomerInstitutionToggleDeletionQuery(
        institutionId,
        userId
      );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createStockCustomerInstitutionService = async (user_id, data) => {
  try {
    const {
      name,
      phone_1,
      phone_2,
      mobile_number,
      email,
      web,
      latitude,
      longitude,
      location_url,
      is_active,
      active_status_change_reason,
      // Address Data
      street_address,
      address_line_2,
      city_id,
      city,
      district_id,
      district,
      province_id,
      province,
      postal_code,
      country,
    } = data;

    // Insert stock bill detail into database
    const stockBillDetailData =
      await posStockCustomerInstitutionQueries.createStockCustomerInstitutionQuery(
        {
          name: name,
          phone_one: phone_1,
          phone_two: phone_2,
          mobile_number: mobile_number,
          email: email,
          web: web,
          created_by: user_id,
          latitude,
          longitude,
          location_url,
          is_active,
          active_status_change_reason,
        }
      );

    if (stockBillDetailData) {
      await posAddressQueries.createAddressQuery({
        street_address,
        address_line_2,
        city_id,
        city,
        district_id,
        district,
        province_id,
        province,
        postal_code,
        country,
        created_by: user_id,
        reference_id: stockBillDetailData.id,
      });
    }
    return stockBillDetailData;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const updateStockCustomerInstitutionService = async (data, user_id) => {
  try {
    const {
      id,
      name,
      // address,
      phone_1,
      phone_2,
      mobile_number,
      email,
      web,
      companyLogo,
      latitude,
      longitude,
      location_url,
      is_active,
      active_status_change_reason,
      //
      street_address,
      address_line_2,
      city_id,
      city,
      district_id,
      district,
      province_id,
      province,
      postal_code,
      country,
    } = data;

    let comapnyLogoImageFilePathToSaveInDb = "";
    // Code to save the company logo
    if (companyLogo) {
      comapnyLogoImageFilePathToSaveInDb = await saveImage(
        "C:\\ccc\\DataStore\\CompanyLogos",
        id,
        companyLogo
      );
    }

    // Save or update the address for the relevant institute
    const matchingAddress =
      await posAddressQueries.findAddressByRefereneIdQuery(id);
    if (matchingAddress) {
      await posAddressQueries.updateAddressQuery(matchingAddress.id, {
        street_address,
        address_line_2,
        city_id,
        city,
        district_id,
        district,
        province_id,
        province,
        postal_code,
        country,
      });
    } else {
      // await pos;
      await posAddressQueries.createAddressQuery({
        street_address,
        address_line_2,
        city_id,
        city,
        district_id,
        district,
        province_id,
        province,
        postal_code,
        country,
        created_by: user_id,
        reference_id: id,
      });
    }

    // Insert stock bill detail into database
    const stockBillDetailData =
      await posStockCustomerInstitutionQueries.updateStockCustomerInstitutionQuery(
        {
          id: id,
          name: name,
          // address: address,
          phone_one: phone_1,
          phone_two: phone_2,
          mobile_number: mobile_number,
          email: email,
          web: web,
          company_logo_file_path: comapnyLogoImageFilePathToSaveInDb,
          latitude,
          longitude,
          location_url,
          is_active,
          active_status_change_reason,
        }
      );

    return stockBillDetailData;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const getAllCustomerPersonsByCustomerInstitutionIdService = async (id) => {
  try {
    const data =
      await posStockCustomerInstitutionQueries.getAllCustomerPersonsByCustomerInstitutionIdQuery(
        id
      );
    return data;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const createOrUpdateListOfPersonsInCustomerInstitutionService = async (
  id,
  data
) => {
  try {
    const response =
      await posStockCustomerInstitutionQueries.createOrUpdateListOfPersonsInCustomerInstitutionQuery(
        id,
        data
      );
    return response;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const getAllStockCustomerInstitutionsService = async (
  attributes = null,
  includeModelsArray = []
) => {
  try {
    const response =
      await posStockCustomerInstitutionQueries.getAllStockCustomerInstitutionsQuery(
        attributes,
        includeModelsArray
      );
    return response;
  } catch (error) {
    throw error;
  }
};

const getUniqueItemCodesForEachInstitutionService = async ({
  institutionIds = [],
}) => {
  try {
    const response =
      await posStockCustomerInstitutionQueries.getUniqueItemCodesForEachInstitutionQuery(
        { institutionIds: institutionIds }
      );
    return response;
  } catch (error) {
    throw error;
  }
};

const getStockCustomerInstitutionByInstitutionIdService = async ({
  institutionId,
  includeAddresses,
}) => {
  try {
    const response =
      await posStockCustomerInstitutionQueries.getStockCustomerInstitutionByInstitutionIdQuery(
        { institutionId, includeAddresses }
      );
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStockCustomerInstitutionService,
  updateStockCustomerInstitutionService,
  getAllCustomerPersonsByCustomerInstitutionIdService,
  createOrUpdateListOfPersonsInCustomerInstitutionService,
  getStockCustomerInstitutionLogoFilePathService,
  stockCustomerInstitutionToggleDeletionService,
  getAllStockCustomerInstitutionsService,
  getUniqueItemCodesForEachInstitutionService,
  getStockCustomerInstitutionByInstitutionIdService,
};
