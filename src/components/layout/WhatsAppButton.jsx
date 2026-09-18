import React from 'react';
import { MessageCircle } from 'lucide-react';

const phoneNumber = "+97471129272";
const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

const WhatsAppButton = () => {
    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '24px',
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                zIndex: 1100,
                animation: 'whatsapp-pulse 2.5s infinite'
            }}
        >
            <MessageCircle size={28} color="#fff" strokeWidth={2} />
            <style>{`
                @keyframes whatsapp-pulse {
                    0% { box-shadow: 0 4px 16px rgba(0,0,0,0.25), 0 0 0 0 rgba(37, 211, 102, 0.5); }
                    70% { box-shadow: 0 4px 16px rgba(0,0,0,0.25), 0 0 0 14px rgba(37, 211, 102, 0); }
                    100% { box-shadow: 0 4px 16px rgba(0,0,0,0.25), 0 0 0 0 rgba(37, 211, 102, 0); }
                }
                @media (max-width: 480px) {
                    a[aria-label="Chat with us on WhatsApp"] {
                        bottom: 16px;
                        left: 16px;
                        width: 50px;
                        height: 50px;
                    }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
