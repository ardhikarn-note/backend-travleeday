module.exports = {
  viewBookings: (req, res) => {
    const title = "Travleeday | Bookings";
    res.render("admin/bookings/view_bookings", {
      title,
      user: req.session.user,
    });
  },
};
