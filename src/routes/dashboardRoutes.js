const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const dashboardController = require("../controllers/dashboardController");

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  dashboardController.getDashboard
);

module.exports = router;