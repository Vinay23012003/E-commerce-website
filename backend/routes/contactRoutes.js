const express = require("express");
const { submitContactForm, getAllContacts, deleteContact } = require("../controllers/contactController");
const { admin, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", submitContactForm);
router.get("/all", protect, admin, getAllContacts);
router.delete("/delete/:id", protect,admin, deleteContact);

module.exports = router;
