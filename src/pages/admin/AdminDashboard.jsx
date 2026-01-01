import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Trash, Edit, Plus, X, Save, Lock, Upload, MinusCircle, PlusCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { iconMap } from '../../data/data';

const AdminDashboard = () => {
    const { services, projects, addProject, updateProject, deleteProject, addService, updateService, deleteService } = useData();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'services'
    const [editingItem, setEditingItem] = useState(null); // Item being edited or new item
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Simple auth check
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple hardcoded password for MVP
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    const openModal = (item = null) => {
        // Deep copy to facilitate nested array editing like 'scope'
        const initialItem = item ? JSON.parse(JSON.stringify(item)) : {};
        if (!initialItem.scope) initialItem.scope = [];
        setEditingItem(initialItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (activeTab === 'projects') {
            if (editingItem.id) {
                await updateProject(editingItem.id, editingItem);
            } else {
                await addProject(editingItem);
            }
        } else {
            if (editingItem.id) {
                await updateService(editingItem.id, editingItem);
            } else {
                await addService(editingItem);
            }
        }
        closeModal();
    };

    // Helper for managing scope array
    const handleScopeChange = (index, value) => {
        const newScope = [...editingItem.scope];
        newScope[index] = value;
        setEditingItem({ ...editingItem, scope: newScope });
    };

    const addScopeItem = () => {
        setEditingItem({ ...editingItem, scope: [...editingItem.scope, ''] });
    };

    const removeScopeItem = (index) => {
        const newScope = editingItem.scope.filter((_, i) => i !== index);
        setEditingItem({ ...editingItem, scope: newScope });
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <Helmet><title>Admin Login</title></Helmet>
                <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Lock /> Admin Access
                    </h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', width: '250px' }}
                        />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <Helmet><title>Dashboard - Tameerox Admin</title></Helmet>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                <button
                    className="btn btn-outline"
                    onClick={() => setIsAuthenticated(false)}
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ddd', marginBottom: '30px' }}>
                <button
                    onClick={() => setActiveTab('projects')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'projects' ? '2px solid var(--color-primary)' : '2px solid transparent',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                >
                    Manage Projects
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'services' ? '2px solid var(--color-primary)' : '2px solid transparent',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                >
                    Manage Services
                </button>
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    Add New {activeTab === 'projects' ? 'Project' : 'Service'}
                </button>
            </div>

            {/* List */}
            <div style={{ display: 'grid', gap: '15px' }}>
                {activeTab === 'projects' ? (
                    projects.map(p => (
                        <ListItem
                            key={p.id}
                            item={p}
                            onEdit={() => openModal(p)}
                            onDelete={() => { if (window.confirm('Delete this project?')) deleteProject(p.id) }}
                        />
                    ))
                ) : (
                    services.map(s => (
                        <ListItem
                            key={s.id}
                            item={s}
                            onEdit={() => openModal(s)}
                            onDelete={() => { if (window.confirm('Delete this service?')) deleteService(s.id) }}
                        />
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>{editingItem.id ? 'Edit' : 'Add'} {activeTab === 'projects' ? 'Project' : 'Service'}</h2>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <FormInput label="Title" value={editingItem.title || ''} onChange={val => setEditingItem({ ...editingItem, title: val })} />

                            {activeTab === 'projects' ? (
                                <>
                                    <FormInput label="Category" value={editingItem.category || ''} onChange={val => setEditingItem({ ...editingItem, category: val })} />
                                    <FormImageUpload label="Project Image" value={editingItem.image} onChange={val => setEditingItem({ ...editingItem, image: val })} />
                                    <FormTextArea label="Description" value={editingItem.description || ''} onChange={val => setEditingItem({ ...editingItem, description: val })} />
                                </>
                            ) : (
                                <>
                                    <FormInput label="Slug (URL Friendly)" value={editingItem.slug || ''} onChange={val => setEditingItem({ ...editingItem, slug: val })} />

                                    {/* Icon Selection */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Icon</label>
                                        <select
                                            value={editingItem.iconName || ''}
                                            onChange={e => setEditingItem({ ...editingItem, iconName: e.target.value })}
                                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}
                                        >
                                            <option value="">Select Icon...</option>
                                            {Object.keys(iconMap).map(iconName => (
                                                <option key={iconName} value={iconName}>{iconName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <FormInput label="Short Description" value={editingItem.description || ''} onChange={val => setEditingItem({ ...editingItem, description: val })} />
                                    <FormTextArea label="Full Description" value={editingItem.fullDescription || ''} onChange={val => setEditingItem({ ...editingItem, fullDescription: val })} />
                                    <FormImageUpload label="Service Image" value={editingItem.image} onChange={val => setEditingItem({ ...editingItem, image: val })} />

                                    {/* Scope / Bullet Points */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Scope of Work (Bullet Points)</label>
                                        {editingItem.scope.map((item, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={e => handleScopeChange(index, e.target.value)}
                                                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                    placeholder="Add bullet point..."
                                                />
                                                <button type="button" onClick={() => removeScopeItem(index)} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <MinusCircle size={20} />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addScopeItem} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'flex-start', padding: '5px 10px', fontSize: '13px' }}>
                                            <PlusCircle size={14} /> Add Bullet Point
                                        </button>
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Components
const ListItem = ({ item, onEdit, onDelete }) => (
    <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', border: '1px solid #eee', borderRadius: '8px', background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
            <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
                <div style={{ fontSize: '13px', color: '#666' }}>{item.category || item.slug}</div>
            </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onEdit} className="btn-icon" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
                <Edit size={16} />
            </button>
            <button onClick={onDelete} className="btn-icon" style={{ padding: '8px', border: '1px solid #ffaeb6', background: '#fff5f5', borderRadius: '4px', cursor: 'pointer', color: '#e53e3e' }}>
                <Trash size={16} />
            </button>
        </div>
    </div>
);

const FormInput = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
    </div>
);

const FormTextArea = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
        <textarea
            rows={4}
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
        />
    </div>
);

const FormImageUpload = ({ label, value, onChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {value && (
                    <img src={value} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                )}
                <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '14px' }}>
                    <Upload size={16} />
                    {value ? 'Change Image' : 'Upload Image'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
            {/* Fallback to URL input if needed */}
            <input
                type="text"
                placeholder="Or paste image URL"
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', marginTop: '5px' }}
            />
        </div>
    );
};

export default AdminDashboard;
