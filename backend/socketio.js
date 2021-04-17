
module.exports = function(http) {
  const io = require('socket.io')(http, {
    cors: {
      origin: '*'
    }
  });

  const { hsetAsync, hgetallAsync, hdelAsync } = require('./redis');
  
  let getAllConnectedUsers;

  const emitAllConnectedUsers = async () => {
    getAllConnectedUsers = await hgetallAsync('connectedUsers');
    io.emit('connected-users', getAllConnectedUsers);
  }

  io.use(async (socket, next) => {
    console.log('SOCKET MIDDLEWARE')
    const clientId = socket.id;

    await hsetAsync('connectedUsers', clientId, '...');
    next()
  })
  
  io.on('connection', async function(socket) {
    console.log(`CLIENT CONNECT TO SOCKET`, socket.id);
    const clientId = socket.id;
  
    await emitAllConnectedUsers();
    
    socket.on('user-name', async (name) => {
      console.log('USER NAME', name)
      await hsetAsync('connectedUsers', clientId, name);
      await emitAllConnectedUsers();
    })


    socket.on('disconnecting', async () => {
      console.log('CLIENT DISCONNECT', socket.id)
      await hdelAsync('connectedUsers', socket.id)
      await emitAllConnectedUsers();

    })
  
  })


  return io;

}