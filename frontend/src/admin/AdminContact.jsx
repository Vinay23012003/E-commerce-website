import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllContacts, deleteContactMessage } from "../api/api"; // ✅ Correct Import

const AdminContacts = () => {
    const { token } = useSelector((state) => state.auth);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllContacts(token); // ✅ Correct API Call
                setContacts(data);
            } catch (error) {
                setError("❌ Failed to load contacts.");
            } finally {
                setLoading(false);
            }
        };

        loadContacts();
    }, [token]);

    const handleDeleteContact = async (id) => {
        if (!window.confirm("❌ Are you sure you want to delete this contact message?")) return;

        try {
            await deleteContactMessage(id, token);
            setContacts((prev) => prev.filter((contact) => contact._id !== id));
            alert("✅ Contact message deleted successfully!");
        } catch (error) {
            alert("⚠️ Failed to delete message. Please try again.");
        }
    };

    return (
        <div className="w-full min-h-screen p-10 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold text-center mb-8">Manage Contact Messages</h2>

            {error && <p className="text-center text-red-500">{error}</p>}
            {loading ? (
                <p className="text-center text-gray-400">⏳ Loading contacts...</p>
            ) : contacts.length === 0 ? (
                <p className="text-center text-gray-400">⚠️ No messages found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-slate-950 text-white">
                        <thead>
                            <tr className="bg-slate-700 text-gray-200">
                                <th className="p-5 text-left">Name</th>
                                <th className="p-5 text-left">Email</th>
                                <th className="p-5 text-left">Message</th>
                                <th className="p-5 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id} className="border-b border-slate-600 hover:bg-slate-700">
                                    <td className="p-5">{contact.name}</td>
                                    <td className="p-5">{contact.email}</td>
                                    <td className="p-5">{contact.message}</td>
                                    <td className="p-5">
                                        <button
                                            onClick={() => handleDeleteContact(contact._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminContacts;
