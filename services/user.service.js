/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import { Router } from 'express';
import users from '../controllers/user.controller.js';

const router = Router();

export default app => {

  /* 회원가입 */
  router.post('/signup', async (req, res) => {
    const {body} = req;
    const result = await users.create(body);
    if (result[0]) {
      res.status(201).send({"result": "success", "id":result[1]})
    } else {
      res.status(400).send({"result": "fail", "msg":result[1]})
    }
  });


  /* 로그인 */
  router.post('/login', async (req, res) => {
    const {body} = req;
    const user = await users.findWithAccountName(body.account_name);
    if (!user){
      res.status(404).send("존재하지 않는 아이디입니다.")
      return;
    }
    const user_data = user.dataValues;

    if (user_data.password === body.password){
      const user_id = user_data.id;
      res.status(200).send({user_id});
    }
    else { // 비번 다른 경우에도 같은 처리
      res.status(404).send("비밀번호가 일치하지 않습니다.");
    }
  });

  app.use('/api/user', router);
};
