const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/user", protect, getUserOrders);
router.get("/all", protect, admin, getAllOrders);
router.put("/update-status", protect, admin, updateOrderStatus);
router.delete("/:orderId", protect, admin, deleteOrder);

module.exports = router;
