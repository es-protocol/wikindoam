-- migrations/005_orders.sql
-- Wikindoam schema – orders

CREATE TABLE orders (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id     UUID        NOT NULL
                    REFERENCES users(id),
    status          TEXT        NOT NULL
                    CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
    total_amount    NUMERIC(12,2) NOT NULL,
    currency_code   CHAR(3)     NOT NULL DEFAULT 'SLL',
    payment_status  TEXT        NOT NULL
                    CHECK (payment_status IN ('unpaid','paid','failed','refunded')),
    placed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
