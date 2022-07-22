import { Router } from 'express';
import connections from '../controllers/connection.controller.js'
import cards from '../controllers/card.controller.js'
import db from '../models/index.js'
import upload from './multer.js'

const { Card } = db;

const router = Router();

export default app => {

  router.post('/create', upload.single('image'), async (req, res)=> {
    const {user_id, nickname, tag_1, tag_2, tag_3, intro} = req.body;
    const img_url = req.file.filename;

    const succ = await Card.create({user_id, nickname, tag_1, tag_2, tag_3, intro, img_url})
    if (succ){
      res.status(201).send("success");
    } else{
      res.status(404).send("fail");
      
    }
  })

  // 개별 명함
  router.get('/:user_id', async (req, res)=>{
    const {user_id} = req.params;
    const result = await cards.findWithUserId(user_id);
    res.send(result);
  })

  // 친구들 정보 불러오기
  router.get('/all/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const ids = await connections.findAllFriendsId(user_id);
    if (!ids.length) {
      res.send("no friend")
    } else {
      const allCards = await cards.findCards(ids);
      res.send({'cards' : allCards, 'friends' : ids});
    }
  })

  app.use('/api/card', router);
};
