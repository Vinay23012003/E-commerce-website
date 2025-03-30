const Order = require("../model/Order");
const Cart = require("../model/Cart");

// ✅ Place Order
const placeOrder = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalAmount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        const newOrder = new Order({
            user: userId,
            products: cart.products,
            totalAmount,
            address
        });

        await newOrder.save();
        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get User Orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("products.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Admin: Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user products.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};






// ✅ Admin: Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ success: true, message: "Order status updated", order });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


// ✅ Admin: Delete Order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.deleteOne();
        res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder };
