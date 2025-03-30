import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("❌ Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
      setTimeout(() => alert(`✅ ${quantity} x ${product.name} added to cart!`), 200);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-lg py-10">⏳ Loading product...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg py-10">{error}</div>;
  }

  // ✅ Discount Calculation
  const discountPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  // ✅ Image Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* ✅ Breadcrumb Navigation */}
      <div className="mb-4 text-sm text-gray-400">
        <Link to="/" className="hover:text-blue-400">🏠 Home</Link> / <span className="text-blue-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800 p-8 rounded-xl shadow-lg transition hover:shadow-2xl duration-300">
        
        {/* ✅ Image Slider */}
        <div className="relative">
          <Slider {...settings}>
            {product.images?.length > 0 ? (
              product.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <img
                src="https://placehold.co/400"
                alt="Placeholder"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            )}
          </Slider>
        </div>

        {/* ✅ Product Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-white">{product.name}</h2>
          <p className="text-gray-300 mt-4 leading-relaxed">{product.description}</p>
          
          {/* ✅ Stock Availability */}
          <p className={`mt-2 text-lg font-semibold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
            {product.stock > 0 ? "🟢 In Stock" : "🔴 Out of Stock"}
          </p>

          {/* ✅ Pricing with Discounts */}
          <div className="mt-6 flex items-center space-x-4">
            {discountPrice ? (
              <>
                <p className="text-3xl font-bold text-red-400">
                  💰 ${discountPrice}
                </p>
                <span className="text-gray-500 line-through text-xl">${product.price}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">-{product.discount}%</span>
              </>
            ) : (
              <p className="text-3xl font-bold text-blue-300">${product.price}</p>
            )}
          </div>

          {/* ✅ Quantity Selector */}
          <div className="mt-4 flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              ➖
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => setQuantity(quantity + 1)}
            >
              ➕
            </button>
          </div>

          {/* ✅ Add to Cart Button */}
          <button
            className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg transition transform duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* ✅ Customer Reviews Section */}
      <div className="mt-12 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white">⭐ Customer Reviews</h3>
        <div className="mt-4 space-y-4">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-yellow-400">🌟 {review.rating} / 5</p>
                <p className="text-gray-300">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">- {review.user}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No reviews yet. Be the first to review this product! 😊</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
