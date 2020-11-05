const router = require("express").Router();
const {
  detailItem,
  addFeature,
  editFeature,
  deleteFeature,
  addActivity,
} = require("../../controllers/control_admin/control_detail_item");
const { upload } = require("../../middlewares/multer");

// detail item
router.get("/:itemId", detailItem);
router.post("/add-feature", upload, addFeature);
router.put("/edit-feature", upload, editFeature);
router.delete("/:itemId/feature/:id", deleteFeature);
router.post("/add-activity", upload, addActivity);

module.exports = router;
