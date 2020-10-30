const router = require("express").Router();
const { viewBanks } = require("../../controllers/control_admin/control_bank");

router.get("/", viewBanks);

module.exports = router;
