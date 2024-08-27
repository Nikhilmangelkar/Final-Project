import React, { useState, useEffect } from 'react';
import axios from '../Config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/EditJob.css'; // Import your CSS file

const EditJob = () => {
    const [job, setJob] = useState({
        jobTitle: '',
        jobDescription: '',
        location: '',
        salary: '',
        jobType: '',
        experienceLevel: '',
        industry: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { jobId } = useParams();
    const navigate = useNavigate();

    // Get employerId from local storage
    const employerId = JSON.parse(localStorage.getItem('user'))?.userId;

    useEffect(() => {
        axios.get(`https://localhost:7210/api/Jobs/GetById/${jobId}`)
            .then(response => {
                setJob(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            });
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prevJob => ({
            ...prevJob,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add employerId to the job object
        const updatedJob = {
            ...job,
            employerId: employerId, // Add the employerId here
            updatedAt: new Date().toISOString() // Include updatedAt timestamp
        };

        axios.put(`https://localhost:7210/api/Jobs/Edit/${jobId}`, updatedJob)
            .then(() => {
                navigate('/my-jobs'); // Redirect to "My Jobs" after successful update
            })
            .catch(error => {
                setError(error.response?.data?.message || error.message);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="edit-job-container">
            <h2>Edit Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={job.jobTitle}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        name="jobDescription"
                        value={job.jobDescription}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobType">Job Type</label>
                    <input
                        type="text"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="experienceLevel">Experience Level</label>
                    <input
                        type="text"
                        name="experienceLevel"
                        value={job.experienceLevel}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={job.industry}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Job</button>
            </form>
        </div>
    );
};

export default EditJob;
