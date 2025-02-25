const { createUser, findUserByEmail } = require("../../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

/**
 * Controller to handle user registration (Sign Up)
 * It receives user details from the request body, validates them,
 * hashes the password, and stores the new user in the database.
 */
exports.createUserController = async (req, res) => {
    try {
        const role = req.body.role || "user"; // Ensure role has a default value
        //Extract user details from request
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

        //Respond with a success message
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        console.error("Error creating user:", err);

        //Handle duplicate email/phone errors
        if (err.code === "23505") {
            return res.status(400).json({ error: "Email or Phone number already exists, please use a different one" });
        }

        //Handle general server errors
        res.status(500).json({ message: "Server Error", details: err.message });
    }
};

/**
 * When completed and full functional
 * the controller for user login
 * verifies the user's email and password, generates a JWT token for authentication,
 * and sends the token to the client.
 */
exports.loginUserController = async (req, res) => {
    const { email, password } = req.body;

    //Validate require fields
    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    try {
        //find user by email in the database
        const user = await findUserByEmail(email);

        //If user does not exist return an error
        if (!user) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        //Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }

        //Generate jsonWebToke(JWT) for authentication
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },//Token payload
            process.env.JWT_SECRET,//Secret key from environment variable
            { expiresIn: "1h" }//Token expiry time
        );

        //Send success response with the token
        res.status(200).json({ message: "Login Successful", token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error", details: err.message });
    }
};

/**
 * Controller for signing up a user (alternative signup function)
 * This function directly interacts with the database using SQL queries.
 */
exports.signupUserController = async (req, res) => {
    const { first_name, email, password, middle_name, surname, date_of_birth } = req.body;

    console.log("Signup Attempt:", req.body);

    //Validate required field
    if (!first_name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        //Hash password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert new user into the database
        const result = await pool.query(
            `INSERT INTO users (first_name, email, password, created_at, middle_name, surname, date_of_birth)
            VALUES ($1, $2, $3, NOW(), $4, $5, $6) RETURNING *`,
            [first_name, email, hashedPassword, middle_name, surname, date_of_birth]
        );

        //Send success response
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });

    } catch (err) {
        console.error("Database Error", err);
        res.status(500).json({ error: "server error" });
    }
};
