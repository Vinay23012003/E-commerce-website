const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }], // 4 Images Allowed
    discount: { type: Number, default: 0 }, // Discount in Percentage
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
