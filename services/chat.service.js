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

  client.on('leave', data => {
    console.log('leave');
    client.leave(data);
  });

  // // listens for new messages coming in
  client.on('message', data => {
    // client.join(data.Room);
    console.log(data);
    // socketIO.emit("message", data["chatmodel"]); // emit은 해당 방에 있는 사람한테만 보낸다>
    client.to(data.chatroomID).emit('message', data);
    // socketIO.to(data.Room).emit('message', data); // message란 이름으로 내보낸다.
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
