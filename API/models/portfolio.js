const mongoose = require("mongoose");

const portfolioSummarySchema = new mongoose.Schema({
  summaryId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    primaryKey: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockRecord",
    required: true,
  },
  totalInvested: {
    type: Number,
    default: 0,
  },
  totalCurrentValue: {
    type: Number,
    default: 0,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  totalProfitLoss: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("PortfolioSummary", portfolioSummarySchema);
