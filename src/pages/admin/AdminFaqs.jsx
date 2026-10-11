import React, { useState, useEffect } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { Modal } from '../../components/common/Modal';
import { showToast } from '../../components/common/Toast';
import { Plus, Edit3, Trash2, CheckCircle2, HelpCircle } from 'lucide-react';

export function AdminFaqs() {
  const { tenant } = useTenant();
  const [faqs, setFaqs] = useState(() => dentalStore.getFaqs(tenant.id, false));

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [formData, setFormData] = useState({
    category: 'General',
    question: '',
    answer: '',
    published: true
  });

  useEffect(() => {
    const handleUpdate = () => {
      setFaqs(dentalStore.getFaqs(tenant.id, false));
    };
    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenant.id]);

  const openNewModal = () => {
    setEditingFaq(null);
    setFormData({
      category: 'General',
      question: '',
      answer: '',
      published: true
    });
    setModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      category: faq.category || 'General',
      question: faq.question || '',
      answer: faq.answer || '',
      published: faq.published !== undefined ? faq.published : true
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      showToast('Both Question and Answer are required.', 'error');
      return;
    }

    if (editingFaq) {
      dentalStore.updateFaq(tenant.id, editingFaq.id, formData);
      showToast('Updated FAQ', 'success');
    } else {
      dentalStore.createFaq(tenant.id, formData);
      showToast('Created new FAQ', 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (faq) => {
    if (window.confirm('Delete this FAQ question?')) {
      dentalStore.deleteFaq(tenant.id, faq.id);
      showToast('FAQ deleted', 'info');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>FAQ Management CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Maintain patient FAQs and clinical guidance for <strong>{tenant?.name}</strong> (PRD Section 9)
          </p>
        </div>

        <button onClick={openNewModal} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map(faq => (
          <div 
            key={faq.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: '#F1F5F9', color: '#475569' }}>
                  {faq.category}
                </span>
                <span className={`badge ${faq.published ? 'badge-active' : 'badge-draft'}`}>
                  {faq.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {faq.answer}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => openEditModal(faq)} 
                className="btn-icon" 
                style={{ color: 'var(--primary)', border: '1px solid var(--border-light)' }}
              >
                <Edit3 size={15} />
              </button>
              <button 
                onClick={() => handleDelete(faq)} 
                className="btn-icon" 
                style={{ color: '#DC2626', border: '1px solid var(--border-light)' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
        maxWidth="600px"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn btn-primary">
              <CheckCircle2 size={16} /> Save FAQ
            </button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="faqCat">Category</label>
            <select
              id="faqCat"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-select"
            >
              <option value="General">General</option>
              <option value="Appointments">Appointments & Scheduling</option>
              <option value="Implants">Dental Implants</option>
              <option value="Orthodontics">Aligners & Orthodontics</option>
              <option value="Hygiene & Safety">Hygiene & Safety Protocols</option>
              <option value="Insurance & Payment">Insurance & Payment Options</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faqQ">Question <span className="required">*</span></label>
            <input
              type="text"
              id="faqQ"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. Is the teeth whitening treatment permanent?"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faqA">Answer <span className="required">*</span></label>
            <textarea
              id="faqA"
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Provide a clear, reassuring clinical explanation..."
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <span>Published on patient FAQ page</span>
            </label>
          </div>
        </form>
      </Modal>

    </div>
  );
}
