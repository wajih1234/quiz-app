const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.log('Redis error:', err.message));

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log('Redis disabled (no REDIS_URL)');
    return;
  }
  try {
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (err) {
    console.log('Redis connection failed:', err.message);
  }
};

module.exports = { redisClient, connectRedis };