import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS symptoms(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS user_symptoms(
      user_id INTEGER REFERENCES users(id),
      symptom_id INTEGER REFERENCES symptoms(id),
      date DATE NOT NULL,
      severity INTEGER NOT NULL CHECK (severity >= 0 AND severity <= 10),
      PRIMARY KEY (user_id, symptom_id, date)
    );
  `);

  console.log("Database initialized successfully!");
  return pool;
};
