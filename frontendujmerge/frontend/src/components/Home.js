import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobType, setJobType] = useState('');

  const styles = {
    hero: {
      background: 'url(/images/home.png) no-repeat center center',
      backgroundSize: 'cover',
      color: 'black',
      width: '100%',
      maxWidth: '1600px',
      margin: 'auto',
      border: '3px solid white',
      padding: '180px 0',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
      position: 'relative',
    },
    heroTitle: {
      fontSize: '6rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    heroSubtitle: {
      fontSize: '1.6rem',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    },
    searchSection: {
      padding: '30px 20px',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      width: '300px',
      marginRight: '10px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ced4da',
    },
    searchButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    jobSection: {
      padding: '50px 0',
      background: '#fff',
    },
    jobList: {
      maxWidth: '1000px',
      margin: 'auto',
      listStyle: 'none',
      padding: 0,
    },
    jobItem: {
      padding: '20px',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
    },
    jobTitle: {
      fontSize: '1.5rem',
      color: '#007bff',
    },
    jobCompany: {
      fontSize: '1.1rem',
      color: '#6c757d',
    },
    jobDetails: {
      textAlign: 'right',
    },
    footer: {
      marginTop: '20px',
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '20px 0',
    },
    footerText: {
      margin: 0,
    },
    browseButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '1.2rem',
      marginTop: '20px',
    },
  };

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    console.log('Location Query:', locationQuery);
    console.log('Job Type:', jobType);
    // Add functionality to filter job listings based on these queries
  };

  return (
  
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to CareerConnect</h1>
        <p style={styles.heroSubtitle}>Your gateway to a brighter future. Find your dream job today!</p>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/jobs" style={styles.browseButton}>
          Browse Jobs
        </Link>
      </div>
      </div>
   
  );
};

export default HomePage;
