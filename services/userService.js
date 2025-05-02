// Handles all database related operations for users

const pool = require("../src/config/db");
const bcrypt = require("bcryptjs");

/**
 * Creates a new user in the database.
 * Uses a transaction to ensure both user details and address are inserted correctly.
 *
 * @param {string} first_name - User's first name.
 * @param {string} middle_name - User's middle name (optional).
 * @param {string} surname - User's surname.
 * @param {string} email - User's email (must be unique).
 * @param {string} password - User's plain-text password (hashed before storing).
 * @param {string} phone - User's phone number.
 * @param {string} date_of_birth - User's date of birth.
 * @param {string} role - User's role (defaults to "user").
 * @param {string} street_address_1 - Primary street address.
 * @param {string} street_address_2 - Secondary street address (optional).
 * @param {string} city - User's city.
 * @param {string} province - User's province/state.
 * @param {string} district - User's district (if applicable).
 * @param {string} country - User's country.
 * @returns {Object} - The created user object (excluding sensitive data).
 */
const createUser = async (
    first_name,
    middle_name,
    surname,
    full_name,
    email,
    phone,
    date_of_birth,
    password_hash,
    user_role = "user", // Default role should be "user"
    street_address_1,
    street_address_2,
    city,
    province,
    district,
    country
) => {
    const client = await pool.connect(); // Start database connection
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        await client.query("BEGIN"); // Start transaction

        // Insert user into users table (WITHOUT address fields)
        const userResult = await client.query(
            `INSERT INTO users (
                first_name, middle_name, surname, email, phone, date_of_birth, password, role, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 NOW(), NOW())
            RETURNING id, first_name, middle_name, surname, email, phone, date_of_birth, role`,
            [first_name, middle_name, surname, full_name, email, phone, date_of_birth, hashedPassword, user_role]
        );

        const userId = userResult.rows[0].id;// Extract new user ID

        // If address details are provided, insert into the address table
        if (street_address_1 && city && province && country) {
            await client.query(
                `INSERT INTO addresses (user_id, street_address_1, street_address_2, city, province, district, country, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
                [userId, street_address_1, street_address_2, city, province, district, country]
            );
        }

        await client.query("COMMIT");// Commit transaction if everything succeeds

        return userResult.rows[0];// Return only non-sensitive data

    } catch (err) {
        await client.query("ROLLBACK");// Rollback transaction if any error occurs
        console.error("Error creating user:", err);
        throw err;
    } finally {
        client.release();// Release database
    }
};


// Function to find user by email
const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
        `
        SELECT
            id,
            first_name,
            middle_name,
            surname,
            full_name,
            email,
            phone,
            date_of_birth,
            password_hash,
            user_role
        FROM users
        WHERE email = $1
        `,
        [email]
    );
      return result.rows[0]; // Returns user object, including password_hash and user_role
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err;
    }
};


module.exports = { createUser, findUserByEmail }; 
