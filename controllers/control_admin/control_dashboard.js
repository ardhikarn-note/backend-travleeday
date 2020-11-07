const modelMember = require("../../models/model_member");
const modelItem = require("../../models/model_item");
const modelBooking = require("../../models/model_booking");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const member = await modelMember.find();
      const booking = await modelBooking.find();
      const item = await modelItem.find();
      const title = "Travleeday | Dashboard";
      res.render("admin/dashboard/view_dashboard", {
        title,
        user: req.session.user,
        member,
        booking,
        item,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },
};
