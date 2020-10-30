const router = require("express").Router();
const { viewItems } = require("../../controllers/control_admin/control_item");

router.get("/", viewItems);

module.exports = router;
