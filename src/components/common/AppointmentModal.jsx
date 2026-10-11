import React, { useState, useEffect } from 'react';
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
import { showToast } from './Toast';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Info,
  X,
  User,
  Mail,
  FileText,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export function AppointmentModal({ isOpen, onClose, preselectedServiceSlug = '' }) {
  const { tenant } = useTenant();
  const publishedServices = dentalStore.getServices(tenant.id, true);

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    serviceSlug: preselectedServiceSlug || '',
    note: '',
    consent: false,
    hp_website_trap: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [sensitiveWarning, setSensitiveWarning] = useState(false);

  useEffect(() => {
    if (preselectedServiceSlug) {
      setFormData(prev => ({ ...prev, serviceSlug: preselectedServiceSlug }));
    }
  }, [preselectedServiceSlug]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmissionSuccess(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (containsSensitiveMedicalKeywords(formData.note)) {
      setSensitiveWarning(true);
    } else {
      setSensitiveWarning(false);
    }
  }, [formData.note]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
      errs.consent = 'Consent required to coordinate your appointment request.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.hp_website_trap) {
      setSubmissionSuccess({ id: 'apt-trapped', patientName: formData.patientName });
      return;
    }

    if (!validate()) {
      showToast('Please fix the errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedService = publishedServices.find(s => s.slug === formData.serviceSlug);

      const created = dentalStore.createAppointment(tenant.id, {
        patientName: formData.patientName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        preferredDate: formData.preferredDate || null,
        preferredTime: formData.preferredTime,
        serviceId: selectedService ? selectedService.id : null,
        serviceNameSnapshot: selectedService ? selectedService.name : 'General Consultation & Routine Checkup',
        note: formData.note.trim(),
        consent: true
      });

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch {}

      setSubmissionSuccess(created);
      showToast('Appointment request received!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Submission error. Please call reception directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      style={{ zIndex: 1200, padding: 'clamp(0.5rem, 2vw, 1.5rem)' }}
    >
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '620px', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-xl)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F0FDFA 100%)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Calendar size={18} color="var(--primary)" />
              <span>Book an Appointment</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              {tenant?.name} • Rapid Call / WhatsApp Confirmation
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="btn-icon" 
            style={{ width: '36px', height: '36px', color: 'var(--text-subtle)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 'clamp(1rem, 3vw, 1.75rem)' }}>
          {submissionSuccess ? (
            /* Pop Success Message */
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.25s ease' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                background: '#D1FAE5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <div className="badge badge-confirmed" style={{ marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                Reference: #{submissionSuccess.id?.toUpperCase()}
              </div>

              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Request Received Successfully!
              </h3>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Thank you, <strong>{submissionSuccess.patientName}</strong>. Our front desk care coordinator will contact you within <strong>15–30 minutes</strong> to confirm your slot for <strong>{submissionSuccess.serviceNameSnapshot}</strong>.
              </p>

              <div style={{
                background: 'var(--bg-page)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                textAlign: 'left',
                marginBottom: '1.5rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Info size={15} /> What Happens Next?
                </div>
                <div style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>
                  We will call or message your number <strong>{submissionSuccess.phone}</strong> to confirm your exact chair time and provide clinical preparation tips.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a 
                  href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20just%20submitted%20request%20%23${submissionSuccess.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={16} />
                  <span>Notify WhatsApp</span>
                </a>

                <button 
                  onClick={onClose}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            /* Pop Booking Form */
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Anti-spam honeypot */}
              <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                <input
                  type="text"
                  name="hp_website_trap"
                  value={formData.hp_website_trap}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="popPatientName">
                    <User size={14} color="var(--primary)" />
                    <span>Full Name</span>
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="popPatientName"
                    name="patientName"
                    placeholder="e.g. Priya Sharma"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`form-input ${errors.patientName ? 'error' : ''}`}
                    required
                  />
                  {errors.patientName && <span className="form-error">{errors.patientName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="popPhone">
                    <Phone size={14} color="var(--primary)" />
                    <span>Phone Number</span>
                    <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="popPhone"
                    name="phone"
                    placeholder="e.g. +91 98201 23456"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    required
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="popServiceSlug">
                    <Sparkles size={14} color="var(--primary)" />
                    <span>Select Treatment</span>
                  </label>
                  <select
                    id="popServiceSlug"
                    name="serviceSlug"
                    value={formData.serviceSlug}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">-- General Checkup / Tooth Consultation --</option>
                    {publishedServices.map(srv => (
                      <option key={srv.id} value={srv.slug}>
                        {srv.name} ({srv.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="popDate">
                    <Calendar size={14} color="var(--primary)" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    id="popDate"
                    name="preferredDate"
                    min={getTodayDateString()}
                    max={getFutureDateString(60)}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="popTime">
                  <Clock size={14} color="var(--primary)" />
                  <span>Preferred Time Window</span>
                </label>
                <select
                  id="popTime"
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

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" htmlFor="popNote" style={{ marginBottom: 0 }}>
                    <FileText size={14} color="var(--primary)" />
                    <span>Brief Concern / Note</span>
                  </label>
                  <span style={{ fontSize: '0.75rem', color: formData.note.length > 280 ? '#DC2626' : 'var(--text-subtle)' }}>
                    {formData.note.length} / 300
                  </span>
                </div>
                <textarea
                  id="popNote"
                  name="note"
                  rows={2}
                  maxLength={300}
                  placeholder="Describe your concern briefly (e.g. cavity check, aligners enquiry)..."
                  value={formData.note}
                  onChange={handleChange}
                  className="form-textarea"
                />
                {sensitiveWarning && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', color: '#DC2626', fontSize: '0.75rem' }}>
                    <AlertCircle size={13} />
                    <span>Please avoid including sensitive diagnostic histories here.</span>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <span>
                    I permit {tenant?.name} to contact me via phone / WhatsApp regarding this consultation request. <span style={{ color: '#DC2626' }}>*</span>
                  </span>
                </label>
                {errors.consent && <span className="form-error">{errors.consent}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Calendar size={17} />
                    <span>Request Appointment Slot</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
