const router = require("express").Router();
const {
  viewItems,
  addItem,
  showImageItem,
  showEditItem,
  editItem,
  deleteItem,
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple } = require("../../middlewares/multer");

router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);
router.get("/show-image/:id", showImageItem);
router.get("/:id", showEditItem);
router.put("/:id", uploadMultiple, editItem);
router.delete("/:id", deleteItem);

module.exports = router;
