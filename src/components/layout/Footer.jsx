import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Linkedin, MessageCircle, ExternalLink, Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const phoneNumber = "+97471129272";
    const displayPhone = "+974 7112 9272";

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Column 1: Brand & Essence */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="logo" style={{ marginBottom: '24px', display: 'inline-block' }}>
                            <img src="/assets/logo-final.png" alt="Tameerox Logo" style={{ height: '120px', width: 'auto' }} />
                        </Link>
                        <p className="footer-desc">
                            Building Qatar’s Future with Integrity & Precision. A leading contracting partner for residential, commercial, and industrial excellence.
                        </p>
                        <div className="footer-badge">
                            Commercial Reg. No.: 224177
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <span className="footer-heading">Company</span>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/projects">Our Portfolio</Link></li>
                            <li><Link to="/contact">Get a Quote</Link></li>
                            <li><Link to="/contact">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Expertise */}
                    <div className="footer-col">
                        <span className="footer-heading">Expertise</span>
                        <ul className="footer-links">
                            <li><Link to="/services/waterproofing-works">Waterproofing</Link></li>
                            <li><Link to="/services/structural-rcc-works">Structural Works</Link></li>
                            <li><Link to="/services/fit-out-works">Fit-Out Interiors</Link></li>
                            <li><Link to="/services/material-supply">Material Supply</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="footer-col contact-col">
                        <span className="footer-heading">Contact Us</span>
                        <div className="contact-block">
                            <div className="contact-row">
                                <div className="icon-box"><MapPin size={18} /></div>
                                <span>
                                    Building No. 220, Zone 26, St 69,<br />
                                    Al Sadd, Doha, Qatar
                                </span>
                            </div>
                            <div className="contact-row">
                                <div className="icon-box"><Phone size={18} /></div>
                                <a href={`tel:${phoneNumber}`} className="hover-gold">{displayPhone}</a>
                            </div>
                            <div className="contact-row">
                                <div className="icon-box"><Mail size={18} /></div>
                                <a href="mailto:info@tameerox.qa" className="hover-gold">info@tameerox.qa</a>
                            </div>

                            <a
                                href={`https://wa.me/${phoneNumber.replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-footer-whatsapp"
                            >
                                <MessageCircle size={18} style={{ marginRight: '8px' }} /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                </div>

                <div className="footer-divider"></div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Tameerox Trading & Contracting W.L.L. All Rights Reserved.</p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
