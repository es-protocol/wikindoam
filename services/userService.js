// Handles all database related operations
// for users

const pool = require("../src/config/db");
const bcrypt = require("bcryptjs");

// Function to create a new user
const createUser = async (
    first_name,
    middle_name,
    surname,
    email,
    password,
    phone,
    date_of_birth,
    role = "user", // Default role should be "user"
    street_address_1,
    street_address_2,
    city,
    province,
    district,
    country
) => {
    const client = await pool.connect(); // Start a transaction
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        await client.query("BEGIN"); // Start transaction

        // Insert user into users table (WITHOUT address fields)
        const userResult = await client.query(
            `INSERT INTO users (
                first_name, middle_name, surname, email, phone, date_of_birth, password, role, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
            RETURNING id, first_name, middle_name, surname, email, phone, date_of_birth, role`,
            [first_name, middle_name, surname, email, phone, date_of_birth, hashedPassword, role]
        );

        const userId = userResult.rows[0].id;

        // If address details are provided, insert into the addresses table
        if (street_address_1 && city && province && country) {
            await client.query(
                `INSERT INTO addresses (user_id, street_address_1, street_address_2, city, province, district, country, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
                [userId, street_address_1, street_address_2, city, province, district, country]
            );
        }

        await client.query("COMMIT"); // Commit transaction

        return userResult.rows[0]; // Return only non-sensitive data

    } catch (err) {
        await client.query("ROLLBACK"); // Rollback transaction if any error occurs
        console.error("Error creating user:", err);
        throw err;
    } finally {
        client.release();
    }
};


/// Function to find user by email
const findUserByEmail = async (email) => {
    try {
        const result = await pool.query( 
            "SELECT * FROM users WHERE email = $1", 
            [email]
        );
        return result.rows[0]; // Returns user object or undefined if not found
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err;
    }
};

module.exports = { createUser, findUserByEmail }; 
