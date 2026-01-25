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
    const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Calculate new dimensions
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        } else {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }
                    
                    // Create canvas and compress
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to base64 with compression
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedDataUrl);
                };
                img.onerror = () => resolve(e.target.result); // Fallback to original if compression fails
                img.src = e.target.result;
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (warn if > 2MB)
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > 2) {
                const proceed = confirm(
                    `Image is large (${fileSizeMB.toFixed(1)}MB). ` +
                    `It will be compressed automatically. Continue?`
                );
                if (!proceed) return;
            }
            
            // Compress image before converting to base64
            const compressedDataUrl = await compressImage(file);
            if (compressedDataUrl) {
                onChange(compressedDataUrl);
            } else {
                alert('Error processing image. Please try again.');
            }
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
