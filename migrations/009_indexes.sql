-- migrations/009_indexes.sql
-- Wikindoam schema – useful indexes

-- store lookup on products
CREATE INDEX IF NOT EXISTS idx_products_store_id
    ON products(store_id);

-- Text-search on products
CREATE INDEX IF NOT EXISTS idx_products_name_trgm
    ON products USING GIN (name gin_trgm_ops);

-- customer lookup on products
CREATE INDEX IF NOT EXISTS idx_orders_customer_id
    ON orders(customer_id);

-- Order-Item lookup
CREATE INDEX IF NOT EXISTS idx_order_items_order_id
    ON order_items(order_id);
