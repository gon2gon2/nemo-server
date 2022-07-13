/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import { Router } from 'express';
import users from '../controllers/user.controller.js';

const router = Router();

export default app => {

  /* 회원가입 */
  router.post('/signup', async (req, res) => {
    const {body} = req;
    const user = await users.create(body);
    res.status(201).send(user);
  });


  /* 로그인 */
  router.post('/login', async (req, res) => {
    const {body} = req;
    const user = await users.findWithAccountName(body.account_name);
    const user_data = user.dataValues;

    if (user_data.password === body.password){
      const user_id = user_data.id;
      res.status(200).send({user_id});
    }
    else { // 계정이 없거나 비번 다른 경우에도 같은 처리
      res.status(404).send("Not found");
    }
  });

  app.use('/api/user', router);
};
