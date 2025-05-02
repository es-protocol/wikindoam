-- migrations/012_nullable_phone.sql
-- Allow phone to be NULL at signup

ALTER TABLE users
    ALTER COLUMN phone DROP NOT NULL;
