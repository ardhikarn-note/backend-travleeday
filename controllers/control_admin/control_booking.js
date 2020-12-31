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
      res.redirect("/admin/bookings");
    }
  },

  detailBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { msg: alertMsg, status: alertStatus };
      const booking = await modelBooking
        .findOne({ _id: id })
        .populate("memberId")
        .populate("bankId");
      const title = "Travleeday | Detail Booking";
      res.render("admin/bookings/detail_booking", {
        title,
        user: req.session.user,
        booking,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/bookings");
    }
  },

  confirmBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await modelBooking.findOne({ _id: id });
      booking.payments.status = "Confirmed";
      await booking.save();
      req.flash("alertMessage", "Successfully confirmation booking");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    } catch (error) {
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    }
  },

  rejectBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await modelBooking.findOne({ _id: id });
      booking.payments.status = "Rejected";
      await booking.save();
      req.flash("alertMessage", "Successfully reject booking");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    } catch (error) {
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    }
  },

  processBooking: async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await modelBooking.findOne({ _id: id });
      booking.payments.status = "Process";
      await booking.save();
      req.flash("alertMessage", "Successfully process booking");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    } catch (error) {
      res.redirect(`/admin/bookings/detail-booking/${id}`);
    }
  },
};
