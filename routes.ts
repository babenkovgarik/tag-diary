import { Router } from 'express';
import { Database } from './db';

export const createRoutes = (db: Database) => {
  const router = Router();

  router.get('/users', async (req, res) => {
    const user = await db.getUsers();
    res.json(user);
  });

  return router;
};
