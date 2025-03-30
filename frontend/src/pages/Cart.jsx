import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, fetchCart } from "../redux/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              // ✅ Ensure a valid image URL
              let imageUrl = item.image;
              if (!imageUrl || !imageUrl.startsWith("http")) {
                imageUrl = "https://dummyimage.com/80x80/555/fff&text=No+Image"; // Alternative placeholder
              }

              return (
                <div
                  key={item._id}
                  className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md gap-4"
                >
                  {/* ✅ Product Image */}
                  <img
                    src={imageUrl}
                    alt={item.name || "Product Image"}
                    className="w-20 h-20 object-cover rounded-md border border-gray-600"
                    onError={(e) =>
                      (e.target.src = "https://dummyimage.com/80x80/555/fff&text=No+Image")
                    } // Prevent broken images
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-400">💲 {item.price} × {item.quantity}</p>
                  </div>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleRemove(item._id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              );
            })}

            {/* ✅ Checkout Button */}
            <button
              className="w-full bg-green-500 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-green-600 hover:shadow-lg"
              onClick={handleCheckout}
            >
              ✅ Proceed to Checkout
            </button>

            {/* ✅ Clear Cart Button */}
            <button
              className="w-full bg-gray-600 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-700 hover:shadow-lg"
              onClick={() => dispatch(clearCart())}
            >
              🗑️ Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
