const cors = require('cors');
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('./socketio')(http);
const PORT = 4000;
const { router, setQueues, BullAdapter } = require('bull-board');

// Init redis
require('./redis');


// Init Queueing using bulljs
const { processEmailQueue, processRemoveQueue, processFlushQueue } = require('./queuing');
processEmailQueue(io); // Run worker to process all job in email queue
processRemoveQueue(io); // Run worker to process all job in remove queue
processFlushQueue(io); // Run worker to process all job in flush queue
setQueues([
  new BullAdapter(require('./bull').emailQueue),
  new BullAdapter(require('./bull').removeQueue),
  new BullAdapter(require('./bull').flushQueue)
]); // Set queue to bull js dashboard


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// Bull js dashboard to monitor queue
app.use('/monitor_queue', router);

// Routes
require('./routes')(app, io)


http.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
})