import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, X, Phone, Star } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import PageHero from '../components/layout/PageHero';
import { iconMap } from '../data/data';

const Services = () => {
    const { services } = useData();
    const [selectedService, setSelectedService] = useState(null);

    // Scroll properties for modal
    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedService]);

    const openModal = (service) => setSelectedService(service);
    const closeModal = () => setSelectedService(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
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
            <div className="section" id="services-grid" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="container">
                    <div className="responsive-grid">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="service-card-modern"
                                onClick={() => openModal(service)}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                                }}
                            >
                                {/* Image Wrapper */}
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        className="card-image"
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
                                    }}></div>

                                    {/* Icon Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        left: '16px',
                                        background: '#fff',
                                        padding: '10px',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {(() => {
                                            const Icon = iconMap[service.iconName];
                                            return Icon ? <Icon size={24} /> : null;
                                        })()}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#1F2937' }}>{service.title}</h3>
                                    <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6', flex: 1, marginBottom: '20px' }}>
                                        {service.description}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: '600', fontSize: '14px' }}>
                                        View Details <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Service Modal */}
            {selectedService && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    {/* Backdrop */}
                    <div
                        onClick={closeModal}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(5px)',
                            animation: 'fadeIn 0.3s ease-out'
                        }}
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="modal-content-panel"
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            maxWidth: '900px',
                            maxHeight: '90vh',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column', // Mobile default
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                zIndex: 10,
                                background: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '10px',
                                cursor: 'pointer',
                                color: '#374151',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div className="modal-body-responsive" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

                            {/* Left Side (Image & Key Info) - Desktop only usually, but handled via flex */}
                            <div className="modal-media-section" style={{
                                width: '40%',
                                background: '#F3F4F6',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ height: '60%', width: '100%' }}>
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)',
                                        pointerEvents: 'none'
                                    }}></div>
                                </div>

                                <div style={{
                                    padding: '24px',
                                    background: '#1F2937',
                                    flex: 1,
                                    color: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <h4 style={{ color: '#D4AF37', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Types</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {selectedService.projectTypes && selectedService.projectTypes.map((type, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '13px',
                                                background: 'rgba(255,255,255,0.1)',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.2)'
                                            }}>
                                                {type}
                                            </span>
                                        ))}
                                        {!selectedService.projectTypes && <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Residential | Commercial</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side (Details) */}
                            <div style={{
                                flex: 1,
                                padding: '40px',
                                overflowY: 'auto'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    {(() => {
                                        const Icon = iconMap[selectedService.iconName];
                                        return Icon ? <div style={{ padding: '10px', background: 'var(--color-primary-light)', borderRadius: '12px', color: 'var(--color-primary)' }}><Icon size={28} /></div> : null;
                                    })()}
                                    <h2 style={{ fontSize: '28px', margin: 0, color: '#111827', lineHeight: '1.2' }}>{selectedService.title}</h2>
                                </div>

                                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#4B5563', marginBottom: '30px' }}>
                                    {selectedService.fullDescription || selectedService.description}
                                </p>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#374151' }}>Scope of Work</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {selectedService.scope.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '14px', color: '#4B5563' }}>
                                                <Check size={16} color="var(--color-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedService.uniqueSellingPoints && (
                                    <div style={{ marginBottom: '30px', background: '#FFFBEB', padding: '20px', borderRadius: '12px', border: '1px solid #FCD34D' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Star size={18} fill="#F59E0B" color="#F59E0B" /> Why Choose Us
                                        </h3>
                                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350F', fontSize: '14px', lineHeight: '1.6' }}>
                                            {selectedService.uniqueSellingPoints.map((usp, idx) => (
                                                <li key={idx} style={{ marginBottom: '4px' }}>{usp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <a
                                    href="tel:+97471129272"
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '16px',
                                        fontSize: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginTop: 'auto'
                                    }}
                                >
                                    <Phone size={20} />
                                    Call for Free Site Inspection
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                /* Responsive adjustments for modal */
                @media (max-width: 768px) {
                    .modal-body-responsive {
                        flex-direction: column !important;
                        overflow-y: auto !important;
                    }
                    .modal-media-section {
                        width: 100% !important;
                        height: 200px !important;
                        flex: none !important;
                    }
                    .modal-content-panel {
                        height: 100% !important;
                        max-height: 100% !important;
                        border-radius: 0 !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Services;
