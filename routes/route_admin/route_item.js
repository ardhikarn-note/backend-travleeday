const router = require("express").Router();
const {
  viewItems,
  addItem,
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple } = require("../../middlewares/multer");

router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);

module.exports = router;
