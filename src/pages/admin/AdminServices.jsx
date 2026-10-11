import React, { useState, useEffect } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { Modal } from '../../components/common/Modal';
import { showToast } from '../../components/common/Toast';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Stethoscope,
  Sparkles
} from 'lucide-react';

export function AdminServices() {
  const { tenant } = useTenant();
  const [services, setServices] = useState(() => dentalStore.getServices(tenant.id, false));
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'General Dentistry',
    summary: '',
    description: '',
    duration: '30 - 45 mins',
    priceEstimate: 'Consultation evaluated',
    published: true
  });

  useEffect(() => {
    const handleUpdate = () => {
      setServices(dentalStore.getServices(tenant.id, false));
    };
    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenant.id]);

  const openNewModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      category: 'General Dentistry',
      summary: '',
      description: '',
      duration: '30 - 45 mins',
      priceEstimate: 'Personalized quote upon scan',
      published: true
    });
    setModalOpen(true);
  };

  const openEditModal = (srv) => {
    setEditingService(srv);
    setFormData({
      name: srv.name || '',
      slug: srv.slug || '',
      category: srv.category || 'General Dentistry',
      summary: srv.summary || '',
      description: srv.description || '',
      duration: srv.duration || '30 - 45 mins',
      priceEstimate: srv.priceEstimate || '',
      published: srv.published !== undefined ? srv.published : true
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Treatment name is required.', 'error');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingService) {
      dentalStore.updateService(tenant.id, editingService.id, {
        ...formData,
        slug
      });
      showToast(`Updated "${formData.name}"`, 'success');
    } else {
      dentalStore.createService(tenant.id, {
        ...formData,
        slug
      });
      showToast(`Created new treatment "${formData.name}"`, 'success');
    }

    setModalOpen(false);
  };

  const handleDelete = (srv) => {
    if (window.confirm(`Are you sure you want to delete "${srv.name}"?`)) {
      dentalStore.deleteService(tenant.id, srv.id);
      showToast(`Deleted treatment "${srv.name}"`, 'info');
    }
  };

  const togglePublish = (srv) => {
    dentalStore.updateService(tenant.id, srv.id, { published: !srv.published });
    showToast(`Treatment "${srv.name}" is now ${!srv.published ? 'Published' : 'Draft'}`, 'info');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Treatments & Services CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Publish, edit, and categorize clinical dental offerings for <strong>{tenant?.name}</strong> (PRD Section 9)
          </p>
        </div>

        <button onClick={openNewModal} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New Treatment</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="table-responsive" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Treatment Name</th>
              <th>Category</th>
              <th>Typical Duration</th>
              <th>Pricing Hint</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(srv => (
              <tr key={srv.id}>
                <td>
                  <strong>{srv.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>/services/{srv.slug}</div>
                </td>
                <td>
                  <span className="badge" style={{ background: '#F1F5F9', color: '#334155' }}>
                    {srv.category}
                  </span>
                </td>
                <td>{srv.duration}</td>
                <td>{srv.priceEstimate || 'On Consultation'}</td>
                <td>
                  <button 
                    onClick={() => togglePublish(srv)}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle publish status"
                  >
                    <span className={`badge ${srv.published ? 'badge-active' : 'badge-draft'}`}>
                      {srv.published ? 'Published' : 'Draft'}
                    </span>
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      onClick={() => openEditModal(srv)} 
                      className="btn-icon" 
                      style={{ color: 'var(--primary)', border: '1px solid var(--border-light)' }}
                      title="Edit Treatment"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button 
                      onClick={() => handleDelete(srv)} 
                      className="btn-icon" 
                      style={{ color: '#DC2626', border: '1px solid var(--border-light)' }}
                      title="Delete Treatment"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Treatment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? `Edit Treatment: ${editingService.name}` : 'Add New Clinical Treatment'}
        maxWidth="650px"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>{editingService ? 'Save Changes' : 'Create Treatment'}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="srvName">
                Treatment Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="srvName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Laser Teeth Whitening"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="srvCategory">
                Specialty Category
              </label>
              <select
                id="srvCategory"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                <option value="General Dentistry">General Dentistry</option>
                <option value="Implantology">Implantology</option>
                <option value="Endodontics">Endodontics (Root Canal)</option>
                <option value="Orthodontics">Orthodontics & Aligners</option>
                <option value="Cosmetic">Cosmetic Dentistry</option>
                <option value="Pediatric">Pediatric Care</option>
                <option value="Preventative">Preventative Prophylaxis</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="srvDuration">
                Estimated Chair Duration
              </label>
              <input
                type="text"
                id="srvDuration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 45 - 60 mins"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="srvPrice">
                Pricing Guidance
              </label>
              <input
                type="text"
                id="srvPrice"
                value={formData.priceEstimate}
                onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                placeholder="e.g. Consultation evaluated"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="srvSummary">
              Short Summary (Cards & Previews)
            </label>
            <textarea
              id="srvSummary"
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief overview explaining what the procedure achieves..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="srvDesc">
              Full Clinical Description
            </label>
            <textarea
              id="srvDesc"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed treatment description, technological tools used, patient comfort factors..."
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
              <span>Published on public website immediately</span>
            </label>
          </div>
        </form>
      </Modal>

    </div>
  );
}
