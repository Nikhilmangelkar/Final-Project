import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/EmployerProfile.css'; // Import the CSS file for styling

const EmployerProfile = () => {
    const [employer, setEmployer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
            setUser(userData);
            const userId = userData.userId;

            if (userId) {
                // Fetch employer data using the userId
                axios.get(`https://localhost:7210/api/Employers/GetById/${userId}`)
                    .then(response => {
                        console.log('Employer data:', response.data); // Debugging
                        setEmployer(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching employer data:', error); // Debugging
                        setError('There was an error fetching the employer data!');
                        setLoading(false);
                    });
            } else {
                setError('UserId not found in user data');
                setLoading(false);
            }
        } else {
            setError('User data not found in local storage');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!employer) {
        return <div className="no-data">No employer data available.</div>;
    }

    return (
        <div className="employer-profile">
            <h1 className="profile-title">Employer Profile</h1>
            <div className="profile-section">
                <h2 className="company-name">{employer.companyName || 'Company Name'}</h2>
                <p className="company-description"><strong>Description:</strong> {employer.companyDescription || 'No description available.'}</p>
                
            </div>
            <div className="profile-section">
                <h3 className="contact-title">Contact Information</h3>
                <p><strong>Email:</strong> {user.email || 'No email available.'}</p>
            </div>
            <div className="profile-section">
                <h3 className="job-listings-title">Job Listings</h3>
                {employer.jobs && employer.jobs.$values && employer.jobs.$values.length > 0 ? (
                    <ul className="job-list">
                        {employer.jobs.$values.map((job, index) => (
                            <li key={index} className="job-item">
                                {job.jobTitle || 'No title'} - {job.jobDescription || 'No description'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No jobs listed.</p>
                )}
            </div>
        </div>
    );
};

export default EmployerProfile;
