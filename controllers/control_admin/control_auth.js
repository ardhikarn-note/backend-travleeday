const modelUser = require("../../models/model_user");
const bcrypt = require("bcryptjs");

module.exports = {
  // akan ke halaman login
  handleUser: async (req, res) => {
    try {
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const title = "Travleeday | Login";
      if (req.session.user === null || req.session.user === undefined) {
        res.render("index", {
          alert,
          title,
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/login");
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await modelUser.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User is not Found, Create Account First");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/login");
      }
      const checkPass = await bcrypt.compare(password, user.password); // cek password
      if (!checkPass) {
        // if checkpass === false
        req.flash("alertMessage", "Those Password is wrong. Try again !");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/login");
      }
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/login");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
  },
};
