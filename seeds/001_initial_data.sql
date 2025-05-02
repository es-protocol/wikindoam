-- seeds/001_initial_data.sql
-- Initial seed: users, store, categories, sample product & link

-- 1) Users
INSERT INTO users (id, full_name, email, phone, password_hash, user_role)
VALUES
    (uuid_generate_v4(), 'Alice Customer', 'alice@example.com', '232-77-000000', 'dummyhash123', 'customer'),
    (uuid_generate_v4(), 'Bob Merchant',  'bob@store.com',     '232-78-000001', 'dummyhash456', 'merchant');

-- 2) Store owned by Bob
INSERT INTO stores (id, owner_user_id, name, description, phone, address)
VALUES
(
    uuid_generate_v4(),
    (SELECT id FROM users WHERE email='bob@store.com'),
    'Bob''s Goods',
    'Quality items made locally',
    '232-78-000001',
    'Freetown'
);

-- 3) Categories
INSERT INTO categories (id, name, slug)
VALUES
    (uuid_generate_v4(), 'Clothing',    'clothing'),
    (uuid_generate_v4(), 'Electronics', 'electronics'),
    (uuid_generate_v4(), 'Home & Kitchen', 'home-kitchen');

-- 4) A sample product
INSERT INTO products (id, store_id, name, description, price, stock_quantity, image_url)
VALUES
(
    uuid_generate_v4(),
    (SELECT id FROM stores WHERE name='Bob''s Goods'),
    'Classic T‑Shirt',
    '100% cotton, multiple colors',
    15.00,
    200,
    'https://example.com/images/tshirt.jpg'
);

-- 5) Link that product to a category
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p
JOIN categories c ON c.slug='clothing'
WHERE p.name='Classic T‑Shirt';
