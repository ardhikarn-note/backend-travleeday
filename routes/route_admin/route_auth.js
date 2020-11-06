const router = require("express").Router();
const {
  handleUser,
  login,
} = require("../../controllers/control_admin/control_auth");

router.get("/login", handleUser);
router.post("/login", login);

module.exports = router;
