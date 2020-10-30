const router = require("express").Router();
const {
  viewBookings,
} = require("../../controllers/control_admin/control_booking");

router.get("/", viewBookings);

module.exports = router;
