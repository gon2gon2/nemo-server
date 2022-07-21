import request from 'supertest';
import app from "../app.js";
import TIMELIMIT from './const.js'
import db from '../models'

beforeAll( async() => await db.Connection.destroy({where: {}}))

describe('/friend API에서는', () => {
    test('GET 친구 신청을 하면 200', (done)=> {
        request(app)
            .get('/api/friend?id_1=987&id_2=678')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done()
            })
    }, TIMELIMIT)
})