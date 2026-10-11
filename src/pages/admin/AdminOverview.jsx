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
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
            Welcome back, {user?.name}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            Current Clinic Workspace: <strong>{tenant?.name}</strong> • Role: <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{user?.role}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/appointments" className="btn btn-primary btn-sm">
            <CalendarCheck size={16} />
            <span>Manage All Enquiries</span>
          </Link>
          {isTenantAdmin && (
            <Link to="/admin/clinic-settings" className="btn btn-secondary btn-sm">
              <Settings size={16} />
              <span>Branding Settings</span>
            </Link>
          )}
        </div>
      </div>

      {/* KPI Cards Grid (PRD Section 9: Dashboard overview) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        
        {/* Total */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Total Enquiries
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            All-time submissions
          </div>
        </div>

        {/* New / Action Required */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-new)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--status-new)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            New / Uncontacted
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-new)' }}>
            {newCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            Awaiting receptionist call
          </div>
        </div>

        {/* Contacted */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-contacted)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--status-contacted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Contacted
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-contacted)' }}>
            {contactedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            Spoke / Sent details
          </div>
        </div>

        {/* Confirmed */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-confirmed)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--status-confirmed)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Confirmed Slots
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-confirmed)' }}>
            {confirmedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            Doctor chair assigned
          </div>
        </div>

        {/* Completed */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--status-completed)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--status-completed)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Completed Visits
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-completed)' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            Patient treated
          </div>
        </div>

      </div>

      {/* Recent Submissions Feed */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Recent Appointment Requests</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Latest enquiries received through the website</p>
          </div>
          <Link to="/admin/appointments" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

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

      {/* Quick CMS Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        <Link 
          to="/admin/services" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.5rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stethoscope size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Treatments CMS</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Publish or edit procedures</div>
          </div>
        </Link>

        <Link 
          to="/admin/doctors" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.5rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Dentists Directory</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update specialist profiles</div>
          </div>
        </Link>

        <Link 
          to="/admin/faqs" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.5rem', 
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>FAQ Management</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Edit patient answers</div>
          </div>
        </Link>

      </div>

    </div>
  );
}
