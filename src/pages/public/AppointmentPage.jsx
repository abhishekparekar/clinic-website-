import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { 
  validatePhone, 
  validateEmail, 
  validateRequired, 
  validateNoteLength,
  containsSensitiveMedicalKeywords 
} from '../../lib/validators';
import { getTodayDateString, getFutureDateString, formatDate } from '../../lib/dateUtils';
import { showToast } from '../../components/common/Toast';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ArrowRight,
  User,
  Mail,
  FileText
} from 'lucide-react';

export function AppointmentPage() {
  const { tenant } = useTenant();
  const [searchParams] = useSearchParams();
  const preselectedServiceSlug = searchParams.get('service');
  
  const publishedServices = dentalStore.getServices(tenant.id, true);

  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    serviceSlug: preselectedServiceSlug || '',
    note: '',
    consent: false,
    hp_website_trap: '' // Anti-spam honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [sensitiveWarning, setSensitiveWarning] = useState(false);

  // Preselect service slug if changed in query
  useEffect(() => {
    if (preselectedServiceSlug) {
      setFormData(prev => ({ ...prev, serviceSlug: preselectedServiceSlug }));
    }
  }, [preselectedServiceSlug]);

  // Check sensitive keywords on note typing
  useEffect(() => {
    if (containsSensitiveMedicalKeywords(formData.note)) {
      setSensitiveWarning(true);
    } else {
      setSensitiveWarning(false);
    }
  }, [formData.note]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!validateRequired(formData.patientName)) {
      errs.patientName = 'Please enter your full name.';
    } else if (formData.patientName.trim().length < 2) {
      errs.patientName = 'Name must be at least 2 characters.';
    }

    if (!validateRequired(formData.phone)) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (!validatePhone(formData.phone)) {
      errs.phone = 'Please enter a valid phone number (e.g. +91 98201 23456).';
    }

    if (formData.email && !validateEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!validateNoteLength(formData.note, 300)) {
      errs.note = 'Note cannot exceed 300 characters.';
    }

    if (!formData.consent) {
      errs.consent = 'You must give permission for our clinic to contact you regarding this request.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot (bots will fill this hidden input)
    if (formData.hp_website_trap) {
      console.warn('Spam submission silently trapped by honeypot.');
      setSubmissionSuccess({ id: 'apt-trapped', patientName: formData.patientName });
      return;
    }

    if (!validate()) {
      showToast('Please fix the errors in the form before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Find selected service info
      const selectedService = publishedServices.find(s => s.slug === formData.serviceSlug);

      // Save appointment request to tenant-scoped store
      const created = dentalStore.createAppointment(tenant.id, {
        patientName: formData.patientName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        preferredDate: formData.preferredDate || null,
        preferredTime: formData.preferredTime,
        serviceId: selectedService ? selectedService.id : null,
        serviceNameSnapshot: selectedService ? selectedService.name : 'General Consultation & Checkup',
        note: formData.note.trim(),
        consent: true
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setSubmissionSuccess(created);
      showToast('Appointment request received successfully!', 'success');
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Could not submit request. Please try calling reception.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="section-animate" style={{ 
        background: 'var(--gradient-hero)', 
        padding: '3.5rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <span className="section-tag" style={{ borderRadius: '4px' }}>
            <Calendar size={14} /> Hassle-Free Appointment Request
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
            Request Your Consultation Slot
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Reserve a time with our dental specialists. Our front desk coordinator will review chair availability and contact you promptly via call or WhatsApp to confirm your appointment.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="section section-animate" style={{ background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          
          {submissionSuccess ? (
            /* =========================================================================
               PRD FR-05 COMPLIANT CONFIRMATION SCREEN
               "Show 'request received', not 'appointment confirmed', until clinic staff confirms it"
               ========================================================================= */
            <div className="glass-panel" style={{ 
              background: '#FFFFFF', 
              padding: 'clamp(1.75rem, 5vw, 3.5rem) clamp(1.2rem, 4vw, 2.5rem)', 
              textAlign: 'center', 
              borderRadius: '4px',
              boxShadow: 'var(--shadow-xl)',
              animation: 'slideUp 0.3s ease-out'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '4px',
                background: '#D1FAE5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <span className="badge badge-confirmed" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', marginBottom: '1rem', borderRadius: '4px' }}>
                Request Reference: #{submissionSuccess.id?.toUpperCase()}
              </span>

              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                Appointment Request Received!
              </h2>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.7 }}>
                Thank you, <strong>{submissionSuccess.patientName}</strong>. Your request has been assigned to our care coordinator at <strong>{tenant?.name}</strong>.
              </p>

              {/* Next Steps Guidance Banner */}
              <div style={{
                background: '#F0FDFA',
                border: '1.5px solid #CCFBF1',
                borderRadius: '4px',
                padding: '1.5rem',
                textAlign: 'left',
                maxWidth: '620px',
                margin: '0 auto 2.5rem auto'
              }}>
                <h4 style={{ color: '#0F766E', fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={18} /> What Happens Next? (PRD FR-05)
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#134E4A' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Our reception team will call or WhatsApp you within <strong>15 to 30 minutes</strong> during clinic working hours to confirm your exact time slot.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Requested Service: <strong>{submissionSuccess.serviceNameSnapshot}</strong></span>
                  </li>
                  {submissionSuccess.preferredDate && (
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Preferred Slot: <strong>{formatDate(submissionSuccess.preferredDate)} ({submissionSuccess.preferredTime})</strong></span>
                    </li>
                  )}
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Please carry any past dental x-rays or clinical records if available.</span>
                  </li>
                </ul>
              </div>

              {/* Instant Alternative Contact */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <a 
                  href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tenant?.name)}%2C%20I%20just%20submitted%20appointment%20request%20%23${submissionSuccess.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  <span>Notify via WhatsApp</span>
                </a>

                <a 
                  href={`tel:${tenant?.contact?.phoneRaw}`}
                  className="btn btn-secondary"
                >
                  <Phone size={16} />
                  <span>Call Reception ({tenant?.contact?.phone})</span>
                </a>

                <button 
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setFormData({
                      patientName: '',
                      phone: '',
                      email: '',
                      preferredDate: '',
                      preferredTime: 'Morning (09:00 - 12:00)',
                      serviceSlug: '',
                      note: '',
                      consent: false,
                      hp_website_trap: ''
                    });
                  }}
                  className="btn btn-secondary"
                >
                  <span>Submit Another Request</span>
                </button>
              </div>
            </div>
          ) : (
            /* =========================================================================
               APPOINTMENT REQUEST FORM
               ========================================================================= */
            <div className="glass-panel" style={{ 
              background: '#FFFFFF', 
              padding: 'clamp(1.25rem, 4vw, 2.5rem)', 
              borderRadius: '4px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              
              <form onSubmit={handleSubmit} noValidate>
                
                {/* Honeypot Spam Shield (PRD Section 8.6) */}
                <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                  <label htmlFor="hp_website_trap">Leave this blank</label>
                  <input
                    type="text"
                    id="hp_website_trap"
                    name="hp_website_trap"
                    value={formData.hp_website_trap}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
                  
                  {/* Patient Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patientName">
                      <User size={15} color="var(--primary)" />
                      <span>Full Name</span>
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      placeholder="e.g. Priya Sharma"
                      value={formData.patientName}
                      onChange={handleChange}
                      className={`form-input ${errors.patientName ? 'error' : ''}`}
                      required
                    />
                    {errors.patientName && <span className="form-error">{errors.patientName}</span>}
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      <Phone size={15} color="var(--primary)" />
                      <span>Contact Phone Number</span>
                      <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. +91 98201 23456"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      required
                    />
                    <span className="form-hint">Our reception team will call or WhatsApp this number.</span>
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
                  
                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      <Mail size={15} color="var(--primary)" />
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    <span className="form-hint">For appointment confirmation receipt.</span>
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Requested Service */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="serviceSlug">
                      <Sparkles size={15} color="var(--primary)" />
                      <span>Treatment / Reason for Visit</span>
                    </label>
                    <select
                      id="serviceSlug"
                      name="serviceSlug"
                      value={formData.serviceSlug}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">-- General Dental Consultation / Routine Checkup --</option>
                      {publishedServices.map(srv => (
                        <option key={srv.id} value={srv.slug}>
                          {srv.name} ({srv.category})
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
                  
                  {/* Preferred Date */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="preferredDate">
                      <Calendar size={15} color="var(--primary)" />
                      <span>Preferred Consultation Date</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      min={getTodayDateString()}
                      max={getFutureDateString(60)}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/* Preferred Time Window */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="preferredTime">
                      <Clock size={15} color="var(--primary)" />
                      <span>Preferred Time Window</span>
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                      <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                      <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
                    </select>
                  </div>

                </div>

                {/* Patient Note with 300 char counter & Sensitive Health Details Warning (PRD Section 8.6) */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <label className="form-label" htmlFor="note" style={{ marginBottom: 0 }}>
                      <FileText size={15} color="var(--primary)" />
                      <span>Brief Message / Dental Concern</span>
                    </label>
                    <span style={{ fontSize: '0.75rem', color: formData.note.length > 280 ? '#DC2626' : 'var(--text-subtle)' }}>
                      {formData.note.length} / 300 characters
                    </span>
                  </div>

                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    maxLength={300}
                    placeholder="Briefly describe what you'd like the dentist to check (e.g., toothache on right side, interested in aligners)..."
                    value={formData.note}
                    onChange={handleChange}
                    className={`form-textarea ${errors.note ? 'error' : ''}`}
                  />
                  
                  {/* PRD Specified Sensitive Medical Warning Banner */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    marginTop: '0.45rem', 
                    fontSize: '0.785rem', 
                    color: sensitiveWarning ? '#DC2626' : 'var(--text-subtle)',
                    fontWeight: sensitiveWarning ? 600 : 400
                  }}>
                    <AlertCircle size={14} color={sensitiveWarning ? '#DC2626' : '#64748B'} />
                    <span>Please do not include sensitive medical details or diagnostic history here.</span>
                  </div>

                  {errors.note && <span className="form-error">{errors.note}</span>}
                </div>

                {/* Consent Checkbox (PRD Section 8.6) */}
                <div className="form-group" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                    />
                    <span>
                      I consent to {tenant?.name} storing my contact information to respond to this appointment request in accordance with the{' '}
                      <Link to="/privacy-policy" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                        Privacy Policy
                      </Link>
                      . <span style={{ color: '#DC2626' }}>*</span>
                    </span>
                  </label>
                  {errors.consent && <span className="form-error">{errors.consent}</span>}
                </div>

                {/* Submit Action */}
                <div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Calendar size={18} />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                    <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: 'var(--primary)' }} />
                    Zero spam. Your number is only used by clinic reception to coordinate your appointment slot.
                  </div>
                </div>

              </form>

            </div>
          )}

          {/* Quick Alternative CTAs */}
          <div style={{ 
            marginTop: '3rem', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-lg)', 
            background: 'rgba(255, 255, 255, 0.7)', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Prefer Direct Assistance?
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                You can also call reception directly or send a message on WhatsApp.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a href={`tel:${tenant?.contact?.phoneRaw}`} className="btn btn-secondary btn-sm">
                <Phone size={14} />
                <span>Call ({tenant?.contact?.phone})</span>
              </a>
              <a 
                href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
