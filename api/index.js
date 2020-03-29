const express = require('express');

const { _getKeyValueRedis } = require('../worker/store/redis');

const app = express();

// Get jobs from Redis
app.get('/', async (req, res) => {
    const jobs = await _getKeyValueRedis();
    return res.send(jobs);
});

app.listen('3001', () => (
    console.log('server listening at port 3001')
));
