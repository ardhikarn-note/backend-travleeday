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
} = require("../../controllers/control_admin/control_item");
const { uploadMultiple, upload } = require("../../middlewares/multer");

router.get("/", viewItems);
router.post("/", uploadMultiple, addItem);
router.get("/show-image/:id", showImageItem);
router.get("/:id", showEditItem);
router.put("/:id", uploadMultiple, editItem);
router.delete("/:id", upload, deleteItem);

// detail item
router.get("/detail-item/:itemId", detailItem);
router.post("/detail-item/add-feature", upload, addFeature);
router.put("/detail-item/edit-feature", upload, editFeature);

module.exports = router;
