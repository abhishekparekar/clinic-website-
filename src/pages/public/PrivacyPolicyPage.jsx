import React from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export function PrivacyPolicyPage() {
  const { tenant } = useTenant();

  return (
    <div>
      {/* Page Header */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        padding: '4rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            <ShieldCheck size={14} /> Data Protection & Patient Rights
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>
            Patient Privacy Notice
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Effective Date: October 2026 | {tenant?.name}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                1. Overview & Commitment
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                At <strong>{tenant?.name}</strong>, we take the confidentiality of our visitors and patients seriously. This website is designed to provide information on our clinical treatments and allow prospective patients to request appointment consultations. We adhere to applicable Indian data protection principles (DPDP Act) and international patient privacy standards.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                2. Information We Collect
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                We collect only the minimum information necessary to triage and schedule your consultation:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li><strong>Contact details:</strong> Full name, phone number, and optional email address.</li>
                <li><strong>Appointment preferences:</strong> Preferred date, time window, and treatment requested.</li>
                <li><strong>Brief note:</strong> General comments regarding visit scheduling (we explicitly request that you do not submit sensitive medical or diagnostic histories through this web form).</li>
                <li><strong>Consent audit log:</strong> Timestamp of your agreement to be contacted.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                3. Purpose of Processing
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Your submitted contact details are utilized solely by authorized clinic staff to contact you via telephone or WhatsApp to confirm clinic chair availability and schedule your consultation. We never sell, rent, or lease your personal contact details to third-party marketing companies, insurance underwriters, or data brokers.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                4. Multi-Tenant Data Isolation & Security
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Our website utilizes strict tenant-partitioned database security rules. Appointment requests submitted for <strong>{tenant?.name}</strong> are stored in a dedicated partition accessible exclusively to authenticated, authorized medical staff of this clinic tenant. All web interactions are encrypted end-to-end via Transport Layer Security (TLS/HTTPS).
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                5. Data Retention & Your Rights
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Appointment enquiry records are retained for legitimate administrative scheduling purposes. You have the right to request access to the information you submitted, request correction of inaccurate contact numbers, or request deletion of your appointment enquiry record by contacting our clinic data coordinator at <strong>{tenant?.contact?.email}</strong> or calling <strong>{tenant?.contact?.phone}</strong>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                6. Medical Emergency Disclaimer
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Submissions made through this website do not establish a formal doctor-patient relationship and are not monitored for emergency medical triage. If you are experiencing acute facial swelling, severe trauma, or uncontrollable dental bleeding, contact our emergency line at {tenant?.contact?.phone} or report immediately to the nearest hospital emergency room.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
