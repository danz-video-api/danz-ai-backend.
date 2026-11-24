
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("DANZ AI SERVER ONLINE!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Pesan tidak boleh kosong."
      });
    }

    const response = await ai.responses.create({
      model: "gpt-6.2-astra",
      instructions: "Kamu adalah DANZ AI, asisten AI yang ramah, pintar, dan menjawab dalam bahasa Indonesia.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Maaf, DANZ AI sedang mengalami gangguan."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("DANZ AI SERVER ONLINE!");
});
         
