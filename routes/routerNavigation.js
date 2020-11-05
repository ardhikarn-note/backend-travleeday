const router = require("express").Router();

const routeDashboard = require("./route_admin/route_dashboard");
const routeCategory = require("./route_admin/route_category");
const routeBank = require("./route_admin/route_bank");
const routeItem = require("./route_admin/route_item");
const routeBooking = require("./route_admin/route_booking");
const routeActivity = require("./route_admin/route_activity");

// middleware
router.use("/admin/dashboard", routeDashboard);
router.use("/admin/categories", routeCategory);
router.use("/admin/banks", routeBank);
router.use("/admin/items", routeItem);
router.use("/admin/items/detail-item", routeActivity);
router.use("/admin/bookings", routeBooking);

module.exports = router;
