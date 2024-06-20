const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Route to get all users (admin access or for development purposes)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users in the response
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup new user
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password during signup:", hashedPassword); // Log the hashed password

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    const savedUser = await user.save();
    console.log("User signed up:", savedUser); // Log the created user
    res.status(201).json(savedUser); // 201 Created
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email error
      console.error("Error signing up user: Duplicate email");
      res.status(400).json({ message: "Email already exists" }); // 400 Bad Request
    } else {
      console.error("Error signing up user:", err); // Log any other errors
      res.status(400).json({ message: err.message }); // 400 Bad Request
    }
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" }); // 404 Not Found
    }

    console.log("Stored hashed password:", user.password); // Log the stored hashed password
    console.log("Entered password:", password); // Log the entered password

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isMatch); // Log the result of the comparison

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" }); // 400 Bad Request
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    console.log("User logged in:", user); // Log the logged-in user
    res.status(200).json({ token }); // 200 OK
  } catch (err) {
    console.error("Error logging in user:", err); // Log any errors
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Route to assign admin role (protected route)
router.patch("/assign-admin/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // 404 Not Found
    }
    res.status(200).json(user); // 200 OK
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Update user information (protected route)
router.patch("/update", auth, async (req, res) => {
  const { oldPassword, newPassword, ...updateData } = req.body;
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    if (oldPassword && newPassword) {
      console.log("Verifying old password:", oldPassword); // Log old password verification
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      console.log("Old password comparison result:", isMatch); // Log old password comparison result

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid old password" });
      }

      // Hash new password
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update other fields, but not the role
    for (let key in updateData) {
      if (key !== "role") {
        user[key] = updateData[key];
      }
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err); // Log any errors
    res.status(400).json({ message: err.message });
  }
});

// Protected route example
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // 404 Not Found
    }
    res.status(200).json(user); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

module.exports = router;
