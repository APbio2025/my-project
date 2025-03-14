require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Route Example
app.get("/api/message", (req, res) => {
    res.json({ message: "Welcome to the IGCSE Science Chatbot API!" });
});

// Serve Frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
