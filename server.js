require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// API Route Example
app.get("/api/message", (req, res) => {
    res.json({ message: "Welcome to the IGCSE Science Chatbot API!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${3000}`);
});
