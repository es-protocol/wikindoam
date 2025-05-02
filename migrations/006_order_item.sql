-- migrations/006_order_items.sql
-- Wikindoam schema – order items

CREATE TABLE order_items (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id    UUID        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id  UUID        NOT NULL REFERENCES products(id),
    store_id    UUID        NOT NULL REFERENCES stores(id),
    quantity    INT         NOT NULL CHECK (quantity > 0),
    unit_price  NUMERIC(12,2) NOT NULL,
    total_price NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);
