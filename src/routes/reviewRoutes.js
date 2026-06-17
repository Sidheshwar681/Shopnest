const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.post(
  "/",
  authMiddleware,
  reviewController.createReview
);

router.get(
  "/product/:productId",
  reviewController.getProductReviews
);

module.exports = router;