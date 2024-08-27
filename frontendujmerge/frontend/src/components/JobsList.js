import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import axios from '../Config/axiosConfig';
import '../style/JobsList.css';

const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        jobType: '',
        location: '',
        experienceLevel: '',
        industry: ''
    });
    const [appliedJobs, setAppliedJobs] = useState([]); // Track applied jobs

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('https://localhost:7210/api/Jobs/GetAll');
                // Access jobs from the response body
                const jobsData = response.data.$values || [];
                setJobs(jobsData);
                setFilteredJobs(jobsData); // Initially show all jobs
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const updatedJobs = jobs.filter(job => {
            return (
                job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (filters.jobType ? job.jobType === filters.jobType : true) &&
                (filters.location ? job.location === filters.location : true) &&
                (filters.experienceLevel ? job.experienceLevel === filters.experienceLevel : true) &&
                (filters.industry ? job.industry === filters.industry : true)
            );
        });

        setFilteredJobs(updatedJobs);
    }, [searchQuery, filters, jobs]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleApply = async (jobId) => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.userId) {
            alert('Please log in to apply for jobs.');
            return;
        }

        const jobSeekerId = user.userId;

        const applicationData = {
            jobId,
            jobSeekerId,
            status: 'Pending',
            coverLetter: '', // Add cover letter if applicable
        };

        try {
            const response = await axios.post('https://localhost:7210/api/Applications/Create', applicationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Application submitted successfully!');
            setAppliedJobs(prevState => [...prevState, jobId]); // Mark the job as applied
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('An error occurred while applying for the job. Please try again.');
        }
    };

    if (loading) return <p className="text-center mt-5">Loading jobs...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error loading jobs: {error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Job Listings</h2>

            <div className="mb-4 d-flex">
                <div className="position-relative flex-grow-1">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <FaSearch className="position-absolute search-icon" />
                </div>
            </div>

            <div className="mb-4">
                <form>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="jobType"
                                value={filters.jobType}
                                onChange={handleFilterChange}
                            >
                                <option value="">Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                            >
                                <option value="">Location</option>
                                <option value="San Francisco, CA">San Francisco, CA</option>
                                <option value="New York, NY">New York, NY</option>
                                <option value="Los Angeles, CA">Los Angeles, CA</option>
                                <option value="Chicago, IL">Chicago, IL</option>
                                <option value="Austin, TX">Austin, TX</option>
                                <option value="Boston, MA">Boston, MA</option>
                                <option value="Seattle, WA">Seattle, WA</option>
                                <option value="Miami, FL">Miami, FL</option>
                                <option value="Dallas, TX">Dallas, TX</option>
                                <option value="Philadelphia, PA">Philadelphia, PA</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="experienceLevel"
                                value={filters.experienceLevel}
                                onChange={handleFilterChange}
                            >
                                <option value="">Experience Level</option>
                                <option value="Entry-level">Entry-level</option>
                                <option value="Mid-level">Mid-level</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="industry"
                                value={filters.industry}
                                onChange={handleFilterChange}
                            >
                                <option value="">Industry</option>
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Finance">Finance</option>
                                <option value="Energy">Energy</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Retail">Retail</option>
                                <option value="Logistics">Logistics</option>
                                <option value="Pharmaceutical">Pharmaceutical</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div className="row">
                {filteredJobs.length > 0 ? filteredJobs.map(job => (
                    <div key={job.jobId} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{job.jobTitle}</h5>
                                <p className="card-text">{job.jobDescription}</p>
                                <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                <p className="card-text"><strong>Salary:</strong> ${job.salary}</p>
                                <p className="card-text"><strong>Job Type:</strong> {job.jobType}</p>
                                <p className="card-text"><strong>Experience Level:</strong> {job.experienceLevel}</p>
                                <p className="card-text"><strong>Industry:</strong> {job.industry}</p>
                                <button
                                    className={`btn ${appliedJobs.includes(job.jobId) ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => handleApply(job.jobId)}
                                    disabled={appliedJobs.includes(job.jobId)} // Disable button if applied
                                >
                                    {appliedJobs.includes(job.jobId) ? 'Applied' : 'Apply'}
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-center">No jobs found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default JobsList;
