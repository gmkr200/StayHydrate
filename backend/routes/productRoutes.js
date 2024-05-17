const express = require("express");
const router = express.Router();
// const { isAuthorized } = require("../middleware/auth.js");

const productController = require("../controllers/productController");

// Route for getting all products
router.get("/", productController.fetchProducts);

// Route for getting a single product by ID
router.get("/:id", productController.getProductById);

// Route for adding a new product
router.post("/", productController.addProduct);

// Route for updating a product by ID
router.put("/:id", productController.updateProductById);

// Route for deleting a product by ID
router.delete("/:id", productController.deleteProductById);

// Route to get products by category
router.get("/category/:category", productController.getProductsByCategory);

module.exports = router;
