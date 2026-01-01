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

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

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


            <div className="section" id="project-filter">
                <div className="container">
                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? 'btn btn-primary' : 'btn btn-outline'}
                                style={filter !== cat ? { color: 'var(--color-primary)', borderColor: '#e2e8f0' } : {}}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {filteredProjects.map(project => (
                            <div key={project.id} style={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                                background: '#fff',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-primary)',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        borderRadius: '4px'
                                    }}>
                                        {project.category}
                                    </div>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{project.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#718096' }}>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;
