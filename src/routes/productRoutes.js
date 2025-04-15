const express = require('express');
const pool = require('../config/db'); // Database connection pool
const router = express.Router();
const productController = require("../controllers/productController");

//create a new product
router.post("/", productController.createProduct);

//Retrieve all products
router.get("/", productController.getAllProducts);

//Retrieve a single product by ID
router.get("/:id", productController.getProductByID);

//Update a product by ID
router.put("/:id", productController.updateProduct);

//Delete product by ID
router.delete("/:id", productController.deleteProduct);

//Search for products
router.get("/search", productController.searchProducts);

module.exports = router;
