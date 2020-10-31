module.exports = {
  viewDashboard: (req, res) => {
    const title = "Travleeday | Dashboard";
    res.render("admin/dashboard/view_dashboard", { title });
  },
};
