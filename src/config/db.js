const { Pool } = require("pg"); //imports pool class from node.js postgresSQL package
const config = require("./config")
require("dotenv").config(); // Load environment variables

// Create a new pool with database connection settings
const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASS,
    port: config.DB_PORT || 5432
});

//(note to self(NTS)) In the catch block, i need to code it in such a way that it retries 2 - 3 time before exiting

// Function to establish a database connection with retries
const connectDB = async (retries = 5, delay = 3000) => {
    for (let i = 0; i < retries; i++){
        try {
            const client = await pool.connect();
            console.log("PostgreSQL connected Successfully");
            client.release();
            return;
        } catch (err) {
            console.error(`Database connection attempt ${i + 1} of ${retries} failed. Retrying in ${delay / 1000} seconds...`, err);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay)); // wait before retrying
            }else {
                console.error("All retries failed. The database is unavailable")
            }
        }
    }
};

connectDB();
module.exports = pool;