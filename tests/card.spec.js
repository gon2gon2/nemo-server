import request from 'supertest';
import app from '../app.js';
import TIMELIMIT from './const.js';
import db from '../models';

beforeAll(async () => await db.Card.destroy({ where: {} }));
// beforeAll(async () => {
//   db.sequelize
//     .sync({ force: true })
//     .then(() => {
//       console.log('Synced db.');
//     })
//     .catch(err => {
//       console.log(`Failed to sync db: ${err.message}`);
//     });
// });

describe('/api/card에서는 ', () => {
  /* 명함 생성 테스트 */
  test(
    'POST /create 성공 시 201',
    done => {
      request(app)
        .post('/api/card/create')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', './tests/dummy.png')
        .attach('tag_img_1', './tests/dummy.png')
        .attach('tag_img_2', './tests/dummy.png')
        .attach('tag_img_3', './tests/dummy.png')
        .field('user_id', '9999')
        .field('nickname', '테스트닉네임')
        .field('tag_1', '태그1')
        .field('tag_2', '사랑')
        .field('tag_3', '테스트3')
        .field('intro', '안녕하세요?')
        .field('detail_title', '상세정보 제목')
        .field('detail_content', '상세정보 내용')
        .expect(201)
        .end(() => {
          done();
        });
    },
    TIMELIMIT,
  );

  test(
    'GET /all/:user_id를 요청하면 200',
    done => {
      request(app)
        .get('/api/card/all/1')
        .then(res => {
          expect(res.statusCode).toBe(200);
          done();
        });
    },
    TIMELIMIT,
  );

  test(
    'GET /:user_id를 요청하면 200',
    done => {
      request(app)
        .get('/api/card/1')
        .then(res => {
          expect(res.statusCode).toBe(200);
          done();
        });
    },
    TIMELIMIT,
  );
});
