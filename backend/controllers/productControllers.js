const Product = require("../model/Product");

// ✅ Add New Product (Admin Only)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, images, discount, category, stock } = req.body;

        if (!name || !description || !price || !images || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (images.length !== 4) {
            return res.status(400).json({ message: "Exactly 4 images are required" });
        }

        const product = new Product({ name, description, price, images, discount, category, stock });
        await product.save();

        res.status(201).json({ message: "Product Added Successfully", product });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get Single Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Update Product (Admin Only)
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "Product Updated Successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Delete Product (Admin Only)
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
