import request from 'supertest';
import app from '../app.js';
import TIMELIMIT, { USER_ID, USER_PW, USER_PN } from './const.js';
import db from '../models';

beforeAll(async () => await db.User.destroy({ where: {} }));

describe('/api/user에서', () => {
  /* 회원가입 테스트 */
  test(
    'POST /signup 성공 시 201',
    done => {
      request(app)
        .post('/api/user/signup')
        .set('Content-Type', 'application/json')
        .send({
          account_name: USER_ID,
          password: USER_PW,
          phone_number: USER_PN,
        })
        .then(response => {
          expect(response.statusCode).toBe(201);
          done();
        });
    },
    TIMELIMIT,
  );

  /* 로그인 테스트 */
  test(
    'POST /login 성공 시 200',
    done => {
      request(app)
        .post('/api/user/login')
        .set('Content-Type', 'application/json')
        .send({
          account_name: USER_ID,
          password: USER_PW,
        })
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    },
    TIMELIMIT,
  );

  // /* 중복 ID 테스트 */
  // test('POST /signup 중복ID면 400', (done) => {
  //     request(app)
  //         .post('/api/user/login')
  //         .set("Content-Type", "application/json")
  //         .send({
  //             account_name:USER_ID,
  //             password: USER_PW,
  //             phone_number: USER_PN,
  //         })
  //         .then((response) => {
  //             expect(response.statusCode).toBe(400);
  //             done();
  //         })}, TIMELIMIT)

  // /* 누락값 테스트 */
  // test('POST /signup 값 누락 시 400', (done) => {
  //     request(app)
  //         .post('/api/user/login')
  //         .set("Content-Type", "application/json")
  //         .send({
  //             account_name:USER_ID,
  //             phone_number: USER_PN,
  //         })
  //         .then((response) => {
  //             expect(response.statusCode).toBe(400);
  //             done();
  //         })}, TIMELIMIT)

  // /* 정보 수정 테스트 */
  // test('POST /update 성공 시 200', (done) => {
  //     request(app)
  //         .post('/api/profile/update')
  //         .set('Content-Type', 'multipart/form-data')
  //         .field('user_id', '1')
  //         .field('intro', '수정된한줄소개')
  //         .field('nickname','수정된닉넴')
  //         .field('detail_title', '나는 네모야')
  //         .field('detail_content', '내가 왜 네모냐면 어쩌고 저쩌고')
  //         .field('changed', '0000')
  //         .field('tag_1', '가나다')
  //         .field('tag_2', '나다가')
  //         .field('tag_3', '다나가')
  //         .then((response) => {
  //             console.log(response);
  //             expect(response.statusCode).toBe(200);
  //             done();
  //         })}, TIMELIMIT)
});
