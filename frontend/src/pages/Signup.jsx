import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signupUser(user);
            alert("🎉 Signup Successful! Please log in.");
            navigate("/login");
        } catch (err) {
            setError(err.message || "Signup failed. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-white text-center mb-4">🚀 Create an Account</h2>

                {/* Error Message */}
                {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-300">Name:</span>
                        <input 
                            type="text" 
                            name="name" 
                            className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400" 
                            value={user.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Email:</span>
                        <input 
                            type="email" 
                            name="email" 
                            className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400" 
                            value={user.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-300">Password:</span>
                        <input 
                            type="password" 
                            name="password" 
                            className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400" 
                            value={user.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <button 
                        type="submit" 
                        className={`w-full bg-blue-500 text-white px-4 py-3 rounded-lg transition hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account? 
                    <a href="/login" className="text-blue-400 hover:underline"> Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
