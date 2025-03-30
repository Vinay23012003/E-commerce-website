const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productControllers");

const router = express.Router();

router.post("/", protect, admin, addProduct);  // ✅ Add Product (Admin)
router.get("/", getAllProducts);  // ✅ Get All Products
router.get("/:id", getProductById);  // ✅ Get Single Product
router.put("/:id", protect, admin, updateProduct);  // ✅ Update Product (Admin)
router.delete("/:id", protect, admin, deleteProduct);  // ✅ Delete Product (Admin)

module.exports = router;
