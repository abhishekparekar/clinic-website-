import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Treatments', path: '/services' },
    { label: 'Our Specialists', path: '/doctors' },
    { label: 'Patient FAQs', path: '/faq' },
    { label: 'Contact & Hours', path: '/contact' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900 }}>
      {/* Top Utility Bar */}
      <div style={{ 
        background: '#0F172A', 
        color: '#94A3B8', 
        fontSize: '0.8rem', 
        padding: '0.45rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          {/* Clinic Hours & Quick Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E2E8F0' }}>
              <Clock size={13} style={{ color: 'var(--accent)' }} />
              Mon-Sat: 9:00 AM - 8:00 PM
            </span>
            <a 
              href={`tel:${tenant?.contact?.phoneRaw || '+919820123456'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E2E8F0', textDecoration: 'none' }}
              title="Call Clinic Reception"
            >
              <Phone size={13} style={{ color: 'var(--accent)' }} />
              {tenant?.contact?.phone}
            </a>
            <a 
              href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tenant?.name || 'Clinic')}%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4ADE80', fontWeight: 600, textDecoration: 'none' }}
              title="Chat on WhatsApp"
            >
              <MessageSquare size={13} />
              WhatsApp Triage
            </a>
          </div>

          {/* Tenant Switcher & Admin Portal Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Multi-Tenant Switcher */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#FFFFFF', 
                  padding: '0.2rem 0.65rem', 
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
                title="Switch Clinic Tenant"
              >
                <Building2 size={12} style={{ color: 'var(--accent)' }} />
                <span>Tenant: {tenant?.name?.split(' ')[0]}</span>
                <ChevronDown size={11} />
              </button>

              {tenantDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '0.35rem',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  borderRadius: '8px',
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
                        padding: '0.6rem 0.75rem',
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
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.3rem', 
                color: '#94A3B8', 
                fontSize: '0.75rem',
                textDecoration: 'none'
              }}
              title="Clinic Staff Portal"
            >
              <Lock size={12} />
              <span>Staff Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar with Glassmorphism */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.94)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'var(--gradient-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px 0 rgba(15, 118, 110, 0.3)'
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8 2 5 5 5 9C5 12.5 6.5 16 8 20C9 22 10.5 22 12 20C13.5 22 15 22 16 20C17.5 16 19 12.5 19 9C19 5 16 2 12 2Z"/>
                <path d="M9 9C9 7.5 10.5 6 12 6" stroke="rgba(255,255,255,0.7)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {tenant?.branding?.logoText || tenant?.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                {tenant?.branding?.badgeText || 'Dental Care & Surgery'}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
            <style>{`
              @media (min-width: 960px) {
                .desktop-nav { display: flex !important; }
                .mobile-toggle { display: none !important; }
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

          {/* CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Link 
              to="/appointment" 
              className="btn btn-primary"
              style={{ display: 'none' }}
              id="header-cta-appointment"
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </Link>
            <style>{`
              @media (min-width: 640px) {
                #header-cta-appointment { display: inline-flex !important; }
              }
            `}</style>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle btn-icon"
              style={{ color: 'var(--text-main)', border: '1px solid var(--border-light)' }}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: '120px 0 0 0',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          zIndex: 890,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '1.05rem',
                  textDecoration: 'none'
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link 
              to="/appointment" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Calendar size={18} />
              Book an Appointment
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <a 
                href={`tel:${tenant?.contact?.phoneRaw || '+919820123456'}`}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Phone size={16} />
                Call Clinic
              </a>
              <a 
                href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
