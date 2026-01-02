import React from 'react';

export const Skeleton = ({ height = '20px', width = '100%', style = {} }) => (
    <div style={{
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        height,
        width,
        animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...style
    }}>
        <style>{`
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .5; }
            }
        `}</style>
    </div>
);
