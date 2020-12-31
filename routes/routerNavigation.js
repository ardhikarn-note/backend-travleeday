const router = require("express").Router();

// ADMIN
const routeDashboard = require("./route_admin/route_dashboard");
const routeCategory = require("./route_admin/route_category");
const routeBank = require("./route_admin/route_bank");
const routeItem = require("./route_admin/route_item");
const routeBookingAdmin = require("./route_admin/route_booking");
const routeDetailItem = require("./route_admin/route_detail_item");
const routeAuth = require("./route_admin/route_auth");

// API-TRAVLEEDAY
const routeLandingPage = require("./route_travleeday/route_landing_page");
const routeDetailPage = require("./route_travleeday/route_detail_page");
const routeBookingApi = require("./route_travleeday/route_booking");

// middleware Admin
router.use("/dashboard", routeDashboard);
router.use("/categories", routeCategory);
router.use("/banks", routeBank);
router.use("/items", routeItem);
router.use("/items/detail-item", routeDetailItem);
router.use("/bookings", routeBookingAdmin);
router.use("/", routeAuth);

// middleware API-Travleeday
router.use("/landing-page", routeLandingPage);
router.use("/detail-page", routeDetailPage);
router.use("/booking-page", routeBookingApi);

module.exports = router;
