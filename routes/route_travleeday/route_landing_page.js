const router = require("express").Router();
const {
  landingPage,
} = require("../../controllers/control_travleeday/control_landing_page");

router.get("/", landingPage);

module.exports = router;
