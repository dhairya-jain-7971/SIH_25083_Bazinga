import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable components
import Navbar from '../components/Navbar.jsx';
import Card from '../components/Card.jsx';

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Access your health records, appointments, and prescriptions',
      icon: '👤',
      color: 'bg-blue-500',
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Manage patient records and appointments',
      icon: '👨‍⚕️',
      color: 'bg-green-500',
    },
    {
      id: 'laboratory',
      title: 'Laboratory',
      description: 'Manage lab tests and results for patients',
      icon: '🧪',
      color: 'bg-purple-500',
    },
    {
      id: 'chemist',
      title: 'Chemist Shop',
      description: 'Manage prescriptions and patient records',
      icon: '💊',
      color: 'bg-orange-500',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage system, providers, and monitor activity',
      icon: '👑',
      color: 'bg-red-500',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole === 'patient') {
      navigate('/register/patient');
    } else if (selectedRole === 'doctor') {
      navigate('/register/doctor');
    } else if (selectedRole === 'laboratory') {
      navigate('/register/laboratory');
    } else if (selectedRole === 'chemist') {
      navigate('/register/chemist');
    } else if (selectedRole === 'admin') {
      navigate('/dashboard/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            स्वास्थ्य Sutra
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Digital Health Record Management System
          </p>
          <p className="text-lg text-gray-500">
            For migrant workers in Kerala, aligned with SDGs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Select Your Role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role.id
                    ? 'ring-4 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="text-center p-6">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {role.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                selectedRole
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
