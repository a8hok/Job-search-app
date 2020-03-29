const fetch = require('node-fetch');

const fetchGithubJobs = async () => {
	let resultCount = 1,
		page = 0;
	const resultSet = [];
	const baseUrl = 'https://jobs.github.com/positions.json';
	while (resultCount > 0) {
		const response = await fetch(`${baseUrl}?page=${page}`);
		const jsonRes = await response.json();
		resultSet.push(...jsonRes);
		resultCount = jsonRes.length;
		page++;
		console.log(jsonRes.length);
	}
};

module.exports = fetchGithubJobs;
