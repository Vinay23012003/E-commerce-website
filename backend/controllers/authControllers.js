const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Generate JWT Token Function
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Signup Controller
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Signup Request:", email);

        // 🔹 Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔹 Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Create and save the user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        console.log("User Registered:", user.email);

        // 🔹 Send response with token
        res.status(201).json({
            message: "User Registered Successfully",
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Login Controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Request:", email);

        // 🔹 Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        // 🔹 Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        console.log("User Logged In:", user.email);

        // 🔹 Send response with token
        res.status(200).json({
            message: "Login Successful",
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { signupUser, loginUser };
