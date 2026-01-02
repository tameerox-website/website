import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Plus, Edit, Trash, MinusCircle, PlusCircle, X } from 'lucide-react';
import { FormInput, FormTextArea, FormImageUpload } from './AdminShared';
import { iconMap } from '../../data/data';
import { Skeleton } from '../ui/Skeleton';

const ServicesManager = () => {
    const { services, addService, updateService, deleteService, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const openModal = (service = null) => {
        // Deep copy needed for arrays like scope
        const item = service ? JSON.parse(JSON.stringify(service)) : {
            title: '', slug: '', iconName: '', description: '', fullDescription: '',
            scope: [], projectTypes: [], uniqueSellingPoints: [], image: ''
        };
        // Ensure arrays exist
        if (!item.scope) item.scope = [];
        if (!item.projectTypes) item.projectTypes = [];
        if (!item.uniqueSellingPoints) item.uniqueSellingPoints = [];

        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingItem.id) {
                await updateService(editingItem.id, editingItem);
            } else {
                await addService(editingItem);
            }
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (err) {
            alert('Error saving service: ' + err.message);
        }
    };

    // Array manipulation helpers
    const handleArrayChange = (field, index, value) => {
        const newArray = [...editingItem[field]];
        newArray[index] = value;
        setEditingItem({ ...editingItem, [field]: newArray });
    };

    const addArrayItem = (field) => {
        setEditingItem({ ...editingItem, [field]: [...editingItem[field], ''] });
    };

    const removeArrayItem = (field, index) => {
        const newArray = editingItem[field].filter((_, i) => i !== index);
        setEditingItem({ ...editingItem, [field]: newArray });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#1a202c' }}>Services Management</h2>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Service
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {[1, 2, 3].map(i => <Skeleton key={i} height="80px" />)}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                    {services.map(service => (
                        <div key={service.id} style={{
                            background: '#fff', borderRadius: '12px', padding: '20px',
                            border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                            display: 'flex', gap: '20px', alignItems: 'start'
                        }}>
                            <img src={service.image} alt={service.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#f7fafc' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#2d3748' }}>{service.title}</h4>
                                <p style={{ margin: 0, fontSize: '13px', color: '#718096', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {service.description}
                                </p>
                                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                    <button onClick={() => openModal(service)} className="btn-icon" style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '6px', cursor: 'pointer', color: '#4a5568' }}>
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => { if (window.confirm('Delete this service?')) deleteService(service.id) }} className="btn-icon" style={{ padding: '8px', border: '1px solid #fed7d7', borderRadius: '6px', cursor: 'pointer', background: '#fff5f5', color: '#e53e3e' }}>
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', padding: '0', borderRadius: '12px', width: '90%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>{editingItem.id ? 'Edit Service' : 'New Service'}</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>

                        <div style={{ padding: '24px', overflowY: 'auto' }}>
                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <FormInput label="Title" value={editingItem.title} onChange={v => setEditingItem({ ...editingItem, title: v })} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Icon</label>
                                        <select
                                            value={editingItem.iconName}
                                            onChange={e => setEditingItem({ ...editingItem, iconName: e.target.value })}
                                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}
                                        >
                                            <option value="">Select Icon...</option>
                                            {Object.keys(iconMap).map(iconName => (
                                                <option key={iconName} value={iconName}>{iconName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <FormInput label="Slug" value={editingItem.slug} onChange={v => setEditingItem({ ...editingItem, slug: v })} />
                                <FormTextArea label="Short Description" value={editingItem.description} onChange={v => setEditingItem({ ...editingItem, description: v })} />
                                <FormTextArea label="Full Description" value={editingItem.fullDescription} onChange={v => setEditingItem({ ...editingItem, fullDescription: v })} />
                                <FormImageUpload label="Service Image" value={editingItem.image} onChange={v => setEditingItem({ ...editingItem, image: v })} />

                                {/* Scope / USPs / Project Types */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                    {/* Scope */}
                                    <ArrayField label="Scope of Work (Checklist)" items={editingItem.scope} onChange={(idx, val) => handleArrayChange('scope', idx, val)} onRemove={(idx) => removeArrayItem('scope', idx)} onAdd={() => addArrayItem('scope')} />

                                    {/* Project Types */}
                                    <ArrayField label="Project Types (Tags)" items={editingItem.projectTypes} onChange={(idx, val) => handleArrayChange('projectTypes', idx, val)} onRemove={(idx) => removeArrayItem('projectTypes', idx)} onAdd={() => addArrayItem('projectTypes')} />

                                    {/* USPs */}
                                    <ArrayField label="Unique Selling Points" items={editingItem.uniqueSellingPoints} onChange={(idx, val) => handleArrayChange('uniqueSellingPoints', idx, val)} onRemove={(idx) => removeArrayItem('uniqueSellingPoints', idx)} onAdd={() => addArrayItem('uniqueSellingPoints')} />
                                </div>

                                <div style={{ paddingTop: '10px', display: 'flex', gap: '15px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
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

// Helper for array fields
const ArrayField = ({ label, items, onChange, onRemove, onAdd }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
        {items.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={item}
                    onChange={e => onChange(index, e.target.value)}
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Enter item..."
                />
                <button type="button" onClick={() => onRemove(index)} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <MinusCircle size={20} />
                </button>
            </div>
        ))}
        <button type="button" onClick={onAdd} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'flex-start', padding: '5px 10px', fontSize: '13px' }}>
            <PlusCircle size={14} /> Add Item
        </button>
    </div>
);

export default ServicesManager;
