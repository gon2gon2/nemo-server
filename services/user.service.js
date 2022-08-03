import crypto from 'crypto';
import { Router } from 'express';
import users from '../controllers/user.controller.js';

const router = Router();

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });

const createHashedPassword = plainPassword =>
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9876, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString('base64'), salt });
    });
  });

const makeHasedPassword = (password, salt) =>
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(password, salt, 9876, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });

export default app => {
  /* 회원가입 */
  router.post('/signup', async (req, res) => {
    const { body } = req;
    const { password, salt } = await createHashedPassword(body.password);

    body.password = password;
    body.salt = salt;

    const result = await users.create(body);
    if (result[0]) {
      res.status(201).send({ result: 'success', id: result[1] });
    } else {
      res.status(400).send({ result: 'fail', msg: result[1] });
    }
  });

  /* 로그인 */
  router.post('/login', async (req, res) => {
    const { body } = req;
    const user = await users.findWithAccountName(body.account_name);
    if (!user) {
      res.status(404).send('존재하지 않는 아이디입니다.');
      return;
    }
    const user_data = user.dataValues;

    const hashedPassword = await makeHasedPassword(
      body.password,
      user_data.salt,
    );

    if (user_data.password === hashedPassword) {
      const user_id = user_data.id;
      res.status(200).send({ user_id });
    } else {
      // 비번 다른 경우에도 같은 처리
      res.status(404).send('비밀번호가 일치하지 않습니다.');
    }
  });

  router.post('/test', async (req, res) => {
    const { body } = req;

    const result = body;
    res.send(result);
  });

  app.use('/api/user', router);
};
