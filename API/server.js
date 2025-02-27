require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this line
const stockRoutes = require("./routes/stockRoutes");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const port = process.env.PORT || 3000;
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS middleware
app.use(cors()); // Add this line

// Define the testAPI endpoint
app.get("/testAPI", (req, res) => {
  res.send("testAPI is working!");
});

// Use entity routes
app.use("/api/stock", stockRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
