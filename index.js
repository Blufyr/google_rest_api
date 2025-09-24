require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText',
      {
        prompt: { text: prompt },
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GOOGLE_API_KEY },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
