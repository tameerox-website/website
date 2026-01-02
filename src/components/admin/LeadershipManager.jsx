import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { FormInput, FormTextArea, FormImageUpload } from './AdminShared';

const LeadershipManager = () => {
    const { siteContent, updateSiteContent } = useData();
    const [ceoForm, setCeoForm] = useState({
        name: '', title: '', bio: '', image: '', quote: ''
    });

    useEffect(() => {
        if (siteContent && siteContent['ceo_section']) {
            setCeoForm(siteContent['ceo_section']);
        }
    }, [siteContent]);

    const handleSave = async (e) => {
        e.preventDefault();
        await updateSiteContent('ceo_section', ceoForm);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h2 style={{ fontSize: '24px', color: '#1a202c', marginBottom: '30px' }}>Leadership & CEO Profile</h2>

            <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <FormInput label="Full Name" value={ceoForm.name} onChange={(v) => setCeoForm({ ...ceoForm, name: v })} />
                        <FormInput label="Job Title" value={ceoForm.title} onChange={(v) => setCeoForm({ ...ceoForm, title: v })} />
                    </div>

                    <FormTextArea label="Bio" value={ceoForm.bio} onChange={(v) => setCeoForm({ ...ceoForm, bio: v })} />
                    <FormTextArea label="Quote" value={ceoForm.quote} onChange={(v) => setCeoForm({ ...ceoForm, quote: v })} rows={3} />

                    <FormImageUpload label="CEO Headshot" value={ceoForm.image} onChange={(v) => setCeoForm({ ...ceoForm, image: v })} />

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ minWidth: '150px' }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadershipManager;
