const Contact = require("../model/contactModel");

// ✅ Contact Form Data Save करें
const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Admin: Get All Contact Messages
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Admin: Delete a Contact Message by ID
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the contact exists
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }

        // Delete the contact message
        await Contact.findByIdAndDelete(id);

        res.status(200).json({ message: "Contact message deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { submitContactForm, getAllContacts, deleteContact };
