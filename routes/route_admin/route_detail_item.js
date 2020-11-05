const router = require("express").Router();
const {
  detailItem,
  addFeature,
  editFeature,
  deleteFeature,
  addActivity,
  editActivity,
} = require("../../controllers/control_admin/control_detail_item");
const { upload } = require("../../middlewares/multer");

// detail item
router.get("/:itemId", detailItem);
// feature
router.post("/add-feature", upload, addFeature);
router.put("/edit-feature", upload, editFeature);
router.delete("/:itemId/feature/:id", deleteFeature);
// activity
router.post("/add-activity", upload, addActivity);
router.put("/edit-activity", upload, editActivity);

module.exports = router;
