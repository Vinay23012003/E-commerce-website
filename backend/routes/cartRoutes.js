const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToCart, getCart, removeFromCart, clearCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove", protect, removeFromCart);
router.delete("/clear", protect, clearCart); 

module.exports = router;
