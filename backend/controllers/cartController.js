const mongoose = require("mongoose");
const Cart = require("../model/Cart");

// ✅ Add to Cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        console.log("🛍 Adding to Cart - User:", userId, "Product:", productId, "Quantity:", quantity);

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        const existingProduct = cart.products.find(p => p.product.toString() === productObjectId.toString());

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productObjectId, quantity });
        }

        await cart.save();
        console.log("✅ Product added to cart:", cart);
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("🚨 Add to Cart Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get User Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            console.log("⚠️ Cart is empty for user:", req.user.id);
            return res.status(200).json({ message: "Cart is empty", products: [] });
        }

        console.log("🛒 Cart Data for User:", req.user.id, cart);
        res.status(200).json(cart);
    } catch (error) {
        console.error("🚨 Get Cart Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Remove Product from Cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        console.log("❌ Removing Product - User:", userId, "Product:", productId);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        console.log("✅ Product removed from cart:", cart);
        res.status(200).json({ message: "Product removed from cart", cart });

    } catch (error) {
        console.error("🚨 Remove from Cart Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Clear Cart API (Only Remove Products, Keep Cart Document)
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log("🗑 Clearing Cart for User:", userId);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            console.log("🚨 Cart already empty for user:", userId);
            return res.status(200).json({ message: "Cart is already empty" });
        }

        cart.products = []; // 🛑 Cart को delete करने की जगह सिर्फ खाली कर रहे हैं।
        await cart.save();

        console.log("✅ Cart Cleared for User:", userId);
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("🚨 Clear Cart Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
