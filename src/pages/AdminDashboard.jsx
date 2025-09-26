import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState([]);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalLaboratories: 0,
    totalChemists: 0,
    totalPatients: 0,
    activeProviders: 0,
    suspendedProviders: 0
  });

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    
    // Only allow access if user is already an admin
    if (data && role === 'admin') {
      setUserData(JSON.parse(data));
    } else {
      // If not admin, redirect to home page
      navigate('/');
      return;
    }

    // Load mock providers data
    loadProvidersData();
  }, [navigate]);

  const loadProvidersData = () => {
    const mockProviders = [
      {
        id: 'DOC001',
        name: 'Dr. Dhairya Sharma',
        type: 'doctor',
        email: 'dhairya.sharma@example.com',
        phone: '+91 9876543210',
        registrationDate: '2024-01-15',
        status: 'active',
        licenseNumber: 'MC123456',
        specialization: 'General Medicine',
        address: '123 Medical Center, Kochi',
        patientsCount: 45
      },
      {
        id: 'DOC002',
        name: 'Dr. Pragati Singh',
        type: 'doctor',
        email: 'pragati.singh@example.com',
        phone: '+91 9876543211',
        registrationDate: '2024-01-10',
        status: 'suspended',
        licenseNumber: 'MC123457',
        specialization: 'Cardiology',
        address: '456 Heart Institute, Trivandrum',
        patientsCount: 23
      },
      {
        id: 'LAB001',
        name: 'Sujal Diagnostics',
        type: 'laboratory',
        email: 'sujal.diagnostics@example.com',
        phone: '+91 9876543212',
        registrationDate: '2024-01-08',
        status: 'active',
        licenseNumber: 'LAB789012',
        specialization: 'Clinical Pathology',
        address: '789 Lab Complex, Kochi',
        testsCount: 156
      },
      {
        id: 'LAB002',
        name: 'Parv Pathology Lab',
        type: 'laboratory',
        email: 'parv.pathology@example.com',
        phone: '+91 9876543213',
        registrationDate: '2024-01-12',
        status: 'active',
        licenseNumber: 'LAB789013',
        specialization: 'Molecular Diagnostics',
        address: '321 Science Park, Trivandrum',
        testsCount: 89
      },
      {
        id: 'CHEM001',
        name: 'Akshay Medical Store',
        type: 'chemist',
        email: 'akshay.medical@example.com',
        phone: '+91 9876543214',
        registrationDate: '2024-01-05',
        status: 'active',
        licenseNumber: 'PHARM456789',
        specialization: 'Retail Pharmacy',
        address: '654 Medical Street, Kochi',
        prescriptionsCount: 234
      },
      {
        id: 'CHEM002',
        name: 'Jahnavi Pharmacy',
        type: 'chemist',
        email: 'jahnavi.pharmacy@example.com',
        phone: '+91 9876543215',
        registrationDate: '2024-01-18',
        status: 'suspended',
        licenseNumber: 'PHARM456790',
        specialization: 'Clinical Pharmacy',
        address: '987 Health Plaza, Trivandrum',
        prescriptionsCount: 67
      }
    ];

    setProviders(mockProviders);

    // Calculate stats
    const doctors = mockProviders.filter(p => p.type === 'doctor');
    const laboratories = mockProviders.filter(p => p.type === 'laboratory');
    const chemists = mockProviders.filter(p => p.type === 'chemist');
    const activeProviders = mockProviders.filter(p => p.status === 'active');
    const suspendedProviders = mockProviders.filter(p => p.status === 'suspended');

    setStats({
      totalDoctors: doctors.length,
      totalLaboratories: laboratories.length,
      totalChemists: chemists.length,
      totalPatients: 1250, // Mock patient count
      activeProviders: activeProviders.length,
      suspendedProviders: suspendedProviders.length
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter providers based on search query
    if (query.trim()) {
      const filtered = providers.filter(provider =>
        provider.name.toLowerCase().includes(query.toLowerCase()) ||
        provider.id.toLowerCase().includes(query.toLowerCase()) ||
        provider.type.toLowerCase().includes(query.toLowerCase()) ||
        provider.licenseNumber.toLowerCase().includes(query.toLowerCase())
      );
      setProviders(filtered);
    } else {
      loadProvidersData();
    }
  };

  const toggleProviderStatus = (id) => {
    setProviders(prev => prev.map(provider =>
      provider.id === id
        ? { ...provider, status: provider.status === 'active' ? 'suspended' : 'active' }
        : provider
    ));

    // Update stats
    const updatedProviders = providers.map(provider =>
      provider.id === id
        ? { ...provider, status: provider.status === 'active' ? 'suspended' : 'active' }
        : provider
    );

    const activeProviders = updatedProviders.filter(p => p.status === 'active');
    const suspendedProviders = updatedProviders.filter(p => p.status === 'suspended');

    setStats(prev => ({
      ...prev,
      activeProviders: activeProviders.length,
      suspendedProviders: suspendedProviders.length
    }));
  };

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'doctor': return '👨‍⚕️';
      case 'laboratory': return '🧪';
      case 'chemist': return '💊';
      default: return '🏥';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'doctor': return 'Doctor';
      case 'laboratory': return 'Laboratory';
      case 'chemist': return 'Chemist Shop';
      default: return 'Provider';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="admin"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData?.fullName || 'Admin'}!
            </h1>
            <p className="text-gray-600">
              Admin Dashboard - Manage healthcare providers and monitor system activity
            </p>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Laboratories</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLaboratories}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Chemist Shops</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalChemists}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Providers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProviders}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.suspendedProviders}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search providers by name, ID, type, or license number..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Providers Management */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : 'All Healthcare Providers'}
              </h2>
              <Button>Export Report</Button>
            </div>

            <div className="space-y-4">
              {providers.map((provider) => (
                <div key={provider.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getTypeIcon(provider.type)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-600">ID: {provider.id}</p>
                          <p className="text-sm text-gray-600">License: {provider.licenseNumber}</p>
                          <p className="text-sm text-gray-600">Type: {getTypeLabel(provider.type)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Registration Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(provider.registrationDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {provider.type === 'doctor' && `${provider.patientsCount} patients`}
                          {provider.type === 'laboratory' && `${provider.testsCount} tests`}
                          {provider.type === 'chemist' && `${provider.prescriptionsCount} prescriptions`}
                        </p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => toggleProviderStatus(provider.id)}
                          className={
                            provider.status === 'active'
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-green-600 hover:bg-green-700'
                          }
                        >
                          {provider.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="secondary">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {providers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No providers found matching your search.</p>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">System Reports</h3>
              <p className="text-sm text-gray-600 mb-4">Generate detailed system reports</p>
              <Button size="sm">View Reports</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage all system users</p>
              <Button size="sm">Manage Users</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">System Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Configure system parameters</p>
              <Button size="sm">Settings</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Audit Logs</h3>
              <p className="text-sm text-gray-600 mb-4">View system audit trail</p>
              <Button size="sm">View Logs</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
