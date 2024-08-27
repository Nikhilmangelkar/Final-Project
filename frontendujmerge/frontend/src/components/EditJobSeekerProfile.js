import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Config/axiosConfig';
import '../style/EditJobSeekerProfile.css';

const EditJobSeekerProfile = () => {
    const [jobSeeker, setJobSeeker] = useState({
        firstName: '',
        lastName: '',
        description: '',
        skills: '',
       
    });

    const userId = JSON.parse(localStorage.getItem('user'))?.userId;
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            axios.get(`https://localhost:7210/api/JobSeekers/GetById/${userId}`)
                .then((response) => setJobSeeker(response.data))
                .catch((error) => console.error('Error fetching job seeker:', error));
        }
    }, [userId]);

    const handleChange = (e) => {
        setJobSeeker({
            ...jobSeeker,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`https://localhost:7210/api/JobSeekers/Update/${userId}`, jobSeeker
        //     , {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }
        )
            .then((response) => {
                if (response.status === 200) {
                    navigate('/profile');
                } else {
                    console.error('Failed to update job seeker profile');
                }
            })
            .catch((error) => console.error('Error updating job seeker profile:', error));
    };

    return (
        <div className="edit-profile-container mt-4">
        <h2 className="edit-profile-header">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            <div className="edit-profile-form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    className="edit-profile-form-control"
                    id="firstName"
                    name="firstName"
                    value={jobSeeker.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="edit-profile-form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    className="edit-profile-form-control"
                    id="lastName"
                    name="lastName"
                    value={jobSeeker.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="edit-profile-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="edit-profile-form-control edit-profile-form-textarea"
                    id="description"
                    name="description"
                    value={jobSeeker.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="edit-profile-form-group">
                <label htmlFor="skills">Skills</label>
                <input
                    type="text"
                    className="edit-profile-form-control"
                    id="skills"
                    name="skills"
                    value={jobSeeker.skills}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="edit-profile-btn-primary">Save</button>
        </form>
    </div>
    
    );
};

export default EditJobSeekerProfile;
