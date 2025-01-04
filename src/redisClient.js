const Redis = require('ioredis');

const redisClient = new Redis({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT 
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redisClient;
