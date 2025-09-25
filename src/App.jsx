import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages

import Onboarding from './pages/Onboarding.jsx';
import PatientRegistration from './pages/PatientRegistration.jsx';
import ProviderRegistration from './pages/ProviderRegistration.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import ProviderDashboard from './pages/ProviderDashboard.jsx';
import LaboratoryDashboard from './pages/LaboratoryDashboard.jsx';
import ChemistDashboard from './pages/ChemistDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProviderManagement from './pages/ProviderManagement.jsx';
import SystemReports from './pages/SystemReports.jsx';
import UserManagement from './pages/UserManagement.jsx';
import SystemSettings from './pages/SystemSettings.jsx';
import AuditLogs from './pages/AuditLogs.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
      
          <Route path="/" element={<Onboarding />} />
          <Route path="/register/patient" element={<PatientRegistration />} />
          <Route path="/register/provider" element={<ProviderRegistration />} />
          <Route path="/register/doctor" element={
            <ProviderRegistration
              providerType="doctor"
            />
          } />
          <Route path="/register/laboratory" element={
            <ProviderRegistration
              providerType="laboratory"
            />
          } />
          <Route path="/register/chemist" element={
            <ProviderRegistration
              providerType="chemist"
            />
          } />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/doctor" element={<ProviderDashboard />} />
          <Route path="/dashboard/laboratory" element={<LaboratoryDashboard />} />
          <Route path="/dashboard/chemist" element={<ChemistDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/admin/providers" element={<ProviderManagement />} />
          <Route path="/admin/reports" element={<SystemReports />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/audit" element={<AuditLogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
