import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAppointmentModal } from '../../features/appointment/AppointmentModalContext';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Menu, 
  X, 
  Lock
} from 'lucide-react';

export function Header() {
  const { tenant } = useTenant();
  const { openAppointmentModal } = useAppointmentModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer and dropdown on window resize if enlarged
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Treatments', path: '/services' },
    { label: 'Our Specialists', path: '/doctors' },
    { label: 'Patient FAQs', path: '/faq' },
    { label: 'Contact & Hours', path: '/contact' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
      {/* Top Radiant Linear Gradient Accent Bar */}
      <div style={{
        height: '3px',
        width: '100%',
        background: 'var(--gradient-accent-bar)'
      }} />

      {/* Top Utility Bar (Optimized for Mobile & Desktop) */}
      <div style={{ 
        background: '#0F172A', 
        color: '#94A3B8', 
        fontSize: '0.8rem', 
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Quick Contact & Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'none', alignItems: 'center', gap: '0.4rem', color: '#E2E8F0' }} className="header-hours-desktop">
              <Clock size={13} style={{ color: 'var(--accent)' }} />
              Mon-Sat: 9 AM - 8 PM
            </span>
            <style>{`
              @media (min-width: 768px) {
                .header-hours-desktop { display: inline-flex !important; }
              }
            `}</style>
            
            <a 
              href={`tel:${tenant?.contact?.phoneRaw || '+919820123456'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0', textDecoration: 'none', fontSize: '0.785rem' }}
              title="Call Clinic Reception"
            >
              <Phone size={13} style={{ color: 'var(--accent)' }} />
              <span>{tenant?.contact?.phone}</span>
            </a>

            <a 
              href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tenant?.name || 'Clinic')}%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4ADE80', fontWeight: 600, textDecoration: 'none', fontSize: '0.785rem' }}
              title="Chat on WhatsApp"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Clinic Location & Staff Portal Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.785rem', color: '#CBD5E1', display: 'none' }} className="header-location-desktop">
              {tenant?.contact?.address ? tenant.contact.address.split(',').slice(1, 3).join(', ') : 'Bandra West, Mumbai'}
            </span>
            <style>{`
              @media (min-width: 640px) {
                .header-location-desktop { display: inline !important; }
              }
            `}</style>

            <Link 
              to="/admin" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                color: '#E2E8F0', 
                fontSize: '0.75rem',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.1)',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                fontWeight: 600
              }}
              title="Clinic Staff Portal"
            >
              <Lock size={12} />
              <span>Staff Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.96)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        width: '100%'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', minWidth: 0 }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '4px', 
              background: 'var(--gradient-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px 0 rgba(15, 118, 110, 0.3)',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8 2 5 5 5 9C5 12.5 6.5 16 8 20C9 22 10.5 22 12 20C13.5 22 15 22 16 20C17.5 16 19 12.5 19 9C19 5 16 2 12 2Z"/>
                <path d="M9 9C9 7.5 10.5 6 12 6" stroke="rgba(255,255,255,0.7)"/>
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', 
                fontWeight: 800, 
                color: 'var(--text-main)', 
                letterSpacing: '-0.02em', 
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {tenant?.branding?.logoText || tenant?.name}
              </div>
              <div style={{ 
                fontSize: '0.685rem', 
                color: 'var(--primary)', 
                fontWeight: 600, 
                letterSpacing: '0.03em', 
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {tenant?.branding?.badgeText || 'Dental Care & Surgery'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
            <style>{`
              @media (min-width: 960px) {
                .desktop-nav { display: flex !important; }
                .mobile-toggle-btn { display: none !important; }
              }
            `}</style>
            {navLinks.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.925rem',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.25rem 0'
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2.5px',
                        borderRadius: '2px',
                        background: 'var(--gradient-primary)'
                      }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Hamburger Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button 
              onClick={() => openAppointmentModal()}
              className="btn btn-primary"
              style={{ display: 'none' }}
              id="header-cta-appointment"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>
            <style>{`
              @media (min-width: 640px) {
                #header-cta-appointment { display: inline-flex !important; }
              }
            `}</style>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn btn-icon"
              style={{ color: 'var(--text-main)', border: '1.5px solid var(--border-light)', width: '42px', height: '42px' }}
              aria-label="Toggle mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Full Height, Touch-Optimized) */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            width: '85%',
            maxWidth: '340px',
            background: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            padding: '1.5rem',
            animation: 'slideInRight 0.25s ease-out',
            overflowY: 'auto'
          }}>
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  {tenant?.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {tenant?.branding?.badgeText}
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-icon"
                style={{ width: '38px', height: '38px', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
              {navLinks.map(link => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  })}
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Quick Actions & Links */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAppointmentModal();
                }}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                <Calendar size={17} />
                <span>Book Appointment</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <a 
                  href={`tel:${tenant?.contact?.phoneRaw || '+919820123456'}`}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Phone size={14} />
                  <span>Call</span>
                </a>
                <a 
                  href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Staff Portal Link */}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem',
                  borderRadius: '4px',
                  background: '#F1F5F9',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: '0.25rem'
                }}
              >
                <Lock size={13} />
                <span>Clinic Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
