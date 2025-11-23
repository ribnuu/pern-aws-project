const express = require("express");
const searchController = require("../../controllers/search/search.controller");
const router = express.Router();

router.post("/api/wes/receiveByNic", searchController.receiveByNic);
router.post("/api/wes/createWesTemp", searchController.createSearchToWesTemp);
// router.post(
//   "/api/wes/createCompleteToWesMaster",
//   searchController.createCompleteToWesMaster
// );

router.post(
  "/api/vehicle-emission/updateDVEToTrue",
  searchController.updateWesDepartmentVehicleEmissionTrue
);
router.post(
  "/api/epf/updateDEPFToTrue",
  searchController.updateWesDepartmentEpfTrue
);
router.post(
  "/api/feb/updateDFEBToTrue",
  searchController.updateWesDepartmentForeignEmploymentBureauTrue
);
router.post(
  "/api/dop/updateDDOPToTrue",
  searchController.updateWesDepartmentDriverOffensePortalTrue
);
router.post(
  "/api/vehicle-emission/updateDVEToFalse",
  searchController.updateWesDepartmentVehicleEmissionFalse
);
router.post(
  "/api/epf/updateDEPFToFalse",
  searchController.updateWesDepartmentEpfFalse
);
router.post(
  "/api/feb/updateDFEBToFalse",
  searchController.updateWesDepartmentForeignEmploymentBureauFalse
);
router.post(
  "/api/dop/updateDDOPToFalse",
  searchController.updateWesDepartmentDriverOffensePortalFalse
);

module.exports = router;
