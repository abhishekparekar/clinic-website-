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

  // Admin-Only Login handler
  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 350)); // simulate auth latency

    // Check provisioned admin members for current tenant
    const members = dentalStore.getMembers(tenantId);
    const member = members.find(m => m.email.toLowerCase() === email.toLowerCase());

    if (!member) {
      // Allow fallback admin login if admin email entered
      if (email.toLowerCase().includes('admin')) {
        const adminUser = {
          uid: 'admin-temp-1',
          tenantId,
          email,
          name: 'Clinic Administrator',
          role: 'tenantAdmin',
          active: true
        };
        setUser(adminUser);
        setLoading(false);
        return { success: true, user: adminUser };
      }

      setLoading(false);
      return { 
        success: false, 
        error: 'Access denied: Only authorized clinic administrators may access this portal.' 
      };
    }

    if (!member.active) {
      setLoading(false);
      return { success: false, error: 'This admin account has been deactivated.' };
    }

    setUser(member);
    setLoading(false);
    return { success: true, user: member };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dental_clinic_auth_user');
  };

  const isTenantAdmin = user?.role === 'tenantAdmin' || !!user;
  const isAdmin = isTenantAdmin;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isTenantAdmin, isAdmin, isStaff: isAdmin }}>
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
