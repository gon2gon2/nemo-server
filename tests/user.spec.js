const request = require('supertest');
const app = require("../app")

it('GET /api/user 성공 시 status code === 200', async() => {
    const response = await request(app).get('/api/user');
    expect(response.statusCode).toBe(200);
})