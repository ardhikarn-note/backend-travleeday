const router = require("express").Router();
const {
  viewDashboard,
} = require("../../controllers/control_admin/control_dashboard");

router.get("/", viewDashboard);

module.exports = router;
