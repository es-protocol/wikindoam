-- migrations/001_init.sql
-- wikindoam schema - initial migration (part1)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- for uuid_generate_v4
CREATE EXTENSION IF NOT EXISTS pg_trgm;     --trigram search support

-----------extensiions-----------
-- ---------- users table ----------
CREATE TABLE users (
    id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name     TEXT        NOT NULL,
    email         TEXT        NOT NULL UNIQUE,
    phone         TEXT        NOT NULL UNIQUE,
    password_hash TEXT        NOT NULL,
    user_role     TEXT        NOT NULL CHECK (user_role IN ('customer','merchant','admin')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
