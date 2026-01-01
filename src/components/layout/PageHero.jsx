import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PageHero = ({
    title,
    subtitle,
    backgroundImage,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
    variant = "default"
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const isLarge = variant === "large";

    return (
        <div className="page-hero-wrapper" style={{
            position: 'relative',
            width: '100%',
            height: isLarge ? '85vh' : '60vh',
            minHeight: '550px',
            backgroundColor: '#0A182E',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',       // Center Horizontally
            justifyContent: 'center',   // Center Vertically
            textAlign: 'center',        // Center Text
            marginTop: 0,
            paddingTop: '80px'          // Offset for fixed header
        }}>

            {/* 1. Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}>
                <img
                    src={backgroundImage}
                    alt="Hero Background"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out'
                    }}
                />
            </div>

            {/* 2. Dark Overlay for Contrast (Uniform, centered focus) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                background: 'rgba(10, 24, 46, 0.65)' // Consistent dark overlay to pop white centered text
            }}></div>

            {/* 3. Content Container */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '900px'
            }}>

                {/* Pill Badge (Like Screenshot) */}
                <div style={{
                    display: 'inline-block',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '30px',
                    animation: 'fadeInDown 0.8s ease-out forwards'
                }}>
                    Tameerox Construction
                </div>

                {/* Main Heading */}
                <h1 style={{
                    color: '#FFFFFF',
                    fontSize: isLarge ? 'clamp(42px, 5vw, 76px)' : 'clamp(36px, 4vw, 56px)',
                    fontWeight: '800',
                    lineHeight: '1.2',
                    marginBottom: '24px',
                    animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                }}>
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p style={{
                        fontSize: isLarge ? '20px' : '18px',
                        lineHeight: '1.6',
                        color: '#E2E8F0',
                        marginBottom: '40px',
                        maxWidth: '750px',
                        animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
                        opacity: 0,
                        transform: 'translateY(20px)'
                    }}>
                        {subtitle}
                    </p>
                )}

                {/* Action Buttons (Centered) */}
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                }}>
                    {primaryCtaText && (
                        <Link to={primaryCtaLink || '/contact'} className="btn btn-primary" style={{ minWidth: '180px', height: '56px', fontSize: '16px' }}>
                            {primaryCtaText} <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    )}
                    {secondaryCtaText && (
                        <Link to={secondaryCtaLink} className="btn-outline-glass" style={{
                            minWidth: '180px',
                            height: '56px',
                            fontSize: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.4)',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}>
                            {secondaryCtaText}
                        </Link>
                    )}
                </div>

            </div>

            <style>
                {`
                    @keyframes fadeInUp {
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .btn-outline-glass:hover {
                        background: #fff !important;
                        color: #0A182E !important;
                    }

                    @media (max-width: 992px) {
                        .page-hero-wrapper {
                            height: auto !important;
                            min-height: 500px !important;
                            padding: 120px 20px 80px 20px !important; /* Space for mobile header */
                            text-align: center !important;
                            justify-content: flex-end !important; /* Push text down slightly */
                        }

                        .page-hero-wrapper > div:nth-child(2) {
                             background: linear-gradient(180deg, rgba(10, 24, 46, 0.4) 0%, rgba(10, 24, 46, 0.8) 50%, #0A182E 100%) !important;
                        }

                        h1 {
                            font-size: 32px !important;
                        }
                        p {
                            font-size: 16px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PageHero;
