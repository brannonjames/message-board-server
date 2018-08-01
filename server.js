const app = require('express')();
const PORT = process.env.PORT || 8000;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const socketSetup = require('./services/socketio.js');
const mongoose = require('mongoose');

server.listen(PORT, () => console.log('server running'));

mongoose.set('degub', process.env.DB_DEBUG || false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/message-board', { useNewUrlParser: true });
mongoose.Promise = Promise;

socketSetup(io);




