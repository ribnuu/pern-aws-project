const fs = require("fs");
const path = require("path");

const posStockCustomerInstitutionService = require("../../services/pos-stock-customer-institution/service");

const createStockCustomerInstitutionController = async (req, res) => {
  const data = req.body;
  const user_id = req.headers.user_id;
  try {
    const response =
      await posStockCustomerInstitutionService.createStockCustomerInstitutionService(
        user_id,
        data
      );
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create stock customer institution record" });
  }
};

const updateStockCustomerInstitutionController = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const user_id = req.headers.user_id;
  try {
    const response =
      await posStockCustomerInstitutionService.updateStockCustomerInstitutionService(
        data,
        user_id
      );
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to update stock customer institution record" });
  }
};

const getAllCustomerPersonsByCustomerInstitutionIdController = async (
  req,
  res
) => {
  const { id } = req.params;
  try {
    const data =
      await posStockCustomerInstitutionService.getAllCustomerPersonsByCustomerInstitutionIdService(
        id
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to fetch stock customer institution record" });
  }
};

const getStockCustomerInstitutionLogoFilePathController = async (req, res) => {
  const { id } = req.params;
  try {
    const data =
      await posStockCustomerInstitutionService.getStockCustomerInstitutionLogoFilePathService(
        id
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch stock customer institution logo file path",
    });
  }
};

const stockCustomerInstitutionToggleDeletionController = async (req, res) => {
  const { insId, userId } = req.params;
  try {
    const data =
      await posStockCustomerInstitutionService.stockCustomerInstitutionToggleDeletionService(
        insId,
        userId
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch stock customer institution logo file path",
    });
  }
};
const createOrUpdateListOfPersonsInCustomerInstitutionController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response =
      await posStockCustomerInstitutionService.createOrUpdateListOfPersonsInCustomerInstitutionService(
        id,
        data
      );
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to fetch stock customer institution record" });
  }
};

const ALLOWED_ATTRIBUTES = [
  "id",
  "name",
  "address",
  // add other attributes that are safe to expose
];

const ALLOWED_MODELS = ["Address", "OtherModel", "StockBillHeader"]; // Define allowed models

const getAllStockCustomerInstitutionsController = async (req, res) => {
  try {
    const { attributes, includeModels } = req.query;

    const selectedAttributes = attributes ? attributes.split(",") : null;

    // Validate includeModels
    const includeModelsArray = includeModels
      ? includeModels
          .split(",")
          .filter((model) => ALLOWED_MODELS.includes(model))
      : [];

    if (selectedAttributes) {
      const invalidAttributes = selectedAttributes.filter(
        (attr) => !ALLOWED_ATTRIBUTES.includes(attr)
      );
      if (invalidAttributes.length > 0) {
        return res.status(400).json({
          error: `Invalid attributes: ${invalidAttributes.join(", ")}`,
        });
      }
    }

    const data =
      await posStockCustomerInstitutionService.getAllStockCustomerInstitutionsService(
        selectedAttributes,
        includeModelsArray
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to fetch stock customer institutions" });
  }
};

const getUniqueItemCodesForEachInstitutionController = async (req, res) => {
  try {
    const data =
      await posStockCustomerInstitutionService.getUniqueItemCodesForEachInstitutionService(
        { institutionIds: req.institution_ids }
      );
    res.send({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch unique item codes for each institution",
    });
  }
};

const getStockCustomerInstitutionByInstitutionIdController = async (
  req,
  res
) => {
  try {
    const { institutionId, includeAddresses } = req.body;
    const data =
      await posStockCustomerInstitutionService.getStockCustomerInstitutionByInstitutionIdService(
        { institutionId, includeAddresses }
      );

    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch stock customer institution by institution id",
    });
  }
};

// const

module.exports = {
  createStockCustomerInstitutionController,
  updateStockCustomerInstitutionController,
  getAllCustomerPersonsByCustomerInstitutionIdController,
  createOrUpdateListOfPersonsInCustomerInstitutionController,
  getStockCustomerInstitutionLogoFilePathController,
  stockCustomerInstitutionToggleDeletionController,
  getAllStockCustomerInstitutionsController,
  getUniqueItemCodesForEachInstitutionController,
  getStockCustomerInstitutionByInstitutionIdController,
};
