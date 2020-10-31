const router = require("express").Router();
const {
  viewCategories,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../../controllers/control_admin/control_category");

router.get("/", viewCategories);
router.post("/", addCategory);
router.put("/", editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
