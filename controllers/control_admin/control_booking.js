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
    } catch (error) {
      res.redirect("/admin/booking");
    }
  },

  detailBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await modelBooking
        .findOne({ _id: id })
        .populate("memberId")
        .populate("bankId");
      console.log(booking);
      const title = "Travleeday | Detail Booking";
      res.render("admin/bookings/detail_booking", {
        title,
        user: req.session.user,
        booking,
      });
    } catch (error) {}
  },
};
