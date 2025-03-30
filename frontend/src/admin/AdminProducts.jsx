import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
    const reduxToken = useSelector((state) => state.auth.token);
    const [token, setToken] = useState(localStorage.getItem("token") || reduxToken);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("❌ No token found, please log in again.");
            navigate("/login");
            return;
        }
        setToken(reduxToken || localStorage.getItem("token"));
    }, [reduxToken, navigate]);

    useEffect(() => {
        if (!token) return;
        const loadProducts = async () => {
            setLoading(true);
            try {
                const productData = await fetchProducts(token);
                setProducts(productData);
            } catch (error) {
                console.error("🔴 Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id, token);
            setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
            alert("🗑️ Product Deleted Successfully!");
        } catch (error) {
            alert("❌ Failed to delete product!");
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto bg-gray-800 shadow-xl rounded-xl p-6 text-white">
                <h2 className="text-4xl font-extrabold text-center text-white mb-6">
                    Manage Products
                </h2>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => navigate("/add-product")}
                        className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-sky-500 to-pink-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
                    >
                        Add Product
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400 text-lg mt-4 animate-pulse">Loading products...</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="w-full border-collapse bg-zinc-800 text-white">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Discount (%)</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Stock</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="border-b transition hover:bg-blue-900 even:bg-slate-800 odd:bg-zinc-800"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={product.images?.[0] || "https://placehold.co/50x50"}
                                                    alt={product.name}
                                                    className="w-16 h-16 rounded-lg shadow-md"
                                                />
                                            </td>
                                            <td className="p-4 font-semibold">{product.name}</td>
                                            <td className="p-4">${product.price.toFixed(2)}</td>
                                            <td className="p-4">{product.discount ? `${product.discount}%` : "N/A"}</td>
                                            <td className="p-4">{product.category || "Uncategorized"}</td>
                                            <td className="p-4">{product.stock || 0}</td>
                                            <td className="p-4 flex space-x-3">
                                                <button
                                                    onClick={() => navigate(`/edit-product/${product._id}`)}
                                                    className="px-5 py-2 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg hover:shadow-2xl hover:scale-90 active:scale-75"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="px-5 py-2 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-red-800 to-orange-600 text-white shadow-lg hover:shadow-2xl hover:scale-90 active:scale-75"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center p-4 text-gray-400">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
