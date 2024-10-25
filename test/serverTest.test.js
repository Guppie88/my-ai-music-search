const request = require('supertest');
const app = require('../app');  // Stig upp en nivå för att hitta app.js i projektets rotkatalog

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');

        // Kontrollera att statuskoden är 200
        expect(res.statusCode).toBe(200);

        // Kontrollera att vi får en array tillbaka
        expect(Array.isArray(res.body)).toBe(true);
    });
});
