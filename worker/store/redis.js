const redis = require('redis');
const { promisify } = require("util");

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Set values into Redis
const _setKeyValueRedis = async (juniorJobs) => {
    return await setAsync('github', JSON.stringify(juniorJobs));
}

//get values from Redis
const _getKeyValueRedis = () => {
    return getAsync('github');
}

module.exports = {
    _getKeyValueRedis,
    _setKeyValueRedis
};
