const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

router.get(
  "/admin/all",
  authMiddleware,
  orderController.getAllOrders
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
  authMiddleware,
  orderController.updateOrderStatus
);

module.exports = router;