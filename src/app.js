const express = require("express");
// const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ShopNest API Running",
  });
});
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);
const cartRoutes = require("./routes/cartRoutes");  
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/admin/dashboard", dashboardRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// const categoryRoutes = require("./src/routes/categoryRoutes");

// app.use("/api/categories", categoryRoutes);

module.exports = app;