import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  console.log("🟢 Checking Admin Access:", user);

  // ✅ Ensure we check `user.role` instead of `user.isAdmin`
  if (!user || user.role !== "admin") {
    console.warn("❌ Access Denied: User is not an admin!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
