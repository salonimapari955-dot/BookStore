import Contact from "../model/contact.model.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContact = async (req, res) => {
  try {
    const { name: rawName, email: rawEmail, message: rawMessage } =
      req.body || {};
    const name = rawName?.trim();
    const email = rawEmail?.trim().toLowerCase();
    const message = rawMessage?.trim();

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Your message has been sent successfully",
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.log("Contact Error:", error);

    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res
        .status(400)
        .json({ message: firstError?.message || "Invalid contact details" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
