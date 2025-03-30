import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addProduct } from "../api/api";

const AddProduct = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        stock: "",
        images: ["", "", "", ""], // Allow up to 4 images
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "discount" && (value < 0 || value > 100)) return;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct({ ...product, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addProduct(product, token);
            alert("✅ Product Added Successfully!");
            navigate("/admin-products");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-center text-blue-400 mb-6"> Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-blue-300">Product Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name" required />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-blue-300">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Product description" required />
                    </div>

                    {/* Price, Stock & Discount */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-blue-300">Price</label>
                            <input type="number" name="price" value={product.price} onChange={handleChange} min="0"
                                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder="₹ 0" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-300">Stock</label>
                            <input type="number" name="stock" value={product.stock} onChange={handleChange} min="0"
                                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder="Stock" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-300">Discount (%)</label>
                            <input type="number" name="discount" value={product.discount} onChange={handleChange} min="0" max="100"
                                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                                placeholder="0 - 100" required />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-blue-300">Category</label>
                        <input type="text" name="category" value={product.category} onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter category" required />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-blue-300">Images (Max 4)</label>
                        {product.images.map((image, index) => (
                            <input key={index} type="text" value={image} onChange={(e) => handleImageChange(index, e.target.value)}
                                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 mb-2"
                                placeholder={`Image ${index + 1} URL`} />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button type="submit"
                        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all text-white shadow-md 
                        ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transform hover:scale-105"}`}
                        disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
