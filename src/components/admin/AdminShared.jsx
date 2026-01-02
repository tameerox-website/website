import React from 'react';
import { Upload } from 'lucide-react';

export const FormInput = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
    </div>
);

export const FormTextArea = ({ label, value, onChange, rows = 4 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>{label}</label>
        <textarea
            rows={rows}
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
        />
    </div>
);

export const FormImageUpload = ({ label, value, onChange }) => {
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
