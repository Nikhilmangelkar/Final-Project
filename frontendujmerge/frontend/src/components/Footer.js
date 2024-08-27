// src/components/Footer.js
import React from 'react';
import '../style/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2>CareerConnect</h2>
                    <p>Connecting top talent with leading employers. Your go-to platform for finding your dream job or the perfect candidate.</p>
                </div>
                
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/jobs">Browse Jobs</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>

                 {/* Replace the Subscribe Section with a Latest Blog Posts section */}
                 <div className="footer-section latest-posts">
                    <h3>Latest Blog Posts</h3>
                    <ul>
                        <li><a href="/blog/post-1">How to Prepare for a Job Interview</a></li>
                        <li><a href="/blog/post-2">Top Skills Employers are Looking For</a></li>
                        <li><a href="/blog/post-3">The Future of Remote Work</a></li>
                    </ul>
                </div>

              

                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                            
                        </a>
                    
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
