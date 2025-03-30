const express = require("express");
const { signupUser, loginUser } = require("../controllers/authControllers");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);

// ✅ Protected Route (User Profile)
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
