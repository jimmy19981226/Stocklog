// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const PortfolioSummary = require("../models/portfolio");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// Helper function to update portfolio summary
const updatePortfolioSummary = async (userId) => {
  const stockRecords = await Stock.find({ userId });

  let totalInvested = 0;
  let totalCurrentValue = 0;
  let totalEarnings = 0;
  let totalProfitLoss = 0;

  stockRecords.forEach((record) => {
    totalInvested += record.buyingPrice * record.quantity;
    totalCurrentValue += record.sellingPrice * record.quantity;
    totalEarnings +=
      (record.sellingPrice - record.buyingPrice) * record.quantity;
    totalProfitLoss += totalEarnings - record.transactionFee;
  });

  await PortfolioSummary.findOneAndUpdate(
    { userId },
    { totalInvested, totalCurrentValue, totalEarnings, totalProfitLoss },
    { upsert: true, new: true }
  );
};

// Search stocks
router.get("/search", auth, async (req, res) => {
  try {
    const searchCriteria = {};

    if (req.query.stockName) {
      searchCriteria.stockName = { $regex: req.query.stockName, $options: "i" };
    }
    if (req.query.purchaseDate) {
      const purchaseDate = new Date(req.query.purchaseDate);
      if (!isNaN(purchaseDate)) {
        searchCriteria.purchaseDate = purchaseDate;
      } else {
        return res
          .status(400)
          .json({ message: "Invalid purchase date format" });
      }
    }
    if (req.query.sellDate) {
      const sellDate = new Date(req.query.sellDate);
      if (!isNaN(sellDate)) {
        searchCriteria.sellDate = sellDate;
      } else {
        return res.status(400).json({ message: "Invalid sell date format" });
      }
    }
    if (req.query.market) {
      searchCriteria.market = { $regex: req.query.market, $options: "i" };
    }
    if (req.query.buyingPrice) {
      searchCriteria.buyingPrice = parseFloat(req.query.buyingPrice);
    }
    if (req.query.sellingPrice) {
      searchCriteria.sellingPrice = parseFloat(req.query.sellingPrice);
    }

    const stocks = await Stock.find(searchCriteria);
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Create a new stock (protected route, authenticated users)
router.post("/", auth, async (req, res) => {
  const stock = new Stock({
    ...req.body,
    userId: req.user.userId,
  });

  try {
    const savedStock = await stock.save();
    await updatePortfolioSummary(req.user.userId);
    res.status(201).json(savedStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all stocks (protected route, authenticated users, admin can view all)
router.get("/", auth, async (req, res) => {
  try {
    let stocks;
    if (req.user.role === "admin") {
      stocks = await Stock.find();
    } else {
      stocks = await Stock.find({ userId: req.user.userId });
    }
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific stock (protected route, authenticated users)
router.get("/:id", auth, authorize, async (req, res) => {
  try {
    const stock = await Stock.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a stock (protected route, only owner or admin)
router.patch("/:id", auth, authorize, async (req, res) => {
  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    await updatePortfolioSummary(req.user.userId);
    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a stock (protected route, only owner or admin)
router.delete("/:id", auth, authorize, async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({ _id: req.params.id });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    await updatePortfolioSummary(req.user.userId);
    res.status(200).json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
