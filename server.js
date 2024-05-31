require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const entityRoutes = require("./routes/entityRoutes");

const port = process.env.PORT || 3000;
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define the testAPI endpoint
app.get("/testAPI", (req, res) => {
  res.send("testAPI is working!");
});

// Use entity routes
app.use("/api/entities", entityRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
