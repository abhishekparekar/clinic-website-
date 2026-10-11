import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  HeartPulse
} from 'lucide-react';

export function Footer() {
  const { tenant } = useTenant();

  return (
    <footer style={{ background: '#0F172A', color: '#CBD5E1', paddingTop: '4.5rem', paddingBottom: '2.5rem', marginTop: 'auto' }}>
      <div className="container">
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '4px', 
                background: 'var(--gradient-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8 2 5 5 5 9C5 12.5 6.5 16 8 20C9 22 10.5 22 12 20C13.5 22 15 22 16 20C17.5 16 19 12.5 19 9C19 5 16 2 12 2Z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {tenant?.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {tenant?.branding?.badgeText}
                </div>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {tenant?.tagline || 'Compassionate, gentle dental care utilizing modern digital technology and hospital-grade sterilization standards.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} color="var(--accent)" />
              <span>Verified Clinical Protocols & Safe Practice</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: 0 }}>
              <li>
                <Link to="/services" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  Treatments & Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  Specialist Dentists
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  About Clinic & Technology
                </Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/appointment" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  Request an Appointment
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>
                  Patient Privacy Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours of Operation */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--accent)" />
              Clinical Working Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              {tenant?.openingHours?.map((slot, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.35rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>{slot.day}</span>
                  <span style={{ color: slot.closed ? '#F87171' : '#F1F5F9', fontWeight: 500 }}>
                    {slot.closed ? 'Closed' : `${slot.open} - ${slot.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Directions */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem' }}>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#E2E8F0', marginBottom: '0.2rem' }}>{tenant?.contact?.address}</div>
                  <a 
                    href={tenant?.contact?.directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}
                  >
                    Get GPS Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={17} color="var(--accent)" style={{ flexShrink: 0 }} />
                <a href={`tel:${tenant?.contact?.phoneRaw}`} style={{ color: '#E2E8F0', textDecoration: 'none' }}>
                  {tenant?.contact?.phone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={17} color="var(--accent)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${tenant?.contact?.email}`} style={{ color: '#E2E8F0', textDecoration: 'none' }}>
                  {tenant?.contact?.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MessageSquare size={17} color="#4ADE80" style={{ flexShrink: 0 }} />
                <a 
                  href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#4ADE80', fontWeight: 600, textDecoration: 'none' }}
                >
                  WhatsApp: {tenant?.contact?.whatsappDisplay || tenant?.contact?.phone}
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Emergency Notice Strip */}
        {tenant?.contact?.emergencyNotice && (
          <div style={{ 
            background: 'rgba(15, 118, 110, 0.15)', 
            border: '1px solid rgba(13, 148, 136, 0.3)', 
            borderRadius: '4px', 
            padding: '1rem 1.25rem', 
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            color: '#99F6E4'
          }}>
            <HeartPulse size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#FFFFFF' }}>Emergency Care Notice: </strong>
              {tenant?.contact?.emergencyNotice}
            </div>
          </div>
        )}

        {/* Bottom Bar & Legal Notice */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            &copy; {new Date().getFullYear()} {tenant?.name}. All rights reserved. Patient information protected under Privacy Policy.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link to="/privacy-policy" style={{ color: '#94A3B8', textDecoration: 'none' }}>
              Privacy Notice
            </Link>
            <span>•</span>
            <Link to="/admin" style={{ color: '#94A3B8', textDecoration: 'none' }}>
              Staff Login
            </Link>
            <span>•</span>
            <span style={{ color: '#64748B' }}>
              Platform by iCoded Automation Pvt. Ltd.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
