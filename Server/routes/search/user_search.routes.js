const express = require("express");
const userSearchController = require("../../controllers/search/user_search.controller");
const router = express.Router();

router.post("/api/nse/initialSearchForUser", userSearchController.searchExistsByUser);
router.post("/api/nse/terminateSearch", userSearchController.userTerminationSearch);

module.exports = router;
