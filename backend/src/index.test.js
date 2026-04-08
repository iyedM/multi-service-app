const request = require('supertest');
const app = require('./index');

describe('Backend API Tests', () => {
    test('GET /api/health should return status OK', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('OK');
    });

    test('GET /api/items should return array of items', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/items should create a new item', async () => {
        const newItem = { name: 'Test Item', description: 'Test Description' };
        const response = await request(app)
            .post('/api/items')
            .send(newItem);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newItem.name);
    });

    test('POST /api/items should fail without name', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({ description: 'No name here' });
        expect(response.statusCode).toBe(400);
    });
});
