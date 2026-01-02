import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Skeleton } from '../ui/Skeleton';
import { Search, Filter, Mail, Phone, Clock, CheckCircle, Archive, Trash2 } from 'lucide-react';

const STATUS_COLORS = {
    'New': { bg: '#EBF8FF', color: '#2B6CB0' },
    'Contacted': { bg: '#FFFFF0', color: '#B7791F' },
    'Converted': { bg: '#F0FFF4', color: '#2F855A' },
    'Archived': { bg: '#F7FAFC', color: '#A0AEC0' }
};

const LeadsManager = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setLeads(data);
        }
        setLoading(false);
    };

    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase.from('contacts').update({ status: newStatus }).eq('id', id);
        if (!error) {
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        }
    };

    const deleteLead = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (!error) {
            setLeads(prev => prev.filter(l => l.id !== id));
        }
    };

    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
            const matchesSearch =
                (lead.name && lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (lead.phone && lead.phone.includes(searchQuery));
            return matchesStatus && matchesSearch;
        });
    }, [leads, filterStatus, searchQuery]);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#1a202c' }}>Inquiries & Leads</h2>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
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
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {[1, 2, 3].map(i => <Skeleton key={i} height="80px" />)}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {filteredLeads.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0', background: '#fff', borderRadius: '8px' }}>
                            No leads found.
                        </div>
                    ) : (
                        filteredLeads.map(lead => {
                            const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS['New'];
                            return (
                                <div key={lead.id} style={{
                                    background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                    display: 'flex', flexDirection: 'column', gap: '15px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                                <h4 style={{ margin: 0, fontSize: '18px', color: '#2d3748' }}>{lead.name}</h4>
                                                <span style={{
                                                    fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600',
                                                    background: statusColor.bg, color: statusColor.color
                                                }}>
                                                    {lead.status || 'New'}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '15px', color: '#718096', fontSize: '14px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={14} /> {lead.phone}</span>
                                                {lead.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={14} /> {lead.email}</span>}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {new Date(lead.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                title="Mark Contacted"
                                                onClick={() => updateStatus(lead.id, 'Contacted')}
                                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #F6E05E', background: '#FFFFF0', color: '#D69E2E', cursor: 'pointer' }}
                                            >
                                                <Phone size={16} />
                                            </button>
                                            <button
                                                title="Mark Converted"
                                                onClick={() => updateStatus(lead.id, 'Converted')}
                                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #68D391', background: '#F0FFF4', color: '#38A169', cursor: 'pointer' }}
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                            <button
                                                title="Archive"
                                                onClick={() => updateStatus(lead.id, 'Archived')}
                                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #CBD5E0', background: '#F7FAFC', color: '#718096', cursor: 'pointer' }}
                                            >
                                                <Archive size={16} />
                                            </button>
                                            <button
                                                title="Delete"
                                                onClick={() => deleteLead(lead.id)}
                                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #FEB2B2', background: '#FFF5F5', color: '#E53E3E', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {lead.message && (
                                        <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '6px', fontSize: '14px', color: '#4a5568', whiteSpace: 'pre-wrap' }}>
                                            {lead.message}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default LeadsManager;
