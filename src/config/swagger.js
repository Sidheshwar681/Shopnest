const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopNest API",
      version: "1.0.0",
      description: "E-Commerce Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register User",
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Login User",
        },
      },

      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Current User Profile",
        },
      },

      "/api/categories": {
        get: {
          tags: ["Categories"],
          summary: "Get All Categories",
        },
        post: {
          tags: ["Categories"],
          summary: "Create Category",
        },
      },

      "/api/categories/{id}": {
        get: {
          tags: ["Categories"],
          summary: "Get Category By Id",
        },
        put: {
          tags: ["Categories"],
          summary: "Update Category",
        },
        delete: {
          tags: ["Categories"],
          summary: "Delete Category",
        },
      },

      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get Products",
        },
        post: {
          tags: ["Products"],
          summary: "Create Product",
        },
      },

      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get Product By Id",
        },
        put: {
          tags: ["Products"],
          summary: "Update Product",
        },
        delete: {
          tags: ["Products"],
          summary: "Delete Product",
        },
      },

      "/api/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get Cart",
        },
        post: {
          tags: ["Cart"],
          summary: "Add To Cart",
        },
        delete: {
          tags: ["Cart"],
          summary: "Clear Cart",
        },
      },

      "/api/cart/{productId}": {
        put: {
          tags: ["Cart"],
          summary: "Update Cart Item",
        },
        delete: {
          tags: ["Cart"],
          summary: "Remove Cart Item",
        },
      },

      "/api/orders": {
        post: {
          tags: ["Orders"],
          summary: "Create Order",
        },
        get: {
          tags: ["Orders"],
          summary: "Get User Orders",
        },
      },

      "/api/orders/{id}": {
        get: {
          tags: ["Orders"],
          summary: "Get Order Details",
        },
      },

      "/api/reviews": {
        post: {
          tags: ["Reviews"],
          summary: "Create Review",
        },
      },

      "/api/reviews/product/{productId}": {
        get: {
          tags: ["Reviews"],
          summary: "Get Product Reviews",
        },
      },

      "/api/admin/dashboard": {
        get: {
          tags: ["Dashboard"],
          summary: "Admin Dashboard Statistics",
        },
      },
    },
  },

  apis: [],
};

module.exports = swaggerJsdoc(options);