const path = require("path");
const router = require("express").Router();
const employeeRoutes = require("./employees");
const memberRoutes = require("./members");
const projectRoutes = require("./projects");
const sessionRoutes = require("./sessions");
const statusRoutes = require("./status");
const teamRoutes = require("./teams");

// Employee routes
router.use("/employees", employeeRoutes);

// Member Routes
router.use("/members", memberRoutes);

// Project Routes
router.use("/projects", projectRoutes);

// Session Routes
router.use("/sessions", sessionRoutes);

// Member Routes
router.use("/statuses", statusRoutes);

// Member Routes
router.use("/teams", teamRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
