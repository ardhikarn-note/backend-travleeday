const router = require("express").Router();
const {
  viewBanks,
  addBank,
} = require("../../controllers/control_admin/control_bank");
const { upload } = require("../../middlewares/multer");

router.get("/", viewBanks);
router.post("/", upload, addBank);

module.exports = router;
