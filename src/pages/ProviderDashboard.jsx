import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [providerType, setProviderType] = useState('doctor');
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    const type = localStorage.getItem('providerType');
    if (data) {
      setUserData(JSON.parse(data));
    }
    if (type) {
      setProviderType(type);
      // Redirect to specific dashboard if not doctor
      if (type !== 'doctor') {
        navigate(`/dashboard/${type}`);
        return;
      }
    }

    // Load mock patients data
    loadPatients();
  }, [navigate]);

  const loadPatients = () => {
    const mockPatients = [
      {
        id: 'PAT001',
        name: 'John Doe',
        phone: '+91 9876543210',
        lastVisit: '2024-01-10',
        status: 'active',
        appointments: 3
      },
      {
        id: 'PAT002',
        name: 'Jane Smith',
        phone: '+91 9876543211',
        lastVisit: '2024-01-08',
        status: 'active',
        appointments: 1
      },
      {
        id: 'PAT003',
        name: 'Robert Johnson',
        phone: '+91 9876543212',
        lastVisit: '2024-01-05',
        status: 'inactive',
        appointments: 0
      }
    ];
    setPatients(mockPatients);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter patients based on search query
    if (query.trim()) {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.id.toLowerCase().includes(query.toLowerCase())
      );
      setPatients(filtered);
    } else {
      loadPatients();
    }
  };

  const handleCallPatient = (phone) => {
    // Placeholder for call functionality
    window.open(`tel:${phone}`);
  };

  const getProviderTitle = () => {
    switch (providerType) {
      case 'doctor':
        return 'Doctor';
      case 'laboratory':
        return 'Laboratory';
      case 'chemist':
        return 'Chemist Shop';
      default:
        return 'Healthcare Provider';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="provider"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Dr. {userData?.fullName || 'Provider'}!
            </h1>
            <p className="text-gray-600">
              {getProviderTitle()} Dashboard - Manage your patients and appointments
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Reports Generated</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search patients by name or ID..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Patients List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : 'Recent Patients'}
              </h2>
              <Button>View All Patients</Button>
            </div>

            <div className="space-y-4">
              {patients.map((patient) => (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
                          <p className="text-sm text-gray-600">Phone: {patient.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last Visit</p>
                        <p className="font-medium text-gray-900">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">{patient.appointments} appointments</p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        patient.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary">
                          View Details
                        </Button>
                        {(providerType === 'laboratory' || providerType === 'chemist') && (
                          <Button
                            size="sm"
                            onClick={() => handleCallPatient(patient.phone)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            📞 Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {patients.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No patients found matching your search.</p>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Appointments</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage patient appointments</p>
              <Button size="sm">View Appointments</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Patient Records</h3>
              <p className="text-sm text-gray-600 mb-4">Access and update patient records</p>
              <Button size="sm">View Records</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">Generate and view reports</p>
              <Button size="sm">View Reports</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;
