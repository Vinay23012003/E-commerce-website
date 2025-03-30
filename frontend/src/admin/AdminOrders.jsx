import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus, deleteOrder } from "../api/api";
import { FaTrashAlt } from "react-icons/fa";

const AdminOrders = () => {
    const { token } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError("❌ User is not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        const loadOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const orderData = await fetchAllOrders(token);
                if (!orderData || !Array.isArray(orderData)) {
                    throw new Error("❌ Invalid order data received.");
                }
                setOrders(orderData);
            } catch (error) {
                console.error("🔴 Failed to fetch orders:", error);
                setError("❌ Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [token]);

    const handleUpdateOrder = async (id, status) => {
        if (!window.confirm(`Are you sure you want to update the order to '${status}'?`)) return;
        try {
            const result = await updateOrderStatus(id, status, token);
            if (result.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? { ...order, status } : order
                    )
                );
                alert("✅ Order status updated successfully!");
            } else {
                alert("❌ Failed to update order status.");
            }
        } catch (error) {
            console.error("🔴 Error updating order status:", error);
            alert("⚠️ Something went wrong. Please try again.");
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("❌ Are you sure you want to delete this order? This action cannot be undone.")) return;
        try {
            await deleteOrder(orderId, token);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            alert("✅ Order deleted successfully!");
        } catch (error) {
            console.error("🔴 Error deleting order:", error);
            alert("⚠️ Failed to delete order. Please try again.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-8 py-10">
            <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
                Manage Orders
            </h2>

            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-400 mt-4 animate-pulse">⏳ Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-400 mt-4">⚠️ No orders found.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-xl bg-opacity-80 backdrop-blur-md p-4">
                    <table className="w-full border-collapse bg-gray-950 bg-opacity-60 text-white rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300 uppercase tracking-wider text-sm">
                                <th className="p-5 text-left">Order ID</th>
                                <th className="p-5 text-left">User Name</th>
                                <th className="p-5 text-left">Products</th>
                                <th className="p-5 text-left">Address</th>
                                <th className="p-5 text-left">Total</th>
                                <th className="p-5 text-left">Status</th>
                                <th className="p-5 text-left">Update</th>
                                <th className="p-5 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-300"
                                >
                                    <td className="p-5 text-sm text-gray-400">{order._id}</td>
                                    <td className="p-5 text-sm text-gray-400">{order.user?.name || "N/A"}</td>
                                    <td className="p-5 text-sm text-gray-400">
                                        {order.products.length > 0
                                            ? order.products.map((prod) => prod.product?.name || "Unknown").join(", ")
                                            : "No Products"}
                                    </td>
                                    <td className="p-5 text-sm text-gray-400">
                                        {order.address
                                            ? `${order.address.street}, ${order.address.city}`
                                            : "No Address Provided"}
                                    </td>
                                    <td className="p-5 text-sm text-green-400 font-semibold">${order.totalAmount}</td>
                                    <td className="p-5 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-all duration-200 ${
                                                order.status === "Delivered"
                                                    ? "bg-green-600 text-white"
                                                    : order.status === "Shipped"
                                                    ? "bg-yellow-500 text-black"
                                                    : order.status === "Cancelled"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-500 text-white"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-sm">
                                        <select
                                            onChange={(e) => handleUpdateOrder(order._id, e.target.value)}
                                            defaultValue={order.status}
                                            className="border border-gray-600 rounded-md px-4 py-2 text-gray-300 bg-gray-900 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-5 text-sm">
                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
