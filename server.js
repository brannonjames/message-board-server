const app = require('express')();
const server = app.listen(8000, () => console.log('server running'));
const io = require('socket.io')(server);
const socketSetup = require('./services/socketio.js');
const mongoose = require('mongoose');

mongoose.set('degub', process.env.DB_DEBUG || false);
mongoose.connect('mongodb://localhost:27017/message-board', { useNewUrlParser: true });
mongoose.Promise = Promise;

socketSetup(io);




