import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/header/DesktopHeader.css'; // استيراد ملف CSS

const DesktopHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [profile, setProfile] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const baseURL = "https://syriatogetherserver.onrender.com";
    const defaultProfileIcon = "defaultProfilePic.png"; 

    return (
        <header className={`desktop-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="icon-container" onClick={() => setShowOptions(!showOptions)}>
                <img
                    src='profilleFoto.png'
                    alt="صورة الملف الشخصي"
                    className="profile-picture"
                />
                {showOptions && (
                    <div className="options-container">
                        <Link to="/myprofile" className="option-item">
                            <i className="bi bi-person"></i> الملف الشخصي
                        </Link>
                        <Link to="/settings" className="option-item">
                            <i className="bi bi-gear"></i> الإعدادات
                        </Link>
                        <Link className="option-item" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i> تسجيل الخروج
                        </Link>
                    </div>
                )}
            </div>

            <div className="logoNavContainer">
                <nav>
                    <ul className="nav-list">
                              <li><Link to="/" className="nav-link">الصفحة الرئيسية</Link></li>
                                          <li><Link to="/all-channels" className="nav-link">جميع القنوات</Link></li>
                                          <li><Link to="/competitions" className="nav-link">المباريات</Link></li>
                                          <li><Link to="/contact" className="nav-link">اتصل بنا</Link></li>
                                          <li><Link to="/about-us" className="nav-link">معلومات عنا</Link></li>
                    </ul>
                </nav>
                <Link to="/">
                    <div className="logo-container">
                        <img src="logo.png" alt="الشعار" className="logo" />
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default DesktopHeader;
