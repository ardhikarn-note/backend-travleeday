const router = require("express").Router();
const {
  handleUser,
  login,
  logout,
} = require("../../controllers/control_admin/control_auth");

router.get("/login", handleUser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
