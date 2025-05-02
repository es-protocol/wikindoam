const { errorMonitor } = require('nodemailer/lib/xoauth2');
const pool = require('../config/db');

exports.createOrder = async (customerId, items) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        //Calculate total
        const total = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
        //insert order
        const orderRes = await client.query(
            `INSERT INTO orders
                (id, customer_id, status, total_amount, currency_code, payment_status)
            VALUES
                (uuid_generate_v4(), $1, 'pending', $2, 'SLL', 'unpaid')
            RETURNING *`,
            [customerId, total]
        );
        const order = orderRes.rows[0];

        //insert each item
        const insertedItems = [];
        for (let {productId, quantity} of items) {
            //Fetch price
            const priceRes = await client.query(
                `SELECT price FROM products WHERE id = $1`,
                [productId]
            );
            const unit_price = priceRes.rows[0].price;
            const itemRes = await client.query(
                `INSERT INTO order_items
                    (id, order_id, product_id, store_id, quantity, unit_price)
                VALUES
                    (uuid_generate_v4(), $1, $2,
                    (SELECT store_id FROM products WHERE id = $2),
                    $3, $4)
                RETURNING *`,
                [order.id, productId, quantity, unit_price]
            );
            insertedItems.push(itemRes.rows[0]);
        }
        
        await client.query('COMMIT');
        return {order, items: insertedItems};
    } catch(err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};