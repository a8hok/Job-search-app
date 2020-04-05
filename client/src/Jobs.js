import React, {Fragment, useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Job from './Job';

const JOB_API_URL = 'http://localhost:3001/jobs';

// Fetch jobs from server
const fetchJobs = async (setJobCB) => {
    const response = await fetch(JOB_API_URL);
    const jobs = await response.json();
    setJobCB(jobs);
}

const Jobs = () => {
    const [jobList, setJobList] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobListCount = jobList.length;
    const numPages = Math.ceil(jobListCount / 50);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const jobsOnPage = jobList.slice(activeStep * 50, (activeStep * 50) + 50)

    useEffect(() => {
        fetchJobs(setJobList);
    }, []);

    return (
        <Fragment>
            <Typography variant="h4" component="h1"> 
                Entry level software Job list
            </Typography>
            <Typography variant="h6" component="h2"> 
                Found { jobListCount } Jobs
            </Typography>
            <div className="job-list">
                {
                    jobsOnPage.map(job => <Job job={job} />)
                }
            </div>
            <div>
                Page { activeStep + 1 } of { numPages }
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />
        </Fragment>
    )
}

export default Jobs;
