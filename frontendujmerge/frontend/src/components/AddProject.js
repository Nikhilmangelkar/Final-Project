import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/AddProject.css'; // Import the updated CSS file

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const jobSeekerId = user ? user.userId : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProject = {
            jobSeekerId,
            projectName,
            description,
            technologies,
            startDate,
            endDate,
        };

        try {
            const response = await axios.post('https://localhost:7210/api/projects', newProject, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Project created successfully!');
                navigate('/projects');
            } else {
                toast.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while creating the project.');
        }
    };

    return (
        <div className="add-project-container">
            <ToastContainer />
            <h2 className="header">Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Project Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Technologies:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;
