const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
//POST - create new user
router.post("/signup", async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(422).json({
        message: "Email already in use"
      });
    }
    //12 salt rounds - add random strings to plain text password before hashing
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    const result = await user.save();

    const response = {
      user: { ...result._doc, password: null },
      message: "User created successfully!"
    };

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

//POST - login users
router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const assertEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!assertEqualPassword) {
    res.status(401).json({
      message: "Invalid credentials"
    });
  } else {
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      "privatekey",
      {
        expiresIn: "0.5h"
      }
    );
    res.status(200).json({
      message: "login successful",
      token: token
    });
  }
});

//DELETE - remove a user
router.delete("/:userId", async (req, res, next) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.userId });
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(422).json({
      message: "User delete unsuccessful"
    });
  }
});

module.exports = router;
