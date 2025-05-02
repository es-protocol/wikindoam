-- migrations/009_inventory_logs.sql
-- Wikindoam schema – inventory change log

CREATE TABLE inventory_logs (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    change_qty  INT         NOT NULL,
    reason      TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
