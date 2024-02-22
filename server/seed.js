import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a table
db.query(
  `CREATE TABLE IF NOT EXISTS guestbook (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16),
    message VARCHAR(255)
  )`
);

// Insert
db.query(`INSERT INTO guestbook (username, message) VALUES ($1, $2)`, [
  'John',
  'Hello world!',
]);
