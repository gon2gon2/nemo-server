import { Router } from 'express';
import connections from '../controllers/connection.controller.js';

const router = Router();

export default app => {
  router.get('/all', async (req, res) => {
    const { user_id } = req.query;
    const friends = await connections.findAllFriends(user_id);
    res.send(friends);
  });

  // 쿼리스트링사용
  router.get('/', async (req, res) => {
    const { id_1, id_2, lat, lng } = req.query;

    const result_1 = (await connections.isFriend(id_1, id_2, lat, lng))
      ? true
      : await connections.connect(id_1, id_2, lat, lng);
    const result_2 = (await connections.isFriend(id_2, id_1, lat, lng))
      ? true
      : await connections.connect(id_2, id_1, lat, lng);

    if (result_1 && result_2) {
      res.status(200).send({ result: 'success' });
    } else {
      res.status(400).send({ result: 'fail' });
    }
  });

  // json방식으로
  router.post('/', async (req, res) => {
    const { id_1, id_2 } = req.body;

    const result_1 = (await connections.isFriend(id_1, id_2))
      ? true
      : await connections.connect(id_1, id_2);
    const result_2 = (await connections.isFriend(id_2, id_1))
      ? true
      : await connections.connect(id_2, id_1);

    if (result_1 && result_2) {
      res.status(200).send({ result: 'success' });
    } else {
      res.status(400).send({ result: 'fail' });
    }
  });

  /* 친구 삭제(내 명함첩에서 삭제) */
  router.get('/delete', async (req, res) => {
    const { id_1, id_2 } = req.query;

    const result_1 = !(await connections.isFriend(id_1, id_2)) // 1->2 확인
      ? true
      : await connections.disconnect(id_1, id_2);
    const result_2 = !(await connections.isFriend(id_2, id_1))
      ? true
      : await connections.disconnect(id_2, id_1);

    if (result_1 && result_2) {
      res.status(200).send({ result: 'success' });
    } else {
      res.status(400).send({ result: 'fail' });
    }
  });

  /* 필요한 정보만 담아서 */
  router.get('/locs', async (req, res) => {
    const { user_id } = req.query;
    const result = await connections.findAllFriends(user_id);

    const real = result.map(item => {
      const { user_id_2, lat, lng, connection_date } = item;
      return { user_id: user_id_2, lat, lng, connection_date };
    }, result);
    res.send(real);
  });

  /* 테스트 코드용 API */
  router.get('/length-for-test', async (req, res) => {
    const result = await connections.getLength();
    res.send({ result });
  });

  router.get('/map', async (req, res) => {
    const { user_id } = req.query;
    const result = await connections.getMarkers(user_id);
    res.send({ result });
  });

  app.use('/api/friend', router);
};
