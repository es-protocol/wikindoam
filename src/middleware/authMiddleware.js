const { request } = require("express");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = request.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No Token Provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user info in request
        next(); // continue to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ error: "Invalid Token"})
    }
};

module.exports = authenticateToken;