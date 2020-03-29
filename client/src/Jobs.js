import React, {Fragment, useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import Job from './Job';

const JOB_API_URL = 'http://localhost:3001/jobs';

// Fetch jobs from server
const fetchJobs = async (setJobCB) => {
    const response = await fetch(JOB_API_URL);
    const jobs = await response.json();
    setJobCB(jobs);
}

const Jobs = () => {
    const [mockJobList, setJobList] = useState([]);

    useEffect(() => {
        fetchJobs(setJobList);
    }, []);

    return (
        <Fragment>
            <Typography variant="h4" component="h1"> 
                Entry level software Job list
            </Typography>
            <div className="job-list">
                {
                    mockJobList.map(job => <Job job={job} />)
                }
            </div>
        </Fragment>
    )
}

export default Jobs;
