-- migrations/004_product_categories.sql
-- Wikindoam schema – product ↔ category many‑to‑many

CREATE TABLE product_categories (
    product_id  UUID NOT NULL REFERENCES products(id)  ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);
