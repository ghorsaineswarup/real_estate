import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/search', async (req, res) => {
  try {
    const { searchProperties } = await import('./search.js');
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });
    const result = await searchProperties(message, history || []);
    res.json(result);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));