import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import PageHero from '../components/layout/PageHero';
import { iconMap } from '../data/data';

const Services = () => {
    const { services } = useData();
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

    return (
        <>
            <Helmet>
                <title>Our Services | Tameerox Contracting Qatar</title>
                <meta name="description" content="Explore Tameerox's full range of construction services: Waterproofing, Structural Works, Fit-Outs, and more. Certified quality in Qatar." />
            </Helmet>

            <PageHero
                title="Comprehensive Construction & Waterproofing Services"
                subtitle="End-to-end solutions for residential, commercial, and industrial projects across Qatar — from foundation to final finish."
                backgroundImage="/assets/hero-services.png"
                primaryCtaText="Explore Our Expertise"
                primaryCtaLink="#services-grid"
            />


            {/* Services Grid Section */}
            <div className="section" style={{ background: '#fff' }} id="services-grid">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '30px',
                        margin: '0 auto'
                    }}>
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="animate-on-scroll"
                                style={{
                                    background: '#fff',
                                    border: '1px solid #E5E7EB',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.4s ease',
                                    animationDelay: `${index * 0.1}s`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Image Area */}
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                        zIndex: 1
                                    }}></div>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        left: '20px',
                                        zIndex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <div style={{ background: 'var(--color-accent)', padding: '8px', borderRadius: '4px' }}>
                                            {(() => {
                                                const Icon = iconMap[service.iconName];
                                                return Icon ? <Icon size={20} color="#0A182E" /> : null;
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--color-primary)' }}>{service.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                                        {service.description}
                                    </p>

                                    <div style={{ marginTop: 'auto' }}>
                                        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '15px', marginBottom: '20px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Key Capabilities</span>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {service.scope.slice(0, 4).map((scopeItem, i) => (
                                                    <li key={i} style={{ fontSize: '13px', color: '#4B5563', marginBottom: '6px', display: 'flex', alignItems: 'start', gap: '8px' }}>
                                                        <Check size={14} color="var(--color-accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                                        {scopeItem}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            to={`/services/${service.slug}`}
                                            className="btn-outline"
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                padding: '12px',
                                                fontSize: '13px',
                                                border: '1px solid #E5E7EB',
                                                color: 'var(--color-primary)'
                                            }}
                                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = '#fff'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                        >
                                            View Full Details <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="section" style={{ background: 'var(--color-primary)', color: '#fff', textAlign: 'center' }}>
                <div className="container animate-on-scroll">
                    <h2 style={{ fontSize: '32px', marginBottom: '15px', color: '#fff' }}>Need a Specialized Solution?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 30px', color: '#CBD5E1', fontSize: '18px' }}>
                        Our engineering team is ready to analyze your project requirements and provide a technical proposal.
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Get a Technical Consultation
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Services;
