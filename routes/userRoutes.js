const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Signup new user
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dateOfBirth,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

module.exports = router;
