import React from "react";
import Slide from "../components/Slider";
import Products from "../components/Products";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* ✅ Hero Section / Slider */}
      <div className="w-full mx-auto mb-8">
        <Slide />
      </div>

      {/* ✅ Featured Products Section */}
      <div className="container mx-auto px-6 py-10">
        {/* ✅ Product Grid */}
        <Products />
      </div>

    </div>
  );
}

export default Home;
