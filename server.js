// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's dynamic port

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Root route test
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Chatbot endpoint
app.post("/chatbot", (req, res) => {
  const { message } = req.body;
  res.json({ response: `You said: ${message}` }); // Basic response
});

// Listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chatbot API is running on port ${PORT}`);
});


// script.js
const backendUrl = "https://your-backend-service.onrender.com"; // Replace with your Render URL

document.getElementById("sendButton").addEventListener("click", sendMessage);

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    // Display user message
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div class="user-message">${userInput}</div>`;

    try {
        const response = await fetch(`${backendUrl}/chatbot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        
        // Display bot response
        chatbox.innerHTML += `<div class="bot-message">${data.response}</div>`;

    } catch (error) {
        console.error("Error:", error);
        chatbox.innerHTML += `<div class="bot-message">Error: Backend not reachable</div>`;
    }

    document.getElementById("userInput").value = ""; // Clear input field
}
