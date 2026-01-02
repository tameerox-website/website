import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Phone, CheckCircle, Shield, Clock, MapPin } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { iconMap } from '../data/data';

const Home = () => {
    const { services, projects } = useData();
    const navigate = useNavigate();

    // Scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [services, projects]);

    const displayPhone = "+974 7112 9272";
    const telPhone = "tel:+97471129272";

    // Data Slicing for Showcase
    const featuredServices = services.slice(0, 6); // Display 4-6
    const featuredProjects = projects.slice(0, 6); // Display 6-9

    return (
        <>
            <Helmet>
                <title>Tameerox | Trusted Construction & Waterproofing Experts in Qatar</title>
                <meta name="description" content="End-to-end solutions for residential, commercial & industrial projects—built to last in Qatar’s climate. Call Tameerox for a free site inspection." />
            </Helmet>

            {/* 1. HERO SECTION */}
            <header style={{
                position: 'relative',
                height: '90vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
                backgroundColor: '#0A182E',
                marginTop: 0
            }}>
                {/* Background Image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img
                        src="/assets/hero-home-premium.png"
                        alt="Tameerox Construction Excellence"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="eager"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(10,24,46,0.6) 0%, rgba(10,24,46,0.7) 100%)'
                    }}></div>
                </div>

                {/* Hero Content */}
                <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', paddingTop: '60px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 24px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50px',
                        color: 'var(--color-accent)',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '24px',
                        animation: 'fadeInDown 0.8s ease-out'
                    }}>
                        Proven Excellence Since 2014
                    </div>

                    <h1 style={{
                        color: '#fff',
                        fontSize: 'clamp(36px, 5vw, 68px)',
                        fontWeight: '800',
                        lineHeight: '1.15',
                        marginBottom: '24px',
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                        animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
                    }}>
                        Trusted Construction &<br />
                        <span style={{ color: 'var(--color-accent)' }}>Waterproofing Experts</span> in Qatar
                    </h1>

                    <p style={{
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        color: '#e2e8f0',
                        maxWidth: '800px',
                        margin: '0 auto 40px auto',
                        lineHeight: '1.6',
                        animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
                    }}>
                        End-to-end solutions for residential, commercial & industrial projects—built to last.
                    </p>

                    <div className="hero-btn-group">
                        <a href={telPhone} className="hero-btn">
                            <Phone size={22} style={{ marginRight: '12px' }} /> Call +974 7112 9272
                        </a>
                        <Link to="/projects" className="hero-btn-outline">
                            View Our Work
                        </Link>
                    </div>
                </div>
            </header>

            {/* 2. SERVICES SECTION */}
            <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="container">
                    <div className="text-center animate-on-scroll" style={{ marginBottom: '60px' }}>
                        <span className="section-headline-gold">Our Expertise</span>
                        <h2 style={{ fontSize: '42px', color: '#1F2937', marginBottom: '15px' }}>Specialized Services</h2>
                        <p style={{ fontSize: '18px', color: '#6B7280' }}>Delivered with precision, certified materials, and engineering excellence.</p>
                    </div>

                    <div className="responsive-grid">
                        {featuredServices.map((service, idx) => (
                            <Link
                                to={`/services`}
                                key={service.id}
                                className="animate-on-scroll"
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    background: '#fff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--color-accent)', // Golden border
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    animationDelay: `${idx * 0.1}s`
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div style={{ height: '250px', overflow: 'hidden' }}>
                                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                </div>
                                <div style={{ padding: '25px' }}>
                                    {(() => {
                                        const Icon = iconMap[service.iconName];
                                        return Icon ? <Icon size={32} style={{ color: 'var(--color-accent)', marginBottom: '15px' }} /> : null;
                                    })()}
                                    <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{service.title}</h3>
                                    <p style={{ color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>{service.description}</p>
                                    <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        View Details <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link to="/services" className="btn btn-outline" style={{ minWidth: '200px' }}>View All Services</Link>
                    </div>
                </div>
            </section>

            {/* 3. PROJECTS SECTION */}
            <section className="section" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="text-center animate-on-scroll" style={{ marginBottom: '60px' }}>
                        <span className="section-headline-gold">Our Work</span>
                        <h2 style={{ fontSize: '42px', color: '#1F2937', marginBottom: '15px' }}>Real Projects. Real Results.</h2>
                        <p style={{ fontSize: '18px', color: '#6B7280' }}>A portfolio built on integrity and client satisfaction.</p>
                    </div>

                    <div className="responsive-grid">
                        {featuredProjects.map((project, idx) => (
                            <div
                                key={project.id}
                                className="animate-on-scroll"
                                style={{
                                    border: '1px solid var(--color-accent)', // Golden border
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    animationDelay: `${idx * 0.1}s`
                                }}
                                onClick={() => navigate('/projects')}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ position: 'relative', height: '300px' }}>
                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                    {/* Status Badge */}
                                    <span style={{
                                        position: 'absolute', top: '20px', left: '20px',
                                        background: project.status === 'Completed' ? '#DEF7EC' : '#E1EFFE',
                                        color: project.status === 'Completed' ? '#03543F' : '#1E429F',
                                        padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase'
                                    }}>
                                        {project.status || 'Completed'}
                                    </span>
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <h4 style={{ fontSize: '20px', marginBottom: '5px' }}>{project.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6B7280', fontSize: '14px' }}>
                                        <MapPin size={14} /> {project.client || 'Doha, Qatar'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link to="/projects" className="btn btn-outline" style={{ minWidth: '200px' }}>View All Projects</Link>
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA BANNER */}
            <section style={{ backgroundColor: '#0A182E', padding: '100px 0', textAlign: 'center', color: '#fff' }}>
                <div className="container animate-on-scroll">
                    <h2 style={{ fontSize: '42px', color: '#fff', marginBottom: '20px' }}>Ready to Start Your Project?</h2>
                    <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '40px' }}>
                        We offer free site inspections, transparent pricing, and on-time delivery across Qatar.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-accent)' }}>
                            {displayPhone}
                        </div>
                        <a href={telPhone} className="btn btn-primary" style={{ padding: '20px 50px', fontSize: '18px' }}>
                            Call Now
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
