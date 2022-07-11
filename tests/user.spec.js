import request from 'supertest';
import app from "../app.js";

/* 회원가입 테스트 */
it('POST /api/user/signup 성공 시 201', (done) => {
    request(app)
        .post('/api/user/signup')
        .set("Content-Type", "application/json")
        .send({
            account_name:"계정명",
            password: '비밀번호',
            phone_number: '010-9999-9999'
        })
        .then((response) => {
            expect(response.statusCode).toBe(201);
            done();
        })})

