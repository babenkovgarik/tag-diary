import { Pool } from 'pg';

export const addUser = async (pool: Pool, name: string, email: string) => {
  const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  return result.rows[0];
};

export const addSymptom = async (pool: Pool, name: string, description: string) => {
  const result = await pool.query('INSERT INTO symptoms (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
  return result.rows[0];
};

export const trackUserSymptom = async (pool: Pool, userId: number, symptomId: number, date: Date, severity: number) => {
  const result = await pool.query('INSERT INTO user_symptoms (user_id, symptom_id, date, severity) VALUES ($1, $2, $3, $4) RETURNING *', [userId, symptomId, date, severity]);
  return result.rows[0];
};

export const getUserSymptoms = async (pool: Pool, userId: number, date: Date) => {
  const result = await pool.query('SELECT * FROM user_symptoms WHERE user_id = $1 AND date = $2', [userId, date]);
  return result.rows;
};
