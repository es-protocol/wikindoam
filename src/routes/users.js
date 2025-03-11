const express = require("express");
const { createUserController, loginUserController, signupUserController } = require("../controllers/userController");


const router = express.Router();//Initialize the express router

// Admin created user signup route
router.post("/adminsignup", createUserController);

//user signup route
router.post("/signup", signupUserController);

//Login route
router.post("/login", loginUserController);
//This route - when completed - allows users to log in by providing their email and password
//It verifies credentials and returns a JWT token if successful

module.exports = router;//Exports the router for use in other part of the app
