import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, ExternalLink } from 'lucide-react';
import { services } from '../data/data';
import PageHero from '../components/layout/PageHero';

import { supabase } from '../lib/supabaseClient';

const Contact = () => {
    // Scroll animation hook
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            // Basic validation
            if (!formData.name || !formData.phone) {
                throw new Error("Name and Phone are required.");
            }

            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        message: `Service Req: ${formData.service} \n Message: ${formData.message}`,
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (error) throw error;

            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });
            alert("Thank you! Your inquiry has been received. We will contact you shortly.");

        } catch (error) {
            console.error('Submission Error:', error);
            setStatus({ loading: false, success: false, error: error.message || "Failed to submit. Please try again or call us directly." });
            alert(`Error: ${error.message || "Failed to submit."}`);
        }
    };

    const phoneNumber = "+97471129272";
    const displayPhone = "+974 7112 9272";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

    return (
        <>
            <Helmet>
                <title>Contact Us | Tameerox Construction Qatar</title>
                <meta name="description" content="Get in touch with Tameerox W.L.L for construction and waterproofing inquiries. Call +974 7112 9272 or visit our Al Sadd office." />
            </Helmet>

            <PageHero
                title="Let’s Discuss Your Project"
                subtitle="Call, WhatsApp, or send us a message — we respond within 2 hours during business days."
                backgroundImage="/assets/hero-contact.png"
                primaryCtaText="Call Now"
                primaryCtaLink={`tel:${phoneNumber}`}
                secondaryCtaText="WhatsApp Us"
                secondaryCtaLink={whatsappUrl}
            />


            <div className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>

                        {/* Contact Info Column */}
                        <div className="animate-on-scroll">
                            <h2 style={{ marginBottom: '10px', fontSize: '30px' }}>Contact Information</h2>
                            <p style={{ color: '#6B7280', marginBottom: '40px' }}>
                                We are available regarding all inquiries. Connect with us via phone, email, or visit our headquarters.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {/* Phone */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-accent)' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#9CA3AF' }}>Call Us 24/7</h5>
                                        <a href={`tel:${phoneNumber}`} style={{ fontSize: '20px', fontWeight: '600', color: 'var(--color-primary)' }}>{displayPhone}</a>
                                        <div style={{ marginTop: '5px' }}>
                                            <a href={whatsappUrl} className="text-accent" style={{ fontSize: '14px', fontWeight: '600', display: 'inline-flex', alignItems: 'center' }}>
                                                Chat on WhatsApp <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', background: 'rgba(91, 140, 199, 0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-secondary)' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#9CA3AF' }}>Head Office</h5>
                                        <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#1F2937' }}>
                                            Building No. 220, Zone 26, Street 69,<br />
                                            Al Sadd, Doha, Qatar
                                        </p>
                                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'underline' }}>View on Google Maps</a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#F3F4F6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4B5563' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#9CA3AF' }}>Email Us</h5>
                                        <a href="mailto:info@tameerox.qa" style={{ fontSize: '18px', color: '#1F2937' }}>info@tameerox.qa</a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#F3F4F6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4B5563' }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#9CA3AF' }}>Working Hours</h5>
                                        <p style={{ fontSize: '16px', color: '#1F2937' }}>Sat - Thu: 8:00 AM - 6:00 PM</p>
                                        <p style={{ fontSize: '14px', color: '#6B7280' }}>Friday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                            <div style={{ background: '#fff', padding: '40px', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
                                <h3 style={{ marginBottom: '25px', fontSize: '24px' }}>Send Us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{ width: '100%', padding: '14px', borderRadius: '2px', border: '1px solid #E5E7EB', fontFamily: 'inherit', background: '#F9FAFB' }}
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                style={{ width: '100%', padding: '14px', borderRadius: '2px', border: '1px solid #E5E7EB', fontFamily: 'inherit', background: '#F9FAFB' }}
                                                placeholder="+974..."
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '14px', borderRadius: '2px', border: '1px solid #E5E7EB', fontFamily: 'inherit', background: '#F9FAFB' }}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Service Required</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '14px', borderRadius: '2px', border: '1px solid #E5E7EB', fontFamily: 'inherit', background: '#F9FAFB' }}
                                        >
                                            <option value="">Select a Service...</option>
                                            {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                                            <option value="Other">Other Inquiry</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            style={{ width: '100%', padding: '14px', borderRadius: '2px', border: '1px solid #E5E7EB', fontFamily: 'inherit', background: '#F9FAFB', resize: 'vertical' }}
                                            placeholder="Tell us about your project..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: '100%', cursor: status.loading ? 'not-allowed' : 'pointer', justifyContent: 'center', opacity: status.loading ? 0.7 : 1 }}
                                        disabled={status.loading}
                                    >
                                        {status.loading ? 'Sending...' : 'Submit Inquiry'} <Send size={16} style={{ marginLeft: '10px' }} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div style={{ marginTop: '80px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E5E7EB', filter: 'grayscale(100%)' }} className="animate-on-scroll">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.781685714773!2d51.4983!3d25.2867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45db1b3b3b3b3b%3A0x1b3b3b3b3b3b3b3b!2sAl%20Sadd%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1612345678901!5m2!1sen!2sqa"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Tameerox Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
