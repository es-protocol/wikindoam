const { createUser, findUserByEmail } = require("../../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Controller to create a new user (Signup)
exports.createUserController = async (req, res) => {
    try {
        const role = req.body.role || "user"; // Ensure role has a default value

        const newUser = await createUser(
            req.body.first_name,
            req.body.middle_name,
            req.body.surname,
            req.body.email,
            req.body.password,
            req.body.phone,
            req.body.date_of_birth,
            role, // Pass role explicitly
            req.body.street_address_1,
            req.body.street_address_2,
            req.body.city,
            req.body.province,
            req.body.district,
            req.body.country
        );

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error creating user:", err);
        if (err.code === "23505") {
            return res.status(400).json({ error: "Email or Phone number already exists, please use a different one" });
        }
        res.status(500).json({ message: "Server Error", details: err.message });
    }
};

// Controller for user login
exports.loginUserController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login Successful", token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error", details: err.message });
    }
};

// If you still need the separate signup function
exports.signupUserController = async (req, res) => {
    const { first_name, email, password, middle_name, surname, date_of_birth } = req.body;

    console.log("Signup Attempt:", req.body);

    if (!first_name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (first_name, email, password, created_at, middle_name, surname, date_of_birth)
            VALUES ($1, $2, $3, NOW(), $4, $5, $6) RETURNING *`,
            [first_name, email, hashedPassword, middle_name, surname, date_of_birth]
        );

        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });

    } catch (err) {
        console.error("Database Error", err);
        res.status(500).json({ error: "server error" });
    }
};
