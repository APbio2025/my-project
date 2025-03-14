const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const CONTENT_DIR = path.join(__dirname, "content");

// New GET route for basic testing
app.get("/chat", (req, res) => {
    res.send("Chatbot API is running! Use POST /chat to interact.");
});

// Existing POST route for chatbot functionality
app.post("/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    let botResponse = await getBotResponse(message);
    res.json({ response: botResponse });
});

async function getBotResponse(userMessage) {
    try {
        const files = fs.readdirSync(CONTENT_DIR);
        let contentSummary = "Available study topics:\n";

        for (const file of files) {
            const content = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
            contentSummary += `- ${file}: ${content.substring(0, 100)}...\n`;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an IGCSE science tutor. Answer based on the following study content." },
                { role: "user", content: `Here are the topics:\n${contentSummary}\nQuestion: ${userMessage}` },
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return "I'm having trouble accessing study materials. Try again later.";
    }
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Chatbot server running on port ${PORT}`));
