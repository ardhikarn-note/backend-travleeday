const router = require("express").Router();
const {
  bookingPage,
} = require("../../controllers/control_travleeday/control_booking");
const { upload } = require("../../middlewares/multer");

router.post("/", upload, bookingPage);

module.exports = router;
