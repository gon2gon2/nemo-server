import sequelize from 'sequelize';
import db from '../models/index.js';
import connections from './connection.controller.js';

const Controller = {};
const { Chatroom } = db;

Controller.findChatRoom = async user_ids => {
  const room = await Chatroom.findOne({
    where: { user_ids },
  });
  return room ? room.dataValues : null;
};
/*
const { id_1, id_2 } = req.query;
    let chatroom;
    const idintlist = [id_1, id_2].map(i => parseInt(i, 10)); // 지워도되려나
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
*/

Controller.makeChatRoom = async (connection_ids, user_ids) => {
  const room = await Chatroom.create({ connection_ids, user_ids });
  const final_room = room.dataValues;
  return final_room;
};
/* 
const connectionlist = await connections.findAllConnectionsIds(users);
      const conns = JSON.stringify(connectionlist);
      chatroom = await chatrooms.makeChatRoom(conns, users);
      res.send(chatroom.id.toString());
*/
// SELECT * FROM cards AS ca JOIN connections AS conn ON ca.user_id = conn.user_id_2 WHERE conn.id in (11,12,13,14,15,16,17);
Controller.getChatList = async user_id => {
  const rooms = await Chatroom.findAll({
    where: sequelize.where(
      sequelize.fn(
        'JSON_CONTAINS',
        sequelize.col('user_ids'),
        sequelize.literal(JSON.stringify(user_id)),
        sequelize.literal(JSON.stringify('$')),
      ),
      1,
    ),
  });
  const final_rooms = rooms
    .filter(it => it.dataValues.last_msg_time != null) // != null
    .map(p => p.dataValues);
  //   const ids = friends.map(item => item.dataValues.user_id_2);
  return final_rooms; // 대화를 한번이라도 한 적이 있는 채팅방만 리턴
};
/* 
    const rooms = await chatrooms.getChatList(id_1);
    console.log('chatlist');
    console.log(rooms);
*/

// Controller.registerMessage = async chatroom_id => {};

export default Controller;
