-- migrations/008_addresses.sql
-- Wikindoam schema – addresses

CREATE TABLE addresses (
    id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID        REFERENCES users(id) ON DELETE CASCADE,
    label      TEXT,
    country    TEXT        NOT NULL DEFAULT 'Sierra Leone',
    city       TEXT        NOT NULL,
    region     TEXT,
    street     TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
