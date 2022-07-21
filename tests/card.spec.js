import request from 'supertest';
import app from "../app.js";
import TIMELIMIT from './const.js'
import db from '../models'

beforeAll( async() => await db.Card.destroy({where: {}}))

describe('/api/card에서는 ', () => {
    /* 명함 생성 테스트 */
    test('POST /create 성공 시 201', (done) => {
        request(app)
            .post('/api/card/create')
            .set('Content-Type', 'multipart/form-data')
            .field('user_id', '9999')
            .field('nickname', '테스트닉네임')
            .field('tag_1', '태그1')
            .field('tag_2', '사랑')
            .field('tag_3', '테스트3')
            .field('intro', '안녕하세요?')
            .attach('image', './tests/dummy.png')
            .then((response) => {
                expect(response.statusCode).toBe(201);
                done();
            })}, TIMELIMIT)

    test('GET /all/:user_id를 요청하면 200', (done)=> {
        request(app)
            .get('/api/card/all/1')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done()
            })
    }, TIMELIMIT)

    test('GET /:user_id를 요청하면 200', (done)=> {
        request(app)
            .get('/api/card/1')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done()
            })
    }, TIMELIMIT)
})