import { Router } from 'express';
import { Pool } from 'pg';
import { addUser, addSymptom, trackUserSymptom, getUserSymptoms } from './db';

export const createRoutes = (pool: Pool) => {
  const router = Router();

  router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await addUser(pool, name, email);
    res.json(user);
  });

  router.post('/symptoms', async (req, res) => {
    const { name, description } = req.body;
    const symptom = await addSymptom(pool, name, description);
    res.json(symptom);
  });

  router.post('/user_symptoms', async (req, res) => {
    const { userId, symptomId, date, severity } = req.body;
    const userSymptom = await trackUserSymptom(pool, userId, symptomId, new Date(date), severity);
    res.json(userSymptom);
  });

  router.get('/user_symptoms/:userId', async (req, res) => {
    const { userId } = req.params;
    const { date } = req.query;
    const userSymptoms = await getUserSymptoms(pool, Number(userId), new Date(String(date)));
    res.json(userSymptoms);
  });

  return router;
};
