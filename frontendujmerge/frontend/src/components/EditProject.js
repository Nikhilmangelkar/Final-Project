import React, { useState, useEffect } from 'react';
import axios from '../Config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/EditProject.css';

const EditProject = () => {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [jobSeekerId, setJobSeekerId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7210/api/Projects/GetByProjectId/${projectId}`)
      .then(response => {
        const projectData = response.data;
        setProjectName(projectData.projectName);
        setDescription(projectData.description);
        setTechnologies(projectData.technologies);
        setStartDate(new Date(projectData.startDate).toISOString().split('T')[0]);
        setEndDate(new Date(projectData.endDate).toISOString().split('T')[0]);
        setJobSeekerId(projectData.jobSeekerId); // Set the jobSeekerId
      })
      .catch(error => {
        console.error(error);
      });
  }, [projectId]);

  const handleUpdateProject = (event) => {
    event.preventDefault();
    const updatedProject = {
      projectId,
      jobSeekerId, // Include jobSeekerId in the request body
      projectName,
      description,
      technologies,
      startDate,
      endDate
    };
    axios.put(`https://localhost:7210/api/Projects/Update/${projectId}`, updatedProject)
      .then(response => {
        console.log(response.data);
        navigate('/projects'); // Redirect to JobSeekerProjects page after update
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="edit-project-container">
      <h1 className="edit-project-header">Edit Project</h1>
      <form className="edit-project-form" onSubmit={handleUpdateProject}>
        <div className="edit-project-form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            className="edit-project-form-control"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
        </div>
        <div className="edit-project-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="edit-project-form-control edit-project-form-textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="edit-project-form-group">
          <label htmlFor="technologies">Technologies:</label>
          <input
            type="text"
            id="technologies"
            className="edit-project-form-control"
            value={technologies}
            onChange={(event) => setTechnologies(event.target.value)}
          />
        </div>
        <div className="edit-project-form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            className="edit-project-form-control"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="edit-project-form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            className="edit-project-form-control"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <button type="submit" className="edit-project-submit-btn">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
