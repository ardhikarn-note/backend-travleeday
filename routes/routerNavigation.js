const router = require("express").Router();

const routeDashboard = require("./route_admin/route_dashboard");
const routeCategory = require("./route_admin/route_category");
const routeBank = require("./route_admin/route_bank");
const routeItem = require("./route_admin/route_item");
const routeBooking = require("./route_admin/route_booking");
const routeDetailItem = require("./route_admin/route_detail_item");
const routeAuth = require("./route_admin/route_auth");

// middleware
router.use("/admin/dashboard", routeDashboard);
router.use("/admin/categories", routeCategory);
router.use("/admin/banks", routeBank);
router.use("/admin/items", routeItem);
router.use("/admin/items/detail-item", routeDetailItem);
router.use("/admin/bookings", routeBooking);
router.use("/admin", routeAuth);

module.exports = router;
