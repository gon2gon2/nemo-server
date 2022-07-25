import request from 'supertest';
import app from '../app.js';
import TIMELIMIT, { USER_ID_1, USER_ID_2 } from './const.js';
import db from '../models';

beforeAll(async () => await db.Connection.destroy({ where: {} }));

describe('/friend API에서는', () => {
  describe('생성이 잘 되어야 하는데', () => {
    test(
      'GET 친구 신청을 하면 200',
      done => {
        request(app)
          .get(`/api/friend?id_1=${USER_ID_1}&id_2=${USER_ID_2}`)
          .then(res => {
            expect(res.statusCode).toBe(200);
            done();
          });
      },
      TIMELIMIT,
    );
  });

  describe('생성이 잘 되면', () => {
    test(
      '현재 connection 수는 2',
      done => {
        request(app)
          .get('/api/friend/length-for-test')
          .then(res => {
            expect(res.body.result).toBe(2);
            done();
          });
      },
      TIMELIMIT,
    );
  });

  describe('삭제가 잘 되어야 하는데', () => {
    test(
      '/delete에 GET요청을 하면 200',
      done => {
        request(app)
          .get(`/api/friend/delete?id_1=${USER_ID_1}&id_2=${USER_ID_2}`)
          .then(res => {
            expect(res.statusCode).toBe(200);
            done();
          });
      },
      TIMELIMIT,
    );
  });

  describe('삭제가 잘 되면', () => {
    test(
      '현재 connection 수는 0',
      done => {
        request(app)
          .get('/api/friend/length-for-test')
          .then(res => {
            expect(res.body.result).toBe(0);
            done();
          });
      },
      TIMELIMIT,
    );
  });
});
