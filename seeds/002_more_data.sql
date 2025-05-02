-- seeds/002_more_data.sql
-- Seed a single order, its item, and the inventory log for Alice

-- 1) Order + order_item
WITH  
    prod AS (
        SELECT
            id           AS product_id,
            store_id     AS store_id,
            price        AS unit_price
        FROM products
        WHERE name ILIKE '%classic%shirt%'
),
ord AS (
    INSERT INTO orders (
        id, customer_id, status, total_amount, currency_code, payment_status
    )
    SELECT
        uuid_generate_v4(),
        u.id,
        'confirmed',
        prod.unit_price * 2,
        'SLL',
        'unpaid'
    FROM prod
    JOIN users u ON u.email = 'alice@example.com'
    RETURNING id AS order_id
)
INSERT INTO order_items (
    id, order_id, product_id, store_id, quantity, unit_price
)
SELECT
    uuid_generate_v4(),
    ord.order_id,
    prod.product_id,
    prod.store_id,
    2,
    prod.unit_price
FROM ord, prod;

-- 2) Inventory log
-- 2) Inventory log – single‐statement version
INSERT INTO inventory_logs (id, product_id, change_qty, reason)
SELECT
    uuid_generate_v4(),
    p.id,
    -2,
    'Order placement'
FROM products p
WHERE p.name ILIKE '%classic%shirt%';   -- loose match, no CTE needed
