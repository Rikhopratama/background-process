const { sendEmailQueue, removeInactiveDataQueue, flushRedisQueue } = require('./queuing');

function routes (app, io) {

  app.get('/send_email', (req, res) => {
    const socketId = req.query.socketId;
     sendEmailQueue(io, socketId)
     res.send({
       message: 'Processing Send Email'
     })
   })

   app.get('/remove', (req, res) => {
    const socketId = req.query.socketId;
    removeInactiveDataQueue(io, socketId)
    res.send({
      message: 'Processing Remove Inactive Data'
    })
   })

   app.get('/flush', (req, res) => {
    const socketId = req.query.socketId;
    flushRedisQueue(io, socketId)
    res.send({
      message: 'Processing Flush Redis Data'
    })
   })

   
}

module.exports = routes;