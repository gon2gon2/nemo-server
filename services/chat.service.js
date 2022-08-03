import connections from '../controllers/connection.controller.js';
import chatmessages from '../controllers/chatmessage.controller.js';
// const httpServer = require('http').createServer();
// const socketIO = require('socket.io')(httpServer);

// UPPERNAME = EVENT NAME

// CONNECTION : 연결이 발생하면, 연결된 클라이언트를 띄워준다
export default client => {
  console.log('Connected...', client.id);

  // TEST
  // client.join(data.Room);
  client.on('join', data => {
    console.log('join');
    client.join(data);
  });

  client.on('took', data => {
    console.log('took');
    client.to(data.chatroomID).emit('took', data);
    client.emit('took', data);
  });

  client.on('leave', data => {
    console.log('leave');
    client.leave(data);
  });

  // // listens for new messages coming in
  client.on('message', async data => {
    // client.join(data.Room);

    await chatmessages.postMessage(
      data.chatroomID,
      data.senderID,
      data.messagetext,
    );

    chatmessages.updateLastMsg(data.chatroomID, data.messagetext);
    // controller에서 상대방의 connection을 찾는다
    const connids = await connections.findConnectionId(
      data.senderID,
      data.receiverID,
    );
    connections.upreadCnt(connids[1]);
    connections.resetreadCnt(connids[0]);
    client.to(data.chatroomID).emit('message', data);
  });

  client.on('reset', async data => {
    connections.resetreadCnt(data);
    client.to(data.chatroomID).emit('reset', 'read');
  });

  // listens when a user is disconnected from the server
  client.on('disconnect', () => {
    console.log('Disconnected...', client.id);
  });

  // listens when there's an error detected and logs the error on the console
  client.on('error', err => {
    console.log('Error detected', client.id);
    console.log(err);
  });
};
