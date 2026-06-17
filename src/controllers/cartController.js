const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    const existingItem = await CartItem.findOne({
      where: {
        user_id: req.user.id,
        product_id,
      },
    });

    if (existingItem) {
      existingItem.quantity += quantity;

      await existingItem.save();

      return res.json(existingItem);
    }

    const item = await CartItem.create({
      user_id: req.user.id,
      product_id,
      quantity,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findOne({
      where: {
        user_id: req.user.id,
        product_id: req.params.productId,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    item.quantity = req.body.quantity;

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const item = await CartItem.findOne({
      where: {
        user_id: req.user.id,
        product_id: req.params.productId,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await item.destroy();

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await CartItem.destroy({
      where: {
        user_id: req.user.id,
      },
    });

    res.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};