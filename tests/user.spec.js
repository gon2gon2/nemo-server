import request from 'supertest';
import app from "../app.js";

describe('/api/user에서', () => {
    /* 회원가입 테스트 */
    it('POST /signup 성공 시 201', (done) => {
        request(app)
            .post('/api/user/signup')
            .set("Content-Type", "application/json")
            .send({
                account_name:'계정명',
                password: '비밀번호',
                phone_number: '010-9999-9999'
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                done();
            })})

    /* 로그인 테스트 */
    it('POST /login 성공 시 200', (done) => {
        request(app)
            .post('/api/user/login')
            .set("Content-Type", "application/json")
            .send({
                account_name:"셋",
                password: '789'
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })})
})
