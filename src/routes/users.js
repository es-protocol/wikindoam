const express = require("express");
const { createUserController, loginUserController, signupUserController } = require("../controllers/userController");


const router = express.Router();

// Admin created signup route
router.post("/adminsignup", createUserController);

//user signup rout
router.post("/signup", signupUserController);

//Login route
router.post("/login", loginUserController);

module.exports = router;
