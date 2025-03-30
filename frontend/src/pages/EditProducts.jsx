import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../api/api";
import { useSelector } from "react-redux";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: ["", "", "", ""], // 4 Image Fields
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id, token);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id && token) {
            loadProduct();
        }
    }, [id, token]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct({ ...product, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, product, token);
            alert("✅ Product Updated Successfully!");
            navigate("/admin-products"); // Redirect to product list
        } catch (error) {
            console.error("Error updating product:", error);
            alert("❌ Failed to update product.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white p-4">
            <div className="max-w-xs w-full bg-zinc-800 p-5 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold text-center mb-4">✏️ Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm" required />
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <label className="text-sm font-medium">Price</label>
                            <input type="number" name="price" value={product.price} onChange={handleChange} min="0" className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm" required />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm font-medium">Stock</label>
                            <input type="number" name="stock" value={product.stock} onChange={handleChange} min="0" className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm" required />
                    </div>
                    {/* 4 Image Fields */}
                    {product.images.map((image, index) => (
                        <div key={index} className="space-y-2">
                            <label className="text-sm font-medium">Image {index + 1} URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="w-full p-1 border border-zinc-700 rounded bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    ))}
                    <button type="submit" className="w-full px-3 py-2 rounded font-semibold text-sm transition bg-blue-600 hover:bg-blue-700">
                        ✅ Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
