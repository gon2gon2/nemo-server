/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import { Router } from 'express';
import users from '../controllers/user.controller.js';
import cards from '../controllers/card.controller.js'
import upload from './multer.js'

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


  // 카드테이블은 카드대로, 유저정보는 유저대는 업데이트 해줘야 함
  // 아예 합쳐???
  router.post('/update', upload.any(), async (req, res)=> {
    const {user_id,intro, nickname, detail_title, detail_content, changed, tag_1, tag_2, tag_3} = req.body;
    const dataForCard = {user_id, tag_1, tag_2, tag_3, nickname, intro}
    const dataForUser = { detail_title, detail_content}
    dataForUser.id = user_id;
    
    // changed를 0,1,2 인덱싱 하면서 하나씩 update
    let i = 0;
    let imgIdx = 0;
    
    if(changed[i] === '1') {
      dataForCard.img_url = req.files[imgIdx].filename;
    }

    for(i=1; i<4; i+=1){
      if (changed[i] === '1') {
        dataForUser[`tag_img_url_${i+1}`] = req.files[imgIdx].filename;
        imgIdx += 1
      }
    }
    const resultOfUser = await users.updateUser(dataForUser);
    const resultOfCard = await cards.updateCard(dataForCard)

    if (resultOfUser[0] && resultOfCard[0]) {
      res.status(200).send("success");
    } else if (!resultOfUser[0] && resultOfCard[0]) {
      res.status(404).send("user fail");
    } else if (resultOfUser[0] && !resultOfCard[0]) {
      res.status(404).send("card fail");
    } else {
      res.status(404).send("all fail");
    }
  });

  app.use('/api/user', router);
};
