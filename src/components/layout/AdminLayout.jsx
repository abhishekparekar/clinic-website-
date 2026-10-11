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
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: 'var(--shadow-xl)'
      }} className="admin-sidebar">
        <style>{`
          @media (min-width: 1024px) {
            .admin-sidebar { transform: translateX(0) !important; }
            .admin-main-wrap { margin-left: 260px !important; }
            .admin-menu-toggle { display: none !important; }
          }
          @media (max-width: 640px) {
            .admin-workspace-full { display: none !important; }
            .admin-view-site-text { display: none !important; }
          }
          @media (min-width: 641px) {
            .admin-workspace-short { display: none !important; }
          }
        `}</style>

        {/* Brand Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '4px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Lock size={17} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                Clinic Portal
              </span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="admin-menu-toggle"
              style={{ 
                color: '#94A3B8', 
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '4px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer' 
              }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.06)', 
            borderRadius: '4px', 
            padding: '0.5rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--accent)'
          }}>
            <Building2 size={14} style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {tenant?.name}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '1rem 0.65rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
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
                  padding: '0.7rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  background: isActive ? 'var(--primary)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease'
                })}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / User Profile & Logout */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '4px',
              background: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#FFFFFF'
            }}>
              {user.name ? user.name[0] : 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'capitalize' }}>
                {user.role === 'tenantAdmin' ? 'Tenant Admin' : 'Staff / Reception'}
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
              padding: '0.55rem',
              borderRadius: '4px',
              border: 'none',
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
      <div className="admin-main-wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
        
        {/* Top Header */}
        <header style={{
          minHeight: '60px',
          height: '60px',
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(0.75rem, 2vw, 1.5rem)',
          position: 'sticky',
          top: 0,
          zIndex: 800,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="admin-menu-toggle btn-icon"
              style={{ color: 'var(--text-main)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '0.4rem' }}
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span className="admin-workspace-full">
                Workspace: <strong style={{ color: 'var(--text-main)' }}>{tenant?.name}</strong>
              </span>
              <span className="admin-workspace-short">
                <strong style={{ color: 'var(--text-main)' }}>{tenant?.name}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--primary)',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                background: 'var(--primary-light)',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
              title="Open public website in a new tab"
            >
              <span className="admin-view-site-text">View Website</span>
              <span className="admin-workspace-short">Site</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Sub-Page */}
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
