import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, ShieldCheck, Users, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import { useData } from '../contexts/DataContext';

const About = () => {
    const { siteContent } = useData();

    // Default CEO Data (Fallback)
    const defaultCEO = {
        name: "Eng. Youssef Al-Sayed",
        title: "CEO & Founder",
        bio: "With over 15 years of experience in the construction and engineering sector, Eng. Youssef Al-Sayed has led Tameerox to become a cornerstone of Qatar’s infrastructure development. His philosophy is simple yet profound: true engineering excellence lies in the perfect balance of innovation, safety, and sustainability.\n\nUnder his leadership, Tameerox has successfully delivered over 50 complex projects, ranging from high-rise residential towers to critical industrial facilities. Youssef believes in a hands-on approach, ensuring that every project not only meets but exceeds international quality standards. His vision extends beyond construction; he aims to build lasting relationships with clients and contribute meaningfully to the Qatar National Vision 2030.",
        quote: "We don't just build structures; we build trust and legacies that stand the test of time.",
        image: "/assets/ceo.png"
    };

    const ceo = (siteContent && siteContent['ceo_section']) ? siteContent['ceo_section'] : defaultCEO;

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
                <title>About Us | Tameerox Trading and Contracting</title>
                <meta name="description" content="Learn about Tameerox - Your trusted partner for construction and waterproofing in Qatar. CR No: 224177." />
            </Helmet>

            <PageHero
                title="Building Qatar’s Vision Since 2008"
                subtitle="Tameerox Trading & Contracting is a Grade A certified partner for specialized construction, waterproofing, and structural works."
                backgroundImage="/assets/hero-about.png"
                primaryCtaText="Our Mission"
                primaryCtaLink="#mission"
                secondaryCtaText="View Projects"
                secondaryCtaLink="/projects"
            />


            {/* Overview Section */}
            <div className="section animate-on-scroll">
                <div className="container">
                    <div className="responsive-grid" style={{ gap: '60px', alignItems: 'center' }}>
                        <div>
                            <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
                                Company Overview
                            </span>
                            <h2 style={{ marginBottom: '25px', fontSize: '36px' }}>Engineering Excellence Since Inception</h2>
                            <p style={{ marginBottom: '20px', fontSize: '16px', color: '#4B5563' }}>
                                <strong>Tameerox Trading and Contracting W.L.L</strong> is a premier construction firm based in Doha, Qatar (CR No: 224177). We specialize in delivering high-quality structural works, waterproofing solutions, and comprehensive fit-out services.
                            </p>
                            <p style={{ fontSize: '16px', color: '#4B5563', marginBottom: '30px' }}>
                                Our reputation is built on reliability, technical expertise, and an unwavering commitment to safety standards. Whether it is a small renovation or a large-scale commercial build, we approach every project with the same level of dedication and precision.
                            </p>

                            <div style={{ display: 'flex', gap: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '5px' }}>10+</h3>
                                    <p style={{ fontSize: '14px', color: '#6B7280' }}>Years Experience</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '5px' }}>50+</h3>
                                    <p style={{ fontSize: '14px', color: '#6B7280' }}>Projects Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100px',
                                height: '100px',
                                borderTop: '5px solid var(--color-accent)',
                                borderLeft: '5px solid var(--color-accent)',
                                zIndex: 0
                            }}></div>
                            <img
                                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop"
                                alt="Tameerox Engineers on site"
                                style={{ width: '100%', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Leadership Section */}
            <div className="section bg-light animate-on-scroll">
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center' }}>
                        {/* Image Column */}
                        <div style={{ position: 'relative', order: 1 }}>
                            <div style={{
                                position: 'absolute',
                                bottom: 'calc(-1 * var(--size-base, 20px))',
                                right: '-20px',
                                width: '150px',
                                height: '150px',
                                background: 'var(--color-accent-light)',
                                opacity: 0.3,
                                zIndex: 0,
                                borderRadius: '50%'
                            }}></div>
                            <img
                                src={ceo.image || "/assets/ceo.png"}
                                alt={`${ceo.name} - CEO`}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    borderRadius: '4px',
                                    boxShadow: 'var(--shadow-xl)',
                                    position: 'relative',
                                    zIndex: 1,
                                    objectFit: 'cover',
                                    aspectRatio: '4/5',
                                    display: 'block',
                                    margin: '0 auto'
                                }}
                            />
                        </div>

                        {/* Text Column */}
                        <div style={{ order: 2 }}>
                            <span className="section-headline-gold">Leadership</span>
                            <h2 style={{ marginBottom: '10px' }}>{ceo.name}</h2>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: 'var(--color-primary)',
                                marginBottom: '25px',
                                borderBottom: '2px solid var(--color-accent)',
                                display: 'inline-block',
                                paddingBottom: '5px'
                            }}>
                                {ceo.title}
                            </p>

                            <div style={{ color: '#4B5563', marginBottom: '20px', whiteSpace: 'pre-line' }}>
                                {ceo.bio}
                            </div>

                            {ceo.quote && (
                                <div style={{ fontStyle: 'italic', color: 'var(--color-primary)', borderLeft: '4px solid var(--color-accent)', paddingLeft: '20px' }}>
                                    "{ceo.quote.replace(/^"|"$/g, '')}"
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="section" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <div className="animate-on-scroll" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Target size={48} className="text-accent" style={{ marginBottom: '24px' }} />
                            <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '24px' }}>Our Mission</h3>
                            <p style={{ color: '#9CA3AF', lineHeight: '1.7' }}>
                                To deliver structurally sound, waterproof, and aesthetically finished buildings on time—every time. We strive to exceed client expectations through innovative engineering and strict quality control.
                            </p>
                        </div>
                        <div className="animate-on-scroll" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', animationDelay: '0.2s' }}>
                            <Eye size={48} className="text-accent" style={{ marginBottom: '24px' }} />
                            <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '24px' }}>Our Vision</h3>
                            <p style={{ color: '#9CA3AF', lineHeight: '1.7' }}>
                                To be Qatar’s most trusted mid-tier contractor for residential, commercial, and industrial projects, recognized for our safety standards and operational excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="section animate-on-scroll">
                <div className="container">
                    <div className="text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>Why We Exist</span>
                        <h2 style={{ fontSize: '36px', marginTop: '10px' }}>Our Core Values</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #E5E7EB', transition: 'transform 0.3s' }} className="value-card">
                            <ShieldCheck size={40} className="text-secondary" style={{ marginBottom: '20px', margin: '0 auto' }} />
                            <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Safety Compliance</h4>
                            <p style={{ color: '#6B7280' }}>Strict adherence to Qatar construction laws & municipal standards.</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #E5E7EB', transition: 'transform 0.3s' }} className="value-card">
                            <Award size={40} className="text-secondary" style={{ marginBottom: '20px', margin: '0 auto' }} />
                            <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Quality Assurance</h4>
                            <p style={{ color: '#6B7280' }}>Using certified materials and proven techniques for longevity.</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #E5E7EB', transition: 'transform 0.3s' }} className="value-card">
                            <Users size={40} className="text-secondary" style={{ marginBottom: '20px', margin: '0 auto' }} />
                            <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>Client Satisfaction</h4>
                            <p style={{ color: '#6B7280' }}>Transparent communication and focused service delivery.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Strip */}
            <div style={{ background: '#f8f9fa', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '20px' }}>Ready to Build Your Vision?</h2>
                    <Link to="/contact" className="btn btn-primary">Contact Us Today</Link>
                </div>
            </div>
        </>
    );
};

export default About;
