import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAuth } from '../../features/auth/AuthContext';
import { dentalStore } from '../../lib/store';
import { formatDate, formatDateTime } from '../../lib/dateUtils';
import { 
  CalendarCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  XCircle, 
  ArrowRight, 
  Building2,
  Stethoscope,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';

export function AdminOverview() {
  const { tenant } = useTenant();
  const { user, isTenantAdmin } = useAuth();
  
  const [appointments, setAppointments] = useState(() => dentalStore.getAppointments(tenant.id));

  useEffect(() => {
    const handleUpdate = () => {
      setAppointments(dentalStore.getAppointments(tenant.id));
    };
    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenant.id]);

  // Aggregate metrics (PRD Section 9)
  const totalCount = appointments.length;
  const newCount = appointments.filter(a => a.status === 'new').length;
  const contactedCount = appointments.filter(a => a.status === 'contacted').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  return (
    <div>
      {/* Top Welcome Banner */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '4px',
        padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1rem, 3vw, 1.75rem)',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ minWidth: '240px' }}>
          <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
            Welcome back, {user?.name}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Clinic Workspace: <strong>{tenant?.name}</strong> • Role: <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{user?.role === 'tenantAdmin' ? 'Admin' : 'Front Desk Staff'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/admin/appointments" className="btn btn-primary btn-sm">
            <CalendarCheck size={15} />
            <span>Manage All Enquiries</span>
          </Link>
          {isTenantAdmin && (
            <Link to="/admin/clinic-settings" className="btn btn-secondary btn-sm">
              <Settings size={15} />
              <span>Branding Settings</span>
            </Link>
          )}
        </div>
      </div>

      {/* KPI Cards Grid (PRD Section 9: Dashboard overview) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        
        {/* Total */}
        <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Total Enquiries
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            All-time submissions
          </div>
        </div>

        {/* New / Action Required */}
        <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-new)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-new)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            New / Uncontacted
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--status-new)', lineHeight: 1.1 }}>
            {newCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            Awaiting receptionist call
          </div>
        </div>

        {/* Contacted */}
        <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-contacted)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-contacted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Contacted
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--status-contacted)', lineHeight: 1.1 }}>
            {contactedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            Spoke / Sent details
          </div>
        </div>

        {/* Confirmed */}
        <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-confirmed)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-confirmed)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Confirmed Slots
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--status-confirmed)', lineHeight: 1.1 }}>
            {confirmedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            Doctor chair assigned
          </div>
        </div>

        {/* Completed */}
        <div style={{ background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-completed)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-completed)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Completed Visits
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--status-completed)', lineHeight: 1.1 }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            Patient treated
          </div>
        </div>

      </div>

      {/* Recent Submissions Feed */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '4px',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>Recent Appointment Requests</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest enquiries received through the website</p>
          </div>
          <Link to="/admin/appointments" style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
            <span>View All ({appointments.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="admin-desktop-table">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Phone Number</th>
                  <th>Treatment</th>
                  <th>Preferred Time</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map(apt => (
                  <tr key={apt.id}>
                    <td>
                      <strong>{apt.patientName}</strong>
                      {apt.email && <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{apt.email}</div>}
                    </td>
                    <td>
                      <a href={`tel:${apt.phone}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{apt.phone}</a>
                    </td>
                    <td>{apt.serviceNameSnapshot}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="admin-mobile-cards">
          {appointments.slice(0, 5).map(apt => (
            <div key={apt.id} className="admin-mobile-card">
              <div className="admin-mobile-card-header">
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{apt.patientName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>#{apt.id} • {formatDateTime(apt.createdAt)}</div>
                </div>
                <span className={`badge badge-${apt.status}`}>
                  {apt.status}
                </span>
              </div>

              <div className="admin-mobile-card-row">
                <span style={{ color: 'var(--text-muted)' }}>Treatment:</span>
                <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{apt.serviceNameSnapshot}</strong>
              </div>

              <div className="admin-mobile-card-row">
                <span style={{ color: 'var(--text-muted)' }}>Preferred Time:</span>
                <span>{formatDate(apt.preferredDate)} ({apt.preferredTime})</span>
              </div>

              <div className="admin-mobile-card-actions">
                <a 
                  href={`tel:${apt.phone}`} 
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  Call {apt.phone}
                </a>
                <Link 
                  to="/admin/appointments" 
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick CMS Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
        
        <Link 
          to="/admin/services" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '4px', 
            padding: '1.25rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Stethoscope size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>Treatments CMS</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Publish or edit procedures</div>
          </div>
        </Link>

        <Link 
          to="/admin/doctors" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '4px', 
            padding: '1.25rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>Dentists Directory</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Update specialist profiles</div>
          </div>
        </Link>

        <Link 
          to="/admin/faqs" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '4px', 
            padding: '1.25rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>FAQ Management</div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Edit patient answers</div>
          </div>
        </Link>

      </div>

    </div>
  );
}
