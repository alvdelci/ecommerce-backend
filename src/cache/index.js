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
    await client.set(key, value);
}

const get = async (key) => {
    const value = await client.get(key);
    console.log(value);

    await client.disconnect();
    return value;
}

module.exports = { client, get, set };
