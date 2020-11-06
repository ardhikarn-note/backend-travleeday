const router = require("express").Router();
const {
  viewCategories,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../../controllers/control_admin/control_category");
const auth = require("../../middlewares/auth");

router.use(auth);
router.get("/", viewCategories);
router.post("/", addCategory);
router.put("/", editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
