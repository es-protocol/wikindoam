const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express(); //Initial express application
const userRouter = require("./src/routes/users");
const homeRoutes = require("./src/routes/homeroutes");
const productsRoutes = require("./src/routes/productRoutes"); //ask Ava in class, i renamed this file to productRoutes
                                                            //Why is the lower case form working but not the upper case?

//Serve static files
app.use(express.static(path.join(__dirname, "frontend")));

//Middleware setup
app.use(cors());//enable cors for cross origin request
app.use(express.json());//parse or review incoming json requests

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

// Catch-all 404 errors for any undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

