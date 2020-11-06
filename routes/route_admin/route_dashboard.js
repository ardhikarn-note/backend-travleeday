const router = require("express").Router();
const {
  viewDashboard,
} = require("../../controllers/control_admin/control_dashboard");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewDashboard);

module.exports = router;
