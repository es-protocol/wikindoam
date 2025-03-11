Project Overview

Wikindoam is an e-commerce platform aimed to be deployed in Bo, Sierra Leone, the first of its kind in the country. This backend implementation serves the dynamic routing for the platform. This submission focuses on the backend setup and routing for serving product details dynamically, as well as static routes like the homepage, login page, and FAQ page.

While the database setup is configured and the product data is available, it is not part of this submission. The main goal is to focus on the backend routing and functionality for dynamically rendering product pages and serving other static pages.

Submission Details

Assignment: Hand-in 2/4 (Backend - Dynamic Routes)

Deadline: March 11, 2025, 16:59

Requirements Covered:

A web backend with at least three different routes including:

Static routes (e.g., homepage, FAQ, etc.).

A dynamic route for serving product details (/products/:id).

The dynamic route allows users to access product details dynamically based on the product ID (e.g., /products/1, /products/2).

## Folder Structure
```frontend/
├── css/
│   ├── styles.css
    ├── stylesproduct.css
├── index.html
├── landingpage.html
├── login.html
├── faq.html
├── product.html
├── images/
├── js/
│   └── script.js
── css/
    └── styles.css
    └── stylesproduct.css
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   ├── homeroutes.js
│   │   └── productRoutes.js
│   ├── services/
│   └── server.js
└── .env
└── package.json
└── README.md```

How to Set Up and Run the Project
1. Clone the Repository
To get started, clone the repository to your local machine:
git clone https://github.com/yourusername/wikindoam.git

cd wikindoam

2. Install Dependencies
Run the following command to install all required dependencies:

npm install
3. Run the Server
Once the dependencies are installed, start the backend server using nodemon (for automatic reloading during development):

node server.js
4. Access the Application
With the server running, you can visit the following URLs:

Homepage: http://localhost:5000/
Product Details (Dynamic Route): http://localhost:5000/products/:id
Example: http://localhost:5000/products/1 will fetch the details for the product with ID 1.

5. Testing Product Route
To test the product route:

Ensure your backend is running.
Navigate to a URL like http://localhost:5000/products/1 to view product details.

Routes
1. / (Homepage)
This is the landing page of the website, where users can get an introduction to the platform and see featured products or links to product pages.

2. /products/:id (Dynamic Route)
This dynamic route serves product details based on the product’s unique ID. This allows for multiple product pages to be served by a single route function.

Example: /products/1 will serve the details for the product with ID 1.
Data returned includes the product's name, description, price, stock quantity, and image.
3. /signup (Signup Page)
The signup page for users to create an account. This page contains a form that, when filled out, sends data to the backend for account creation (though the backend functionality is not required for this submission).

4. /login (Login Page)
The login page allows users to log in to the platform using their credentials (though backend authentication logic is not required for this submission).

5. /faq (FAQ Page)
The FAQ page provides answers to common questions about the platform and how to use it.

Important Notes
1. Database Setup
Although the database is set up and the PostgreSQL database is connected, it is not part of this submission. The focus of this hand-in is on the backend routing for serving product details dynamically.

For testing the product route, ensure the products table is populated with test data. Here's an example query to insert a product:


INSERT INTO products (name, description, price, stock_quantity, store_id, image)
VALUES ('Nido Powdered Milk', 'Delicious Premium Powdered Milk', 10.00, 100, 1, 'images/Nido_Milk.webp');

2. Testing Dynamic Routes
The dynamic route for products (/products/:id) works by fetching the product data based on the product ID in the URL. To test this:

Ensure the backend is running and the database is populated with product data.

Access the route with a product ID, for example:

bash
http://localhost:5000/products/1
This will fetch the product details for the product with ID 1.

