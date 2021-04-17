const Queue = require('bull');

// Create new queue
const emailQueue = new Queue('sending_email', 'redis://127.0.0.1:6379', {
  limiter: {
    max: 1, // Maximal data per process
    duration: 2000 // Maximal duration per process
  }
});

const removeQueue = new Queue('remove_data', 'redis://127.0.0.1:6379', {
  limiter: {
    max: 1, // Maximal data per process
    duration: 2000 // Maximal duration per process
  }
});

const flushQueue = new Queue('flush_redis', 'redis://127.0.0.1:6379', {
  limiter: {
    max: 1, // Maximal data per process
    duration: 2000 // Maximal duration per process
  }
});

module.exports = {
  emailQueue,
  removeQueue,
  flushQueue
}