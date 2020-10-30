const router = require("express").Router();
const {
  viewDashboard,
  viewCategories,
  viewBanks,
} = require("../controllers/control_admin");

router.get("/dashboard", viewDashboard);
router.get("/categories", viewCategories);
router.get("/banks", viewBanks);

module.exports = router;
