const posStockCustomerPersonService = require("../../services/pos-stock-customer-person/service");
const posAddressQueries = require("../../services/pos-address/queries");

const searchStockCustomerPersonController = async (req, res) => {
  const { id } = req.params;
  try {
    const data =
      await posStockCustomerPersonService.searchStockCustomerPersonService(id);
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search stock customer person" });
  }
};

const fetchStockCustomerPersonByMobileNumberController = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const data =
      await posStockCustomerPersonService.fetchStockCustomerPersonByMobileNumberService(
        mobileNumber
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch stock customer person by mobile number",
    });
  }
};

const insertStockCustomerPersonController = async (req, res) => {
  try {
    const formData = req.body;
    const userId = req.headers["user_id"] || null;

    if (!userId) {
      throw new Error(`Invalid Request`);
    }

    const toCreateCustomerPersonData = {
      name: formData.name,
      mobile_number: formData.mobile_number,
    };

    let customerPersonId = null;

    const existingStockCustomerPerson =
      await posStockCustomerPersonService.fetchStockCustomerPersonByMobileNumberService(
        formData.mobile_number
      );

    if (!existingStockCustomerPerson) {
      const data =
        await posStockCustomerPersonService.insertStockCustomerPersonService(
          toCreateCustomerPersonData
        );
      customerPersonId = data.id;
    } else {
      customerPersonId = existingStockCustomerPerson.id;
    }

    await posAddressQueries.createAddressQuery({
      street_address: formData.street_address,
      address_line_2: formData.address_line_2,
      city_id: formData.city_id,
      city: formData.city,
      district_id: formData.district_id,
      district: formData.district,
      province_id: formData.province_id,
      province: formData.province,
      postal_code: formData.postal_code,
      country: formData.country,
      created_by: userId,
      reference_id: customerPersonId,
    });

    res.send({ success: true });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create new stock customer person",
    });
  }
};

module.exports = {
  searchStockCustomerPersonController,
  fetchStockCustomerPersonByMobileNumberController,
  insertStockCustomerPersonController,
};
