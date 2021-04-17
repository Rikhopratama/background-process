const { emailQueue, removeQueue, flushQueue } = require('./bull');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Add new job to queue
 */
const sendEmailQueue = (io, socketClientId) => {
  // Add message to email queue
  emailQueue.add({
    data:'Sending email',
    socketClientId
  });
}

const removeInactiveDataQueue = (io, socketClientId) => {
  // Add message to remove queue
  removeQueue.add({
    data:'Removing data',
    socketClientId
  });
}

const flushRedisQueue = (io, socketClientId) => {
  // Add message to flush queue
  flushQueue.add({
    data:'Flushing redis',
    socketClientId
  });
}

/**
 * Start queue worker
 */

const processEmailQueue = (io) => {
  // Processing email queue
  emailQueue.process(async function(job, done){
    for(let i = 0; i <= 100; i = i+20) {
      await delay(700)
      io.to(job.data.socketClientId).emit('progress-bar-email', i)
    }

    done();
  });
}

const processRemoveQueue = (io) => {
  // Processing remove queue
  removeQueue.process(async function(job, done){
    for(let i = 0; i <= 100; i = i+10) {
      await delay(700)
      io.to(job.data.socketClientId).emit('progress-bar-remove', i)
    }

    done();
  });
}

const processFlushQueue = (io) => {
  // Processing flush queue
  flushQueue.process(async function(job, done){
    for(let i = 0; i <= 100; i = i+20) {
      await delay(300)
      io.to(job.data.socketClientId).emit('progress-bar-flush', i)
    }

    done();
  });
}


module.exports = {
  sendEmailQueue,
  removeInactiveDataQueue,
  flushRedisQueue,

  processEmailQueue,
  processRemoveQueue,
  processFlushQueue
}