const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: "localhost",
        port: 6379,
        password: "docker",
    },
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.log('Error: ' + err);
});

client.on('end', () => {
    console.log('Disconnected from Redis');
});

const set = async (key, value) => {
    await client.set(key, JSON.stringify(value));
}

const get = async (key) => {
    const value = await client.get(key);
    return JSON.parse(value);
}

const remove = async (key) => {
    await client.del(key);
}

module.exports = { client, get, set, remove };
