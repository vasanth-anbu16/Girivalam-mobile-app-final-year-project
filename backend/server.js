require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Girivalam Tourism App Backend is Running 🚀");
});

// Feedback Route
app.post("/api/feedback", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("📥 Feedback received:", { name, email, message });

    if (!name || !message) {
        console.log("⚠️ Missing name or message");
        return res.status(400).json({ error: "Name and message are required." });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email to Admin
    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: "📝 New Feedback from Girivalam App",
        text: `
📨 New Feedback Received from Girivalam App

👤 Name: ${name}
📧 Email: ${email || "Not provided"}

📝 Message:
${message}
        `,
    };

    // Auto-reply to user
    const userReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🙏 Thank you for your feedback - Girivalam App",
        text: `Dear ${name},\n\nThank you for sharing your feedback with us! 🙏\n\nWe truly appreciate your time and support. Our team will review your message and get back to you if needed.\n\nOm Namah Shivaya 🕉️✨\n\n- Vasanth anbu`,
    };

    try {
        console.log("📤 Sending feedback to admin...");
        await transporter.sendMail(adminMailOptions);
        console.log("✅ Admin email sent");

        if (email) {
            console.log("📤 Sending auto-reply to user...");
            await transporter.sendMail(userReplyOptions);
            console.log("✅ Auto-reply sent");
        }

        res.status(200).json({ message: "Feedback sent and confirmation email delivered!" });
    } catch (error) {
        console.error("❌ Email send error:", error);
        res.status(500).json({ error: "Failed to send feedback or confirmation email." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
