const router = require("express").Router();
const {
  viewBanks,
  addBank,
  editBank,
  deleteBank,
} = require("../../controllers/control_admin/control_bank");
const { upload } = require("../../middlewares/multer");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewBanks);
router.post("/", upload, addBank);
router.put("/", upload, editBank);
router.delete("/:id", deleteBank);

module.exports = router;
