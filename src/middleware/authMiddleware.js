const { request } = require("express");
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate users using JWT tokens.
 * It checks if a valid token is provided in the request headers.
 */
const authenticateToken = (req, res, next) => {
    const token = request.header("Authorization");// Extract token from request headers

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No Token Provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user info in request
        next(); // continue to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ error: "Invalid Token"})// Handle invalid token case
    }
};

module.exports = authenticateToken;