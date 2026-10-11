import React from 'react';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { ShieldAlert, ShieldCheck, UserCheck, Lock } from 'lucide-react';

export function AdminTeam() {
  const { tenant } = useTenant();
  const members = dentalStore.getMembers(tenant.id);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Staff & Role Permissions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Authorized staff and access controls for <strong>{tenant?.name}</strong> (PRD Section 9 & 12)
        </p>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden', marginBottom: '2rem' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Authorized Email</th>
                <th>System Role</th>
                <th>Permissions Summary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.uid}>
                  <td>
                    <strong>{member.name}</strong>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <span className="badge" style={{
                      background: member.role === 'tenantAdmin' ? '#E0F2FE' : '#F1F5F9',
                      color: member.role === 'tenantAdmin' ? '#0284C7' : '#475569',
                      fontWeight: 700
                    }}>
                      {member.role === 'tenantAdmin' ? 'Tenant Administrator' : 'Front Desk Staff'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {member.role === 'tenantAdmin' 
                      ? 'Full Access: Manage Enquiries, Treatments, Dentists, FAQs, Clinic Branding, Team'
                      : 'Operational Access: View & Update Appointment Enquiry Status & Staff Notes (Read-only CMS)'}
                  </td>
                  <td>
                    <span className="badge badge-active">
                      {member.active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security notice regarding PRD Section 9 & 12 */}
      <div style={{
        background: '#F0FDFA',
        border: '1.5px solid #CCFBF1',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <Lock size={22} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: '#0F766E', fontSize: '1rem', marginBottom: '0.35rem' }}>
            Multi-Tenant Security & Provisioning Note (PRD Section 9 & 12)
          </h4>
          <p style={{ color: '#134E4A', fontSize: '0.875rem', lineHeight: 1.6 }}>
            In adherence to strict healthcare security standards, new staff accounts cannot self-register through public forms. Staff accounts must be provisioned through secure Firebase Authentication claims or pre-authorized membership documents. Users cannot elevate their own role privileges.
          </p>
        </div>
      </div>

    </div>
  );
}
