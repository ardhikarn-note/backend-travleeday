const router = require("express").Router();
const {
  viewBookings,
  detailBooking,
  confirmBooking,
  rejectBooking,
} = require("../../controllers/control_admin/control_booking");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewBookings);
router.get("/detail-booking/:id", detailBooking);
router.put("/detail-booking/confirmation/:id", confirmBooking);
router.put("/detail-booking/reject/:id", rejectBooking);

module.exports = router;
