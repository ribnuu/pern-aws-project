const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const searchProvinceQuery = async (searchTerm) => {
  try {
    const { CccMasterProvince } = setUpAssociationsCCC();

    const provinces = await CccMasterProvince.findAll({
      where: {
        province_name: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    return provinces;
  } catch (error) {
    console.error("Error searching provinces:", error);
    throw error;
  }
};

const searchDistrictQuery = async (searchTerm) => {
  try {
    const { CccMasterDistrict } = setUpAssociationsCCC();

    const districts = await CccMasterDistrict.findAll({
      where: {
        district_name: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    return districts;
  } catch (error) {
    console.error("Error searching districts:", error);
    throw error;
  }
};

const searchCityQuery = async (searchTerm) => {
  try {
    const { CccMasterCity, CccMasterProvince, CccMasterDistrict } =
      setUpAssociationsCCC();

    const cities = await CccMasterCity.findAll({
      where: {
        city_name: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
      include: [
        { model: CccMasterProvince, as: "province" },
        { model: CccMasterDistrict, as: "district" },
      ],
      limit: 10, // Limit results to 10
    });

    return cities;
  } catch (error) {
    console.error("Error searching cities:", error);
    throw error;
  }
};

module.exports = {
  searchProvinceQuery,
  searchDistrictQuery,
  searchCityQuery,
};
