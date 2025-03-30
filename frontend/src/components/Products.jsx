import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import { Link } from "react-router-dom";
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data.success === false) {
          throw new Error(data.error || "Failed to fetch products");
        }
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // ✅ Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Paginate filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // ✅ Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ✅ Auto-sliding image settings
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        🌟 Explore Our Latest Products
      </h2>

      {/* ✅ Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="w-80 px-5 py-3 rounded-full shadow-lg bg-gray-800 text-white focus:ring-4 focus:ring-blue-300 outline-none transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Loading & Error State */}
      {loading && <p className="text-center text-blue-400 animate-pulse">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ No Products Available */}
      {!loading && currentProducts.length === 0 && !error && (
        <p className="text-center text-gray-400">No products found.</p>
      )}

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => {
          const discountPrice = product.discount
            ? (product.price - (product.price * product.discount) / 100).toFixed(2)
            : product.price;

          return (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="relative bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-6 transition transform hover:scale-105 hover:bg-opacity-50"
            >
              {/* ✅ Auto-Sliding Image Slider */}
              <Slider {...sliderSettings}>
                {product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  ))
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt="Placeholder"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                )}
              </Slider>

              {/* ✅ Category */}
              <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                {product.category || "Uncategorized"}
              </span>

              {/* ✅ Product Name */}
              <h3 className="text-lg font-bold mt-4">{product.name}</h3>

              {/* ✅ Description */}
              <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>

              {/* ✅ Stock Availability */}
              <p className={`mt-2 text-sm font-bold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {product.stock > 0 ? "🟢 In Stock" : "🔴 Out of Stock"}
              </p>

              {/* ✅ Price with Discount */}
              <div className="mt-3">
                {product.discount > 0 ? (
                  <div>
                    <p className="text-red-400 font-bold text-lg">
                      ${discountPrice}{" "}
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ${product.price}
                      </span>
                    </p>
                    <p className="text-green-300 text-sm font-medium">
                      🔥 {product.discount}% Off
                    </p>
                  </div>
                ) : (
                  <p className="text-blue-300 font-bold text-lg">${product.price}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full transition ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-blue-400"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
