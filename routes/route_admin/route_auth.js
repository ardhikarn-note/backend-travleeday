const router = require("express").Router();
const { route } = require("..");
const {
  handleUser,
  login,
} = require("../../controllers/control_admin/control_auth");
const { authUser } = require("../../middlewares/auth");

router.get("/login", handleUser);
router.post("/login", login);
router.use(authUser);

module.exports = router;
