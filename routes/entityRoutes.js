const express = require("express");
const router = express.Router();
const Entity = require("../models/entity");

// Create a new entity
router.post("/", async (req, res) => {
  const entity = new Entity(req.body);
  try {
    const savedEntity = await entity.save();
    res.status(201).json(savedEntity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all entities
router.get("/", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific entity
router.get("/:id", async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) return res.status(404).json({ message: "Entity not found" });
    res.json(entity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an entity
router.patch("/:id", async (req, res) => {
  try {
    const entity = await Entity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entity) return res.status(404).json({ message: "Entity not found" });
    res.json(entity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an entity
router.delete("/:id", async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.id);
    if (!entity) return res.status(404).json({ message: "Entity not found" });
    res.json({ message: "Entity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
