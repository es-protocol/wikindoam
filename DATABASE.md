Wikindoam

A digital marketplace platform to support local entrepreneurs in Sierra Leone. Built with Node.js, Express, and PostgreSQL.


Table of Contents

Features

Use Cases

Prerequisites

Installation

Environment Variables

Database Setup

Seeding Data

Data Volume

Entity-Relationship Model

Running the Application

Default Store Credentials

Directory Structure

Team Contribution



Features

User signup & login with JWT authentication

CRUD for products (create, read, update, delete)

Browse and search products

Vendor dashboard for product uploads


Use Cases

User Registration & Authentication (Implemented)

Users can sign up, log in, and receive a JWT for protected actions.

Product Management (Implemented)

Store owners can create, view, edit, and delete products via UI or API.

Product Listing (Implemented)

Vendor Dashboard (Implemented)

A simple interface for store owners to upload products.

Order Placement & Checkout (Not Yet Implemented)

Planned: users can place orders and track status.

Category Browsing (Planned)

Filter products by category (food, electronics, fashion, home-living).


Prerequisites

Node.js v14 or higher

npm v6 or higher

PostgreSQL v12 or higher



Installation

Clone the repository:
git clone https://github.com/es-protocol/wikindoam.git
cd wikindoam

Install dependencies:
npm install

Environment Variables

Create a .env file in the project root with these keys:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=wikindoam_dev
DB_PASS=******
DB_PORT=5432
JWT_SECRET=******

Database Setup

You can either connect to an existing database or create a fresh local development database:

Option A: Connect to an existing database

Ensure PostgreSQL is running and your .env points to that database.

Skip to schema & seeds below.

Option B: Create a new development database locally

In psql or pgAdmin, run:
CREATE DATATBASE wikindoam_Dev

Schema & Seed ScriptsRun these against your target database:
psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f src/schema/init.sql
psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f src/seeds/001_initial_data.sql

Replace $DB_USER, $DB_HOST, and $DB_NAME from your .env

Seeding Data

The seed script (001_initial_data.sql) populates:

2 users (customer & merchant)

1 store (Bobbilo Enterprise)

3 categories

1 sample product

Additional products can be added via the vendor dashboard("vendor.html") or custom seed.



API Endpoints

Here are the core REST API endpoints supporting CRUD and search operations for products:

Method          Endpoint                    Description

GET             /api/products               List all products

GET             api/products/:id            Fetch a single product by its ID

POST            /api/products               Create a new product (body: JSON product)

PUT             /api/products/:id           Update an existing product by ID

DELETE          /api/products/:id           Delete a product by ID

GET             /api/products/search?term=  Search products by name or description

Example: Create Product

Request
POST /api/products
Content-Type: application/json

{
  "id": "<uuid>",
  "name": "New Item",
  "description": "Item description",
  "price": 9.99,
  "stock_quantity": 50,
  "store_id": "<store_uuid>",
  "image_url": "item.jpg"
}

Response
{
  "product": {
    "id": "<uuid>",
    "name": "New Item",
    "description": "Item description",
    "price": "9.99",
    "stock_quantity": 50,
    "store_id": "<store_uuid>",
    "image_url": "item.jpg",
    "created_at": "2025-04-27T12:00:00.000Z"
  }
}


Running the Application

Start in development mode:
npm run start

Homepage: http://localhost:5000/

Vendor Dashboard: http://localhost:5000/vendor

Signup: http://localhost:5000/signup

Login: http://localhost:5000/login


Default Store Credentials

Store: Bobbilo Enterprise

Owner: bob@store.com (merchant user)

Password: as per seed script (or sign up via UI)