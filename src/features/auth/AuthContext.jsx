import React, { createContext, useContext, useState, useEffect } from 'react';
import { dentalStore } from '../../lib/store';
import { useTenant } from '../tenant/TenantContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { tenantId } = useTenant();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('dental_clinic_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dental_clinic_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dental_clinic_auth_user');
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 450)); // simulate auth latency

    // Check provisioned members for current tenant
    const members = dentalStore.getMembers(tenantId);
    const member = members.find(m => m.email.toLowerCase() === email.toLowerCase());

    if (!member) {
      // Allow fallback demo logins if matching default test pattern
      if (email.toLowerCase().includes('admin')) {
        const dummyAdmin = {
          uid: 'admin-temp-1',
          tenantId,
          email,
          name: 'Clinic Administrator',
          role: 'tenantAdmin',
          active: true
        };
        setUser(dummyAdmin);
        setLoading(false);
        return { success: true, user: dummyAdmin };
      } else if (email.toLowerCase().includes('staff') || email.toLowerCase().includes('reception')) {
        const dummyStaff = {
          uid: 'staff-temp-1',
          tenantId,
          email,
          name: 'Front Desk Receptionist',
          role: 'staff',
          active: true
        };
        setUser(dummyStaff);
        setLoading(false);
        return { success: true, user: dummyStaff };
      }

      setLoading(false);
      return { 
        success: false, 
        error: 'No active staff account provisioned for this email in this clinic tenant. (PRD Section 9: No public sign-up)' 
      };
    }

    if (!member.active) {
      setLoading(false);
      return { success: false, error: 'This staff account has been deactivated. Contact your clinic administrator.' };
    }

    setUser(member);
    setLoading(false);
    return { success: true, user: member };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dental_clinic_auth_user');
  };

  const isTenantAdmin = user?.role === 'tenantAdmin';
  const isStaff = user?.role === 'staff' || isTenantAdmin;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isTenantAdmin, isStaff }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
