import React, { createContext, useContext, useState, useEffect } from 'react';
import { dentalStore } from '../../lib/store';

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  // Support switching tenant via query param (?tenant=lumina-smiles) or saved state
  const [tenantId, setTenantId] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTenant = urlParams.get('tenant');
      if (queryTenant && dentalStore.getTenantById(queryTenant)) {
        return queryTenant;
      }
      const saved = localStorage.getItem('active_dental_tenant_id');
      if (saved && dentalStore.getTenantById(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Tenant init error:', e);
    }
    return 'apex-dental';
  });

  const [tenant, setTenant] = useState(() => dentalStore.getTenantById(tenantId));
  const [allTenants, setAllTenants] = useState(() => dentalStore.getAllTenants());

  // Listen to store updates
  useEffect(() => {
    const handleUpdate = () => {
      setAllTenants(dentalStore.getAllTenants());
      setTenant(dentalStore.getTenantById(tenantId));
    };

    window.addEventListener('dental_store_updated', handleUpdate);
    return () => window.removeEventListener('dental_store_updated', handleUpdate);
  }, [tenantId]);

  // Apply tenant branding tokens dynamically to document root
  useEffect(() => {
    const current = dentalStore.getTenantById(tenantId);
    if (!current) return;
    setTenant(current);

    // Dynamic brand CSS tokens
    const root = document.documentElement;
    const primary = current.branding?.primaryColor || '#0F766E';
    const accent = current.branding?.accentColor || '#06B6D4';

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`);
    root.style.setProperty('--gradient-primary-hover', `linear-gradient(135deg, ${primary}dd 0%, ${accent}dd 100%)`);
    root.style.setProperty('--border-glow', `${primary}40`);
    root.style.setProperty('--shadow-glow', `0 0 25px -5px ${primary}55`);

    // Dynamic SEO Title & Favicon
    if (current.seo?.title) {
      document.title = `${current.name} | ${current.seo.title}`;
    } else {
      document.title = current.name;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && current.seo?.description) {
      metaDesc.setAttribute('content', current.seo.description);
    }
  }, [tenantId]);

  const switchTenant = (newTenantId) => {
    if (dentalStore.getTenantById(newTenantId)) {
      setTenantId(newTenantId);
      localStorage.setItem('active_dental_tenant_id', newTenantId);
    }
  };

  return (
    <TenantContext.Provider value={{ tenantId, tenant, allTenants, switchTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
