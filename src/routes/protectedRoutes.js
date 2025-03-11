const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

//Protected Route: Get user profile
router.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: "User Profile", user: req.user});
}); // There is a bug here that I gotta hunt down, Something is not working!

