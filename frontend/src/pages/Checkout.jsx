import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Fixed missing `loading` state

  const cart = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Cart Data at Checkout:", cart);
  }, [cart]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    // ✅ Format cart items properly
    const formattedCart = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity || 1,
    }));

    const requestData = {
      address,
      products: formattedCart,
    };

    console.log("📦 Sending Request Data:", JSON.stringify(requestData, null, 2));

    try {
      setLoading(true); // ✅ Set loading before API call
      const response = await axios.post(
        "http://localhost:3000/api/orders/place",
        requestData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      console.log("✅ Order Success:", response.data);
      dispatch(clearCart());
      alert(`🎉 Order placed successfully! Order ID: ${response.data.order._id}`);
      navigate("/");
    } catch (error) {
      console.error("❌ Checkout Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error placing order. Please try again.");
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🛒 Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["street", "city", "state", "zipCode", "country"].map((field) => (
            <label key={field} className="block">
              <span className="text-gray-700 font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}:</span>
              <input
                type="text"
                name={field}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                value={address[field]}
                onChange={handleChange}
                required
              />
            </label>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg shadow-md transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
