import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TenantProvider } from './features/tenant/TenantContext';
import { AuthProvider } from './features/auth/AuthContext';
import { AppointmentModalProvider } from './features/appointment/AppointmentModalContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { DoctorsPage } from './pages/public/DoctorsPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { AppointmentPage } from './pages/public/AppointmentPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminFaqs } from './pages/admin/AdminFaqs';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminTeam } from './pages/admin/AdminTeam';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <TenantProvider>
        <AuthProvider>
          <AppointmentModalProvider>
            <Routes>
              {/* Public Routes with Shared PublicLayout */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:slug" element={<ServiceDetailPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="appointment" element={<AppointmentPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Authentication (Standalone) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Routes with AdminLayout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="doctors" element={<AdminDoctors />} />
                <Route path="faqs" element={<AdminFaqs />} />
                <Route path="clinic-settings" element={<AdminSettings />} />
                <Route path="team" element={<AdminTeam />} />
              </Route>
            </Routes>
          </AppointmentModalProvider>
        </AuthProvider>
      </TenantProvider>
    </BrowserRouter>
  );
}

export default App;
