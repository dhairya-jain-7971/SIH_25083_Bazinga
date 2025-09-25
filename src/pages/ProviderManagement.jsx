import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const ProviderManagement = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Check if user is admin
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    if (data && role === 'admin') {
      setUserData(JSON.parse(data));
    } else {
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
        name: 'Dr. John Smith',
        type: 'doctor',
        email: 'john.smith@example.com',
        phone: '+91 9876543210',
        registrationDate: '2024-01-15',
        status: 'active',
        licenseNumber: 'MC123456',
        specialization: 'General Medicine',
        address: '123 Medical Center, Kochi',
        patientsCount: 45,
        lastLogin: '2024-01-20',
        verificationStatus: 'verified'
      },
      {
        id: 'DOC002',
        name: 'Dr. Sarah Johnson',
        type: 'doctor',
        email: 'sarah.johnson@example.com',
        phone: '+91 9876543211',
        registrationDate: '2024-01-10',
        status: 'suspended',
        licenseNumber: 'MC123457',
        specialization: 'Cardiology',
        address: '456 Heart Institute, Trivandrum',
        patientsCount: 23,
        lastLogin: '2024-01-18',
        verificationStatus: 'pending'
      },
      {
        id: 'DOC003',
        name: 'Dr. Michael Brown',
        type: 'doctor',
        email: 'michael.brown@example.com',
        phone: '+91 9876543216',
        registrationDate: '2024-01-12',
        status: 'active',
        licenseNumber: 'MC123458',
        specialization: 'Orthopedics',
        address: '789 Bone & Joint Clinic, Kochi',
        patientsCount: 67,
        lastLogin: '2024-01-21',
        verificationStatus: 'verified'
      },
      {
        id: 'LAB001',
        name: 'City Diagnostic Lab',
        type: 'laboratory',
        email: 'citylab@example.com',
        phone: '+91 9876543212',
        registrationDate: '2024-01-08',
        status: 'active',
        licenseNumber: 'LAB789012',
        specialization: 'Clinical Pathology',
        address: '789 Lab Complex, Kochi',
        testsCount: 156,
        lastLogin: '2024-01-20',
        verificationStatus: 'verified'
      },
      {
        id: 'LAB002',
        name: 'Modern Pathology Lab',
        type: 'laboratory',
        email: 'modernlab@example.com',
        phone: '+91 9876543213',
        registrationDate: '2024-01-12',
        status: 'active',
        licenseNumber: 'LAB789013',
        specialization: 'Molecular Diagnostics',
        address: '321 Science Park, Trivandrum',
        testsCount: 89,
        lastLogin: '2024-01-19',
        verificationStatus: 'verified'
      },
      {
        id: 'CHEM001',
        name: 'HealthPlus Pharmacy',
        type: 'chemist',
        email: 'healthplus@example.com',
        phone: '+91 9876543214',
        registrationDate: '2024-01-05',
        status: 'active',
        licenseNumber: 'PHARM456789',
        specialization: 'Retail Pharmacy',
        address: '654 Medical Street, Kochi',
        prescriptionsCount: 234,
        lastLogin: '2024-01-21',
        verificationStatus: 'verified'
      },
      {
        id: 'CHEM002',
        name: 'LifeCare Chemist',
        type: 'chemist',
        email: 'lifecare@example.com',
        phone: '+91 9876543215',
        registrationDate: '2024-01-18',
        status: 'suspended',
        licenseNumber: 'PHARM456790',
        specialization: 'Clinical Pharmacy',
        address: '987 Health Plaza, Trivandrum',
        prescriptionsCount: 67,
        lastLogin: '2024-01-17',
        verificationStatus: 'pending'
      }
    ];

    setProviders(mockProviders);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleProviderStatus = (id) => {
    setProviders(prev => prev.map(provider =>
      provider.id === id
        ? { ...provider, status: provider.status === 'active' ? 'suspended' : 'active' }
        : provider
    ));
  };

  const updateVerificationStatus = (id, status) => {
    setProviders(prev => prev.map(provider =>
      provider.id === id
        ? { ...provider, verificationStatus: status }
        : provider
    ));
  };

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || provider.type === filterType;
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

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
              Provider Management
            </h1>
            <p className="text-gray-600">
              Manage healthcare providers, verify credentials, and monitor activity
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <SearchBar
                placeholder="Search providers..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="doctor">Doctors</option>
                <option value="laboratory">Laboratories</option>
                <option value="chemist">Chemist Shops</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setFilterStatus('all');
                }}
                variant="secondary"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {providers.filter(p => p.type === 'doctor').length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {providers.filter(p => p.type === 'laboratory').length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {providers.filter(p => p.type === 'chemist').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {providers.filter(p => p.verificationStatus === 'verified').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Providers Table */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Healthcare Providers ({filteredProviders.length})
              </h2>
              <Button>Export List</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProviders.map((provider) => (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm">{getTypeIcon(provider.type)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                            <div className="text-sm text-gray-500">{provider.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getTypeLabel(provider.type)}</div>
                        <div className="text-sm text-gray-500">{provider.specialization}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{provider.licenseNumber}</div>
                        <div className="text-sm text-gray-500">
                          Reg: {new Date(provider.registrationDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(provider.status)}`}>
                          {provider.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={provider.verificationStatus}
                          onChange={(e) => updateVerificationStatus(provider.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getVerificationColor(provider.verificationStatus)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {provider.type === 'doctor' && `${provider.patientsCount} patients`}
                          {provider.type === 'laboratory' && `${provider.testsCount} tests`}
                          {provider.type === 'chemist' && `${provider.prescriptionsCount} prescriptions`}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last login: {new Date(provider.lastLogin).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No providers found matching your criteria.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProviderManagement;
