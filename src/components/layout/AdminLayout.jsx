import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useTenant } from '../../features/tenant/TenantContext';
import { ToastContainer } from '../common/Toast';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Stethoscope, 
  Users, 
  HelpCircle, 
  Settings, 
  ShieldAlert, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  Building2,
  Lock
} from 'lucide-react';

export function AdminLayout() {
  const { user, logout, isTenantAdmin } = useAuth();
  const { tenant } = useTenant();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route check
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Appointments CRM', path: '/admin/appointments', icon: CalendarCheck },
    { label: 'Treatments CMS', path: '/admin/services', icon: Stethoscope },
    { label: 'Dentists CMS', path: '/admin/doctors', icon: Users },
    { label: 'FAQ Management', path: '/admin/faqs', icon: HelpCircle },
    { label: 'Clinic Branding', path: '/admin/clinic-settings', icon: Settings, adminOnly: true },
    { label: 'Staff & Roles', path: '/admin/team', icon: ShieldAlert, adminOnly: true },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
      
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 950 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#0F172A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 960,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        boxShadow: 'var(--shadow-xl)'
      }} className="admin-sidebar">
        <style>{`
          @media (min-width: 1024px) {
            .admin-sidebar { transform: translateX(0) !important; }
            .admin-main-wrap { margin-left: 260px !important; }
            .admin-menu-toggle { display: none !important; }
          }
        `}</style>

        {/* Brand Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Lock size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                Clinic Portal
              </span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="admin-menu-toggle"
              style={{ color: '#94A3B8' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.06)', 
            borderRadius: '8px', 
            padding: '0.5rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--accent)'
          }}>
            <Building2 size={14} />
            <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {tenant?.name}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '1.25rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.adminOnly && !isTenantAdmin) return null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  background: isActive ? 'var(--primary)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease'
                })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / User Profile & Logout */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              {user.name ? user.name[0] : 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'capitalize' }}>
                {user.role === 'tenantAdmin' ? 'Tenant Administrator' : 'Front Desk Staff'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.6rem',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#F87171',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header */}
        <header style={{
          height: '65px',
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 800
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="admin-menu-toggle btn-icon"
              style={{ color: 'var(--text-main)', border: '1px solid var(--border-light)' }}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Tenant Workspace: <strong style={{ color: 'var(--text-main)' }}>{tenant?.name}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--primary)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                background: 'var(--primary-light)',
                textDecoration: 'none'
              }}
            >
              <span>View Public Website</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Sub-Page */}
        <main style={{ padding: '2rem 1.5rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
