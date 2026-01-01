import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, Phone, ArrowRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import PageHero from '../components/layout/PageHero';

const ServiceDetail = () => {
    const { services } = useData();
    const { slug } = useParams();
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const otherServices = services.filter(s => s.id !== service.id).slice(0, 5);

    return (
        <>
            <Helmet>
                <title>{service.title} | Tameerox Services</title>
                <meta name="description" content={service.description} />
            </Helmet>

            <PageHero
                title={service.title}
                subtitle={`Professional ${service.title} solutions in Qatar — engineered for durability and compliance.`}
                backgroundImage={service.image}
                primaryCtaText="Get a Quote"
                primaryCtaLink="/contact"
            />


            <div className="section">
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                    {/* Main Content */}
                    <div style={{ flex: '2 1 600px' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--color-primary)' }}>Overview</h2>
                            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4a5568' }}>
                                {service.fullDescription}
                            </p>
                            <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.8', color: '#4a5568' }}>
                                At Tameerox, we ensure that every {service.title.toLowerCase()} project meets the highest standards of quality and safety. Our team is equipped with the latest tools and expertise to handle projects of any scale.
                            </p>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--color-primary)' }}>Scope of Work</h3>
                            <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '8px', borderLeft: '4px solid var(--color-accent)' }}>
                                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                                    {service.scope.map((item, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px' }}>
                                            <Check size={18} className="text-secondary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Why Choose Tameerox for {service.title}?</h3>
                            <p>We combine technical expertise with practical experience to deliver results that last.</p>
                            <ul style={{ marginTop: '15px', listStyle: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
                                <li>Licensed and certified team.</li>
                                <li>Strict adherence to safety and municipal regulations.</li>
                                <li>High-quality materials sourced from trusted suppliers.</li>
                                <li>Timely execution and transparent pricing.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ flex: '1 1 300px' }}>
                        <div style={{ background: '#fff', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ marginBottom: '20px', fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Other Services</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {otherServices.map(s => (
                                    <li key={s.id} style={{ marginBottom: '12px' }}>
                                        <Link to={`/services/${s.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#4a5568', padding: '8px 0', borderBottom: '1px dotted #eee' }}>
                                            {s.title} <ArrowRight size={14} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ background: 'var(--color-primary)', padding: '30px', borderRadius: '8px', color: '#fff', textAlign: 'center' }}>
                            <Phone size={40} className="text-accent" style={{ marginBottom: '15px' }} />
                            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Have a Project?</h4>
                            <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.8 }}>Get a free consultation and quote for your project.</p>
                            <a href="tel:+97471129272" className="btn btn-primary" style={{ width: '100%' }}>Call: +974 7112 9272</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
