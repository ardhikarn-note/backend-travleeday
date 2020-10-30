module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard");
  },
  viewCategories: (req, res) => {
    res.render("admin/categories/view_categories");
  },
};
