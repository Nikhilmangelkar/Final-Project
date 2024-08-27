import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../Config/axiosConfig';
import '../style/Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    const [profilePic, setProfilePic] = useState('/default-profile.png');
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const role = user?.role;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        console.log(storedUser);

        const updateProfilePic = async () => {
            if (storedUser && storedUser.userId) {
                try {
                    const response = await axios.get(`https://localhost:7210/api/users/${storedUser.userId}/profile-picture`);
                    if (response.status === 200) {
                        let profilePictureUrl = response.data.profilePictureUrl?.replace(/\\/g, '/');
                        profilePictureUrl = profilePictureUrl?.replace(/^\/uploads\/profile_pictures\/uploads\/profile_pictures\//, '/uploads/profile_pictures/');
                        const fullUrl = `https://localhost:7210${profilePictureUrl}`;
                        setProfilePic(fullUrl);
                    } else {
                        console.error('Failed to fetch profile picture:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching profile picture:', error);
                }
            } else {
                setProfilePic('/default-profile.png');
            }
        };

        updateProfilePic();
        window.addEventListener('storage', updateProfilePic);

        return () => {
            window.removeEventListener('storage', updateProfilePic);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.dropdown-menu') && !event.target.closest('.profile-pic')) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            window.addEventListener('click', handleOutsideClick);
        } else {
            window.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                <img src="/images/file.png" alt="Logo" className="navbar-logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                    <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
                    <li className="nav-item"><Link to="/jobs" className="nav-link">Jobs</Link></li>
                    {role === 'Employer' ? (
                        <>
                            <li className="nav-item"><Link to={`/edit-employer-profile/${user?.userId}`} className="nav-link">Edit Profile</Link></li>
                            <li className="nav-item"><Link to="/create-job" className="nav-link">Create Job</Link></li>
                            <li className="nav-item"><Link to="/my-jobs" className="nav-link">My Jobs</Link></li>
                        </>
                    ) : role === 'JobSeeker' && (
                        <>
                            <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
                            <li className="nav-item"><Link to="/edit-profile" className="nav-link">Edit Profile</Link></li>
                            <li className="nav-item"><Link to="/projects" className="nav-link">My Projects</Link></li>
                            <li className="nav-item"><Link to="/add-project" className="nav-link">Add Project</Link></li>
                            <li className="nav-item"><Link to="/my-applications" className="nav-link">Application Status</Link></li>
                        </>
                    )}
                </ul>
                <ul className="navbar-nav ms-auto">
                    {user ? (
                        <li className="nav-item dropdown">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="profile-pic dropdown-toggle"
                                role="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-expanded={isDropdownOpen ? "true" : "false"}
                            />
                            {isDropdownOpen && (
    <div className="dropdown-menu dropdown-menu-end show">
        <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>View Profile</Link>
        {user.role === 'JobSeeker' ? (
            <Link to="/edit-profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Edit Profile</Link>
        ) : (
            <Link to={`/edit-employer-profile/${user.userId}`} className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Edit Profile</Link>
        )}
        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
    </div>
)}

                        </li>
                    ) : (
                        <>
                            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
                            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
