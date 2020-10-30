const router = require("express").Router();
const {
  viewDashboard,
  viewCategories,
} = require("../controllers/control_admin");

router.get("/dashboard", viewDashboard);
router.get("/categories", viewCategories);

module.exports = router;
