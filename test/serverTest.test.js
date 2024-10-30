import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

beforeAll(async () => {
    const dbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/testdatabase';
    await mongoose.connect(dbUri);
});

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
