module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard");
  },
  viewCategories: (req, res) => {
    res.render("admin/categories/view_categories");
  },
  viewBanks: (req, res) => {
    res.render("admin/banks/view_banks");
  },
  viewItems: (req, res) => {
    res.render("admin/items/view_items");
  },
};
