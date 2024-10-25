const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');  // Lägg till mongoose för att stänga anslutningen

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async () => {
        // Stäng MongoDB-anslutningen efter att testerna har körts
        await mongoose.connection.close();
    });
});
