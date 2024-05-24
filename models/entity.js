const mongoose = require("mongoose");

const stockRecordSchema = new mongoose.Schema({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
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

const StockRecord = mongoose.model("StockRecord", stockRecordSchema);

module.exports = StockRecord;
