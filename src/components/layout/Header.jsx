import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Menu, 
  X, 
  Building2, 
  ChevronDown,
  Sparkles,
  Lock
} from 'lucide-react';

export function Header() {
  const { tenant, allTenants, switchTenant } = useTenant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);

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
    <header style={{ position: 'sticky', top: 0, zIndex: 900, width: '100%' }}>
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

          {/* Tenant Switcher & Staff Portal Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Multi-Tenant Switcher */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  background: 'rgba(255,255,255,0.12)', 
                  color: '#FFFFFF', 
                  padding: '0.25rem 0.65rem', 
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
                title="Switch Clinic Tenant (PRD FR-01)"
              >
                <Building2 size={12} style={{ color: 'var(--accent)' }} />
                <span>{tenant?.name?.split(' ')[0]}</span>
                <ChevronDown size={11} />
              </button>

              {tenantDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '0.4rem',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid #E2E8F0',
                  minWidth: '240px',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Select Clinic Tenant (PRD FR-01)
                  </div>
                  {allTenants.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        switchTenant(t.id);
                        setTenantDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        textAlign: 'left',
                        fontSize: '0.8rem',
                        color: t.id === tenant.id ? 'var(--primary)' : '#1E293B',
                        background: t.id === tenant.id ? 'var(--primary-light)' : 'transparent',
                        fontWeight: t.id === tenant.id ? 700 : 500,
                        borderBottom: '1px solid #F1F5F9'
                      }}
                    >
                      <div>
                        <div>{t.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{t.contact?.address?.split(',')[2] || t.slug}</div>
                      </div>
                      {t.id === tenant.id && <Sparkles size={13} color="var(--primary)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Login Link */}
            <Link 
              to="/admin" 
              style={{ 
                display: 'none', 
                alignItems: 'center', 
                gap: '0.3rem', 
                color: '#94A3B8', 
                fontSize: '0.75rem',
                textDecoration: 'none'
              }}
              className="header-staff-link"
              title="Clinic Staff Portal"
            >
              <Lock size={12} />
              <span>Portal</span>
            </Link>
            <style>{`
              @media (min-width: 640px) {
                .header-staff-link { display: inline-flex !important; }
              }
            `}</style>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.96)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: 'var(--shadow-sm)',
        width: '100%'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', minWidth: 0 }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '11px', 
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
            <Link 
              to="/appointment" 
              className="btn btn-primary"
              style={{ display: 'none' }}
              id="header-cta-appointment"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </Link>
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
                    borderRadius: '10px',
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
              <Link 
                to="/appointment" 
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                <Calendar size={17} />
                <span>Book Appointment</span>
              </Link>

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
                  borderRadius: '8px',
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
