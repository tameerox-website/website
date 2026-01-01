import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / totalHeight) * 100;
        setScrollWidth(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${scrollWidth}%`,
            height: '3px',
            backgroundColor: 'var(--color-accent)', // Gold
            zIndex: 9999,
            transition: 'width 0.1s ease-out'
        }}></div>
    );
};

export default ScrollProgress;
