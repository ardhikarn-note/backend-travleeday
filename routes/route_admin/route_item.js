const router = require("express").Router();
const {
  viewItems,
  addItem,
  showImageItem,
  showEditItem,
  editItem,
  deleteItem,
  detailItem,
  addFeature,
  editFeature,
  deleteFeature,
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple, upload } = require("../../middlewares/multer");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);
router.get("/show-image/:id", showImageItem);
router.get("/:id", showEditItem);
router.put("/:id", uploadMultiple, editItem);
router.delete("/:id", upload, deleteItem);

module.exports = router;
