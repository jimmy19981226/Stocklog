const express = require("express");
const router = express.Router();
const PortfolioSummary = require("../models/portfolio");
const StockRecord = require("../models/stock");
const auth = require("../middleware/auth");

// Get portfolio summary for a user
router.get("/summary/:userId", auth, async (req, res) => {
  try {
    const summaries = await PortfolioSummary.find({
      userId: req.params.userId,
    });
    res.status(200).json(summaries);
  } catch (err) {
    console.error("Error fetching portfolio summaries:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update portfolio summary for a user
router.patch("/summary/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const stockRecords = await StockRecord.find({ userId });

    // Calculate portfolio summary
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

    // Upsert portfolio summary
    await PortfolioSummary.findOneAndUpdate(
      { userId },
      { totalInvested, totalCurrentValue, totalEarnings, totalProfitLoss },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Portfolio summary updated successfully" });
  } catch (err) {
    console.error("Error updating portfolio summary:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
