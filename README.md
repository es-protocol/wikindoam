Project Overview

# Wikindoam

## Project Overview

Wikindoam is a pioneering e-commerce platform designed for Bo, Sierra Leone. This MVP implements a robust backend powered by Node.js and Express to serve both dynamic content and static pages. The application demonstrates dynamic routing for product details and offers a complete RESTful API for product data management. Note that while all static pages (e.g., homepage, signup, login, FAQ) are fully created, they are not connected to the database—the signup form, for example, is static. For testing the full CRUD and other database functionalities, please use an API testing tool such as Postman.

## Features

- **Dynamic Routing:**  
  - Serve product details using a dynamic route (e.g., `/products/:id`).
- **Static Pages:**  
  - Homepage, Signup, Login, and FAQ pages are built as static pages.
- **Product API:**  
  Fully functional RESTful API for managing products:
  - **Create:** POST `/api/products`
  - **Read All:** GET `/api/products`
  - **Read One:** GET `/api/products/:id`
  - **Update:** PUT `/api/products/:id`
  - **Delete:** DELETE `/api/products/:id`
  - **Search:** GET `/api/products/search?term=...` (optional)
- **Modular Architecture:**  
  - Separation of concerns through dedicated Models, Controllers, and Routes.
- **Security & Performance Enhancements:**  
  - Helmet for secure HTTP headers, rate limiting to prevent abuse, and CORS support for cross-origin requests.

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
│   ├── └── config.js
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── └── productController.js

│   ├──middleware
│   ├── └── authMiddleware.js

│   ├── models
│   ├── └── product-models.js

│   ├── routes/
│   │   ├── homeroutes.js
│   │   └── productRoutes.js
│   ├── services/
│   ├──    └── userService.js
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

Routes
1. / (Homepage)
This is the landing page of the website, where users can get an introduction to the platform and see links to other pages.

2. /products/:id (Dynamic Route)
This dynamic route serves product details based on the product’s unique ID. This allows for multiple product pages to be served by a single route function.

Example: /products/1 will serve the details for the product with ID 1.
Data returned includes the product's name, description, price, stock quantity, and image.

3. /signup (Signup Page)
The signup page for users to create an account. This page contains a form that, when filled out, sends data to the backend for account creation (though the backend functionality is not required for this submission).

4. /login (Login Page)
The login page allows users to log in to the platform using their credentials (To be completed).

5. /faq (FAQ Page)
The FAQ page provides answers to common questions about the platform and how to use it.

Access the Application:

Homepage: http://localhost:5000/

Static Pages:

Signup: http://localhost:5000/signu

FAQ: http://localhost:5000/faq

Dynamic Product Detail Page:
e.g., http://localhost:5000/products/1 shows the detail page for product with ID 1.

API ENDPOINTS
All product-related API endpoints are mounted under /api/products:

Create a Product:
POST http://localhost:5000/api/products

Payload Example:
{
  "id": 65,
  "name": "Test Product",
  "description": "This is a test product",
  "price": "19.00",
  "stock_quantity": 50,
  "store_id": 1,
  "image": "test-product.jpg"
}

Retrieve All Products:
GET http://localhost:5000/api/products

Retrieve a Single Product:
GET http://localhost:5000/api/products/65

Update a Product:
PUT http://localhost:5000/api/products/65

Delete a Product:
DELETE http://localhost:5000/api/products/65

Testing the API
Since the static pages (including the signup form) are built as client-side files and are not connected to the database, all CRUD operations and database functionalities must be tested via an API tool like Postman. Follow these steps:

Open Postman and create a new collection for the Wikindoam API.

Add Requests for each endpoint using the examples provided above.

Verify the Responses to ensure that the API behaves as expected.

Review Server Logs to confirm operations and troubleshoot any issues.

Technology Stack
Backend: Node.js, Express

Database: PostgreSQL

Security: Helmet, express-rate-limit, CORS

Development: Nodemon (for live reloading)

Deployment: Local, with potential deployment on Render

Final Notes
Wikindoam is a robust, modular backend solution designed to support an innovative e-commerce platform in Sierra Leone. This MVP demonstrates dynamic product routing and complete RESTful API functionality for managing products. While static pages like the signup, login, and FAQ are fully implemented, all database interactions for CRUD operations must be conducted via API testing tools. This approach provides a strong foundation for future enhancements and full integration with a user interface.
