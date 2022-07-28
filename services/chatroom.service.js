import { Router } from 'express';
import connections from '../controllers/connection.controller.js';
import cards from '../controllers/card.controller.js';
import upload from './multer.js';
import chatrooms from '../controllers/chatroom.controller.js';
import chatmessages from '../controllers/chatmessage.controller.js';

const router = Router();

export default app => {
  // 개별 명함
  router.get('/list', async (req, res) => {
    const { user_id } = req.query;
    let chatroomdata = await chatrooms.getChatList(user_id);
    console.log(chatroomdata);
    console.log('여기요 여기');
    if (chatroomdata.length === 0) {
      res.send('false');
	    return;
    }
    let rooms = chatroomdata.map(p => JSON.parse(p.connection_ids));
    const conns = [];
    rooms = rooms.map(p => p.filter(it => conns.push(it)));
    const frienddata = await connections.getChatroomDatas(user_id, rooms);
    chatroomdata = chatroomdata.map(p => [
      p.id,
      p.connection_ids,
      p.user_ids,
      p.last_msg_time,
      p.last_msg_text,
    ]);
    console.log(chatroomdata);
    console.log(frienddata);
    res.send({ chatroom: chatroomdata, data: frienddata });
  });

  router.get('/message', async (req, res) => {
    const { room_id } = req.query;
    const messagelist = await chatmessages.getMessagelist(room_id);
    console.log(messagelist);
    if (messagelist) {
      res.send(messagelist);
    } else {
      console.log('none');
      res.send(null);
    }
  });
  router.get('/enter', async (req, res) => {
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
  app.use('/api/chatroom', router);
};
