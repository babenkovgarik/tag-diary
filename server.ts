import express from "express";
import {createRoutes} from "./routes";
import {initDb} from "./initDB";
import {Database} from "./db";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    database: process.env.DB_DATABASE!,
};

const app = express();
app.use(express.json());

initDb()
    .then(async (pool) => {
        const db = new Database(pool);

        await db.addUser("testUser,", "email@mail.ru");

        app.use(createRoutes(db));
        app.listen(3000, () => console.log("Server is running on port 3000"));
    })
    .catch((err) => {
        console.error("Failed to initialize database:", err);
        console.log(dbConfig);
        process.exit(1);
    });
