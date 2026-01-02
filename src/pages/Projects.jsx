import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../contexts/DataContext';
import PageHero from '../components/layout/PageHero';

const Projects = () => {
    const { projects } = useData();
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
    }, [projects]);

    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Construction', 'Waterproofing', 'Structural', 'Fit-Out'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <>
            <Helmet>
                <title>Our Projects | Tameerox Portfolio</title>
                <meta name="description" content="View our portfolio of construction, waterproofing, and fit-out projects across Qatar." />
            </Helmet>

            <PageHero
                title="Built to Last: Our Qatar Portfolio"
                subtitle="Completed and ongoing projects across residential, commercial, and industrial sectors — delivered on time, on spec."
                backgroundImage="/assets/hero-projects.png"
                primaryCtaText="Filter by Service"
                primaryCtaLink="#project-filter"
            />


            <div className="section" id="project-filter" style={{ background: '#F9FAFB' }}>
                <div className="container">
                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '60px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? 'btn btn-primary' : 'btn btn-outline'}
                                style={{
                                    borderRadius: '50px',
                                    padding: '12px 30px',
                                    borderWidth: '2px',
                                    borderColor: filter === cat ? 'transparent' : '#E5E7EB',
                                    color: filter === cat ? '#fff' : '#4B5563',
                                    background: filter === cat ? 'var(--color-primary)' : 'transparent'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '40px'
                    }}>
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>
                            <h3>No projects found in this category.</h3>
                            <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setFilter('All')}>View All Projects</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const ProjectCard = ({ project }) => {
    // Status Badge Logic
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return { bg: '#DEF7EC', text: '#03543F' }; // Green
            case 'Ongoing': return { bg: '#E1EFFE', text: '#1E429F' };   // Blue
            case 'Upcoming': return { bg: '#FDF6B2', text: '#723B13' };  // Yellow/Amber
            case 'On Hold': return { bg: '#F3F4F6', text: '#374151' };   // Gray
            default: return { bg: '#F3F4F6', text: '#374151' };
        }
    };

    const statusStyle = getStatusColor(project.status || 'Completed');

    return (
        <div style={{
            background: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column'
        }}
            className="project-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)';
            }}
        >
            {/* Image Area */}
            <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />

                {/* Status Badge */}
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {project.status || 'Completed'}
                </div>

                {/* Category Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)'
                }}>
                    {project.category}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-primary)', margin: 0, lineHeight: '1.4' }}>
                        {project.title}
                    </h3>
                </div>

                {/* Metadata Row */}
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                    {project.client && (
                        <span><strong>Client:</strong> {project.client}</span>
                    )}
                    {project.year && (
                        <span><strong>Year:</strong> {project.year}</span>
                    )}
                    {project.duration && (
                        <span><strong>Duration:</strong> {project.duration}</span>
                    )}
                </div>

                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        {project.tags.map(tag => (
                            <span key={tag} style={{
                                fontSize: '11px',
                                background: '#F3F4F6',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                color: '#374151',
                                border: '1px solid #E5E7EB'
                            }}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                {/* CTA */}
                {project.caseStudyLink ? (
                    <a
                        href={project.caseStudyLink}
                        className="btn-outline"
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'center',
                            textDecoration: 'none',
                            padding: '12px',
                            fontSize: '14px',
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            borderRadius: '6px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--color-primary)';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--color-primary)';
                        }}
                    >
                        View Case Study
                    </a>
                ) : (
                    <button
                        className="btn-outline"
                        disabled
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            justifyContent: 'center',
                            padding: '12px',
                            fontSize: '14px',
                            border: '1px solid #E5E7EB',
                            color: '#9CA3AF',
                            background: '#F3F4F6',
                            cursor: 'not-allowed'
                        }}
                    >
                        Case Study Coming Soon
                    </button>
                )}
            </div>
        </div>
    );
};

export default Projects;
