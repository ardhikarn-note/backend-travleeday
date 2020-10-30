const router = require("express").Router();
const {
  viewCategories,
  addCategory,
} = require("../../controllers/control_admin/control_category");

router.get("/", viewCategories);
router.post("/", addCategory);

module.exports = router;
