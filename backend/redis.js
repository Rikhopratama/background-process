const { promisify } = require("util");
const redis = require('redis');
client = redis.createClient();

client.on('connect', function() {
  console.log('Redis is connected...')
})

client.on('error', function(err){
  console.log('Error ' + err);
});

module.exports = {
  client,
  getAsync: promisify(client.get).bind(client),
  hsetAsync: promisify(client.hset).bind(client),
  hgetallAsync: promisify(client.hgetall).bind(client),
  hdelAsync: promisify(client.hdel).bind(client)
}