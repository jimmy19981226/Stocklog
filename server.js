require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const entityRoutes = require("./routes/entityRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/entities", entityRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
