const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  stockName: {
    type: String,
    required: true,
  },
  buyingPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: Number,
  transactionFee: Number,
  purchaseDate: {
    type: Date,
    required: true,
  },
  sellDate: Date,
  quantity: {
    type: Number,
    required: true,
  },
  market: String,
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
