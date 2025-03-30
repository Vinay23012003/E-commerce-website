const jwt = require("jsonwebtoken");
const User = require("../model/User");

// ✅ Middleware to Protect Routes (Require Authentication)
const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token found, login again" });
    }

    try {
        token = token.split(" ")[1];  // ✅ Extract actual token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Invalid token, login again" });
    }
};

// ✅ Middleware to Check Admin Role
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { protect, admin };
