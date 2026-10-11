import React from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const { tenant } = useTenant();

  return (
    <div>
      {/* Page Header */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        padding: '4.5rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            <MapPin size={14} /> Clinic Location & Hours
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1.25rem' }}>
            Visit Us or Get in Touch
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            We look forward to welcoming you to {tenant?.name}. Find our contact channels, scheduled operating hours, and location directions below.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Hours */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem'
          }}>
            
            {/* Column 1: Direct Contact Channels */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Direct Contact Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                
                {/* Physical Address Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Clinic Address</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                      {tenant?.contact?.address}
                    </p>
                    <a 
                      href={tenant?.contact?.directionsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Reception Desk</h3>
                    <a href={`tel:${tenant?.contact?.phoneRaw}`} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                      {tenant?.contact?.phone}
                    </a>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                      Call for same-day appointments or directions assistance
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>WhatsApp Care Line</h3>
                    <a 
                      href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '1.05rem', fontWeight: 700, color: '#15803D', textDecoration: 'none' }}
                    >
                      {tenant?.contact?.whatsappDisplay || tenant?.contact?.phone}
                    </a>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                      Instant chat for general enquiries & slot confirmations
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Email Inquiries</h3>
                    <a href={`mailto:${tenant?.contact?.email}`} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none' }}>
                      {tenant?.contact?.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Emergency Guidance Notice */}
              {tenant?.contact?.emergencyNotice && (
                <div style={{
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFBEB',
                  border: '1.5px solid #FCD34D',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}>
                  <AlertTriangle size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#92400E', fontSize: '0.95rem' }}>Emergency Dental Assistance:</strong>
                    <p style={{ fontSize: '0.875rem', color: '#78350F', marginTop: '0.35rem', lineHeight: 1.5 }}>
                      {tenant?.contact?.emergencyNotice}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: '#B45309', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      (Note: Website forms are not monitored 24/7 for critical emergencies. In life-threatening emergencies, visit the nearest emergency medical facility.)
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Column 2: Opening Hours Table & Booking CTA */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Weekly Operating Schedule</h2>

              <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Clock size={20} />
                  <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Clinical Consultation Timings</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tenant?.openingHours?.map((slot, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.65rem 0.5rem',
                        borderRadius: '6px',
                        background: slot.closed ? '#FEF2F2' : 'transparent',
                        borderBottom: slot.closed ? 'none' : '1px solid var(--border-light)'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{slot.day}</span>
                      <span style={{ 
                        fontWeight: 600, 
                        color: slot.closed ? '#DC2626' : 'var(--primary)',
                        fontSize: '0.9rem'
                      }}>
                        {slot.closed ? 'Closed (Emergency On-Call)' : `${slot.open} - ${slot.close}`}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <Link to="/appointment" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Calendar size={18} />
                    <span>Book Your Time Window</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Map Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Find Our Location</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Easy landmark accessibility with dedicated patient parking available.</p>
              </div>
              <a 
                href={tenant?.contact?.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div style={{ 
              height: '380px', 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-md)', 
              border: '1px solid var(--border-light)',
              background: '#F1F5F9'
            }}>
              <iframe
                title={`Map location for ${tenant?.name}`}
                src={tenant?.contact?.mapEmbedUrl || 'https://maps.google.com'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
