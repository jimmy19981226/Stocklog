const Stock = require("../models/stock");

const authorize = async (req, res, next) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Entity not found" });
    }

    // Check if the user is the owner of the stock or an admin
    if (stock.userId.toString() !== req.user.userId && !req.user.isAdmin()) {
      return res
        .status(403)
        .json({
          message:
            "Access denied. You do not have permission to perform this action.",
        });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = authorize;
