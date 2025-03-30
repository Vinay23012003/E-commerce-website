import { useState } from "react";
import { submitContactForm } from "../api/api";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await submitContactForm(form);
            setSuccess("✅ Message Sent Successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setError("❌ Failed to send message. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-2xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">📩 Contact Us</h2>

                {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center mb-3">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="text-gray-300">👤 Name:</span>
                        <input 
                            type="text" 
                            name="name" 
                            className="w-full mt-2 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition" 
                            value={form.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-300">📧 Email:</span>
                        <input 
                            type="email" 
                            name="email" 
                            className="w-full mt-2 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition" 
                            value={form.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-300">💬 Message:</span>
                        <textarea 
                            name="message" 
                            className="w-full mt-2 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition" 
                            value={form.message} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>

                    <button 
                        type="submit" 
                        className={`w-full bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600 hover:shadow-lg ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`} 
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "📨 Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
