import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center py-20 px-8">
      {/* ✅ Header */}
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Admin Dashboard
      </h2>

      {/* ✅ Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-8">
        <Link to="/admin-products">
          <button className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-orange-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95">
             Manage Products
          </button>
        </Link>
        <Link to="/admin-orders">
          <button className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-cyan-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95">
             Manage Orders
          </button>
        </Link>


        <Link to="/admin-contact">
          <button className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-yellow-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95">
             Manage Contact 
          </button>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
