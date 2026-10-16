import React, { useState } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { showToast } from '../../components/common/Toast';
import { 
  Settings, 
  Save, 
  Palette, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Server 
} from 'lucide-react';

export function AdminSettings() {
  const { tenant, syncToFirestore } = useTenant();
  const [syncing, setSyncing] = useState(false);

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

    showToast('Clinic settings and branding updated in Firestore database!', 'success');
  };

  const handleSyncAllToDatabase = async () => {
    setSyncing(true);
    const res = await syncToFirestore();
    setSyncing(false);
    if (res.success) {
      showToast(`Synchronized all data to Firestore under tenants/${res.tenantId}!`, 'success');
    } else {
      showToast(`Sync error: ${res.error}`, 'error');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinic Branding & Database Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Customize contact details, linear gradient themes, and manage Cloud Firestore synchronization for <strong>{tenant?.name}</strong>
        </p>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: '900px' }}>
        
        {/* Cloud Firestore Database Synchronization Card */}
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '4px', 
          padding: 'clamp(1rem, 3vw, 1.75rem)', 
          border: '1px solid var(--border-light)', 
          marginBottom: '1.5rem', 
          boxShadow: 'var(--shadow-sm)' 
        }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Database size={19} color="var(--primary)" />
            Firestore Cloud Database Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            All clinic treatments, specialists, FAQs, and appointment requests are securely isolated under node <code>tenants/{tenant?.id || 'clinicdental01'}</code>. Updates and deletions reflect immediately in Firestore.
          </p>

          <div style={{ 
            background: '#F8FAFC', 
            padding: '1.25rem', 
            borderRadius: '4px', 
            border: '1px solid var(--border-light)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '1rem' 
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} />
                <span>Connected to Cloud Firestore</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.35rem' }}>
                Project: <strong>job-portal-85414</strong> • Node: <strong>tenants/{tenant?.id || 'clinicdental01'}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                Subcollections: <code>services</code>, <code>doctors</code>, <code>faqs</code>, <code>appointments</code>, <code>members</code>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSyncAllToDatabase}
              disabled={syncing}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 0.95rem' }}
            >
              <RefreshCw size={14} className={syncing ? 'spin' : ''} />
              <span>{syncing ? 'Pushing Data...' : 'Sync All Data to Firestore'}</span>
            </button>
          </div>
        </div>

        {/* Branding & Visual Identity (Theme Colors) */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: 'clamp(1rem, 3vw, 1.75rem)', border: '1px solid var(--border-light)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Palette size={19} color="var(--primary)" />
            Linear Gradient Theme & Branding Tokens
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="primaryColor">Primary Theme Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="color"
                  id="primaryColor"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  style={{ width: '42px', height: '42px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <input
                  type="color"
                  id="accentColor"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  style={{ width: '42px', height: '42px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
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

          {/* Realtime Gradient Preview Banner */}
          <div style={{
            padding: '1rem',
            borderRadius: '4px',
            background: `linear-gradient(135deg, ${formData.primaryColor} 0%, ${formData.accentColor} 100%)`,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Gradient Theme Preview</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Dynamically injected into CSS variables (--primary, --accent)</span>
          </div>
        </div>

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
