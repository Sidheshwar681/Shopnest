const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProductsByCategory
} = require("../controllers/productController");

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:id/products", getProductsByCategory);

router.get("/:id", categoryController.getCategoryById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  categoryController.createCategory
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.deleteCategory
);

module.exports = router;