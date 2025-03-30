import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* 🔹 Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">E-Shop</h2>
          <p className="text-sm text-gray-400 mb-4">The best products at the best prices, delivered to your doorstep.</p>
          <div className="flex items-center text-gray-400 space-x-2">
            <FaMapMarkerAlt />
            <span>New Delhi, India</span>
          </div>
          <div className="flex items-center text-gray-400 space-x-2 mt-2">
            <FaPhone />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center text-gray-400 space-x-2 mt-2">
            <FaEnvelope />
            <span>support@eshop.com</span>
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-blue-400 transition">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* 🔹 Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-blue-400 transition">Returns & Refunds</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* 🔹 Newsletter & Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe to Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Get updates about new products and exclusive deals.</p>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin size={24} /></a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaGoogle size={24} /></a>
          </div>
        </div>
      </div>

      {/* 🔹 Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
