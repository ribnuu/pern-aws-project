const setUpAssociations = require("../../models/pos");

const findAddressByRefereneIdQuery = async (referenceId) => {
  try {
    const db_name = "pos_database_duke";
    const { Address } = setUpAssociations(db_name);
    const response = await Address.findAll({
      where: {
        reference_id: referenceId,
      },
    });

    if (response && response.length > 0) {
      return response[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const createAddressQuery = async ({
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
  created_by,
  reference_id,
}) => {
  try {
    const db_name = "pos_database_duke";
    const { Address, StockCustomerInstitution, StockCustomerPerson } =
      setUpAssociations(db_name);

    // Check if the reference_id exists in either stock_customer_institution or stock_customer_person
    const institutionExists =
      await StockCustomerInstitution.findByPk(reference_id);
    const personExists = await StockCustomerPerson.findByPk(reference_id);

    if (!institutionExists && !personExists) {
      throw new Error(
        `Reference ID ${reference_id} does not exist in stock_customer_institution or stock_customer_person.`
      );
    }

    // Proceed with address creation if the reference_id exists in one of the tables
    await Address.create({
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
      created_by,
      reference_id,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};

const updateAddressQuery = async (id, addressData) => {
  try {
    const db_name = "pos_database_duke";
    const { Address } = setUpAssociations(db_name);

    // Filter out fields that are undefined to prevent unnecessary fields in the query
    const filteredData = Object.fromEntries(
      Object.entries(addressData).filter(([_, value]) => value !== undefined)
    );

    // Check if any valid field is provided
    if (Object.keys(filteredData).length === 0) {
      return;
      // throw new Error("No valid fields provided to update.");
    }

    // Insert or update address
    await Address.update(filteredData, {
      where: {
        id: id,
      },
    }); // Use create or replace with upsert if updating existing records
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAddressByRefereneIdQuery,
  createAddressQuery,
  updateAddressQuery,
};
