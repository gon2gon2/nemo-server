import sequelize from 'sequelize';
import db from '../models/index.js';

const Controller = {};
const { Chatmessage } = db;

// chatroom_id는 최초 접속시에 갖고 넘어오도록

Controller.postMessage = async (chatroom_id, sender, messagetext) => {
  const result = await Chatmessage.create({
    chatroom_id,
    sender,
    messagetext,
  });
  return result;
};

Controller.getMessagelist = async chatroom_id => {
  const messages = await Chatmessage.findAll({ where: { chatroom_id } });
  return messages;
};

Controller.updateLastMsg = async (chatroom_id, messagetext) => {
  const result = await db.sequelize.query(
    `UPDATE chatrooms SET last_msg_time = CURRENT_TIMESTAMP, last_msg_text = '${messagetext}' WHERE id = ${chatroom_id};`,
  );
  return result;
};

/*

     const postmsg = await chatmessages.postMessage(
      1,
      id_1,
      '안녕하세요',
      '2022-07-27T02:15:10.000Z',
    );
    console.log('pm');
    console.log(postmsg);

*/

// Controller.findChatRoom = async user_ids => {
//   const room = await Chatroom.findOne({
//     where: { user_ids },
//   });
//   return room ? room.dataValues : null;
// };
// /*
// const { id_1, id_2 } = req.query;
//     let chatroom;
//     const idintlist = [id_1, id_2].map(i => parseInt(i, 10)); // 지워도되려나
//     function sortId(id1, id2) {
//       return id1 - id2;
//     }
//     idintlist.sort(sortId);
//     const users = JSON.stringify(idintlist);
//     chatroom = await chatrooms.findChatRoom(users);
//     // 여기서 chatroom을 못찾아서 비어있으면 생성해주기
//     if (chatroom != null) {
//       res.send(chatroom.id.toString()); // 참여할 채팅방 아이디만 돌려주면 되는경우
//     } else {
//       const connectionlist = await connections.findAllConnectionsIds(users);
//       const conns = JSON.stringify(connectionlist);
//       chatroom = await chatrooms.makeChatRoom(conns, users);
//       res.send(chatroom.id.toString());
//     }
// */

// Controller.makeChatRoom = async (connection_ids, user_ids) => {
//   const room = await Chatroom.create({ connection_ids, user_ids });
//   const final_room = room.dataValues;
//   return final_room;
// };
// /*
// const connectionlist = await connections.findAllConnectionsIds(users);
//       const conns = JSON.stringify(connectionlist);
//       chatroom = await chatrooms.makeChatRoom(conns, users);
//       res.send(chatroom.id.toString());
// */

// Controller.getChatList = async user_id => {
//   const rooms = await Chatroom.findAll({
//     where: sequelize.where(
//       sequelize.fn(
//         'JSON_CONTAINS',
//         sequelize.col('user_ids'),
//         sequelize.literal(JSON.stringify(user_id)),
//         sequelize.literal(JSON.stringify('$')),
//       ),
//       1,
//     ),
//   });
//   const final_rooms = rooms
//     .filter(it => it.dataValues.last_msg_time != null)
//     .map(p => p.dataValues);
//   //   const ids = friends.map(item => item.dataValues.user_id_2);
//   return final_rooms; // 대화를 한번이라도 한 적이 있는 채팅방만 리턴
// };
// /*
//     const rooms = await chatrooms.getChatList(id_1);
//     console.log('chatlist');
//     console.log(rooms);
// */

export default Controller;
