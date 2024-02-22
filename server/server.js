import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// Set up root route
app.get('/', (req, res) => {
  res.send('Root route!');
});

// Get
app.get('/users', async (req, res) => {
  const res = await db.query(`SELECT * FROM guestbook`);
  res.json(res.rows);
});

// Post
app.post('/users', async (req, res) => {
  const { username, message } = req.body;
  const res = await db.query(
    `INSERT INTO guestbook (username, message) VALUES ($1, $2)`,
    [username, message]
  );
  res.json(res.rows);
});

// Update
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, message } = req.body;
  const res = await db.query(
    `UPDATE guestbook SET username = $1, message = $2 WHERE id = $3`,
    [username, message, id]
  );
  res.json(res.rows);
});

// Delete
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const res = await db.query(`DELETE FROM guestbook WHERE id = $1`, [id]);
  res.json(res.rows);
});
