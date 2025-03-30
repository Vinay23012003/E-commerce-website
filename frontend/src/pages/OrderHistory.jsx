import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserOrders } from "../api/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getOrders = async () => {
      if (!token) return;
      try {
        const data = await fetchUserOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-400">
          📦 Your Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400">⚠️ No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                  🆔 Order ID: <span className="text-gray-300">{order._id}</span>
                </h3>
                <p className="text-gray-400 text-lg">
                  💰 Total: <span className="font-semibold text-green-400">${order.totalAmount}</span>
                </p>

                {/* ✅ Status Badge */}
                <p className="mt-3">
                  <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full 
                    ${order.status === "Delivered" ? "bg-green-500 text-white" 
                    : order.status === "Pending" ? "bg-yellow-500 text-black"
                    : "bg-red-600 text-white"}`}
                  >
                    {order.status}
                  </span>
                </p>

                {/* ✅ Address Section */}
                <div className="mt-5 p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-indigo-300">📍 Delivery Address:</h4>
                  <p className="text-gray-300">{order.address?.street || "Unknown Street"}, {order.address?.city || "Unknown City"}</p>
                  <p className="text-gray-300">{order.address?.postalCode || "000000"}, {order.address?.country || "Unknown Country"}</p>
                </div>

                {/* ✅ Order Items */}
                <ul className="mt-5 space-y-4">
                  {order.products.map((item) => {
                    const productName = item.product?.name || "Unknown Product";
                    return (
                      <li
                        key={item.product?._id || Math.random()}
                        className="flex items-center space-x-5 p-4 bg-gray-700 rounded-lg border border-gray-600"
                      >
                        <img
                          src={item.product?.image || "https://placehold.co/50"}
                          alt={productName}
                          className="w-16 h-16 object-cover rounded-md border border-gray-500"
                        />
                        <div>
                          <p className="font-medium text-lg text-white">{productName}</p>
                          <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
