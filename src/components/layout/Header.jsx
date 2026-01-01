import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Handle Scroll Effect with Throttle for Performance
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        setIsScrolled(true);
                    } else {
                        setIsScrolled(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // Prevent scrolling on iOS
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        // Cleanup function to ensure scroll is restored if component unmounts
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        closeMenu();
    }, [location]);

    const phoneNumber = "+97471129272";
    const displayPhone = "+974 7112 9272";

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                {/* Logo */}
                <Link to="/" className="logo" aria-label="Tameerox Home">
                    <img src="/assets/logo-final.png" alt="Tameerox Trading and Contracting" style={{ height: '85px', width: 'auto', objectFit: 'contain' }} />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul className="nav-menu">
                        {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <li key={item}>
                                    <Link
                                        to={path}
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className="header-actions">
                    <a href={`tel:${phoneNumber}`} className="phone-link" aria-label={`Call us at ${displayPhone}`}>
                        <Phone size={18} fill="currentColor" className="icon-pulse" />
                        <span>{displayPhone}</span>
                    </a>

                    <div className="divider-vertical"></div>

                    <a href={`tel:${phoneNumber}`} className="btn-header-call">
                        Call Now
                    </a>

                    <a
                        href={`https://wa.me/${phoneNumber.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                        aria-label="Chat on WhatsApp"
                    >
                        <MessageCircle size={22} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer-overlay ${isMenuOpen ? 'open' : ''}`}>
                {/* Close button inside drawer for accessibility / reachability */}
                <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close menu">
                    <X size={32} />
                </button>

                <ul className="mobile-nav-list">
                    {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`mobile-nav-link ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'active' : ''}`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mobile-footer">
                    <div className="mobile-contact-strip">
                        <a href={`tel:${phoneNumber}`} className="mobile-phone-item">
                            <Phone size={20} /> {displayPhone}
                        </a>
                        <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="mobile-whatsapp-item">
                            <MessageCircle size={20} /> Chat on WhatsApp
                        </a>
                    </div>
                    <a href={`tel:${phoneNumber}`} className="btn btn-primary" style={{ width: '100%', borderRadius: '0' }}>
                        Call Now
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
