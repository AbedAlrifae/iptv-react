import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header/BurgerMenu.css'; // Zorg dat je een apart CSS-bestand hebt

const BurgerMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => {
            if (!prev) {
                document.body.classList.add('no-scroll'); // Disable scroll
            } else {
                document.body.classList.remove('no-scroll'); // Enable scroll
            }
            return !prev;
        });
    };



    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        checkScreenSize(); // Initial check
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);
    const defaultProfileIcon = "defaultProfilePic.png"; 

    const baseURL = "https://syriatogetherserver.onrender.com";

    return (
        <header className="burger-menu-header">
            <div className="burger-icon" onClick={toggleMenu}>
                <div className={`burger-line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${menuOpen ? 'open' : ''}`}></div>
            </div>
            <nav className={`burger-nav ${menuOpen ? 'open' : ''}`}>
                <ul className="burger-nav-list">
                    <li className='profilePicContainer'>
                        <Link to="/myprofile" onClick={toggleMenu}>
       
                                <img
                                src='profilleFoto.png'
                                alt="Profielfoto"
                                    className="profile-picture"
                                />

                        </Link>
                    </li>
                    <li><Link to="/" className="nav-link">الصفحة الرئيسية</Link></li>
                    <li><Link to="/all-channels" className="nav-link">جميع القنوات</Link></li>
                    <li><Link to="/competitions" className="nav-link">المباريات</Link></li>
                    <li><Link to="/contact" className="nav-link">اتصل بنا</Link></li>
                    <li><Link to="/about-us" className="nav-link">معلومات عنا</Link></li>
                    {isMobile && (
                        <div className="settingsLogoutBtnBurg">
                            <Link to="/settings" onClick={toggleMenu}>
                                <i className="bi bi-gear-fill"></i>
                            </Link>
                        </div>
                    )}
                </ul>
            </nav>
            <Link to="/">
                <div className="logoContainerMobile">
                    <img src="logo.png" alt="Logo" className="logo" />
                </div>
            </Link>
        </header>
    );
};

export default BurgerMenu;
