import { Router } from 'express';
import connections from '../controllers/connection.controller.js';
import cards from '../controllers/card.controller.js';
import upload from './multer.js';

const router = Router();

export default app => {
  router.post('/create', upload.any(), async (req, res) => {
    const {
      user_id,
      intro,
      nickname,
      detail_title,
      detail_content,
      tag_1,
      tag_2,
      tag_3,
    } = req.body;

    const data = {
      user_id,
      tag_1,
      tag_2,
      tag_3,
      nickname,
      intro,
      detail_title,
      detail_content,
    };

    for (let i = 0; i < req.files.length; i += 1) {
      const f = req.files[i];
      data[f.fieldname] = f.filename;
    }

    const result = await cards.create(data);

    if (result) {
      res.status(201).send('success');
    } else {
      res.status(400).send('fail');
    }
  });

  // 개별 명함
  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const result = await cards.findWithUserId(user_id);
    res.send(result);
  });

  // 친구들 정보 불러오기
  router.get('/all/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const ids = await connections.findAllFriendsId(user_id);
    if (!ids.length) {
      res.send('no friend');
    } else {
      const allCards = await cards.findCards(ids);
      res.send({ cards: allCards, friends: ids });
    }
  });

  // 카드테이블은 카드대로, 유저정보는 유저대는 업데이트 해줘야 함
  // 아예 합쳐???
  router.post('/update', upload.any(), async (req, res) => {
    const {
      user_id,
      intro,
      nickname,
      detail_title,
      detail_content,
      tag_1,
      tag_2,
      tag_3,
    } = req.body;

    const data = {
      user_id,
      tag_1,
      tag_2,
      tag_3,
      nickname,
      intro,
      detail_title,
      detail_content,
    };

    for (let i = 0; i < req.files.length; i += 1) {
      const f = req.files[i];
      data[f.fieldname] = f.filename;
    }

    const result = await cards.updateCard(data);
    console.log('결과', result);

    if (result) {
      res.status(200).send('success');
    } else {
      res.status(404).send('fail');
    }
  });
  app.use('/api/card', router);
};
