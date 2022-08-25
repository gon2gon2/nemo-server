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


export default Controller;
