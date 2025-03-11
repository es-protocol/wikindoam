const express = require('express');
const pool = require('../config/db');  // Import the pool object from db.js to connect to the database
const router = express.Router();  // Initialize the express router

// Dynamic route for product details
router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;  // Extract product ID from the URL

    try {
        // Query to fetch the product from the database using the product ID
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

        // Check if the product exists
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = result.rows[0]; // Extract the product from the result
        res.json({ message: `Fetching details for ${product.name}`, product }); // Return product details
    } catch (err) {
        console.error("Error fetching product details:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;  // Export the router to be used in other files
