import React, { useState, useEffect } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { Modal } from '../../components/common/Modal';
import { showToast } from '../../components/common/Toast';
import { Plus, Edit3, Trash2, CheckCircle2, Award, Users } from 'lucide-react';

export function AdminDoctors() {
  const { tenant } = useTenant();
  const [doctors, setDoctors] = useState(() => dentalStore.getDoctors(tenant.id, false));

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Specialist Dentist',
    qualificationsText: 'BDS, MDS',
    bio: '',
    experienceYears: 10,
    languagesText: 'English, Hindi',
    scheduleDays: 'Mon-Sat (10:00 AM - 6:00 PM)',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    published: true
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDoctors(dentalStore.getDoctors(tenant.id, false));
    };
    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenant.id]);

  const openNewModal = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      role: 'Specialist Dentist',
      qualificationsText: 'BDS, MDS',
      bio: '',
      experienceYears: 10,
      languagesText: 'English, Hindi',
      scheduleDays: 'Mon-Sat (10:00 AM - 6:00 PM)',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      published: true
    });
    setModalOpen(true);
  };

  const openEditModal = (doc) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name || '',
      role: doc.role || '',
      qualificationsText: doc.qualifications?.join(', ') || '',
      bio: doc.bio || '',
      experienceYears: doc.experienceYears || 5,
      languagesText: doc.languages?.join(', ') || '',
      scheduleDays: doc.scheduleDays || '',
      photoUrl: doc.photoUrl || '',
      published: doc.published !== undefined ? doc.published : true
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Doctor name is required.', 'error');
      return;
    }

    const payload = {
      name: formData.name,
      role: formData.role,
      qualifications: formData.qualificationsText.split(',').map(s => s.trim()).filter(Boolean),
      bio: formData.bio,
      experienceYears: Number(formData.experienceYears) || 1,
      languages: formData.languagesText.split(',').map(s => s.trim()).filter(Boolean),
      scheduleDays: formData.scheduleDays,
      photoUrl: formData.photoUrl,
      published: formData.published
    };

    if (editingDoctor) {
      dentalStore.updateDoctor(tenant.id, editingDoctor.id, payload);
      showToast(`Updated profile for "${formData.name}"`, 'success');
    } else {
      dentalStore.createDoctor(tenant.id, payload);
      showToast(`Added specialist "${formData.name}"`, 'success');
    }

    setModalOpen(false);
  };

  const handleDelete = (doc) => {
    if (window.confirm(`Are you sure you want to remove Dr. ${doc.name}?`)) {
      dentalStore.deleteDoctor(tenant.id, doc.id);
      showToast(`Removed doctor profile`, 'info');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Specialist Dentists CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage clinical team profiles and credentials for <strong>{tenant?.name}</strong> (PRD Section 8.5)
          </p>
        </div>

        <button onClick={openNewModal} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New Specialist</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1.25rem'
      }}>
        {doctors.map(doc => (
          <div 
            key={doc.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              padding: 'clamp(1rem, 2.5vw, 1.25rem)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ width: '72px', height: '72px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={doc.photoUrl} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: '1 1 180px', minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {doc.name}
                </h3>
                <span className={`badge ${doc.published ? 'badge-active' : 'badge-draft'}`}>
                  {doc.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                {doc.role}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.35rem' }}>
                {doc.qualifications?.join(' • ')}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Roster: {doc.scheduleDays}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => openEditModal(doc)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.775rem', padding: '0.35rem 0.6rem' }}
                >
                  <Edit3 size={13} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(doc)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.775rem', padding: '0.35rem 0.6rem', color: '#DC2626' }}
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDoctor ? `Edit Profile: ${editingDoctor.name}` : 'Add New Dental Specialist'}
        maxWidth="620px"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn btn-primary">
              <CheckCircle2 size={16} /> Save Profile
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="docName">Full Name & Title <span className="required">*</span></label>
              <input
                type="text"
                id="docName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Sameer Merchant"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="docRole">Specialty Role</label>
              <input
                type="text"
                id="docRole"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Chief Prosthodontist"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="docQual">Verified Qualifications (comma separated)</label>
            <input
              type="text"
              id="docQual"
              value={formData.qualificationsText}
              onChange={(e) => setFormData({ ...formData, qualificationsText: e.target.value })}
              placeholder="e.g. MDS (Prosthodontics), BDS, ICOI Fellow"
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="docExp">Years of Practice</label>
              <input
                type="number"
                id="docExp"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="docLang">Languages Spoken</label>
              <input
                type="text"
                id="docLang"
                value={formData.languagesText}
                onChange={(e) => setFormData({ ...formData, languagesText: e.target.value })}
                placeholder="e.g. English, Hindi, Marathi"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="docSchedule">Clinic Roster Schedule</label>
            <input
              type="text"
              id="docSchedule"
              value={formData.scheduleDays}
              onChange={(e) => setFormData({ ...formData, scheduleDays: e.target.value })}
              placeholder="e.g. Mon, Wed, Fri (10:00 AM - 6:00 PM)"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="docBio">Clinical Bio & Background</label>
            <textarea
              id="docBio"
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <span>Published on public website</span>
            </label>
          </div>
        </form>
      </Modal>

    </div>
  );
}
