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

        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [services]);

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
            <div className="section services-section" id="services-grid">
                <div className="container">
                    <div className="services-grid-layout">
                        {services.map((service, index) => (
                            <Link
                                to={`/services/${service.slug}`}
                                key={service.id}
                                className="service-card-luxury animate-on-scroll"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="service-content">
                                    <div className="service-icon-box">
                                        {(() => {
                                            const Icon = iconMap[service.iconName];
                                            return Icon ? <Icon size={28} strokeWidth={1.5} /> : null;
                                        })()}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>

                                    <div style={{ marginTop: 'auto', width: '100%' }}>
                                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '15px' }}>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {service.scope.slice(0, 3).map((scopeItem, i) => (
                                                    <li key={i} style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px', display: 'flex', alignItems: 'start', gap: '8px' }}>
                                                        <Check size={14} color="#D4AF37" style={{ marginTop: '3px', flexShrink: 0 }} />
                                                        {scopeItem}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <span className="service-link-arrow">
                                            View Details <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
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
