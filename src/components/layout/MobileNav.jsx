import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { Phone, MessageSquare, Calendar, MapPin } from 'lucide-react';

export function MobileNav() {
  const { tenant } = useTenant();

  return (
    <nav 
      className="mobile-bottom-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        display: 'none',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '0.45rem 0.5rem',
        zIndex: 850,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)'
      }}
      aria-label="Quick Mobile Actions"
    >
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-bar { display: grid !important; }
        }
      `}</style>

      {/* Call */}
      <a 
        href={`tel:${tenant?.contact?.phoneRaw}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '0.3rem'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Phone size={16} />
        </div>
        <span>Call</span>
      </a>

      {/* WhatsApp */}
      <a 
        href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '0.3rem'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#DCFCE7',
          color: '#15803D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MessageSquare size={16} />
        </div>
        <span>WhatsApp</span>
      </a>

      {/* Directions */}
      <a 
        href={tenant?.contact?.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '0.3rem'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--accent-light)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MapPin size={16} />
        </div>
        <span>Map</span>
      </a>

      {/* Book Appointment CTA */}
      <Link 
        to="/appointment"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--primary)',
          fontSize: '0.7rem',
          fontWeight: 700,
          textDecoration: 'none',
          padding: '0.3rem'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(15, 118, 110, 0.4)'
        }}>
          <Calendar size={16} />
        </div>
        <span>Book Slot</span>
      </Link>
    </nav>
  );
}
