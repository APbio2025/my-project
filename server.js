require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; // Set allowed frontend

// Middleware
app.use(cors({ origin: FRONTEND_URL })); // Restrict CORS to frontend URL
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Route Example
app.get("/api/message", (req, res) => {
    res.json({ message: "Welcome to the IGCSE Science Chatbot API!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Serve Frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // Fix file extension
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
