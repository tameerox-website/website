import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, LayoutDashboard, Briefcase, Wrench, Users, MessageSquare } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

import ProjectsManager from '../../components/admin/ProjectsManager';
import ServicesManager from '../../components/admin/ServicesManager';
import LeadershipManager from '../../components/admin/LeadershipManager';
import LeadsManager from '../../components/admin/LeadsManager'; // New component
import { Skeleton } from '../../components/ui/Skeleton';

const AdminDashboard = () => {
    const { projects, services } = useData();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    // Simple auth chec
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7fafc'
            }}>
                <Helmet><title>Admin Login</title></Helmet>
                <div style={{ padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' }}>
                    <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748', justifyContent: 'center' }}>
                        <Lock color="var(--color-primary)" /> Admin Portal
                    </h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '12px', fontSize: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    // Sidebar Items
    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'services', label: 'Services', icon: Wrench },
        { id: 'leads', label: 'Inquiries', icon: MessageSquare },
        { id: 'leadership', label: 'Leadership', icon: Users },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
            <Helmet><title>Dashboard - Tameerox Admin</title></Helmet>

            {/* Sidebar */}
            <div style={{
                width: '260px', background: '#1a202c', color: '#fff', display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100
            }}>
                <div style={{ padding: '30px 20px', borderBottom: '1px solid #2d3748' }}>
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#fff' }}>Tameerox Admin</h1>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#a0aec0' }}>Content Management</p>
                </div>

                <nav style={{ flex: 1, padding: '20px 0' }}>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    width: '100%', padding: '15px 25px',
                                    background: isActive ? 'var(--color-primary)' : 'transparent',
                                    color: isActive ? '#fff' : '#a0aec0',
                                    border: 'none', cursor: 'pointer',
                                    textAlign: 'left', fontSize: '15px', fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #2d3748' }}>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        style={{
                            width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)',
                            color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                    <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '11px', color: '#718096' }}>
                        v2.1.0 • Built for Tameerox
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ marginLeft: '260px', flex: 1, padding: '40px', overflowY: 'auto' }}>
                {activeTab === 'dashboard' && <DashboardOverview projects={projects} services={services} setActiveTab={setActiveTab} />}
                {activeTab === 'projects' && <ProjectsManager />}
                {activeTab === 'services' && <ServicesManager />}
                {activeTab === 'leadership' && <LeadershipManager />}
                {activeTab === 'leads' && <LeadsManager />}
            </div>
        </div>
    );
};

// Overview Component
const DashboardOverview = ({ projects = [], services = [], setActiveTab }) => {
    return (
        <div>
            <h2 style={{ fontSize: '28px', color: '#1a202c', marginBottom: '10px' }}>Welcome back, Admin</h2>
            <p style={{ color: '#718096', marginBottom: '40px' }}>Here's what's happening with your website content today.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                <StatCard
                    label="Total Projects"
                    value={projects.length}
                    icon={Briefcase}
                    color="blue"
                    onClick={() => setActiveTab('projects')}
                />
                <StatCard
                    label="Active Services"
                    value={services.length}
                    icon={Wrench}
                    color="green"
                    onClick={() => setActiveTab('services')}
                />
                <StatCard
                    label="New Inquiries"
                    value="View"
                    icon={MessageSquare}
                    color="purple"
                    onClick={() => setActiveTab('leads')}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#2d3748' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn btn-primary" onClick={() => setActiveTab('projects')}>Add Project</button>
                        <button className="btn btn-outline" onClick={() => setActiveTab('services')}>Updated Services</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon: Icon, color, onClick }) => {
    const colors = {
        blue: { bg: '#EBF8FF', text: '#2B6CB0' },
        green: { bg: '#F0FFF4', text: '#2F855A' },
        purple: { bg: '#FAF5FF', text: '#805AD5' },
    };
    const theme = colors[color] || colors.blue;

    return (
        <div
            onClick={onClick}
            style={{
                background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#718096', fontWeight: '600' }}>{label}</p>
                <h3 style={{ margin: 0, fontSize: '32px', color: '#1a202c' }}>{value}</h3>
            </div>
            <div style={{
                width: '50px', height: '50px', borderRadius: '10px',
                background: theme.bg, color: theme.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={24} />
            </div>
        </div>
    );
};

export default AdminDashboard;
