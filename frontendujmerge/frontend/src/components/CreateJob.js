import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Config/axiosConfig';
import '../style/CreateJob.css'; 

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    industry: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobPayload = {
      ...jobData,
      employerId: user.userId,
      salary: parseFloat(jobData.salary) // Ensure salary is a number
    };

    try {
      const response = await axios.post('https://localhost:7210/api/Jobs/Create', jobPayload);
      if (response.status === 201) {
        navigate('/my-jobs'); // Redirect to 'My Jobs' page after successful creation
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="create-job-container">
      <h2 className="create-job-title">Create New Job</h2>
      <form className="create-job-form" onSubmit={handleSubmit}>
        <div className="create-job-form-group">
          <label className="create-job-label">Job Title</label>
          <input type="text" name="jobTitle" className="create-job-input" value={jobData.jobTitle} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Job Description</label>
          <textarea name="jobDescription" className="create-job-textarea" value={jobData.jobDescription} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Location</label>
          <input type="text" name="location" className="create-job-input" value={jobData.location} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Salary</label>
          <input type="number" name="salary" className="create-job-input" value={jobData.salary} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Job Type</label>
          <input type="text" name="jobType" className="create-job-input" value={jobData.jobType} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Experience Level</label>
          <input type="text" name="experienceLevel" className="create-job-input" value={jobData.experienceLevel} onChange={handleChange} required />
        </div>
        <div className="create-job-form-group">
          <label className="create-job-label">Industry</label>
          <input type="text" name="industry" className="create-job-input" value={jobData.industry} onChange={handleChange} required />
        </div>
        <button type="submit" className="create-job-button">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
