import React, { createContext, useContext, useState } from 'react';
import { AppointmentModal } from '../../components/common/AppointmentModal';

const AppointmentModalContext = createContext(null);

export function AppointmentModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialServiceSlug, setInitialServiceSlug] = useState('');
  const [initialDoctorId, setInitialDoctorId] = useState('');

  const openAppointmentModal = (serviceSlug = '', doctorId = '') => {
    setInitialServiceSlug(serviceSlug || '');
    setInitialDoctorId(doctorId || '');
    setIsOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsOpen(false);
    setInitialServiceSlug('');
    setInitialDoctorId('');
  };

  return (
    <AppointmentModalContext.Provider value={{ openAppointmentModal, closeAppointmentModal }}>
      {children}
      <AppointmentModal 
        isOpen={isOpen} 
        onClose={closeAppointmentModal}
        preselectedServiceSlug={initialServiceSlug}
        preselectedDoctorId={initialDoctorId}
      />
    </AppointmentModalContext.Provider>
  );
}

export function useAppointmentModal() {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used within an AppointmentModalProvider');
  }
  return context;
}
