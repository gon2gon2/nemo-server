import { Router } from 'express';
import connections from '../controllers/connection.controller.js';
import chatrooms from '../controllers/chatroom.controller.js';
import chatmessages from '../controllers/chatmessage.controller.js';

const router = Router();

export default app => {
  router.get('/test', async (req, res) => {
    const { id_1, id_2 } = req.query;
    let chatroom;
    const idintlist = [id_1, id_2].map(i => parseInt(i, 10));
    function sortId(id1, id2) {
      return id1 - id2;
    }
    idintlist.sort(sortId);
    const users = JSON.stringify(idintlist);
    chatroom = await chatrooms.findChatRoom(users);
    // 여기서 chatroom을 못찾아서 비어있으면 생성해주기
    if (chatroom != null) {
      res.send(chatroom.id.toString()); // 참여할 채팅방 아이디만 돌려주면 되는경우
    } else {
      const connectionlist = await connections.findAllConnectionsIds(users);
      const conns = JSON.stringify(connectionlist);
      chatroom = await chatrooms.makeChatRoom(conns, users);
      res.send(chatroom.id.toString());
    }
  });

  router.get('/all', async (req, res) => {
    const { user_id } = req.query;
    const friends = await connections.findAllFriendsID(user_id);
    res.send(friends);
  });

  // 쿼리스트링사용
  router.get('/', async (req, res) => {
    const { id_1, id_2, lat, lng } = req.query;
    function sortId(id1, id2) {
      return id1 - id2;
    }
    const isFriend = await connections.isFriend(id_1, id_2);
    let result;
    if (isFriend) {
      result = true;
    } else {
      const idlist = [id_1, id_2];
      const idintlist = idlist.map(i => parseInt(i, 10));
      idintlist.sort(sortId);
      const ids = JSON.stringify(idintlist);
      result = await connections.connect(id_1, id_2, ids, lat, lng);
    }

    // 하나만 남기기. 하나만 남길수있게되면 그때 메세지방으로 본격적으로 활용.
    if (result) {
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
