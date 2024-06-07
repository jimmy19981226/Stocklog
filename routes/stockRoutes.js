const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const auth = require("../middleware/auth"); // Import the auth middleware

// Create a new stock (protected route)
router.post("/", auth, async (req, res) => {
  const stock = new Stock(req.body);
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
    const stocks = await Stock.find();
    res.status(200).json(stocks); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Get a specific stock (protected route)
router.get("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json(stock); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Update a stock (protected route)
router.patch("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json(stock); // 200 OK
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Delete a stock (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" }); // 404 Not Found
    res.status(200).json({ message: "Stock deleted" }); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

module.exports = router;
