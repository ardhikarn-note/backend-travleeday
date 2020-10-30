const router = require("express").Router();
const {
  viewDashboard,
  viewCategories,
  viewBanks,
  viewItems,
} = require("../controllers/control_admin");

router.get("/dashboard", viewDashboard);
router.get("/categories", viewCategories);
router.get("/banks", viewBanks);
router.get("/items", viewItems);

module.exports = router;
