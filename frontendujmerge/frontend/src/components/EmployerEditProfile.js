import React, { useEffect, useState } from 'react';
import axios from '../Config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../style/EmployerEditProfile.css'; // Import CSS for additional styling

const EmployerEditProfile = () => {
    const navigate = useNavigate();
    const [employer, setEmployer] = useState({
        employerId: '', // Add employerId to the state
        companyName: '',
        companyDescription: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const employerId = storedUser?.userId;

        if (employerId) {
            const fetchEmployer = async () => {
                try {
                    const response = await axios.get(`https://localhost:7210/api/Employers/GetById/${employerId}`);
                    setEmployer({
                        // employerId: response.data.employerId, // Make sure the ID is captured
                        companyName: response.data.companyName,
                        companyDescription: response.data.companyDescription,
                    });
                } catch (error) {
                    console.error('Error fetching employer:', error);
                    setErrorMessage('Failed to load employer details.');
                }
            };

            fetchEmployer();
        } else {
            setErrorMessage('Employer ID not found.');
        }
    }, []);

    const handleChange = (e) => {
        setEmployer({ ...employer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const storedUser = JSON.parse(localStorage.getItem('user'));
        const employerId = storedUser?.userId;

        if (employerId) {
            try {
                await axios.put(`https://localhost:7210/api/Employers/Update/${employerId}`, {
                    // employerId: employer.employerId, // Ensure the ID is sent in the request
                    companyName: employer.companyName,
                    companyDescription: employer.companyDescription,
                    updatedAt: new Date().toISOString(),
                });

                alert('Profile updated successfully');
                navigate('/employer-dashboard');
            } catch (error) {
                console.error('Error updating employer:', error);
                setErrorMessage('Failed to update profile. Please try again later.');
            }
        } else {
            setErrorMessage('Employer ID not found.');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Employer Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={employer.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyDescription">Company Description</label>
                    <textarea
                        id="companyDescription"
                        name="companyDescription"
                        value={employer.companyDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
};

export default EmployerEditProfile;
