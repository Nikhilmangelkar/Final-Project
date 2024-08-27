import React, { useEffect, useState } from 'react';
import axios from '../Config/axiosConfig';
import { Link } from 'react-router-dom';
import '../style/EmployerJobs.css'; // Import CSS file for styling

const EmployerJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve userId from local storage
    const getUserIdFromLocalStorage = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.userId : null;
    };

    const userId = getUserIdFromLocalStorage();

    useEffect(() => {
        console.log('User ID:', userId);

        if (userId) {
            axios.get(`https://localhost:7210/api/Jobs/GetByEmployerId/${userId}`)
                .then(response => {
                    console.log('Jobs data:', response.data);
                    setJobs(response.data.$values || []); // Update with response data
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the jobs!", error.response || error.message || error);
                    setError('There was an error fetching the jobs.');
                    setLoading(false);
                });
        } else {
            console.error('User ID is not available.');
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="jobs-container">
            <h2>My Jobs</h2>
            {jobs.length > 0 ? (
                <div className="cards-container">
                    {jobs.map(job => (
                        <div className="job-card" key={job.jobId}>
                            <h3>{job.jobTitle}</h3>
                            <p>{job.jobDescription}</p>
                            <p><strong>Location:</strong> {job.location || 'N/A'}</p>
                            <p><strong>Salary:</strong> ${job.salary.toLocaleString() || 'N/A'}</p>
                            <p><strong>Job Type:</strong> {job.jobType || 'N/A'}</p>
                            <p><strong>Experience Level:</strong> {job.experienceLevel || 'N/A'}</p>
                            <p><strong>Industry:</strong> {job.industry || 'N/A'}</p>
                            
                            {/* Edit Job Button */}
                            <Link to={`/edit-job/${job.jobId}`} className="btn btn-primary">Edit Job</Link>
                            {/* View Applications Button */}
                            <Link to={`/view-applications/${job.jobId}`} className="btn btn-secondary">View Applications</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
}

export default EmployerJobs;
