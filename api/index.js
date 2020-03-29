const express = require('express');
const cors = require('cors');

const { _getKeyValueRedis } = require('../worker/store/redis');

const app = express();
app.use(cors());

// Get jobs from Redis
app.get('/jobs', async (req, res) => {
    const jobs = await _getKeyValueRedis();
    return res.send(jobs);
});

app.listen('3001', () => console.log('server listening at port 3001'));
