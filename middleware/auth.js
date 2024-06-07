const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = decoded; // Add the decoded token payload to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = auth;
