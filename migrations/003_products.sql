-- migrations/003_products.sql
-- Wikindoam schema – products

CREATE TABLE products (
    id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id       UUID        NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name           TEXT        NOT NULL,
    description    TEXT,
    price          NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    currency_code  CHAR(3)     NOT NULL DEFAULT 'SLL',
    stock_quantity INT         NOT NULL CHECK (stock_quantity >= 0),
    image_url      TEXT,
    is_active      BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
