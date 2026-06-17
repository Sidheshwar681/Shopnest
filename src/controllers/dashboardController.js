const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { Sequelize } = require("sequelize");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalProducts = await Product.count();

    const totalOrders = await Order.count();

    const revenue =
      (await Order.sum("total_amount")) || 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};