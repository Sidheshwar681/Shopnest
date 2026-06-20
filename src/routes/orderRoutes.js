const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

const { authenticate, authorize } =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

router.get(
  "/:id",
  authMiddleware,
  orderController.getOrderById
);

router.put(
  "/:id/status",
  authenticate,
  authorize("admin"),
  orderController.updateOrderStatus
);

module.exports = router;