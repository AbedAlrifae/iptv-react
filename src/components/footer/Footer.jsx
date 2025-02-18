import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer/Footer.css';

const Footer = () => {

    function handleToContact(){
        window.location.href = '/contact'
    }
    return (
        <footer className="footer">
            
            <div className="footer-content">
            

                {/* Snelle links */}
                <div className="footer-column">
                    <h3>الروابط السريعة</h3>
                    <nav>
                        <ul className="nav-list_">
                        <li><Link to="/" className="nav-link">الصفحة الرئيسية</Link></li>
                    <li><Link to="/all-channels" className="nav-link">جميع القنوات</Link></li>
                    <li><Link to="/competitions" className="nav-link">المباريات</Link></li>
                    <li><Link to="/contact" className="nav-link">اتصل بنا</Link></li>
                    <li><Link to="/about-us" className="nav-link">معلومات عنا</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Social media links */}
            <div className="social-icons">
              
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                </a>
            </div>

            {/* Copyright */}
            <p>&copy; 2025 IPTV.</p>
        </footer>
    );
};

export default Footer;
