// Multi-Tenant Data Store with LocalStorage Persistence & Live Cloud Firestore Integration
// Adheres strictly to PRD Section 6 & 11 data model with tenant isolation under tenants/{tenantId}

import { 
  INITIAL_TENANTS, 
  INITIAL_SERVICES, 
  INITIAL_DOCTORS, 
  INITIAL_FAQS, 
  INITIAL_APPOINTMENTS,
  INITIAL_MEMBERS 
} from '../data/initialData';

import { 
  db, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  collection, 
  onSnapshot 
} from './firebase';

const STORAGE_KEYS = {
  TENANTS: 'dental_clinics_tenants_v2',
  SERVICES: 'dental_clinics_services_v2',
  DOCTORS: 'dental_clinics_doctors_v3',
  FAQS: 'dental_clinics_faqs_v2',
  APPOINTMENTS: 'dental_clinics_appointments_v2',
  MEMBERS: 'dental_clinics_members_v2',
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dental_store_updated', { detail: { key } }));
    }
  } catch (err) {
    console.error(`Failed saving ${key} to storage:`, err);
  }
}

// Deep clean object so no undefined values are sent to Firestore (which causes Firestore errors)
function sanitizeForFirestore(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForFirestore(item));
  }
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
      clean[key] = sanitizeForFirestore(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

// Ensure clinicdental01 is seeded from template if not yet present
function ensureClinicDental01(list, idKey = 'id') {
  const hasClinic = list.some(item => item.tenantId === 'clinicdental01');
  if (hasClinic) return list;
  const base = list.filter(item => item.tenantId === 'apex-dental');
  const cloned = base.map(item => ({
    ...item,
    [idKey]: item[idKey]?.endsWith('-c01') ? item[idKey] : `${item[idKey]}-c01`,
    tenantId: 'clinicdental01'
  }));
  return [...list, ...cloned];
}

// In-Memory cache initialized from storage or seed defaults
let tenants = loadFromStorage(STORAGE_KEYS.TENANTS, INITIAL_TENANTS);
if (!tenants['clinicdental01'] && INITIAL_TENANTS['clinicdental01']) {
  tenants['clinicdental01'] = INITIAL_TENANTS['clinicdental01'];
}

let services = ensureClinicDental01(loadFromStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES), 'id');
let doctors = ensureClinicDental01(loadFromStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS), 'id');
// Purge removed doctor
doctors = doctors.filter(d => d.id !== 'doc-2' && !d.name?.toLowerCase().includes('aisha'));

let faqs = ensureClinicDental01(loadFromStorage(STORAGE_KEYS.FAQS, INITIAL_FAQS), 'id');
let appointments = ensureClinicDental01(loadFromStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS), 'id');
let members = ensureClinicDental01(loadFromStorage(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS), 'uid');

// Save enriched memory state back to local storage
saveToStorage(STORAGE_KEYS.TENANTS, tenants);
saveToStorage(STORAGE_KEYS.SERVICES, services);
saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
saveToStorage(STORAGE_KEYS.FAQS, faqs);
saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
saveToStorage(STORAGE_KEYS.MEMBERS, members);

// Track active Firestore listeners
let activeFirestoreListeners = [];
let firestoreSyncStatus = {
  connected: false,
  tenantId: null,
  lastSyncedAt: null,
  error: null
};

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
    const updatedTenant = {
      ...tenants[tenantId],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    tenants[tenantId] = updatedTenant;
    saveToStorage(STORAGE_KEYS.TENANTS, tenants);

    // Save to Firestore: tenants/{tenantId}
    try {
      const cleanData = sanitizeForFirestore(updatedTenant);
      setDoc(doc(db, 'tenants', tenantId), cleanData, { merge: true })
        .catch(err => console.error(`[Firestore] Failed updating tenant ${tenantId}:`, err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }

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

    // Persist to Firestore: tenants/{tenantId}/services/{serviceId}
    try {
      const cleanData = sanitizeForFirestore(newService);
      setDoc(doc(db, 'tenants', tenantId, 'services', newService.id), cleanData)
        .then(() => console.log(`[Firestore] Created service ${newService.id} in tenants/${tenantId}/services`))
        .catch(err => console.error('[Firestore] Service write error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }

    return newService;
  },

  updateService: (tenantId, serviceId, updates) => {
    let updatedObj = null;
    services = services.map(s => {
      if (s.id === serviceId && s.tenantId === tenantId) {
        updatedObj = { ...s, ...updates, updatedAt: new Date().toISOString() };
        return updatedObj;
      }
      return s;
    });
    saveToStorage(STORAGE_KEYS.SERVICES, services);

    if (updatedObj) {
      try {
        const cleanData = sanitizeForFirestore(updatedObj);
        setDoc(doc(db, 'tenants', tenantId, 'services', serviceId), cleanData, { merge: true })
          .catch(err => console.error('[Firestore] Service update error:', err));
      } catch (e) {
        console.warn('[Firestore] Sync warning:', e);
      }
    }
  },

  deleteService: (tenantId, serviceId) => {
    services = services.filter(s => !(s.id === serviceId && s.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.SERVICES, services);

    try {
      deleteDoc(doc(db, 'tenants', tenantId, 'services', serviceId))
        .catch(err => console.error('[Firestore] Service delete error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }
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

    // Persist to Firestore: tenants/{tenantId}/doctors/{doctorId}
    try {
      const cleanData = sanitizeForFirestore(newDoc);
      setDoc(doc(db, 'tenants', tenantId, 'doctors', newDoc.id), cleanData)
        .then(() => console.log(`[Firestore] Created doctor ${newDoc.id} in tenants/${tenantId}/doctors`))
        .catch(err => console.error('[Firestore] Doctor write error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }

    return newDoc;
  },

  updateDoctor: (tenantId, doctorId, updates) => {
    let updatedObj = null;
    doctors = doctors.map(d => {
      if (d.id === doctorId && d.tenantId === tenantId) {
        updatedObj = { ...d, ...updates, updatedAt: new Date().toISOString() };
        return updatedObj;
      }
      return d;
    });
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);

    if (updatedObj) {
      try {
        const cleanData = sanitizeForFirestore(updatedObj);
        setDoc(doc(db, 'tenants', tenantId, 'doctors', doctorId), cleanData, { merge: true })
          .catch(err => console.error('[Firestore] Doctor update error:', err));
      } catch (e) {
        console.warn('[Firestore] Sync warning:', e);
      }
    }
  },

  deleteDoctor: (tenantId, doctorId) => {
    doctors = doctors.filter(d => !(d.id === doctorId && d.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);

    try {
      deleteDoc(doc(db, 'tenants', tenantId, 'doctors', doctorId))
        .catch(err => console.error('[Firestore] Doctor delete error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }
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

    // Persist to Firestore: tenants/{tenantId}/faqs/{faqId}
    try {
      const cleanData = sanitizeForFirestore(newFaq);
      setDoc(doc(db, 'tenants', tenantId, 'faqs', newFaq.id), cleanData)
        .then(() => console.log(`[Firestore] Created FAQ ${newFaq.id} in tenants/${tenantId}/faqs`))
        .catch(err => console.error('[Firestore] FAQ write error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }

    return newFaq;
  },

  updateFaq: (tenantId, faqId, updates) => {
    let updatedObj = null;
    faqs = faqs.map(f => {
      if (f.id === faqId && f.tenantId === tenantId) {
        updatedObj = { ...f, ...updates, updatedAt: new Date().toISOString() };
        return updatedObj;
      }
      return f;
    });
    saveToStorage(STORAGE_KEYS.FAQS, faqs);

    if (updatedObj) {
      try {
        const cleanData = sanitizeForFirestore(updatedObj);
        setDoc(doc(db, 'tenants', tenantId, 'faqs', faqId), cleanData, { merge: true })
          .catch(err => console.error('[Firestore] FAQ update error:', err));
      } catch (e) {
        console.warn('[Firestore] Sync warning:', e);
      }
    }
  },

  deleteFaq: (tenantId, faqId) => {
    faqs = faqs.filter(f => !(f.id === faqId && f.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.FAQS, faqs);

    try {
      deleteDoc(doc(db, 'tenants', tenantId, 'faqs', faqId))
        .catch(err => console.error('[Firestore] FAQ delete error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }
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

    // Save directly to Firestore: tenants/{tenantId}/appointments/{appointmentId}
    try {
      const cleanData = sanitizeForFirestore(newAppointment);
      setDoc(doc(db, 'tenants', tenantId, 'appointments', newAppointment.id), cleanData)
        .then(() => console.log(`[Firestore] Appointment ${newAppointment.id} saved under tenants/${tenantId}/appointments`))
        .catch(err => console.error('[Firestore] Appointment save error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }

    return newAppointment;
  },

  updateAppointmentStatus: (tenantId, appointmentId, status, internalNote = '', updatedBy = 'staff') => {
    let updatedObj = null;
    appointments = appointments.map(a => {
      if (a.id === appointmentId && a.tenantId === tenantId) {
        updatedObj = {
          ...a,
          status,
          internalNote: internalNote !== undefined ? internalNote : a.internalNote,
          updatedAt: new Date().toISOString(),
          updatedBy
        };
        return updatedObj;
      }
      return a;
    });
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);

    // Update in Firestore: tenants/{tenantId}/appointments/{appointmentId}
    if (updatedObj) {
      try {
        const cleanData = sanitizeForFirestore({
          status: updatedObj.status,
          internalNote: updatedObj.internalNote,
          updatedAt: updatedObj.updatedAt,
          updatedBy: updatedObj.updatedBy
        });
        updateDoc(doc(db, 'tenants', tenantId, 'appointments', appointmentId), cleanData)
          .catch(err => console.error('[Firestore] Appointment update error:', err));
      } catch (e) {
        console.warn('[Firestore] Sync warning:', e);
      }
    }
  },

  deleteAppointment: (tenantId, appointmentId) => {
    appointments = appointments.filter(a => !(a.id === appointmentId && a.tenantId === tenantId));
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);

    // Delete from Firestore: tenants/{tenantId}/appointments/{appointmentId}
    try {
      deleteDoc(doc(db, 'tenants', tenantId, 'appointments', appointmentId))
        .then(() => console.log(`[Firestore] Deleted appointment ${appointmentId} from tenants/${tenantId}/appointments`))
        .catch(err => console.error('[Firestore] Appointment delete error:', err));
    } catch (e) {
      console.warn('[Firestore] Sync warning:', e);
    }
  },

  // MEMBERS
  getMembers: (tenantId) => {
    return members.filter(m => m.tenantId === tenantId);
  },

  // FIRESTORE LIVE SYNC & REALTIME LISTENERS
  initFirestoreSync: async (tenantId = 'clinicdental01') => {
    if (typeof window === 'undefined') return;

    // Unsubscribe any previous listeners
    activeFirestoreListeners.forEach(unsub => {
      try { unsub(); } catch {}
    });
    activeFirestoreListeners = [];

    try {
      const tenantDocRef = doc(db, 'tenants', tenantId);
      const tenantSnap = await getDoc(tenantDocRef);

      // If this tenant does NOT exist in Firestore yet, automatically push seed data
      if (!tenantSnap.exists()) {
        console.log(`[Firestore] Tenant ${tenantId} not found in Firestore. Uploading complete seed dataset...`);
        await dentalStore.saveAllToFirestore(tenantId);
      } else {
        // Load latest tenant data from Firestore
        const remoteTenant = tenantSnap.data();
        if (remoteTenant) {
          tenants[tenantId] = { ...tenants[tenantId], ...remoteTenant };
          saveToStorage(STORAGE_KEYS.TENANTS, tenants);
        }

        // Fetch subcollections from Firestore
        try {
          const srvSnap = await getDocs(collection(db, 'tenants', tenantId, 'services'));
          if (!srvSnap.empty) {
            const remoteServices = srvSnap.docs.map(d => ({ ...d.data(), id: d.id }));
            services = [...services.filter(s => s.tenantId !== tenantId), ...remoteServices];
            saveToStorage(STORAGE_KEYS.SERVICES, services);
          }
        } catch (e) { console.debug('Services load note:', e); }

        try {
          const docSnap = await getDocs(collection(db, 'tenants', tenantId, 'doctors'));
          if (!docSnap.empty) {
            const remoteDoctors = docSnap.docs.map(d => ({ ...d.data(), id: d.id }));
            doctors = [...doctors.filter(d => d.tenantId !== tenantId), ...remoteDoctors];
            saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
          }
        } catch (e) { console.debug('Doctors load note:', e); }

        try {
          const faqSnap = await getDocs(collection(db, 'tenants', tenantId, 'faqs'));
          if (!faqSnap.empty) {
            const remoteFaqs = faqSnap.docs.map(d => ({ ...d.data(), id: d.id }));
            faqs = [...faqs.filter(f => f.tenantId !== tenantId), ...remoteFaqs];
            saveToStorage(STORAGE_KEYS.FAQS, faqs);
          }
        } catch (e) { console.debug('FAQs load note:', e); }

        try {
          const aptSnap = await getDocs(collection(db, 'tenants', tenantId, 'appointments'));
          if (!aptSnap.empty) {
            const remoteAppointments = aptSnap.docs.map(d => ({ ...d.data(), id: d.id }));
            appointments = [...appointments.filter(a => a.tenantId !== tenantId), ...remoteAppointments];
            saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
          }
        } catch (e) { console.debug('Appointments load note:', e); }
      }

      // Attach Real-Time Firestore listeners so any changes update instantly
      const unsubTenant = onSnapshot(tenantDocRef, (snap) => {
        if (snap.exists()) {
          tenants[tenantId] = { ...tenants[tenantId], ...snap.data() };
          saveToStorage(STORAGE_KEYS.TENANTS, tenants);
        }
      }, err => console.debug('[Firestore] Tenant listener note:', err));
      activeFirestoreListeners.push(unsubTenant);

      const unsubApt = onSnapshot(collection(db, 'tenants', tenantId, 'appointments'), (snap) => {
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ ...d.data(), id: d.id }));
          appointments = [...appointments.filter(a => a.tenantId !== tenantId), ...list];
          saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
        }
      }, err => console.debug('[Firestore] Appointment listener note:', err));
      activeFirestoreListeners.push(unsubApt);

      firestoreSyncStatus = {
        connected: true,
        tenantId,
        lastSyncedAt: new Date().toISOString(),
        error: null
      };

      console.log(`[Firestore] Live synchronization active for tenants/${tenantId}`);
    } catch (err) {
      console.error('[Firestore] Initialization error:', err);
      firestoreSyncStatus = {
        connected: false,
        tenantId,
        lastSyncedAt: null,
        error: err.message
      };
    }
  },

  // BULK SAVE ALL DATA UNDER tenants/{tenantId}
  saveAllToFirestore: async (tenantId = 'clinicdental01') => {
    try {
      console.log(`[Firestore] Starting bulk save under tenants/${tenantId}...`);
      
      // 1. Tenant Root Document
      const tenantData = tenants[tenantId] || INITIAL_TENANTS[tenantId] || INITIAL_TENANTS['clinicdental01'];
      if (tenantData) {
        await setDoc(doc(db, 'tenants', tenantId), sanitizeForFirestore({
          ...tenantData,
          id: tenantId,
          slug: tenantId,
          updatedAt: new Date().toISOString()
        }), { merge: true });
        console.log(`[Firestore] Saved tenants/${tenantId} metadata`);
      }

      // 2. Services subcollection: tenants/{tenantId}/services/{serviceId}
      const tenantServices = services.filter(s => s.tenantId === tenantId);
      for (const s of tenantServices) {
        await setDoc(doc(db, 'tenants', tenantId, 'services', s.id), sanitizeForFirestore(s), { merge: true });
      }
      console.log(`[Firestore] Saved ${tenantServices.length} services under tenants/${tenantId}/services`);

      // 3. Doctors subcollection: tenants/{tenantId}/doctors/{doctorId}
      const tenantDoctors = doctors.filter(d => d.tenantId === tenantId);
      for (const d of tenantDoctors) {
        await setDoc(doc(db, 'tenants', tenantId, 'doctors', d.id), sanitizeForFirestore(d), { merge: true });
      }
      console.log(`[Firestore] Saved ${tenantDoctors.length} doctors under tenants/${tenantId}/doctors`);

      // 4. FAQs subcollection: tenants/{tenantId}/faqs/{faqId}
      const tenantFaqs = faqs.filter(f => f.tenantId === tenantId);
      for (const f of tenantFaqs) {
        await setDoc(doc(db, 'tenants', tenantId, 'faqs', f.id), sanitizeForFirestore(f), { merge: true });
      }
      console.log(`[Firestore] Saved ${tenantFaqs.length} FAQs under tenants/${tenantId}/faqs`);

      // 5. Appointments subcollection: tenants/{tenantId}/appointments/{appointmentId}
      const tenantApts = appointments.filter(a => a.tenantId === tenantId);
      for (const a of tenantApts) {
        await setDoc(doc(db, 'tenants', tenantId, 'appointments', a.id), sanitizeForFirestore(a), { merge: true });
      }
      console.log(`[Firestore] Saved ${tenantApts.length} appointments under tenants/${tenantId}/appointments`);

      // 6. Staff members subcollection: tenants/{tenantId}/members/{userId}
      const tenantMembers = members.filter(m => m.tenantId === tenantId);
      for (const m of tenantMembers) {
        await setDoc(doc(db, 'tenants', tenantId, 'members', m.uid), sanitizeForFirestore(m), { merge: true });
      }
      console.log(`[Firestore] Saved ${tenantMembers.length} staff members under tenants/${tenantId}/members`);

      firestoreSyncStatus = {
        connected: true,
        tenantId,
        lastSyncedAt: new Date().toISOString(),
        error: null
      };

      return {
        success: true,
        tenantId,
        servicesCount: tenantServices.length,
        doctorsCount: tenantDoctors.length,
        faqsCount: tenantFaqs.length,
        appointmentsCount: tenantApts.length,
        membersCount: tenantMembers.length
      };
    } catch (err) {
      console.error(`[Firestore] Error in saveAllToFirestore for ${tenantId}:`, err);
      firestoreSyncStatus.error = err.message;
      return { success: false, error: err.message };
    }
  },

  getFirestoreSyncStatus: () => firestoreSyncStatus,

  // Reset demo data to defaults
  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.TENANTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.DOCTORS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    tenants = { ...INITIAL_TENANTS };
    services = ensureClinicDental01([...INITIAL_SERVICES], 'id');
    doctors = ensureClinicDental01([...INITIAL_DOCTORS], 'id');
    faqs = ensureClinicDental01([...INITIAL_FAQS], 'id');
    appointments = ensureClinicDental01([...INITIAL_APPOINTMENTS], 'id');
    members = ensureClinicDental01([...INITIAL_MEMBERS], 'uid');
    saveToStorage(STORAGE_KEYS.TENANTS, tenants);
    saveToStorage(STORAGE_KEYS.SERVICES, services);
    saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    saveToStorage(STORAGE_KEYS.MEMBERS, members);
  }
};
