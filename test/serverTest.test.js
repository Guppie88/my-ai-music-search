const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);  // Kontrollera att du får en array tillbaka
    });
});
