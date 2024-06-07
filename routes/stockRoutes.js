const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const authorize = require("../middleware/authorize");

// Create a new stock (protected route)
router.post("/", auth, async (req, res) => {
  const stock = new Stock({
    ...req.body,
    userId: req.user.userId, // Set the userId to the authenticated user's ID
  });

  try {
    const savedStock = await stock.save();
    res.status(201).json(savedStock); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Get all stocks (protected route)
router.get("/", auth, async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user.userId }); // Only get stocks for the authenticated user
    res.status(200).json(stocks); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Get a specific stock (protected route)
router.get("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    }); // Ensure the stock belongs to the authenticated user
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json(stock); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Update a stock (protected route)
router.patch("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId }, // Ensure the stock belongs to the authenticated user
      req.body,
      { new: true }
    );
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json(stock); // 200 OK
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Delete a stock (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    }); // Ensure the stock belongs to the authenticated user
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json({ message: "Stock deleted" }); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

module.exports = router;
