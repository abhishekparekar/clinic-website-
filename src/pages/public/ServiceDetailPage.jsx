import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAppointmentModal } from '../../features/appointment/AppointmentModalContext';
import { dentalStore } from '../../lib/store';
import { 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  HelpCircle,
  Stethoscope
} from 'lucide-react';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { tenant } = useTenant();
  const { openAppointmentModal } = useAppointmentModal();
  const service = dentalStore.getServiceBySlug(tenant.id, slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div>
      {/* Breadcrumb Header */}
      <section className="section-animate" style={{ 
        background: 'var(--gradient-hero)', 
        padding: '3.5rem 0', 
        borderBottom: '1px solid var(--border-light)' 
      }}>
        <div className="container">
          <Link 
            to="/services" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)', 
              marginBottom: '1.25rem',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to All Treatments
          </Link>

          <div style={{ maxWidth: '820px' }}>
            <span className="section-tag" style={{ marginBottom: '0.75rem', borderRadius: '4px' }}>
              {service.category}
            </span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {service.name}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              {service.summary}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Clock size={16} color="var(--primary)" />
                <strong>Duration:</strong> {service.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <strong>Sterile Protocol:</strong> Class-B Autoclave
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section section-animate" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '4rem', 
            alignItems: 'flex-start' 
          }}>
            
            {/* Left Column: Procedure Details, Steps & Clinical Benefits */}
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Overview & Clinical Approach</h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {service.description}
                </p>
              </div>

              {/* Step-by-Step Procedure Workflow */}
              {service.procedureSteps && service.procedureSteps.length > 0 && (
                <div style={{ marginBottom: '3.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Step-by-Step Treatment Procedure</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {service.procedureSteps.map((stepItem) => (
                      <div 
                        key={stepItem.step}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1.25rem',
                          padding: '1.25rem',
                          borderRadius: '4px',
                          background: 'var(--bg-page)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '4px',
                          background: 'var(--gradient-primary)',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {stepItem.step}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{stepItem.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{stepItem.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Patient Advantages */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Treatment Advantages & Care Standards</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem 1rem', background: '#F0FDFA', borderRadius: '4px' }}>
                        <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#134E4A' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Sticky Booking Card & Coordinator Hotline */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="glass-panel" style={{ padding: '2rem', background: '#FFFFFF', boxShadow: 'var(--shadow-xl)', borderRadius: '4px' }}>
                <span className="badge badge-active" style={{ marginBottom: '1rem', borderRadius: '4px' }}>
                  Accepting New Consultations
                </span>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Request Consultation Slot
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  Book your clinical evaluation at {tenant?.name} for <strong>{service.name}</strong>.
                </p>

                <div style={{ 
                  background: 'var(--bg-page)', 
                  borderRadius: '4px', 
                  padding: '1.25rem', 
                  marginBottom: '1.75rem',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.25rem' }}>Pricing Guidance:</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {service.priceEstimate || 'Personalized plan upon clinical scan'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Transparent quote provided post-radiograph consultation. Zero hidden costs.
                  </div>
                </div>

                <button 
                  onClick={() => openAppointmentModal(service.slug)} 
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  <Calendar size={18} />
                  <span>Book This Treatment</span>
                </button>

                <a 
                  href={`tel:${tenant?.contact?.phoneRaw}`}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <Phone size={16} />
                  <span>Call Reception ({tenant?.contact?.phone})</span>
                </a>

                <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                  Free rescheduling up to 4 hours before consultation.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
