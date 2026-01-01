import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Clock, Phone, MessageCircle, Hammer, Droplet, Layers, Box, Truck, Package, LayoutGrid, HardHat, Cog } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './Home.css';
import { useData } from '../contexts/DataContext';
import PageHero from '../components/layout/PageHero';
import { iconMap } from '../data/data';

const Home = () => {
    const { services, projects } = useData();
    // Scroll animation hook
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const phoneNumber = "+97471129272";
    const displayPhone = "+974 7112 9272";

    return (
        <>
            <Helmet>
                <title>Tameerox | Premium Construction & Waterproofing Contractors Doha</title>
                <meta name="description" content="Tameerox Trading and Contracting W.L.L - Delivering world-class construction, structural engineering, and waterproofing solutions in Qatar for institutional and luxury clients." />
            </Helmet>

            {/* 2. HERO SECTION */}
            <PageHero
                variant="large"
                title="Reliable Construction & Waterproofing Solutions"
                subtitle="Delivering precision-built structures, leak-free environments, and on-time execution — compliant with Qatar’s highest standards."
                backgroundImage="/assets/hero-home-v2.png"
                primaryCtaText="Get Free Consultation"
                primaryCtaLink="/contact"
                secondaryCtaText="Request a Quote"
                secondaryCtaLink="/contact"
            />

            {/* 3. TRUST BADGE BAR */}
            <div className="trust-bar animate-on-scroll">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-item">
                            <CheckCircle size={18} /> CR No. 224177
                        </div>
                        <div className="trust-item">
                            <HardHat size={18} /> Licensed Contractor
                        </div>
                        <div className="trust-item">
                            <Shield size={18} /> Safety & QA Compliant
                        </div>
                        <div className="trust-item">
                            <Phone size={18} /> {displayPhone}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. ABOUT SNAPSHOT */}
            <section className="section about-section animate-on-scroll">
                <div className="container">
                    <span className="section-headline-gold">Who We Are</span>
                    <h2 className="section-title" style={{ marginBottom: '30px' }}>Building Qatar’s Future with Integrity</h2>
                    <div className="about-text">
                        <p>
                            Tameerox Trading and Contracting W.L.L is a Doha-based contractor delivering end-to-end construction, structural, and waterproofing solutions across residential, commercial, and industrial sectors. With a foundation in engineering precision and approved materials, we transform complex visions into durable reality.
                        </p>
                    </div>
                    <Link to="/about" className="link-gold">Learn More About Our Approach</Link>
                </div>
            </section>

            {/* 5. SERVICES SHOWCASE */}
            <section className="section services-section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <span className="section-headline-gold">Our Core Expertise</span>
                        <h2 className="section-title">Comprehensive Construction Solutions</h2>
                    </div>

                    <div className="services-grid-layout">
                        {services.map((service, index) => (
                            <Link to={`/services/${service.slug}`} key={service.id} className="service-card-luxury animate-on-scroll" style={{ animationDelay: `${index * 0.05}s` }}>
                                {/* Thumbnail Image */}
                                <img src={service.image} alt={service.title} className="service-thumb" loading="lazy" />

                                <div className="service-content">
                                    <div className="service-icon-box">
                                        {(() => {
                                            const Icon = iconMap[service.iconName];
                                            return Icon ? <Icon size={24} strokeWidth={1.5} /> : null;
                                        })()}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <span className="service-link-arrow">
                                        Explore <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. WHY CHOOSE TAMEEROX */}
            <section className="section why-us-section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <span className="section-headline-gold">The Tameerox Guarantee</span>
                        <h2 className="section-title" style={{ color: '#fff' }}>Why Developers Trust Us</h2>
                    </div>

                    <div className="why-grid animate-on-scroll">
                        <div className="why-item">
                            <CheckCircle size={40} strokeWidth={1.5} style={{ color: '#D4AF37', marginBottom: '20px' }} />
                            <h4>Quality-First Execution</h4>
                            <p>ISO-approved materials, certified workmanship, zero-cut corners ensuring every build stands the test of time.</p>
                        </div>
                        <div className="why-item">
                            <HardHat size={40} strokeWidth={1.5} style={{ color: '#D4AF37', marginBottom: '20px' }} />
                            <h4>Expert Engineering Team</h4>
                            <p>Licensed Qatari-based engineers and skilled labor with 10+ years GCC experience in complex structural projects.</p>
                        </div>
                        <div className="why-item">
                            <Clock size={40} strokeWidth={1.5} style={{ color: '#D4AF37', marginBottom: '20px' }} />
                            <h4>On-Time. Every Time.</h4>
                            <p>Milestone-driven project management with real-time client updates, ensuring we meet your deadlines without compromise.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PROJECTS PREVIEW */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <span className="section-headline-gold">Built to Last</span>
                        <h2 className="section-title">Selected Projects Across Qatar</h2>
                    </div>

                    <div className="projects-grid-luxury">
                        {projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="project-item-luxury animate-on-scroll">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                <div className="project-overlay">
                                    <div style={{ padding: '30px', position: 'absolute', bottom: 0, width: '100%' }}>
                                        <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{project.category}</span>
                                        <h4 style={{ color: '#fff', fontSize: '24px', margin: 0 }}>{project.title}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link to="/projects" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                            View Full Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. STRONG CONVERSION ZONE */}
            <section className="conversion-section animate-on-scroll">
                <div className="conversion-bg-accent"></div>
                <div className="container conversion-content">
                    <h2>Let’s Discuss Your <span>Project</span></h2>
                    <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '40px' }}>
                        Get a free site assessment, technical consultation, or detailed quotation — with zero obligation.
                    </p>

                    <div className="conversion-actions">
                        <a href={`tel:${phoneNumber}`} className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '16px' }}>
                            <Phone size={20} style={{ marginRight: '12px' }} /> Call Now: {displayPhone}
                        </a>
                        <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} className="btn btn-outline" style={{ padding: '20px 40px', fontSize: '16px', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={20} style={{ marginRight: '12px' }} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
