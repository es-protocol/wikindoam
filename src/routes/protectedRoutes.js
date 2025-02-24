const express = require("express");
const authenticateToken = ("../middleware/authMiddleware");

const router = express.Router();

//Protected Route: Get user profile
router.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: "User Profile", user: req.user});
});

