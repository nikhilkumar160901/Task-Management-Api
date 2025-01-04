const Redis = require('ioredis');

// Connect to Redis
const redisClient = new Redis({
    host: '127.0.0.1', // Replace with your Redis server host
    port: 6379 // Replace with your Redis server port
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redisClient;
