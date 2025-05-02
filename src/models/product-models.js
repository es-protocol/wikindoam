const pool = require('../config/db');

// Create - Add a new product to the database
exports.createProduct = async (productData) => {
    // SQL to insert a new product
    const query = `
    INSERT INTO products (
        id,
        name,
        description,
        price,
        stock_quantity,
        store_id,
        created_at,
        image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
    RETURNING *`;


    // Actual value that replaces the placeholders in the model
    const values = [
        productData.id,
        productData.name,
        productData.description,
        productData.price,
        productData.stock_quantity,
        productData.store_id,
        productData.image
    ];

    //Run the query and return the newly created product
    const result = await pool.query(query, values);
    return result.rows[0];
};

//Read Operation - Get all products
exports.getAllProducts = async () => {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};


//Read Operation - Get products by ID
exports.getProductByID = async (productId) => {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pool.query(query, [productId]);

    //if product is non-existent, return nul
    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}; 


//UPDATE - update/Edit a product
exports.updateProduct = async (productId, productData) => {
    const query = `
    UPDATE products
    SET
        name = $1,
        description = $2,
        price = $3,
        stock_quantity = $4,
        store_id = $5,
        updated_at = NOW(),
        image_url = $6
    WHERE id = $7
    RETURNING *`;

    const values = [
        productData.name,
        productData.description,
        productData.price,
        productData.stock_quantity,
        productData.store_id,
        productData.image,
        productId
    ];

    //Run the query and return the updated product
    const result = await pool.query(query, values);

    //If no product found to update, return null
    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

//Delete - Delete a product

exports.deleteProduct = async (productId) => {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [productId]);

    //if product is non-existent return null
    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

//SEARCH - search products by name or description 
//Ive not really tested this that is why I will probably omit it from the submission
exports.searchProducts = async (searchTerm) => {
    const query = `
    SELECT * FROM products
    WHERE
        name ILIKE $1 OR
        description ILIKE $1
        ORDER BY created_at DESC`;

    //Matching anything before or after the search term using % wildcard
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
};



