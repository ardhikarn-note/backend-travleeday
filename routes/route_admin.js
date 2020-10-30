const router = require("express").Router();
const { viewDashboard } = require("../controllers/control_admin");

router.get("/dashboard", viewDashboard);

module.exports = router;
