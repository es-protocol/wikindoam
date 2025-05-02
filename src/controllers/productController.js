const productModel = require("../models/product-models")

//create a new product
exports.createProduct = async (req, res) => {
    console.log("Received update payload"); //for debugging purposes
    try {
        const productData = req.body;
        const newProduct = await productModel.createProduct(productData);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({error: "Failed to create product"});
    }
};

//Retrieve all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({error: "Failed to retrieve products"});
    }
};

//Retrieve a single product by ID
exports.getProductByID = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductByID(productId);
        if(!product) {
            return res.status(404).json({ error: "Product not found!"});
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product by ID:", error);
        return res.status(500).json({ error: "Failed to retrieve product"});
    }
};

//Update an Existing Product
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProduct = await productModel.updateProduct(productId, productData);
        if(!updatedProduct) {
            return res.status(404).json({ error: "Product not found for update"});
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product"});
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.deleteProduct(productId);
        if(!deletedProduct) {
            return res.status(404).json({ error: "Product not found for deletion"});
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product"});
    }
};

// Search product by name or description
exports.searchProducts = async (req, res) => {
    try {
        // Assume the search term is provided as a query parameter (e.g., ?term=someValue)
        const searchTerm = req.query.term;
        const products = await productModel.searchProducts(searchTerm);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error searching for products", error);
        return res.status(500).json({ error: "Failed to search products"});
    }
};