const authUser = (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash(
      "alertMessage",
      "Your Session has timed out. Please login again !"
    );
    req.flash("alertStatus", "danger");
    res.redirect("/admin/login");
  } else {
    next();
  }
};

module.exports = authUser;
