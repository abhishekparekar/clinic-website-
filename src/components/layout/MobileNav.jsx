import React from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAppointmentModal } from '../../features/appointment/AppointmentModalContext';
import { Phone, MessageSquare, Calendar, MapPin } from 'lucide-react';

export function MobileNav() {
  const { tenant } = useTenant();
  const { openAppointmentModal } = useAppointmentModal();

  return (
    <nav 
      className="mobile-bottom-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(226, 232, 240, 0.9)',
        display: 'none',
        gridTemplateColumns: 'repeat(4, 1fr)',
        paddingTop: '0.45rem',
        paddingBottom: 'calc(0.45rem + env(safe-area-inset-bottom, 0px))',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        zIndex: 850,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)'
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
          padding: '0.25rem 0'
        }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: 'var(--radius-sm)',
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
          padding: '0.25rem 0'
        }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: 'var(--radius-sm)',
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
          padding: '0.25rem 0'
        }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: 'var(--radius-sm)',
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

      {/* Book Appointment Slot (Triggers Interactive Modal) */}
      <button 
        type="button"
        onClick={() => openAppointmentModal()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--primary)',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.25rem 0',
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: 'var(--radius-sm)',
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
      </button>
    </nav>
  );
}
