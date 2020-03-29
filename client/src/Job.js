import React, {
    Fragment
} from 'react';

const Job = ({mockJob}) => {
    return (
        <Fragment>
            <div className="single-job">
                {mockJob.title} - 
                {mockJob.company}
            </div>
        </Fragment>
    )
}

export default Job;