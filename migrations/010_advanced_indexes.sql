-- migrations/010_advanced_indexes.sql
-- Advanced indexes: partial & covering for products

-- 1) Partial-index on product names, but only for active products
CREATE INDEX IF NOT EXISTS idx_products_active_name_trgm
    ON products USING GIN(name gin_trgm_ops)
    WHERE is_active = TRUE;

-- 2) Covering index for lookups by store + name + price (only active products)
CREATE INDEX IF NOT EXISTS idx_products_store_name_price
    ON products (store_id, name, price)
    WHERE is_active = TRUE;