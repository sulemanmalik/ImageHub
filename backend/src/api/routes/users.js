const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth")

const User = require("../../models/User");

const UsersController = require('../controllers/usersController')

//POST - create new user
router.post("/signup", UsersController.signup);

//POST - login users
router.post("/login", UsersController.login);

//DELETE - remove a user
router.delete("/:userId", UsersController.deleteUser);

module.exports = router;
