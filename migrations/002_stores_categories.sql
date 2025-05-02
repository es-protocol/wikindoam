-- migrations/002_stores_categories.sql
-- Wikindoam schema – stores & categories   (cleaned)

-- ---------- stores ----------
CREATE TABLE stores (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name           TEXT NOT NULL,
    description    TEXT,
    logo_url       TEXT,
    phone          TEXT,
    address        TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- categories ----------
CREATE TABLE categories (
    id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE
);
