const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

let userList = new Map();

io.on('connection', (socket) => {
  let userName = socket.handshake.query.userName;
  addUser(userName, socket.id);

  console.log(`User connected: ${userName}, Socket ID: ${socket.id}`);

  socket.broadcast.emit('user-list', [...userList.keys()]);
  socket.emit('user-list', [...userList.keys()]);

  socket.on('message', (msg) => {
    console.log('Message received on server:', msg);
    io.emit('message-broadcast', { message: msg, userName: userName });
  });

  socket.on('disconnect', (reason) => {
    removeUser(userName, socket.id);
    console.log(`User disconnected: ${userName}, Socket ID: ${socket.id}`);
  });
});


function addUser(userName, id) {
  if (!userList.has(userName)) {
    userList.set(userName, new Set(id));
  } else {
    userList.get(userName).add(id);
  }
}

function removeUser(userName, id) {
  if (userList.has(userName)) {
    let userIds = userList.get(userName);
    userIds.delete(id);

    if (userIds.size === 0) {
      userList.delete(userName);
    }
  }
}

http.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running ${process.env.PORT || 3000}`);
});
