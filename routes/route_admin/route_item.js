const router = require("express").Router();
const {
  viewItems,
  addItem,
  showImageItem,
  showEditItem,
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple } = require("../../middlewares/multer");

router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);
router.get("/show-image/:id", showImageItem);
router.get("/:id", showEditItem);

module.exports = router;
