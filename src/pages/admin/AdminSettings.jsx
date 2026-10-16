import React, { useState } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { showToast } from '../../components/common/Toast';
import { Settings, Save, Phone, Globe } from 'lucide-react';

export function AdminSettings() {
  const { tenant } = useTenant();

  const [formData, setFormData] = useState({
    name: tenant?.name || '',
    tagline: tenant?.tagline || '',
    phone: tenant?.contact?.phone || '',
    email: tenant?.contact?.email || '',
    whatsapp: tenant?.contact?.whatsapp || '',
    address: tenant?.contact?.address || '',
    directionsUrl: tenant?.contact?.directionsUrl || '',
    emergencyNotice: tenant?.contact?.emergencyNotice || '',
    seoTitle: tenant?.seo?.title || '',
    seoDescription: tenant?.seo?.description || ''
  });

  const handleSave = (e) => {
    e.preventDefault();

    dentalStore.updateTenant(tenant.id, {
      name: formData.name,
      tagline: formData.tagline,
      contact: {
        ...tenant.contact,
        phone: formData.phone,
        phoneRaw: formData.phone.replace(/[\s\-\(\)]/g, ''),
        email: formData.email,
        whatsapp: formData.whatsapp,
        address: formData.address,
        directionsUrl: formData.directionsUrl,
        emergencyNotice: formData.emergencyNotice
      },
      seo: {
        title: formData.seoTitle,
        description: formData.seoDescription
      }
    });

    showToast('Clinic settings updated and saved to database!', 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinic Profile & Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage clinic information, contact details, and SEO settings for <strong>{tenant?.name}</strong>
        </p>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: '900px' }}>
        
        {/* Clinic General Profile */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: 'clamp(1rem, 3vw, 1.75rem)', border: '1px solid var(--border-light)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Settings size={19} color="var(--primary)" />
            Clinic Profile & Identity
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="clinicName">Clinic Name</label>
              <input
                type="text"
                id="clinicName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="clinicTagline">Brand Tagline</label>
              <input
                type="text"
                id="clinicTagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Patient Contact & Emergency Notice */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: 'clamp(1rem, 3vw, 1.75rem)', border: '1px solid var(--border-light)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Phone size={19} color="var(--primary)" />
            Direct Communication & Location
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Reception Phone</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="whatsapp">WhatsApp Business Number</label>
              <input
                type="text"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Public Contact Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">Physical Clinic Address</label>
            <textarea
              id="address"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="directionsUrl">Google Maps Directions URL</label>
            <input
              type="url"
              id="directionsUrl"
              value={formData.directionsUrl}
              onChange={(e) => setFormData({ ...formData, directionsUrl: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="emergencyNotice">24/7 Dental Emergency Triage Advisory</label>
            <textarea
              id="emergencyNotice"
              rows={2}
              value={formData.emergencyNotice}
              onChange={(e) => setFormData({ ...formData, emergencyNotice: e.target.value })}
              className="form-textarea"
            />
          </div>
        </div>

        {/* SEO Meta Tags */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: 'clamp(1rem, 3vw, 1.75rem)', border: '1px solid var(--border-light)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Globe size={19} color="var(--primary)" />
            Search Engine Optimization (SEO Defaults)
          </h2>

          <div className="form-group">
            <label className="form-label" htmlFor="seoTitle">Default Page Title Tag</label>
            <input
              type="text"
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="seoDesc">Meta Description Tag</label>
            <textarea
              id="seoDesc"
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: 'min(100%, 280px)', justifyContent: 'center' }}>
          <Save size={18} />
          <span>Save Clinic Settings</span>
        </button>

      </form>
    </div>
  );
}
