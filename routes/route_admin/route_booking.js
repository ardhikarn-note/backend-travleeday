const router = require("express").Router();
const {
  viewBookings,
} = require("../../controllers/control_admin/control_booking");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewBookings);

module.exports = router;
