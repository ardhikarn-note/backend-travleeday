const router = require("express").Router();
const {
  viewCategories,
  addCategory,
  editCategory,
} = require("../../controllers/control_admin/control_category");

router.get("/", viewCategories);
router.post("/", addCategory);
router.put("/", editCategory);

module.exports = router;
