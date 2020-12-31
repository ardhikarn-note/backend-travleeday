const router = require("express").Router();
const {
  detailPage,
} = require("../../controllers/control_travleeday/control_detail_page");

router.get("/:id", detailPage);

module.exports = router;
