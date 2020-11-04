const router = require("express").Router();
const {
  viewItems,
  addItem,
  showImageItem,
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple } = require("../../middlewares/multer");

router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);
router.get("/show-image/:id", showImageItem);

module.exports = router;
