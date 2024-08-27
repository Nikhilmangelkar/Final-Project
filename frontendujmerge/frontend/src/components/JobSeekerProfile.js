
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../Config/axiosConfig';
// import '../style/JobSeekerProfile.css';

// const JobSeekerProfile = () => {
//     const [jobSeeker, setJobSeeker] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [profilePic, setProfilePic] = useState('/default-profile.png');
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [resumeFile, setResumeFile] = useState(null); // State to hold the resume file
//     const [resumeUrl, setResumeUrl] = useState(null); // State to hold the resume URL

//     const user = JSON.parse(localStorage.getItem('user'));
//     const userId = user?.userId;
//     const navigate = useNavigate();

//     const fetchResumeUrl = async () => {
//         try {
//             const response = await axios.get(`https://localhost:7210/api/JobSeekers/${userId}/resume`);
//             setResumeUrl(response.data.resumeUrl); // Set the URL directly
//         } catch (error) {
//             console.error('Error fetching resume link:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchJobSeekerProfile = async () => {
//             try {
//                 const response = await axios.get(`https://localhost:7210/api/JobSeekers/GetById/${userId}`);
//                 setJobSeeker(response.data);
//             } catch (error) {
//                 setError('Error fetching job seeker profile');
//                 console.error('Error fetching job seeker profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchProfilePic = async () => {
//             try {
//                 const response = await axios.get(`https://localhost:7210/api/users/${userId}/profile-picture`);
//                 let profilePictureUrl = response.data.profilePictureUrl?.replace(/\\/g, '/');
//                 profilePictureUrl = profilePictureUrl?.replace(/^\/uploads\/profile_pictures\/uploads\/profile_pictures\//, '/uploads/profile_pictures/');
//                 const fullUrl = `https://localhost:7210${profilePictureUrl}`;
//                 setProfilePic(fullUrl);
//             } catch (error) {
//                 console.error('Error fetching profile picture:', error);
//             }
//         };

//         fetchJobSeekerProfile();
//         fetchProfilePic();
//         fetchResumeUrl();
//     }, [userId]);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleResumeChange = (event) => {
//         setResumeFile(event.target.files[0]); // Handle resume file change
//     };

//     const handleChangeProfile = async () => {
//         if (!selectedFile) return;

//         const formData = new FormData();
//         formData.append('profilePicture', selectedFile);

//         try {
//             const response = await axios.post(`https://localhost:7210/api/users/upload-profile-picture/${userId}`, formData);
//             if (response.status === 200) {
//                 alert('Profile picture updated successfully!');
//                 setSelectedFile(null);
//                 window.location.reload();
//             } else {
//                 alert('Failed to update profile picture');
//             }
//         } catch (error) {
//             console.error('Error uploading profile picture:', error);
//             alert('Error uploading profile picture');
//         }
//     };

//     const handleUploadResume = async () => {
//         if (!resumeFile) return;

//         const formData = new FormData();
//         formData.append('resume', resumeFile); // Ensure the key name matches the expected server key

//         try {
//             const response = await axios.post(`https://localhost:7210/api/JobSeekers/UploadResume/${userId}`, formData);
//             if (response.status === 200) {
//                 alert('Resume uploaded successfully!');
//                 fetchResumeUrl(); // Refresh the resume URL
//                 setResumeFile(null);
//             } else {
//                 alert('Failed to upload resume');
//             }
//         } catch (error) {
//             console.error('Error uploading resume:', error);
//             alert('Error uploading resume');
//         }
//     };

//     const handleEditProfile = () => {
//         navigate('/edit-profile');
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//     if (!jobSeeker) return <p>No profile found</p>;

//     return (
//         <div className="job-seeker-profile-container">
//             <div className="profile-left">
//                 <img src={profilePic} alt="Profile" className="profile-picture" />
//                 <div className="profile-actions">
//                     <input type="file" onChange={handleFileChange} className="form-control-file" />
//                     <button onClick={handleChangeProfile} className="btn btn-primary">Change Profile Picture</button>
//                 </div>
//                 <div className="resume-actions">
//                     <input type="file" onChange={handleResumeChange} className="form-control-file" />
//                     <button onClick={handleUploadResume} className="btn btn-primary">Upload Resume</button>
//                 </div>
//             </div>
//             <div className="profile-right">
//                 <h2>{`${jobSeeker.firstName} ${jobSeeker.lastName}`}</h2>
//                 <p><strong>Description:</strong> {jobSeeker.description}</p>
//                 <p><strong>Skills:</strong> {jobSeeker.skills}</p>
//                 {resumeUrl && <p><strong>Resume:</strong> <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
//                 <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>
//             </div>
//         </div>
//     );
// };

// export default JobSeekerProfile;
//////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Config/axiosConfig';
import '../style/JobSeekerProfile.css';

const JobSeekerProfile = () => {
    const [jobSeeker, setJobSeeker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profilePic, setProfilePic] = useState('/default-profile.png');
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null); 
    const [resumeUrl, setResumeUrl] = useState(null); 

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId;
    const navigate = useNavigate();

    const fetchResumeUrl = async () => {
        try {
            const response = await axios.get(`https://localhost:7210/api/JobSeekers/${userId}/resume`);
            setResumeUrl(response.data.resumeUrl); 
        } catch (error) {
            console.error('Error fetching resume link:', error);
        }
    };

    useEffect(() => {
        const fetchJobSeekerProfile = async () => {
            try {
                const response = await axios.get(`https://localhost:7210/api/JobSeekers/GetById/${userId}`);
                setJobSeeker(response.data);
            } catch (error) {
                setError('Error fetching job seeker profile');
                console.error('Error fetching job seeker profile:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfilePic = async () => {
            try {
                const response = await axios.get(`https://localhost:7210/api/users/${userId}/profile-picture`);
                let profilePictureUrl = response.data.profilePictureUrl?.replace(/\\/g, '/');
                profilePictureUrl = profilePictureUrl?.replace(/^\/uploads\/profile_pictures\/uploads\/profile_pictures\//, '/uploads/profile_pictures/');
                const fullUrl = `https://localhost:7210${profilePictureUrl}`;
                setProfilePic(fullUrl);
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchJobSeekerProfile();
        fetchProfilePic();
        fetchResumeUrl();
    }, [userId]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleResumeChange = (event) => {
        setResumeFile(event.target.files[0]);
    };

    const handleChangeProfile = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await axios.post(`https://localhost:7210/api/users/upload-profile-picture/${userId}`, formData);
            if (response.status === 200) {
                alert('Profile picture updated successfully!');
                setSelectedFile(null);
                window.location.reload();
            } else {
                alert('Failed to update profile picture');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Error uploading profile picture');
        }
    };

    const handleUploadResume = async () => {
        if (!resumeFile) return;

        const formData = new FormData();
        formData.append('resumeFile', resumeFile); 

        try {
            const response = await axios.post(`https://localhost:7210/api/JobSeekers/UploadResume/${userId}`, formData);
            if (response.status === 200) {
                alert('Resume uploaded successfully!');
                fetchResumeUrl(); 
                setResumeFile(null);
            } else {
                alert(`Failed to upload resume: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert(`Error uploading resume: ${error.message}`);
        }
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!jobSeeker) return <p>No profile found</p>;

    return (
        <div className="job-seeker-profile-container">
            <div className="profile-left">
                <img src={profilePic} alt="Profile" className="profile-picture" />
                <div className="profile-actions">
                    <input type="file" onChange={handleFileChange} className="form-control-file" />
                    <button onClick={handleChangeProfile} className="btn btn-primary">Change Profile Picture</button>
                </div>
                <div className="resume-actions">
                    <input type="file" onChange={handleResumeChange} className="form-control-file" />
                    <button onClick={handleUploadResume} className="btn btn-primary">Upload Resume</button>
                </div>
            </div>
            <div className="profile-right">
                <h2>{`${jobSeeker.firstName} ${jobSeeker.lastName}`}</h2>
                <p><strong>Description:</strong> {jobSeeker.description}</p>
                <p><strong>Skills:</strong> {jobSeeker.skills}</p>
                {resumeUrl && <p><strong>Resume:</strong> <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
                <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>
            </div>
        </div>
    );
};

export default JobSeekerProfile;

