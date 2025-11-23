const posItemCategorySubCategoryService = require("../../services/pos-item-category-sub-category/service");

const createItemCategoryController = async (req, res) => {
  const formData = req.body;

  try {
    const data =
      await posItemCategorySubCategoryService.createItemCategoryService(
        formData
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create item category",
    });
  }
};

const searchItemCategoryController = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const data =
      await posItemCategorySubCategoryService.searchItemCategoryService(
        searchTerm
      );
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search product from stock item header" });
  }
};

// create controller for search sub categories
const searchSubCategoryController = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    const data =
      await posItemCategorySubCategoryService.searchItemSubCategoryService(
        searchTerm
      );

    res.status(201).send({
      success: true,
      subCategories: data.rows,
      rowCount: data.rowCount,
    });
  } catch (error) {
    console.log("Failed to search sub category:", error);
    res
      .status(500)
      .json({ error: "Failed to search sub category", message: error.message });
  }
};

//create a controller for search item supplier
const searchItemSupplierController = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const data =
      await posItemCategorySubCategoryService.searchItemSupplierService(
        searchTerm
      );

    res.status(201).send({
      success: true,
      itemSupplier: data.rows,
      rowCount: data.rowCount,
    });
  } catch (error) {
    console.log("Failed to search item supplier");
    res
      .status(500)
      .json({ error: "Failed to item supplier", message: error.message });
  }
};

const createItemSubCategoryController = async (req, res) => {
  const formData = req.body;

  try {
    const data =
      await posItemCategorySubCategoryService.createItemSubCategoryService(
        formData
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create item category",
    });
  }
};

const updateMultipleStockItemSubCategoriesController = async (req, res) => {
  const { items } = req.body;
  try {
    const data =
      await posItemCategorySubCategoryService.updateMultipleStockItemSubCategoriesService(
        items
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to load GRN data by bill number" });
  }
};

const getAllSubCategoriesByCategoryCodeController = async (req, res) => {
  const { categoryCode } = req.body;

  try {
    const data =
      await posItemCategorySubCategoryService.getAllSubCategoriesByCategoryCodeService(
        categoryCode
      );
    res.send({ success: true, data: data.rows });
  } catch (error) {
    res.status(500).json({
      error: "Failed to all sub categories by category code",
    });
  }
};

module.exports = {
  updateMultipleStockItemSubCategoriesController,
  createItemCategoryController,
  searchItemCategoryController,
  searchSubCategoryController,
  searchItemSupplierController,
  createItemSubCategoryController,
  getAllSubCategoriesByCategoryCodeController,
};
