import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-950 via-green-900 to-purple-950 text-white shadow-xl mb-5 text-3xl py-4 z-50 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide hover:text-green-500 transition"
        >
          E-Shop
        </Link>

        {/* ✅ Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-3xl z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ✅ Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/products" className="hover:text-purple-700 transition">
            Products
          </Link>
          <Link to="/cart" className="hover:text-cyan-500 transition relative">
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/contact" className="hover:text-green-500 transition">
            Contact
          </Link>
          <Link to="/about" className="hover:text-purple-400 transition">
            About
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-orange-700 transition">
                Orders
              </Link>
              {user.isAdmin && (
                <Link to="/admindashboard" className="hover:text-sky-700 transition">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="hover:text-pink-600 transition">
                Profile
              </Link>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition shadow-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:text-gray-300 transition">
                Signup
              </Link>
              <Link to="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu (Slide-in Animation) */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center text-white space-y-6 transition-transform duration-500 ease-in-out z-40 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          to="/"
          className="text-2xl hover:text-yellow-700"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-2xl hover:text-cyan-500 relative"
          onClick={() => setIsMenuOpen(false)}
        >
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
        <Link
          to="/contact"
          className="text-2xl hover:text-green-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-2xl hover:text-purple-400"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/orders"
              className="text-2xl hover:text-orange-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            {user.isAdmin && (
              <Link
                to="/admindashboard"
                className="text-2xl hover:text-sky-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              to="/profile"
              className="text-2xl hover:text-pink-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition text-2xl shadow-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-2xl hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-2xl hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
