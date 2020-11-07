const router = require("express").Router();
const {
  viewBookings,
  detailBooking,
} = require("../../controllers/control_admin/control_booking");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewBookings);
router.get("/detail-booking/:id", detailBooking);

module.exports = router;
