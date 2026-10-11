import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Microscope, 
  Clock, 
  Users,
  Calendar
} from 'lucide-react';

export function AboutPage() {
  const { tenant } = useTenant();

  return (
    <div>
      {/* Hero Header */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        padding: '4.5rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            <HeartHandshake size={14} /> Our Care Philosophy
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1.25rem' }}>
            Compassionate Dental Care, <br />
            <span className="text-gradient">Engineered with Precision</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            At {tenant?.name}, we believe visiting the dentist should be a calm, dignified, and pain-free experience. Learn how our clinical standards set a new benchmark for patient safety and comfort.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Mission */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-tag">
                <Sparkles size={14} /> The Patient Journey
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>
                Modern Dental Care Built on Transparency & Comfort
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Founded with a mission to eliminate dental anxiety, {tenant?.name} has served over 12,000 satisfied patients across Mumbai and beyond. We do not believe in one-size-fits-all treatments. Every diagnosis begins with digital radiograph imaging and an honest clinical discussion of conservative treatment alternatives.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Our clinicians hold postgraduate Master of Dental Surgery (MDS) degrees in prosthodontics, microscopic endodontics, and orthodontics, maintaining rigorous continuing medical education in digital dentistry.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Sterile Autoclave Pouches Unsealed at Chairside
                  </div>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>
                    Zero-Wait
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Strict Scheduled Appointment Booking Windows
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '4px solid #FFFFFF' }}>
                <img 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=900" 
                  alt="Doctor performing consultation"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hospital-Grade Sterilization Protocols */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <ShieldCheck size={14} /> Clinical Safety Guarantee
            </span>
            <h2 className="section-title">
              Our 6-Step Decontamination Protocol
            </h2>
            <p className="section-subtitle">
              We uphold world-class infection control standards conforming to CDC and WHO healthcare sterilization guidelines.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                step: '01',
                title: 'Enzymatic Pre-Soak',
                desc: 'Used instruments are immersed in medical-grade enzymatic detergents to dissolve bio-burden immediately.'
              },
              {
                step: '02',
                title: 'Ultrasonic Debridement',
                desc: 'High-frequency microscopic ultrasonic cavitation dislodges microscopic debris from delicate joints.'
              },
              {
                step: '03',
                title: 'Hermetic Pouch Sealing',
                desc: 'Instruments are individually sealed in medical sterilization pouches with chemical multi-variable indicators.'
              },
              {
                step: '04',
                title: 'Class-B Vacuum Autoclave',
                desc: 'Fractionated vacuum pulses eliminate air, followed by 134°C pressurized saturated steam for complete spore destruction.'
              },
              {
                step: '05',
                title: 'Spore Biological Testing',
                desc: 'Weekly biological spore vials (Geobacillus stearothermophilus) run through autoclaves to confirm 100% lethality.'
              },
              {
                step: '06',
                title: 'Chairside Pouch Opening',
                desc: 'Every pouch is opened directly in front of the patient after you are comfortably seated in the operatory.'
              }
            ].map(item => (
              <div 
                key={item.step}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  opacity: 0.25,
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem', color: 'var(--text-main)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Diagnostic Technology */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Microscope size={14} /> Diagnostic Technology
            </span>
            <h2 className="section-title">
              Advanced Clinical Equipment
            </h2>
            <p className="section-subtitle">
              Precision diagnostics allow us to detect issues at the earliest reversible stage and perform computer-guided treatments.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Microscope size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3D CBCT Digital Scanners</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Ultra-low-dose 3-dimensional Cone Beam CT imaging visualizes bone dimensions, nerve canals, and tooth roots with 0.1 mm slice precision.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Intraoral 3D Optical Cameras</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                No uncomfortable impression trays or gag reflexes. Our handheld optical wand captures HD digital impressions of your dental arches in 60 seconds.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Dental Diode Lasers</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Used for soft tissue sculpting, deep periodontal pocket decontamination, and rapid ulcer relief with almost zero bleeding or stitches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ background: 'var(--gradient-subtle)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '650px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
            Consult With Our Specialists
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Schedule an appointment for a comprehensive clinical assessment, digital x-ray imaging, and tailored care plan.
          </p>
          <Link to="/appointment" className="btn btn-primary btn-lg">
            <Calendar size={18} />
            <span>Book Your Consultation Slot</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
