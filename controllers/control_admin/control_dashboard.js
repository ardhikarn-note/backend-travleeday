module.exports = {
  viewDashboard: (req, res) => {
    try {
      const title = "Travleeday | Dashboard";
      res.render("admin/dashboard/view_dashboard", {
        title,
        user: req.session.user,
      });
    } catch (error) {}
  },
};
