import {Pool} from "pg";

export class Database {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    end() {
        this.pool.end();
    }

    async addUser(name: string, email: string) {
        const result = await this.pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
        return result.rows[0];
    }

    async getUsers() {
        try {
            const result = await this.pool.query("SELECT * FROM users");
            return result.rows;
        } catch (error) {
            console.error("Error retrieving users:", error);
            throw error;
        }
    }
}
