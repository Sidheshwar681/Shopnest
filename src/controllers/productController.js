const Product = require("../models/Product");
const { Op } = require("sequelize");

exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const categoryId = req.query.categoryId;

    const offset = (page - 1) * limit;

    const whereClause = {
      is_active: true,
    };

    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (categoryId) {
      whereClause.category_id = categoryId;
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    res.json({
      total: products.count,
      page,
      pages: Math.ceil(products.count / limit),
      products: products.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//update product

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.update(req.body);

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//get products by  category

//const { Product } = require("../models");

exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const products = await Product.findAll({
      where: {
        category_id: id
      }
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error("Get Products By Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products by category",
      error: process.env.NODE_ENV === "development"
        ? error.message
        : undefined
    });
  }
};