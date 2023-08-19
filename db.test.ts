import { Pool } from 'pg';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { addUser, addSymptom, trackUserSymptom, getUserSymptoms } from './db';

let pool: MockProxy<Pool> & Pool;

beforeEach(() => {
  pool = mockDeep<Pool>();
});

describe('addUser', () => {
  it('adds a user to the database', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    
    await addUser(pool, name, email);
    
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
  });
});
