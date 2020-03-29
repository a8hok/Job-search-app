import React, {Fragment, useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';

import Job from './Job';

const Jobs = () => {
    const [mockJobList, setJobList] = useState([]);

    const setMockJob = () => {
        setJobList(
            [
                { title: 'Sr.Software Engineer', 'company': 'Facebook'},
                { title: 'Software Engineer', 'company': 'Google'},
                { title: 'Ass.Software Engineer', 'company': 'Youtube'},
            ]
        )
    }

    useEffect(() => {
        setMockJob();
    });

    return (
        <Fragment>
            <Typography variant="h1">
                Entry level software Job list
            </Typography>
            {
                mockJobList.map(job => <Job mockJob={job} />)
            }
        </Fragment>
    )
}

export default Jobs;
