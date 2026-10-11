// Multi-Tenant Data Store with LocalStorage Persistence & Firestore-Ready API
// Implements strict tenant-isolated queries and mutations (PRD Section 6 & 11)

import { 
  INITIAL_TENANTS, 
  INITIAL_SERVICES, 
  INITIAL_DOCTORS, 
  INITIAL_FAQS, 
  INITIAL_APPOINTMENTS,
  INITIAL_MEMBERS 
} from '../data/initialData';

const STORAGE_KEYS = {
  TENANTS: 'dental_clinics_tenants_v1',
  SERVICES: 'dental_clinics_services_v1',
  DOCTORS: 'dental_clinics_doctors_v1',
  FAQS: 'dental_clinics_faqs_v1',
  APPOINTMENTS: 'dental_clinics_appointments_v1',
  MEMBERS: 'dental_clinics_members_v1',
};

// Safe storage access helper
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed reading ${key} from storage, using fallback:`, err);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Emit global event for reactive UI updates across components
    window.dispatchEvent(new CustomEvent('dental_store_updated', { detail: { key } }));
  } catch (err) {
    console.error(`Failed saving ${key} to storage:`, err);
  }
}

// In-Memory cache initialized from storage or seed defaults
let tenants = loadFromStorage(STORAGE_KEYS.TENANTS, INITIAL_TENANTS);
let services = loadFromStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
let doctors = loadFromStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
let faqs = loadFromStorage(STORAGE_KEYS.FAQS, INITIAL_FAQS);
let appointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
let members = loadFromStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);

// Store API
export const dentalStore = {
  // TENANTS
  getAllTenants: () => Object.values(tenants),
  
  getTenantById: (tenantId) => {
    return tenants[tenantId] || null;
  },

  getTenantBySlug: (slug) => {
    return Object.values(tenants).find(t => t.slug === slug) || null;
  },

  updateTenant: (tenantId, updates) => {
    if (!tenants[tenantId]) return null;
    tenants[tenantId] = {
      ...tenants[tenantId],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.TENANTS, tenants);
    return tenants[tenantId];
  },

  // SERVICES (Tenant-Scoped)
  getServices: (tenantId, onlyPublished = false) => {
    let list = services.filter(s => s.tenantId === tenantId);
    if (onlyPublished) {
      list = list.filter(s => s.published);
    }
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  getServiceBySlug: (tenantId, slug) => {
    return services.find(s => s.tenantId === tenantId && s.slug === slug) || null;
  },

  createService: (tenantId, serviceData) => {
    const newService = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      tenantId,
      published: serviceData.published !== undefined ? serviceData.published : true,
      displayOrder: services.filter(s => s.tenantId === tenantId).length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    services = [newService, ...services];
    saveToStorage(STORAGE_KEYS.SERVICES, services);
    return newService;
  },

  updateService: (tenantId, serviceId, updates) => {
    services = services.map(s => {
      if (s.id === serviceId && s.tenantId === tenantId) {
        return { ...s, ...updates, updatedAt: new Date().toISOString() };
      }
      return s;
    });
    saveToStorage(STORAGE_KEYS.SERVICES, services);
  },

  deleteService: (tenantId, serviceId) => {
    services = services.filter(s => !(s.id === serviceId && s.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.SERVICES, services);
  },

  // DOCTORS (Tenant-Scoped)
  getDoctors: (tenantId, onlyPublished = false) => {
    let list = doctors.filter(d => d.tenantId === tenantId);
    if (onlyPublished) {
      list = list.filter(d => d.published);
    }
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  createDoctor: (tenantId, doctorData) => {
    const newDoc = {
      ...doctorData,
      id: `doc-${Date.now()}`,
      tenantId,
      published: doctorData.published !== undefined ? doctorData.published : true,
      displayOrder: doctors.filter(d => d.tenantId === tenantId).length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    doctors = [...doctors, newDoc];
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
    return newDoc;
  },

  updateDoctor: (tenantId, doctorId, updates) => {
    doctors = doctors.map(d => {
      if (d.id === doctorId && d.tenantId === tenantId) {
        return { ...d, ...updates, updatedAt: new Date().toISOString() };
      }
      return d;
    });
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
  },

  deleteDoctor: (tenantId, doctorId) => {
    doctors = doctors.filter(d => !(d.id === doctorId && d.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
  },

  // FAQS (Tenant-Scoped)
  getFaqs: (tenantId, onlyPublished = false) => {
    let list = faqs.filter(f => f.tenantId === tenantId);
    if (onlyPublished) {
      list = list.filter(f => f.published);
    }
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  createFaq: (tenantId, faqData) => {
    const newFaq = {
      ...faqData,
      id: `faq-${Date.now()}`,
      tenantId,
      published: faqData.published !== undefined ? faqData.published : true,
      displayOrder: faqs.filter(f => f.tenantId === tenantId).length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    faqs = [...faqs, newFaq];
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
    return newFaq;
  },

  updateFaq: (tenantId, faqId, updates) => {
    faqs = faqs.map(f => {
      if (f.id === faqId && f.tenantId === tenantId) {
        return { ...f, ...updates, updatedAt: new Date().toISOString() };
      }
      return f;
    });
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
  },

  deleteFaq: (tenantId, faqId) => {
    faqs = faqs.filter(f => !(f.id === faqId && f.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
  },

  // APPOINTMENTS (Tenant-Scoped & Private)
  getAppointments: (tenantId) => {
    return appointments
      .filter(a => a.tenantId === tenantId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createAppointment: (tenantId, appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: `apt-${Date.now()}`,
      tenantId, // Server/Store enforced tenant id
      status: 'new',
      internalNote: '',
      source: 'website',
      consent: true,
      consentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: 'system'
    };
    appointments = [newAppointment, ...appointments];
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    return newAppointment;
  },

  updateAppointmentStatus: (tenantId, appointmentId, status, internalNote = '', updatedBy = 'staff') => {
    appointments = appointments.map(a => {
      if (a.id === appointmentId && a.tenantId === tenantId) {
        return {
          ...a,
          status,
          internalNote: internalNote !== undefined ? internalNote : a.internalNote,
          updatedAt: new Date().toISOString(),
          updatedBy
        };
      }
      return a;
    });
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  },

  // MEMBERS
  getMembers: (tenantId) => {
    return members.filter(m => m.tenantId === tenantId);
  },

  // Reset demo data to defaults
  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.TENANTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.DOCTORS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    tenants = { ...INITIAL_TENANTS };
    services = [...INITIAL_SERVICES];
    doctors = [...INITIAL_DOCTORS];
    faqs = [...INITIAL_FAQS];
    appointments = [...INITIAL_APPOINTMENTS];
    members = [...INITIAL_MEMBERS];
    saveToStorage(STORAGE_KEYS.TENANTS, tenants);
    saveToStorage(STORAGE_KEYS.SERVICES, services);
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    saveToStorage(STORAGE_KEYS.MEMBERS, members);
  }
};
