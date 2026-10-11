import React, { useState } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { showToast } from '../../components/common/Toast';
import { Settings, Save, Palette, Clock, MapPin, Phone, Globe } from 'lucide-react';

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
    primaryColor: tenant?.branding?.primaryColor || '#0F766E',
    accentColor: tenant?.branding?.accentColor || '#06B6D4',
    seoTitle: tenant?.seo?.title || '',
    seoDescription: tenant?.seo?.description || ''
  });

  const handleSave = (e) => {
    e.preventDefault();

    dentalStore.updateTenant(tenant.id, {
      name: formData.name,
      tagline: formData.tagline,
      branding: {
        ...tenant.branding,
        primaryColor: formData.primaryColor,
        accentColor: formData.accentColor
      },
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

    showToast('Clinic settings and branding updated!', 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinic Branding & Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Customize contact details, linear gradient themes, and SEO meta tags for <strong>{tenant?.name}</strong> (PRD Section 9)
        </p>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: '900px' }}>
        
        {/* Branding & Visual Identity (Theme Colors) */}
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Palette size={20} color="var(--primary)" />
            Linear Gradient Theme & Branding Tokens
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="primaryColor">Primary Theme Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="color"
                  id="primaryColor"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  style={{ width: '44px', height: '44px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="accentColor">Accent Gradient Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="color"
                  id="accentColor"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  style={{ width: '44px', height: '44px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Live Gradient Preview Strip */}
          <div style={{
            background: `linear-gradient(135deg, ${formData.primaryColor} 0%, ${formData.accentColor} 100%)`,
            color: '#FFFFFF',
            padding: '1.25rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Live Dynamic Gradient Preview</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Applied immediately to public buttons, badges, and accents upon save</div>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" style={{ background: '#FFFFFF', color: formData.primaryColor }}>
              Sample Button
            </button>
          </div>
        </div>

        {/* General Details */}
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} color="var(--primary)" />
            Clinic Identity & Contact Information
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="clinicName">Clinic Legal Display Name</label>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
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
              <label className="form-label" htmlFor="whatsapp">WhatsApp Number</label>
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
              <label className="form-label" htmlFor="email">Email Address</label>
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
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="directionsUrl">Google Maps Directions Link</label>
            <input
              type="url"
              id="directionsUrl"
              value={formData.directionsUrl}
              onChange={(e) => setFormData({ ...formData, directionsUrl: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="emergencyNotice">Emergency Guidance Note</label>
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
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={20} color="var(--primary)" />
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
        <button type="submit" className="btn btn-primary btn-lg">
          <Save size={18} />
          <span>Save Clinic Settings</span>
        </button>

      </form>
    </div>
  );
}
