const Message = require('../messageSchema');

module.exports = io => {

  io.sockets.on('connection', socket => {


    socket.on('subscribe', async room => {
      try {

        socket.join(room);
        let messages = await Message.find({ room });
        io.to(room).emit('load_initial_messages', messages);

      } catch (err) {

        io.to(room).emit('error', 'Something went wrong');

      }

    });

    socket.on('send_message', async message => {
      try {

        let newMessage = await Message.create(message);

        io.to(newMessage.room).emit('new_message', newMessage);

      } catch (err) {

        console.log(err);
        io.to(message.room).emit('error', 'Something went wrong');

      }
    });

    socket.on('delete_message', async message => {
      try {

        await Message.findByIdAndRemove(message._id);

        io.to(message.room).emit('message_was_deleted', message._id);

      } catch (err) {

        io.to(message.room).emit('error', 'Something went wrong');

      }
    });

  });
}