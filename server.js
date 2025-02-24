const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

const userRouter = require("./src/routes/users");

//serve static files
app.use(express.static(path.join(__dirname, "frontend")));

app.use(cors());
app.use(express.json());
app.use("/users", userRouter); // Corrected the route

app.get("/", (req, res) => {
    res.send("Welcome To E-Commerce API!");
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Catch-all route for any undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

