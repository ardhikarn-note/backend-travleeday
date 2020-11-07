const modelBooking = require("../../models/model_booking");
const modelMember = require("../../models/model_member");
const modelBank = require("../../models/model_booking");

module.exports = {
  viewBookings: async (req, res) => {
    try {
      const booking = await modelBooking
        .find()
        .populate("memberId")
        .populate("bankId");
      const title = "Travleeday | Bookings";
      res.render("admin/bookings/view_bookings", {
        title,
        user: req.session.user,
        booking,
      });
    } catch (error) {}
  },
};
