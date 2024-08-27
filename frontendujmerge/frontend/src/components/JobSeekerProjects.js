
import React, { useEffect, useState } from 'react';
import axios from '../Config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../style/JobSeekerProjects.css';

const JobSeekerProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = JSON.parse(localStorage.getItem('user'))?.userId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`https://localhost:7210/api/projects/GetByJobSeeker/${userId}`);
                console.log(response.data);
                // Check if the response data has the expected structure
                if (response.data && Array.isArray(response.data.$values)) {
                    setProjects(response.data.$values);
                } else {
                    setError('Unexpected response format');
                    toast.error('Unexpected response format');
                }
            } catch (err) {
                setError('An error occurred while fetching projects');
                toast.error('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };
    
        if (userId) {
            fetchProjects();
        } else {
            setError('No job seeker ID found');
            setLoading(false);
            toast.error('No job seeker ID found');
        }
    }, [userId]);
    
    

    const handleEdit = (projectId) => {
        navigate(`/edit-project/${projectId}`);
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`https://localhost:7210/api/Projects/Delete/${projectId}`);
                setProjects(projects.filter(project => project.projectId !== projectId));
                toast.success('Project deleted successfully');
            } catch (err) {
                setError('An error occurred while deleting the project');
                toast.error('Failed to delete project');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="job-seeker-projects">
            <ToastContainer />
            <h2>Your Projects</h2>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Technologies</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.projectId}>
                                <td>{project.projectName}</td>
                                <td>{project.description}</td>
                                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                                <td>{new Date(project.endDate).toLocaleDateString()}</td>
                                <td>{project.technologies}</td>
                                <td>
                                    <button onClick={() => handleEdit(project.projectId)} className="btn btn-primary btn-sm">Edit</button>
                                    <button onClick={() => handleDelete(project.projectId)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobSeekerProjects;
