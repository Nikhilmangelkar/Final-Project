import React, { useEffect, useState } from 'react';
import axios from '../Config/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import '../style/ViewApplications.css'; // Import CSS file for styling

const ViewApplications = () => {
    const { jobId } = useParams(); // Get jobId from route parameters
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jobId) {
            axios.get(`https://localhost:7210/api/Applications/GetByJobId/${jobId}`)
                .then(response => {
                    // Access the application data from response
                    setApplications(response.data.$values || []);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the applications!", error.response || error.message || error);
                    setLoading(false);
                });
        } else {
            console.error('Job ID is not available.');
            setLoading(false);
        }
    }, [jobId]);

    const handleStatusChange = (applicationId, newStatus) => {
        // Make an API call to update the application status
        axios.put(`https://localhost:7210/api/Applications/UpdateStatus/${applicationId}`, newStatus, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                // Update the status locally after the API call is successful
                setApplications(applications.map(application =>
                    application.applicationId === applicationId ? { ...application, status: newStatus } : application
                ));
            })
            .catch(error => {
                console.error("There was an error updating the application status!", error.response || error.message || error);
            });
    };
    
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="applications-container">
            <h2>Applications for Job ID: {jobId}</h2>
            {applications.length > 0 ? (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Job Seeker ID</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>View Profile</th>
                            <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application.applicationId}>
                                <td>{application.applicationId}</td>
                                <td>{application.jobSeekerId}</td>
                                <td>{application.status}</td>
                                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(application.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/job-seeker-profile/${application.jobSeekerId}`} className="btn btn-info">
                                        View Profile
                                    </Link>
                                </td>
                                <td>
                                    <select
                                        value={application.status}
                                        onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Selected">Selected</option>
                                        <option value="Viewed">Viewed</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No applications found for this job.</p>
            )}
        </div>
    );
}

export default ViewApplications;
