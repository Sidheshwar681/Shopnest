const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;

    const review = await Review.create({
      user_id: req.user.id,
      product_id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        product_id: req.params.productId,
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};