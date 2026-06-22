const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { shipping_address, payment_method } = req.body;

    const cartItems = await CartItem.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(
        item.product_id
      );

      total +=
        Number(product.price) *
        Number(item.quantity);
    }

    const order = await Order.create({
      user_id: req.user.id,
      total_amount: total,
      shipping_address,
      payment_method,
    });

    for (const item of cartItems) {
      const product = await Product.findByPk(
        item.product_id
      );

      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: product.price,
        subtotal:
          Number(product.price) *
          Number(item.quantity),
      });
    }

    await CartItem.destroy({
      where: {
        user_id: req.user.id,
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [["created_at", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const items = await OrderItem.findAll({
      where: {
        order_id: order.id,
      },
    });

    res.json({
      order,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    await order.update({
      status: req.body.status
    });

    res.json({
      message: "Order status updated",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const User = require("../models/User");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};