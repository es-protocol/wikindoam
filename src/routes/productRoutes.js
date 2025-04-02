const express = require('express');
const pool = require('../config/db'); // Database connection pool
const router = express.Router();


//API route, returns a single product details in json base on parameters
router.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        // Fetch product from the database
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

        // Handle case where no product is found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Extract product data from result
        const product = result.rows[0];

        // Normalize image path (prepend public route for static files)
        product.image = `/images/${product.image.replace(/^.*[\\/]/, '')}`;

        // Respond with product data
        res.json({ message: `Fetching details for ${product.name}`, product });
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @route   GET /api/products
 * @desc    Fetch all products from the database
 * @access  Public
 */
router.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        // Normalize image paths for each product
        const products = result.rows.map(product => {
            product.image = `/images/${product.image.replace(/^.*[\\/]/, '')}`;
            return product;
        });
        res.json({ products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
