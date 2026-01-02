import React, { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { Trash, Edit, Plus, Search, Filter, Calendar, User, Clock, MoreVertical, X } from 'lucide-react';
import { FormInput, FormTextArea, FormImageUpload } from './AdminShared';
import { Skeleton } from '../ui/Skeleton';

const STATUS_COLORS = {
    'Ongoing': { bg: '#EBF8FF', color: '#2B6CB0', border: '#BEE3F8' },
    'Completed': { bg: '#F0FFF4', color: '#2F855A', border: '#C6F6D5' },
    'Upcoming': { bg: '#FFFFF0', color: '#B7791F', border: '#FEEBC8' },
    'On Hold': { bg: '#FFF5F5', color: '#C53030', border: '#FED7D7' },
    'default': { bg: '#F7FAFC', color: '#4A5568', border: '#E2E8F0' }
};

const ProjectsManager = () => {
    const { projects, addProject, updateProject, deleteProject, loading } = useData();
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Filtering & Sorting
    const filteredProjects = useMemo(() => {
        if (!projects) return [];
        return projects.filter(p => {
            const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesStatus && matchesSearch;
        });
    }, [projects, filterStatus, searchQuery]);

    const openModal = (project = null) => {
        setEditingItem(project ? { ...project } : {
            title: '', category: '', status: 'Ongoing', client: '', year: '', duration: '',
            tags: [], image: '', description: '', caseStudyLink: '', progress: 0
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingItem.id) {
                await updateProject(editingItem.id, editingItem);
            } else {
                await addProject(editingItem);
            }
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (err) {
            alert('Error saving project: ' + err.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Header / Toolbar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <h2 style={{ margin: 0, fontSize: '24px', color: '#1a202c' }}>Projects Overview</h2>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={18} style={{ marginRight: '8px' }} /> New Project
                    </button>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Filter size={18} color="#718096" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#fff', minWidth: '150px' }}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {[1, 2, 3].map(i => <Skeleton key={i} height="300px" />)}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                    {filteredProjects.map(project => {
                        const statusStyle = STATUS_COLORS[project.status] || STATUS_COLORS['default'];
                        return (
                            <div key={project.id} style={{
                                background: '#fff', borderRadius: '12px', overflow: 'hidden',
                                border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                {/* Card Image */}
                                <div style={{ height: '180px', position: 'relative', background: '#f7fafc' }}>
                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                                        background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`
                                    }}>
                                        {project.status || 'Unknown'}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#2d3748' }}>{project.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#718096' }}>
                                            <User size={14} /> {project.client || 'Client N/A'}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#718096' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={14} /> {project.year}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={14} /> {project.duration || 'N/A'}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#4a5568' }}>
                                            <span>Progress</span>
                                            <span>{project.progress || 0}%</span>
                                        </div>
                                        <div style={{ width: '100%', background: '#edf2f7', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${project.progress || 0}%`,
                                                background: 'var(--color-primary)',
                                                height: '100%', borderRadius: '4px'
                                            }}></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #edf2f7', display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => openModal(project)}
                                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e0', background: '#fff', color: '#4a5568', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }}
                                        >
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => { if (window.confirm('Are you sure you want to delete this project?')) deleteProject(project.id); }}
                                            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #fed7d7', background: '#fff5f5', color: '#e53e3e', cursor: 'pointer' }}
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {filteredProjects.length === 0 && !loading && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
                    <p>No projects found matching your criteria.</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', padding: '0', borderRadius: '12px', width: '90%', maxWidth: '650px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
                    }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>{editingItem.id ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>

                        <div style={{ padding: '24px', overflowY: 'auto' }}>
                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <FormInput label="Project Title" value={editingItem.title} onChange={v => setEditingItem({ ...editingItem, title: v })} />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Status</label>
                                        <select
                                            value={editingItem.status}
                                            onChange={e => setEditingItem({ ...editingItem, status: e.target.value })}
                                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                        >
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="On Hold">On Hold</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Progress (%)</label>
                                        <input
                                            type="number" min="0" max="100"
                                            value={editingItem.progress}
                                            onChange={e => setEditingItem({ ...editingItem, progress: parseInt(e.target.value) || 0 })}
                                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <FormInput label="Client" value={editingItem.client} onChange={v => setEditingItem({ ...editingItem, client: v })} />
                                    <FormInput label="Year" value={editingItem.year} onChange={v => setEditingItem({ ...editingItem, year: v })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <FormInput label="Duration" value={editingItem.duration} onChange={v => setEditingItem({ ...editingItem, duration: v })} />
                                    <FormInput label="Tags (comma separated)" value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : editingItem.tags} onChange={v => setEditingItem({ ...editingItem, tags: v.split(',') })} />
                                </div>

                                <FormInput label="Case Study Link" value={editingItem.caseStudyLink} onChange={v => setEditingItem({ ...editingItem, caseStudyLink: v })} />
                                <FormTextArea label="Description" value={editingItem.description} onChange={v => setEditingItem({ ...editingItem, description: v })} />
                                <FormImageUpload label="Project Image" value={editingItem.image} onChange={v => setEditingItem({ ...editingItem, image: v })} />

                                <div style={{ paddingTop: '10px', display: 'flex', gap: '15px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingItem.id ? 'Save Changes' : 'Create Project'}</button>
                                    <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
