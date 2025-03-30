import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../api/api";

const Profile = () => {
    const { token } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(token);
                console.log("Fetched Profile:", data);  // ✅ Debugging Purpose
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchProfile();
    }, [token]);

    if (loading) {
        return <div className="text-center text-white p-5">⏳ Loading profile...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">👤 User Profile</h2>
                {profile ? (
                    <div className="space-y-3">
                        <p><span className="font-semibold text-blue-300">Name:</span> {profile.name}</p>
                        <p><span className="font-semibold text-blue-300">Email:</span> {profile.email}</p>
                        <p><span className="font-semibold text-blue-300">Role:</span> {profile.role === "admin" ? "Admin" : "User"}</p>
                    </div>
                ) : (
                    <p className="text-center text-red-400">❌ Profile not found</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
