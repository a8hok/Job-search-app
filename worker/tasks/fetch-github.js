const fetch = require('node-fetch');
const redis = require('redis');
const { promisify } = require("util");

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Set values into Redis
const _setKeyValueRedis = async (juniorJobs) => {
    const setJobsRedis = await setAsync('github', JSON.stringify(juniorJobs));
    console.log(juniorJobs.length);
}

// Filter Junior jobs only
const _filterJuniorJobs = (allJobs) => {
    return allJobs.filter((job) => {
        const jobTitle = job.title.toLowerCase();
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) {
            return false;
        }
        return true;
    });
}

// Fetch jobs from github api
const fetchGithubJobs = async () => {
    let resultCount = 1;
    let page = 0;
    const allJobs = [];
    const baseUrl = 'https://jobs.github.com/positions.json';
    while (resultCount > 0) {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const jsonRes = await response.json();
        allJobs.push(...jsonRes);
        resultCount = jsonRes.length;
        page++;
        console.log(jsonRes.length);
    }
    const juniorJobs = _filterJuniorJobs(allJobs);
    _setKeyValueRedis(juniorJobs);
};

module.exports = fetchGithubJobs;
