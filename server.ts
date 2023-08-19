import express from 'express';
import { createRoutes } from './routes';
import {initDb} from './initDB';

const app = express();
app.use(express.json());

initDb()
  .then((pool) => {
    app.use(createRoutes(pool));
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
