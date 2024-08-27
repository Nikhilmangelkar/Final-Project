import React, { useEffect, useState } from 'react';
import axios from '../Config/axiosConfig';
import { useParams } from 'react-router-dom';
import '../style/JobSeekerProfileView.css'; // Import CSS file for styling

const JobSeekerProfileView = () => {
    const { jobSeekerId } = useParams(); // Get jobSeekerId from route parameters
    const [jobSeeker, setJobSeeker] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (jobSeekerId) {
            // Fetch Job Seeker details
            axios.get(`https://localhost:7210/api/JobSeekers/GetById/${jobSeekerId}`)
                .then(response => {
                    setJobSeeker(response.data);
                    return axios.get(`https://localhost:7210/api/JobSeekers/${jobSeekerId}/resume`);
                })
                .then(resumeResponse => {
                    setResumeUrl(resumeResponse.data.resumeUrl);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.response || error.message || error);
                    setLoading(false);
                });
        } else {
            console.error('Job Seeker ID is not available.');
            setLoading(false);
        }
    }, [jobSeekerId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error.message || 'An error occurred'}</div>;
    }

    return (
        <div className="jobseeker-profile-container">
            {jobSeeker ? (
                <div className="jobseeker-profile">
                    <h2>{jobSeeker.firstName} {jobSeeker.lastName}</h2>
                    <p><strong>Description:</strong> {jobSeeker.description}</p>
                    <p><strong>Skills:</strong> {jobSeeker.skills}</p>
                    {resumeUrl ? (
                        <p><strong>Resume:</strong> <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                    ) : (
                        <p><strong>Resume:</strong> Not available</p>
                    )}
                   
                </div>
            ) : (
                <p>No job seeker data available.</p>
            )}
        </div>
    );
}

export default JobSeekerProfileView;
