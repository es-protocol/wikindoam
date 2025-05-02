const pool = require('../config/db');
const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const {customerId, items} = req.body;
        const result = await orderModel.createOrder(customerId, items);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message});
    }
};

exports.getOrdersByCustomer = async (req, res) => {
    try {
        const { customerId } = req.query;
        const { rows } = await pool.query(
            `SELECT
            o.id AS order_id,
            o.placed_at,
            oi.product_id,
            oi.quantity,
            oi.unit_price
        FROM orders o
        JOIN order_items oi ON oi.order_id = o.id
        WHERE o.customer_id = $1`,
        [customerId]
    );
    res.json(rows);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
