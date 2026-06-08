import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchProperties } from './search.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/search', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  try {
    const result = await searchProperties(message, history || []);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3001, () =>
  console.log('Backend running on http://localhost:3001')
);
