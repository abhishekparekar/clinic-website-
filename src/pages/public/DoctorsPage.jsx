import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { 
  Award, 
  Clock, 
  Globe, 
  Calendar, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';

export function DoctorsPage() {
  const { tenant } = useTenant();
  const doctors = dentalStore.getDoctors(tenant.id, true);

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
            <Award size={14} /> Specialist Clinicians & Dentists
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1.25rem' }}>
            Meet Your Expert Dental Team
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Our dental specialists hold verified post-graduate Master of Dental Surgery (MDS) degrees and international fellowships, dedicated to patient safety and pain-free treatments.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3.5vw, 2.5rem)'
          }}>
            {doctors.map(doc => (
              <div 
                key={doc.id}
                className="glass-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Photo Header */}
                <div style={{ height: 'clamp(240px, 35vw, 320px)', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={doc.photoUrl} 
                    alt={doc.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {doc.experienceYears}+ Years Clinical Exp.
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                    {doc.name}
                  </h2>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.25rem' }}>
                    {doc.role}
                  </div>

                  {/* Qualifications */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <GraduationCap size={15} /> Verified Credentials
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {doc.qualifications?.map((qual, qIdx) => (
                        <li key={qIdx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                          <CheckCircle2 size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1 }}>
                    {doc.bio}
                  </p>

                  {/* Languages & Schedule */}
                  <div style={{
                    background: 'var(--bg-page)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Globe size={14} color="var(--primary)" />
                      <span><strong>Languages:</strong> {doc.languages?.join(', ')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} color="var(--primary)" />
                      <span><strong>Roster:</strong> {doc.scheduleDays}</span>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <Link 
                    to={`/appointment?doctor=${doc.id}`}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <Calendar size={16} />
                    <span>Book Consultation with {doc.name.split(' ')[1]}</span>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
