const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express(); //Initial express application
app.disable('x-powered-by');
const userRouter = require("./src/routes/users");
const homeRoutes = require("./src/routes/homeroutes");
const productsRoutes = require("./src/routes/productRoutes");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15min
    max: 100, //limit each ip to 100 requests per window
    message: "Too man requests from this IP, please try again after 15 minutes"
});

//Serve static files
app.use(express.static(path.join(__dirname, "frontend")));

//Middleware setup
app.use(cors());//enable cors for cross origin request
app.use(express.json());//parse or review incoming json requests
app.use(limiter);
app.use(helmet());//help protect against common http vulnerabilities
//clickjacking(x-frame-option), blocksniffing(x-content-type) etc

app.use(helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "https://cdnjs.cloudflare.com"], 
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "img-src": ["'self'", "data:", "https:"],
            "connect-src": ["'self'"],
        },
    })
);

app.get('/api/test-route', (req, res) => {
    res.json({ working: true });
});

//Mount user, home & product routes
app.use("/users", userRouter);
app.use('/', homeRoutes);
app.use("/", productsRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Serve static product detail page
app.get("/products/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "product.html"));
});

// Catch-all 404 errors for any undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

