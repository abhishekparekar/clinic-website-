import React, { useState, useEffect, useMemo } from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAuth } from '../../features/auth/AuthContext';
import { dentalStore } from '../../lib/store';
import { formatDate, formatDateTime } from '../../lib/dateUtils';
import { Modal } from '../../components/common/Modal';
import { showToast } from '../../components/common/Toast';
import { 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  Mail, 
  Download, 
  Eye, 
  Edit3, 
  Clock, 
  CheckCircle2, 
  FileText,
  User,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export function AdminAppointments() {
  const { tenant } = useTenant();
  const { user } = useAuth();
  
  const [appointments, setAppointments] = useState(() => dentalStore.getAppointments(tenant.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Detail Modal State
  const [selectedApt, setSelectedApt] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editInternalNote, setEditInternalNote] = useState('');

  // Re-sync on store update
  useEffect(() => {
    const handleUpdate = () => {
      setAppointments(dentalStore.getAppointments(tenant.id));
    };
    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenant.id]);

  // Filter and search
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch = a.patientName.toLowerCase().includes(q) || 
                          a.phone.includes(q) || 
                          (a.email && a.email.toLowerCase().includes(q)) ||
                          (a.serviceNameSnapshot && a.serviceNameSnapshot.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [appointments, statusFilter, searchQuery]);

  const openDetailModal = (apt) => {
    setSelectedApt(apt);
    setEditStatus(apt.status);
    setEditInternalNote(apt.internalNote || '');
  };

  const handleSaveStatus = () => {
    if (!selectedApt) return;
    
    dentalStore.updateAppointmentStatus(
      tenant.id, 
      selectedApt.id, 
      editStatus, 
      editInternalNote, 
      user?.name || 'Staff'
    );

    showToast(`Appointment #${selectedApt.id} updated to ${editStatus}`, 'success');
    setSelectedApt(null);
  };

  // Export to CSV
  const exportToCsv = () => {
    const headers = ['ID', 'Patient Name', 'Phone', 'Email', 'Service', 'Date', 'Time Window', 'Status', 'Internal Note', 'Created At'];
    const rows = filteredAppointments.map(a => [
      a.id,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.serviceNameSnapshot}"`,
      a.preferredDate || '',
      `"${a.preferredTime}"`,
      a.status,
      `"${(a.internalNote || '').replace(/"/g, '""')}"`,
      a.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${tenant.slug}_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported appointments CSV', 'info');
  };

  const statusTabs = [
    { id: 'all', label: 'All Requests', count: appointments.length },
    { id: 'new', label: 'New', count: appointments.filter(a => a.status === 'new').length },
    { id: 'contacted', label: 'Contacted', count: appointments.filter(a => a.status === 'contacted').length },
    { id: 'confirmed', label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: appointments.filter(a => a.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length },
    { id: 'spam', label: 'Spam', count: appointments.filter(a => a.status === 'spam').length },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Appointment Enquiries CRM</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage and track patient consultation requests for <strong>{tenant?.name}</strong> (PRD Section 9)
          </p>
        </div>

        <button 
          onClick={exportToCsv} 
          className="btn btn-secondary btn-sm"
          disabled={filteredAppointments.length === 0}
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="admin-tabs-scroll" style={{ marginBottom: '1.25rem' }}>
        {statusTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            style={{
              padding: '0.45rem 0.8rem',
              borderRadius: '4px',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: statusFilter === tab.id ? 'var(--primary)' : '#FFFFFF',
              color: statusFilter === tab.id ? '#FFFFFF' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: statusFilter === tab.id ? 'var(--primary)' : 'var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              background: statusFilter === tab.id ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
              padding: '0.1rem 0.4rem',
              borderRadius: '4px',
              fontSize: '0.725rem'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '4px',
        padding: '0.875rem 1rem',
        border: '1px solid var(--border-light)',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 'min(100%, 260px)' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
          <input
            type="text"
            placeholder="Search by patient name, phone, email, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', width: '100%', fontSize: '0.875rem' }}
          />
        </div>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
          Showing <strong>{filteredAppointments.length}</strong> of {appointments.length}
        </span>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="admin-desktop-table">
        <div className="table-responsive" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Requested Treatment</th>
                <th>Preferred Slot</th>
                <th>Status</th>
                <th>Submitted</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
                    No appointment requests found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                        #{apt.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{apt.patientName}</div>
                      {apt.email && <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{apt.email}</div>}
                    </td>
                    <td>
                      <a href={`tel:${apt.phone}`} style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Phone size={13} /> {apt.phone}
                      </a>
                    </td>
                    <td style={{ maxWidth: '220px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {apt.serviceNameSnapshot}
                      </div>
                    </td>
                    <td>
                      <div>{formatDate(apt.preferredDate)}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{apt.preferredTime}</div>
                    </td>
                    <td>
                      <span className={`badge badge-${apt.status}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {formatDateTime(apt.createdAt)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => openDetailModal(apt)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                        title="View & Edit Status"
                      >
                        <Edit3 size={13} />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Smartphone Card View (< 768px) */}
      <div className="admin-mobile-cards">
        {filteredAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
            No appointment requests found matching current filters.
          </div>
        ) : (
          filteredAppointments.map(apt => (
            <div key={apt.id} className="admin-mobile-card">
              <div className="admin-mobile-card-header">
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {apt.patientName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    Ref #{apt.id} • {formatDateTime(apt.createdAt)}
                  </div>
                </div>
                <span className={`badge badge-${apt.status}`}>
                  {apt.status}
                </span>
              </div>

              <div className="admin-mobile-card-row">
                <span style={{ color: 'var(--text-muted)' }}>Treatment:</span>
                <strong style={{ color: 'var(--text-main)', textAlign: 'right', maxWidth: '65%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {apt.serviceNameSnapshot}
                </strong>
              </div>

              <div className="admin-mobile-card-row">
                <span style={{ color: 'var(--text-muted)' }}>Preferred:</span>
                <span style={{ color: 'var(--text-main)' }}>{formatDate(apt.preferredDate)} ({apt.preferredTime})</span>
              </div>

              {apt.email && (
                <div className="admin-mobile-card-row">
                  <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.775rem' }}>{apt.email}</span>
                </div>
              )}

              {/* Quick Communication & Status Update Buttons */}
              <div className="admin-mobile-card-actions">
                <a 
                  href={`tel:${apt.phone}`} 
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '0.45rem' }}
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>
                <a 
                  href={`https://wa.me/${apt.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.patientName)}%2C%20this%20is%20${encodeURIComponent(tenant?.name)}%20regarding%20your%20appointment%20request.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '0.45rem' }}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => openDetailModal(apt)}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <Edit3 size={13} />
                  <span>Review</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment Detail & Status Update Modal */}
      <Modal
        isOpen={!!selectedApt}
        onClose={() => setSelectedApt(null)}
        title={`Enquiry Detail: #${selectedApt?.id}`}
        maxWidth="680px"
        footer={
          <>
            <button onClick={() => setSelectedApt(null)} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSaveStatus} className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save Status & Notes</span>
            </button>
          </>
        }
      >
        {selectedApt && (
          <div>
            {/* Patient Header Box */}
            <div style={{ background: 'var(--bg-page)', padding: '1rem', borderRadius: '4px', marginBottom: '1.25rem', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                    {selectedApt.patientName}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Consent Granted: {formatDateTime(selectedApt.consentAt)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${selectedApt.phone}`} className="btn btn-secondary btn-sm">
                    <Phone size={13} /> Call
                  </a>
                  <a 
                    href={`https://wa.me/${selectedApt.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedApt.patientName)}%2C%20this%20is%20${encodeURIComponent(tenant?.name)}%20regarding%20your%20appointment%20request.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.5rem', fontSize: '0.825rem' }}>
                <div>
                  <strong>Phone:</strong> {selectedApt.phone}
                </div>
                <div>
                  <strong>Email:</strong> {selectedApt.email || 'None provided'}
                </div>
                <div>
                  <strong>Service:</strong> {selectedApt.serviceNameSnapshot}
                </div>
                <div>
                  <strong>Preferred:</strong> {formatDate(selectedApt.preferredDate)} ({selectedApt.preferredTime})
                </div>
              </div>
            </div>

            {/* Patient Message / Note */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Patient's Note / Visit Concern:
              </div>
              <div style={{ padding: '0.75rem 0.9rem', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                {selectedApt.note ? selectedApt.note : <em style={{ color: '#94A3B8' }}>No note submitted.</em>}
              </div>
            </div>

            {/* Status Update Form Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="editStatus">
                  Update Enquiry Status (PRD Section 9)
                </label>
                <select
                  id="editStatus"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="new">new (Awaiting Action)</option>
                  <option value="contacted">contacted (Spoke with patient)</option>
                  <option value="confirmed">confirmed (Time & Chair booked)</option>
                  <option value="completed">completed (Consultation done)</option>
                  <option value="cancelled">cancelled (Patient declined/cancelled)</option>
                  <option value="spam">spam (Abuse / Junk)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F8FAFC', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Audit Stamp:</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                  Updated by: <strong>{selectedApt.updatedBy || 'System'}</strong> on {formatDateTime(selectedApt.updatedAt)}
                </div>
              </div>
            </div>

            {/* Staff Internal Note (Restricted, not shown publicly) */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="editInternalNote">
                Staff Internal Clinical/Reception Notes (Private to Clinic Staff):
              </label>
              <textarea
                id="editInternalNote"
                rows={3}
                placeholder="e.g. Slotted for Tuesday 4:00 PM with Dr. Sameer Merchant. Advised pre-visit cleaning instructions..."
                value={editInternalNote}
                onChange={(e) => setEditInternalNote(e.target.value)}
                className="form-textarea"
                style={{ borderRadius: '4px' }}
              />
              <span className="form-hint">
                Note: Do not record complex medical diagnostic histories here (PRD Section 9).
              </span>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}
