
import request from 'supertest';
import app from "../app.js";

const base_url = '/api/friend'

describe(`${base_url} API에서는`, () => {
    it('친구 신청을 하면 200', (done)=> {
        request(app)
            .get(`${base_url}?id_1=987&id_2=678`)
            .then(res => {
                expect(res.statusCode).toBe(200);
                done()
            })
    })
})