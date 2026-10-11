import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Microscope, 
  Heart, 
  Smile, 
  Award,
  ChevronDown,
  Stethoscope
} from 'lucide-react';

export function HomePage() {
  const { tenant } = useTenant();
  const services = dentalStore.getServices(tenant.id, true);
  const doctors = dentalStore.getDoctors(tenant.id, true);
  const faqs = dentalStore.getFaqs(tenant.id, true).slice(0, 4);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* =========================================================================
          HERO SECTION with Linear Gradients & Responsive Polish
          ========================================================================= */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)', 
        paddingBottom: 'clamp(3.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Soft decorative background glows */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 'clamp(280px, 45vw, 550px)',
          height: 'clamp(280px, 45vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(15, 118, 110, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
            alignItems: 'center', 
            gap: 'clamp(2rem, 5vw, 3.5rem)' 
          }}>
            
            {/* Left Column: Headline & Action CTAs */}
            <div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.35rem 0.85rem', 
                borderRadius: '9999px', 
                background: 'rgba(255, 255, 255, 0.92)', 
                border: '1px solid rgba(13, 148, 136, 0.3)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.25rem',
                maxWidth: '100%'
              }}>
                <Sparkles size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tenant?.branding?.badgeText || 'Modern Dental Excellence'}
                </span>
              </div>

              <h1 style={{ 
                fontSize: 'clamp(2.1rem, 5.5vw, 3.5rem)', 
                lineHeight: 1.15, 
                marginBottom: '1.25rem',
                color: 'var(--text-main)',
                letterSpacing: '-0.025em'
              }}>
                Experience Gentle, <br />
                <span className="text-gradient">Pain-Free Dentistry</span> <br />
                You Can Trust.
              </h1>

              <p style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
                lineHeight: 1.65, 
                color: 'var(--text-muted)', 
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Welcome to <strong>{tenant?.name}</strong>. From computer-guided dental implants and microscopic root canals to invisible clear aligners, our dental specialists deliver personalized, comfortable care backed by 3D diagnostics.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
                <Link to="/appointment" className="btn btn-primary btn-lg" style={{ flexGrow: 1, maxWidth: '280px' }}>
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </Link>

                <a 
                  href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tenant?.name)}%2C%20I%20have%20an%20enquiry%20regarding%20dental%20treatment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  style={{ flexGrow: 1, maxWidth: '220px' }}
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp Triage</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.25rem', 
                flexWrap: 'wrap',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(226, 232, 240, 0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Class-B Autoclave Sterilization
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    3D Digital CBCT Imaging
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Mobile Safe Badges */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '3px solid #FFFFFF'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900" 
                  alt="Modern Dental Clinic Operatory with High-tech Equipment"
                  style={{ width: '100%', height: 'clamp(280px, 42vw, 440px)', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.55) 0%, transparent 60%)'
                }} />
                
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', color: '#FFFFFF' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', fontWeight: 700 }}>
                    Modern Clinical Operatory
                  </div>
                  <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 700, lineHeight: 1.3 }}>
                    Calm, sterile environment crafted for zero anxiety
                  </div>
                </div>
              </div>

              {/* Floating Trust Cards (Desktop & Mobile Adaptive) */}
              <div className="hero-floating-badges" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                marginTop: '1rem'
              }}>
                <div className="glass-panel" style={{
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Microscope size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
                      100% Painless
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Computerized Anesthesia
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#FEF3C7',
                    color: '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Star size={18} fill="#D97706" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
                      4.9 / 5.0 Rating
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      3,500+ Verified Reviews
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CLINICAL METRICS BAR
          ========================================================================= */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {tenant?.stats?.map((stat, idx) => (
              <div key={idx} style={{ padding: '0.5rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  lineHeight: 1.1,
                  marginBottom: '0.25rem'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED TREATMENTS & SERVICES
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Stethoscope size={14} /> Comprehensive Dental Specialties
            </span>
            <h2 className="section-title">
              Advanced Clinical Care, Tailored to You
            </h2>
            <p className="section-subtitle">
              Every procedure is delivered using high-magnification optics, minimal intervention techniques, and evidence-based protocols.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            {services.slice(0, 6).map((service) => (
              <div 
                key={service.id} 
                className="glass-card"
                style={{
                  padding: 'clamp(1.25rem, 3vw, 1.85rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--primary)',
                    background: 'var(--primary-light)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px'
                  }}>
                    {service.category}
                  </span>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> {service.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--text-main)' }}>
                  <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {service.name}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                  {service.summary}
                </p>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingTop: '1.1rem', 
                  borderTop: '1px solid var(--border-light)',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <Link 
                    to={`/services/${service.slug}`}
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: 'var(--primary)', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.3rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Details</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link 
                    to={`/appointment?service=${service.slug}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Book Slot</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn btn-secondary btn-lg">
              <span>Explore All Treatments</span>
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE CLINICAL EXPERIENCE & TECHNOLOGY
          ========================================================================= */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-tag">
                <ShieldCheck size={14} /> Hospital-Grade Patient Safety
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: '1.1rem', lineHeight: 1.25 }}>
                High-Magnification Precision, <br />
                <span className="text-gradient">Zero Compromise on Sterility</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.65 }}>
                At {tenant?.name}, we combine cutting-edge European dental tech with strict multi-barrier sterilization to guarantee a serene, risk-free dental journey.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Class-B Vacuum Autoclaves</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      100% of non-disposable surgical instruments undergo vacuum sterilization at 134°C with biological spore monitor strips.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Microscope size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Carl Zeiss Dental Operating Microscopes</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Up to 25x optical magnification for ultra-conservative restorations and microscopic root canals that preserve your natural enamel.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Heart size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Gentle Painless Injections</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Computer-controlled anaesthesia delivers numbness gently below sensation thresholds, keeping you completely relaxed.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary">
                <span>Learn About Our Clinic Standards</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Visual Grid (Mobile Responsive) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '0.85rem'
            }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: 'clamp(160px, 22vw, 220px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" 
                  alt="Modern Dental Consultation Suite" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: 'clamp(160px, 22vw, 220px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600" 
                  alt="Class-B Sterilization Lab" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: 'clamp(160px, 22vw, 220px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" 
                  alt="Gentle Dental Cleaning" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: 'clamp(160px, 22vw, 220px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600" 
                  alt="Intraoral Digital Scanner" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          MEET OUR SPECIALISTS
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Award size={14} /> Verified Clinical Qualifications
            </span>
            <h2 className="section-title">
              Meet Our Specialist Dentists
            </h2>
            <p className="section-subtitle">
              Compassionate clinicians with over a decade of specialist training, dedicated to gentle and transparent patient care.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.75rem',
            marginBottom: '2.5rem'
          }}>
            {doctors.map((doc) => (
              <div 
                key={doc.id}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={doc.photoUrl} 
                    alt={doc.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {doc.experienceYears}+ Years Clinical Exp.
                  </div>
                </div>

                <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
                    {doc.name}
                  </h3>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.65rem' }}>
                    {doc.role}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
                    {doc.bio.slice(0, 120)}...
                  </p>

                  <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      {doc.languages?.slice(0, 2).join(', ')}
                    </span>
                    <Link to="/appointment" className="btn btn-secondary btn-sm">
                      Book Visit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/doctors" className="btn btn-secondary">
              <span>View Full Dental Team Credentials</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ PREVIEW SECTION
          ========================================================================= */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="section-tag">
              <Smile size={14} /> Clear Answers For Patients
            </span>
            <h2 className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Learn about our pain-free protocols, appointment scheduling, and what to expect during your first visit.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {faqs.map(faq => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  style={{
                    border: '1.5px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: isOpen ? 'var(--bg-page)' : '#FFFFFF',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                      fontWeight: 600,
                      color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        color: 'var(--text-subtle)',
                        flexShrink: 0,
                        marginLeft: '0.75rem'
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/faq" className="btn btn-secondary">
              <span>View All Patient FAQs</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HIGH-CONVERSION APPOINTMENT CTA BANNER
          ========================================================================= */}
      <section style={{ 
        background: 'var(--gradient-primary)', 
        color: '#FFFFFF', 
        padding: 'clamp(3rem, 6vw, 4.5rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.7rem)', color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.2 }}>
            Ready for a Healthier, Confident Smile?
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Submit an appointment request in under 60 seconds. Our care coordinator will call or WhatsApp you to confirm your ideal time slot and assist with pre-visit guidance.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link to="/appointment" className="btn btn-secondary btn-lg" style={{ background: '#FFFFFF', color: 'var(--primary)', fontWeight: 700 }}>
              <Calendar size={18} />
              <span>Request Appointment Slot</span>
            </Link>

            <a 
              href={`tel:${tenant?.contact?.phoneRaw}`}
              className="btn btn-outline-white btn-lg"
            >
              <Phone size={18} />
              <span>Call Reception ({tenant?.contact?.phone})</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
