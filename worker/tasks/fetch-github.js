const fetch = require('node-fetch');
const { _setKeyValueRedis } = require('./store/redis');

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
};

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
    console.log(juniorJobs);
};

module.exports = fetchGithubJobs;
