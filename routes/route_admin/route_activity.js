const router = require("express").Router();
const {
  addActivity,
} = require("../../controllers/control_admin/control_activity");
const { upload } = require("../../middlewares/multer");

router.post("/add-activity", upload, addActivity);

module.exports = router;
