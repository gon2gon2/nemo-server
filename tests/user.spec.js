import request from 'supertest';
import app from "../app.js";
import TIMELIMIT, {USER_ID, USER_PW, USER_PN} from './const.js'
import db from '../models'

beforeAll( async() => await db.User.destroy({where: {}}))

describe('/api/user에서', () => {
    /* 회원가입 테스트 */
    test('POST /signup 성공 시 201', (done) => {
        request(app)
            .post('/api/user/signup')
            .set("Content-Type", "application/json")
            .send({
                account_name: USER_ID,
                password: USER_PW, 
                phone_number: USER_PN,
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                done();
            })}, TIMELIMIT)

    /* 로그인 테스트 */
    test('POST /login 성공 시 200', (done) => {
        request(app)
            .post('/api/user/login')
            .set("Content-Type", "application/json")
            .send({
                account_name:USER_ID,
                password: USER_PW
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })}, TIMELIMIT)
})
